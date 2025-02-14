"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import moment from "moment";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { getShipOperator } from "@/lib/action/data";
import { fetchShips } from "@/lib/hooks";
import OptList from "./opt-list";
import { useSearchParams } from "next/navigation";

const OptTable = () => {
  const perPage = "20";
  const [shipId, setShipId] = useState("");
  const [optlistmodal, setOptlistModal] = useState(false);
  const searchParam = useSearchParams();
  const page = searchParam.get("page") || "1";
  const search = searchParam.get("query") || "";

  const { data: operator } = useQuery({
    queryKey: ["ships", { page, search, perPage }],
    queryFn: fetchShips,
  });

  const { data: operatorlist, refetch } = useQuery({
    queryKey: ["shipDetail", shipId],
    queryFn: () => getShipOperator(shipId),
  });

  const handleOpenListOpt = (id: string) => {
    // setOptlist(data);
    setShipId(id);
    refetch();
    setOptlistModal(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Vessel</TableHead>
            <TableHead>Mekanik</TableHead>
            <TableHead>PBM</TableHead>
            <TableHead>Foreman</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Muatan</TableHead>
            <TableHead>Posisi</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operator?.data && operator?.data?.length > 0 ? (
            operator.data.map((data) => (
              <TableRow key={data.id} className='hover:bg-gray-100'>
                <TableCell className='font-medium'>{data.name}</TableCell>
                <TableCell>{data.mechanic}</TableCell>
                <TableCell>{data.pbm}</TableCell>
                <TableCell>{data.foreman}</TableCell>
                <TableCell>
                  {/* <OptSelCell data={data} /> */}{" "}
                  <Button
                    variant='outline'
                    onClick={() => handleOpenListOpt(data.id)}>
                    <span className='text-blue-500'>{`${data.dozer}D/${data.loader}L`}</span>
                  </Button>
                </TableCell>
                <TableCell>
                  {data.capacity
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell className='capitalize'>
                  {data.loading_point}
                </TableCell>
                <TableCell>
                  {moment(data.start_date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${
                      data.status === "created"
                        ? "bg-blue-500"
                        : data.status === "onboard"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}>
                    {data.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center border-t border-gray-200 py-4'>
        <p>
          {((operator?.currentPage || 0) - 1) * 20 +
            (operator?.data?.length || 0)}{" "}
          of {operator?.totalData} data
        </p>
        <Pagination
          currentPage={operator?.currentPage || 0}
          totalPage={operator?.totalPage || 0}
        />
      </div>

      <Drawer open={optlistmodal} onOpenChange={setOptlistModal}>
        <DrawerTitle></DrawerTitle>
        <DrawerContent className='max-h-screen'>
          <div className='mx-auto w-full max-w-4xl p-4 overflow-auto'>
            <div className='grid md:grid-cols-3 rounded-lg border border-gray-200 p-4 gap-4'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Nama Vessel
                </span>
                <h1 className='font-bold capitalize text-sm'>
                  {operatorlist?.data?.name}
                </h1>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>PBM</span>
                <h1 className='font-bold capitalize text-sm'>
                  {operatorlist?.data?.pbm}
                </h1>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Posisi Loading
                </span>
                <h1 className='font-bold capitalize text-sm'>
                  {operatorlist?.data?.loading_point}
                </h1>
              </div>
            </div>
            <OptList operator={operatorlist?.data ?? null} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OptTable;
