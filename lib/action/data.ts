"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { VesselFormSchema } from "../zod";
import moment from "moment";
export async function findMany({
  where = {},
  orderBy = {},
  page = 1,
  perPage = 10,
}: {
  where: object;
  orderBy: object;
  page: number;
  perPage: number;
}) {
  const data = await prisma.profile.findMany({
    where: where,
    orderBy,
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const dataCount = await prisma.profile.count({ where });

  return {
    data,
    totalData: dataCount,
    currentPage: page,
    totalPage: Math.ceil(dataCount / perPage),
  };
}

export async function getVessel({
  where = {},
  orderBy = {},
  page = 1,
  perPage = 10,
}: {
  where: object;
  orderBy: object;
  page: number;
  perPage: number;
}) {
  const data = await prisma.ship.findMany({
    where: where,
    orderBy,
    include: {
      Ship_operator: {
        select: {
          id: true,
          type: true,
          status: true,
          profile: {
            select: {
              nickname: true,
              phone: true,
            },
          },
        },
      },
    },
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const dataCount = await prisma.ship.count({ where });

  return {
    data,
    totalData: dataCount,
    currentPage: page,
    totalPage: Math.ceil(dataCount / perPage),
  };
}

export async function storeVessel(data: z.infer<typeof VesselFormSchema>) {
  try {
    z;
    console.log(data);
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
        start_date: moment(data?.start_date).toDate(),
        end_date: moment(data?.end_date).toDate(),
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

    const update = await prisma.profile.updateMany({
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
          in: ship?.Ship_operator.map((op) => op.profile.id),
        },
      },
      data: {
        status: "ready",
      },
    });

    await prisma.ship_operator.deleteMany({
      where: {
        shipId: id,
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
