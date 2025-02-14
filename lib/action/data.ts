"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { FuelFormSchema, VesselFormSchema, VesselUpdateSchema } from "../zod";
import moment from "moment";

export async function getVessel({
  search = "",
  page = 1,
  perPage = 10,
}: {
  search: string;
  page: number;
  perPage: number;
}) {
  const where = {
    AND: [
      {
        name: {
          contains: search,
        },
      },
    ],
  };
  const data = await prisma.ship.findMany({
    where: where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Ship_operator: {
        where: {
          status: {
            not: "cancel",
          },
        },
        select: {
          id: true,
          type: true,
          isrental: true,
          nama: true,
          phone: true,
          status: true,
          profile: {
            select: {
              nickname: true,
              phone: true,
            },
          },
        },
      },
      fuel_consumption: {
        select: {
          id: true,
          fuel_usage: true,
          date: true,
          shipId: true,
        },
        orderBy: {
          date: "asc",
        },
      },
    },
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const dataCount = await prisma.ship.count({ where });

  return {
    success: true,
    data: {
      data,
      totalData: dataCount,
      currentPage: page,
      totalPage: Math.ceil(dataCount / perPage),
    },
  };
}

export async function getVesselById({ shipId = "" }: { shipId: string }) {
  const data = await prisma.ship.findUnique({
    where: { id: shipId },
  });

  return {
    success: true,
    data: data,
  };
}

export async function storeVessel(data: z.infer<typeof VesselFormSchema>) {
  try {
    const dozer = await prisma.profile.findMany({
      where: {
        AND: [
          {
            type: {
              contains: "D",
            },
          },
          {
            status: "ready",
          },
        ],
      },
      orderBy: {
        last_work: "asc",
      },
      select: {
        id: true,
        nickname: true,
      },
      take: parseInt(data?.dozer) * 2,
    });

    const loader = await prisma.profile.findMany({
      where: {
        AND: [
          {
            type: {
              contains: "L",
            },
          },
          {
            id: {
              notIn: dozer.map((d) => d.id),
            },
          },
          {
            status: "ready",
          },
        ],
      },
      orderBy: {
        last_work: "asc",
      },
      select: {
        id: true,
        nickname: true,
      },
      take: parseInt(data?.loader) * 2,
    });

    const operator = [
      ...dozer.map((d) => ({
        type: "D",
        profileId: d.id,
        status: "pending",
      })),
      ...loader.map((d) => ({
        type: "L",
        profileId: d.id,
        status: "pending",
      })),
    ];

    const input = await prisma.ship.create({
      data: {
        name: data?.name,
        mechanic: data?.mechanic,
        foreman: data?.foreman,
        pbm: data?.pbm,
        dozer: data?.dozer,
        loader: data?.loader,
        capacity: parseInt(data?.muatan),
        start_date: moment(data?.start_date).format("YYYY-MM-DD HH:mm:ss.000"),
        status: "created",
        loading_point: data?.posisi,
        Ship_operator: {
          create: operator,
        },
      },
      include: {
        Ship_operator: { include: { ship: true } },
      },
    });

    await prisma.profile.updateMany({
      where: {
        id: {
          in: [...dozer.map((d) => d.id), ...loader.map((d) => d.id)],
        },
      },
      data: {
        status: "pending",
      },
    });

    return { success: true, data: input };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function updateVessel(data: z.infer<typeof VesselUpdateSchema>) {
  try {
    const input = await prisma.ship.update({
      where: {
        id: data?.id,
      },
      data: {
        name: data?.name,
        mechanic: data?.mechanic,
        foreman: data?.foreman,
        pbm: data?.pbm,
        dozer: data?.dozer,
        loader: data?.loader,
        capacity: parseInt(data?.muatan),
        start_date: moment(data?.start_date).format("YYYY-MM-DD HH:mm:ss.000"),
        end_date: data?.end_date
          ? moment(data?.end_date).format("YYYY-MM-DD HH:mm:ss.000")
          : "",
        status: "created",
        loading_point: data?.posisi,
      },
    });

    return { success: true, data: input };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function removeVessel(id: string) {
  try {
    const ship = await prisma.ship.findUnique({
      where: {
        id,
      },
      include: {
        Ship_operator: {
          select: {
            id: true,
            isrental: true,
            nama: true,
            phone: true,
            type: true,
            status: true,
            profile: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    await prisma.profile.updateMany({
      where: {
        id: {
          in: ship?.Ship_operator.map((op) => op.profile?.id).filter(
            (id): id is string => id !== undefined
          ),
        },
      },
      data: {
        status: "ready",
      },
    });

    const data = await prisma.ship.delete({
      where: {
        id,
      },
    });

    return { success: true, data: data, message: "Data berhasil dihapus" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function addFuel(data: z.infer<typeof FuelFormSchema>) {
  try {
    const fuel = await prisma.fuel_consumption.create({
      data: {
        fuel_usage: parseInt(data.fuel_usage),
        date: moment(data?.date).toDate(),
        shipId: data.shipId,
      },
    });

    return { success: true, data: fuel, message: "Data berhasil ditambahkan" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getShipOperator(id: string) {
  const data = await prisma.ship.findUnique({
    where: {
      id: id,
    },
    include: {
      Ship_operator: {
        where: {
          AND: [
            {
              status: {
                not: "cancel",
              },
            },
            {
              status: {
                not: "cancel",
              },
            },
            {
              OR: [
                {
                  type: {
                    contains: "D",
                  },
                },
                {
                  type: {
                    contains: "L",
                  },
                },
              ],
            },
          ],
        },
        select: {
          id: true,
          type: true,
          status: true,
          isrental: true,
          nama: true,
          phone: true,
          profile: {
            select: {
              nickname: true,
              phone: true,
            },
          },
        },
      },
    },
  });

  return {
    success: true,
    data,
  };
}

export async function updateStatusOp(id: string, status: string) {
  try {
    const ship = await prisma.ship_operator.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
    const idProfile = ship?.profileId ?? "";
    if (status === "cancel") {
      await prisma.profile.update({
        where: {
          id: idProfile,
        },
        data: {
          status: "ready",
        },
      });
    }

    return { success: true, data: ship, message: "Data berhasil Diupdate" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function addRentOptToShip(data: {
  nama: string;
  phone: string;
  type: string;
  shipId: string;
}) {
  try {
    const fuel = await prisma.ship_operator.create({
      data: {
        isrental: true,
        nama: data.nama,
        phone: data?.phone,
        shipId: data.shipId,
        type: data.type,
      },
    });

    return { success: true, data: fuel, message: "Data berhasil ditambahkan" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function addOptToShip(data: {
  id: string;
  type: string;
  shipId: string;
}) {
  try {
    const fuel = await prisma.ship_operator.create({
      data: {
        isrental: false,
        profileId: data.id,
        shipId: data.shipId,
        type: data.type,
      },
    });

    await prisma.profile.update({
      where: {
        id: data.id,
      },
      data: {
        status: "pending",
      },
    });

    return { success: true, data: fuel, message: "Data berhasil ditambahkan" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getOptReady({ page = 1 }: { page: number }) {
  const where = {
    AND: [
      {
        status: "ready",
      },
      {
        OR: [
          {
            type: {
              contains: "D",
            },
          },
          {
            type: {
              contains: "L",
            },
          },
        ],
      },
    ],
  };
  const data = await prisma.profile.findMany({
    where,
    take: 8,
    skip: (page - 1) * 8,
  });

  const dataCount = await prisma.profile.count({ where });

  return {
    success: true,
    data,
    totalPage: Math.ceil(dataCount / 8),
  };
}

export async function updateStatusShip(id: string, status: string) {
  try {
    const oplist = await prisma.ship_operator.findMany({
      where: {
        shipId: id,
        status: {
          not: "cancel",
        },
        isrental: false,
      },
    });
    const operator = [...oplist.map((op) => op.profileId)].filter(
      (id): id is string => id !== undefined
    );
    const update = await prisma.profile.updateMany({
      where: {
        id: {
          in: operator,
        },
      },
      data: {
        status: status === "done" ? "ready" : status,
      },
    });

    await prisma.ship.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    return { success: true, data: update, message: "Data berhasil Diupdate" };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getOperator({
  page,
  search,
  perPage,
}: {
  page: number;
  search: string;
  perPage: number;
}) {
  const where = {
    AND: [
      {
        OR: [
          {
            fullname: {
              contains: search,
            },
          },
          {
            nickname: {
              contains: search,
            },
          },
        ],
      },
      {
        OR: [
          {
            type: {
              contains: "D",
            },
          },
          {
            type: {
              contains: "L",
            },
          },
        ],
      },
    ],
  };
  const data = await prisma.profile.findMany({
    where,
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const dataCount = await prisma.profile.count({ where });

  return {
    success: true,
    data: {
      data,
      totalData: dataCount,
      currentPage: page,
      totalPage: Math.ceil(dataCount / perPage),
    },
  };
}

export async function getOperatorSearch({
  page,
  search,
  perPage,
  type,
}: {
  page: number;
  search: string;
  perPage: number;
  type: string;
}) {
  const where = {
    AND: [
      {
        OR: [
          {
            fullname: {
              contains: search,
            },
          },
          {
            nickname: {
              contains: search,
            },
          },
        ],
      },
      {
        type: {
          contains: type,
        },
      },
      {
        status: "ready",
      },
    ],
  };
  const data = await prisma.profile.findMany({
    where,
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const dataCount = await prisma.profile.count({ where });

  return {
    success: true,
    data: {
      data,
      totalData: dataCount,
      currentPage: page,
      totalPage: Math.ceil(dataCount / perPage),
    },
  };
}

export async function getVesDash({ page }: { page: number }) {
  const where = {
    OR: [
      {
        status: "created",
      },
      {
        status: "onboard",
      },
    ],
  };
  const data = await prisma.ship.findMany({
    where,
    include: {
      Ship_operator: {
        where: {
          status: {
            not: "cancel",
          },
        },
        select: {
          id: true,
          type: true,
          isrental: true,
          nama: true,
          phone: true,
          status: true,
          profile: {
            select: {
              nickname: true,
              phone: true,
            },
          },
        },
      },
      fuel_consumption: {
        select: {
          id: true,
          fuel_usage: true,
          date: true,
          shipId: true,
        },
        orderBy: {
          date: "asc",
        },
      },
    },
    take: 10,
    skip: (page - 1) * 10,
  });

  const dataCount = await prisma.profile.count({ where });

  return {
    success: true,
    data: data,
    totalData: dataCount,
    currentPage: page,
    totalPage: Math.ceil(dataCount / 10),
  };
}

export async function getDashCount() {
  const shipPreCount = await prisma.ship.count({
    where: { status: "created" },
  });
  const shipBoardCount = await prisma.ship.count({
    where: { status: "onboard" },
  });
  const opStandBy = await prisma.profile.count({
    where: { status: "ready" },
  });
  const opTotal = await prisma.profile.count();
  return {
    success: true,
    onboard: shipBoardCount,
    prepare: shipPreCount,
    opt: opStandBy,
    optTotal: opTotal,
  };
}
