"use server";

import { z } from "zod";
import { VesselFormSchema } from "../zod";
import { prisma } from "../prisma";

export const vesselAction = async (
  values: z.infer<typeof VesselFormSchema>
) => {
  const dozer = await prisma.profile.findMany({
    where: {
      AND: [
        {
          type: {
            contains: "D",
          },
        },
        { status: "ready" },
      ],
    },
    orderBy: {
      last_work: "desc",
    },
  });
  const ship = await prisma.ship.create({
    data: {
      name: values.name,
      pbm: values.pbm,
      mechanic: values.mechanic,
      foreman: values.foreman,
      dozer: values.dozer,
      loader: values.loader,
      start_date: values.start_date,
      end_date: values.end_date,
      loading_point: values.posisi,
      capacity: parseInt(values.muatan),
      status: "pending",
    },
  });
  console.log("values", ship);
  return ship;
};
