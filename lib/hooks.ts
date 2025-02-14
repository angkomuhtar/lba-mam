import {
  getOperator,
  getShipOperator,
  getVessel,
  getVesselById,
  removeVessel,
} from "./action/data";

export async function fetchShips({
  queryKey,
}: {
  queryKey: [string, { page: string; search: string; perPage: string }];
}) {
  const [, { page, search, perPage }] = queryKey;
  const res = await getVessel({
    page: parseInt(page),
    perPage: parseInt(perPage),
    search,
  });
  if (!res.success) throw new Error("Gagal mengambil data");
  return res.data;
}

export async function fetchShipsById({
  queryKey,
}: {
  queryKey: [string, { shipId: string }];
}) {
  const [, { shipId }] = queryKey;
  const res = await getVesselById({
    shipId,
  });
  if (!res.success) throw new Error("Gagal mengambil data");
  return res.data;
}

export async function fetchOpt({
  queryKey,
}: {
  queryKey: [string, { page: string; search: string; perPage: string }];
}) {
  const [, { page, search, perPage }] = queryKey;
  const res = await getOperator({
    page: parseInt(page),
    perPage: parseInt(perPage),
    search,
  });
  if (!res.success) throw new Error("Gagal mengambil data");
  return res.data;
}

export async function delVessel(id: string) {
  const res = await removeVessel(id);
  if (!res.success) throw new Error("Gagal menghapus data");
  return res;
}

export async function getShipOpt(id: string) {
  const res = await getShipOperator(id);
  if (!res.success) throw new Error("Gagal mengambil data");
  return res;
}
