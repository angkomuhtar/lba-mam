"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle, Pencil, Trash } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { delVessel, fetchShips } from "@/lib/hooks";
import { FuelCell, OptCell } from "../../../components/cells";
import AddFuel from "@/components/add-fuel";
import { useSearchParams } from "next/navigation";
import VesselFormEdit from "@/components/vessel-form-edit";
import { updateStatusShip } from "@/lib/action/data";

type vessel = {
  id: string;
  name: string;
  start_date: Date | undefined;
  pbm: string;
  foreman: string;
  mechanic: string;
  loader: string;
  dozer: string;
  muatan: string;
  posisi: string;
  end_date: Date | undefined;
};

const OptTable = () => {
  const searchParams = useSearchParams();
  const perPage = "20";
  const QueryClient = useQueryClient();
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("query") || "";
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<
    Omit<vessel, "start_date" | "end_date"> & {
      start_date: Date;
      end_date?: Date;
    }
  >({
    id: "",
    name: "",
    start_date: new Date(),
    pbm: "",
    foreman: "",
    mechanic: "",
    loader: "",
    dozer: "",
    muatan: "",
    posisi: "",
    end_date: undefined,
  });

  const { data: operator } = useQuery({
    queryKey: ["ships", { page, search, perPage }],
    queryFn: fetchShips,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: delVessel,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["ships"] });
      toast({
        title: "Success",
        description: "data berhasil dihapus",
      });
    },
  });

  const updateSts = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStatusShip(id, status),
    onSuccess: (data) => {
      console.log(data);

      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["ships"] });
        toast({
          title: "Success",
          description: "data berhasil Di update",
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "terjadi kesalahan saat update data",
        });
      }
    },
  });
  const handleEdit = (data: vessel) => {
    setDataEdit({
      id: data.id,
      name: data.name,
      start_date: data.start_date || new Date(),
      pbm: data.pbm,
      foreman: data.foreman ?? "",
      mechanic: data.mechanic ?? "",
      loader: data.loader ?? "",
      dozer: data.dozer ?? "",
      muatan: data.muatan ?? "",
      posisi: data.posisi,
      end_date: data.end_date,
    });
    setOpen(true);
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
            <TableHead>Tanggal Selesai</TableHead>
            <TableHead>Hari Kerja</TableHead>
            <TableHead>BBM</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operator?.data && operator?.data?.length > 0 ? (
            operator.data.map((data) => (
              <TableRow key={data.id} className='hover:bg-gray-100'>
                <TableCell className='font-medium text-nowrap'>
                  {data.name}
                </TableCell>
                <TableCell>{data.mechanic}</TableCell>
                <TableCell>{data.pbm}</TableCell>
                <TableCell>{data.foreman}</TableCell>
                <TableCell>
                  <OptCell data={data} />
                </TableCell>
                <TableCell>
                  {data.capacity
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
                <TableCell className='capitalize text-nowrap'>
                  {data.loading_point}
                </TableCell>
                <TableCell className='text-center text-nowrap'>
                  {moment(data.start_date, "YYYY/MM/DD HH:mm:ss").format(
                    "DD MMM YYYY HH:mm"
                  )}
                </TableCell>
                <TableCell className='text-center text-nowrap'>
                  {data.end_date
                    ? moment(data.end_date, "YYYY/MM/DD HH:mm:ss").format(
                        "DD MMM YYYY HH:mm"
                      )
                    : "-"}
                </TableCell>
                <TableCell className='text-center text-nowrap'>
                  1 Hari
                </TableCell>
                <TableCell>
                  <FuelCell data={data} editable={false} />
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
                <TableCell className='text-right'>
                  <div className='flex justify-end items-center gap-2'>
                    <Button
                      variant='ghost'
                      className='flex h-6 w-6 p-0 data-[state=open]:bg-muted'
                      onClick={() => {
                        const edit = {
                          id: data.id,
                          name: data.name,
                          start_date: moment(
                            data.start_date,
                            "YYYY-MM-DD HH:mm:ss"
                          ).toDate(),
                          pbm: data.pbm,
                          foreman: data.foreman ?? "",
                          mechanic: data.mechanic ?? "",
                          loader: data.loader?.toString() ?? "",
                          dozer: data.dozer?.toString() ?? "",
                          muatan: data.capacity?.toString() ?? "",
                          posisi: data.loading_point,
                          end_date: data.end_date
                            ? moment(
                                data.end_date,
                                "YYYY-MM-DD HH:mm:ss"
                              ).toDate()
                            : undefined,
                        };
                        handleEdit(edit);
                      }}>
                      <Pencil />
                    </Button>
                    <AddFuel id={data.id} />
                    <Button
                      onClick={() =>
                        updateSts.mutate({ id: data.id, status: "done" })
                      }
                      variant='default'
                      className='flex h-6 w-6 p-0 data-[state=open]:bg-muted bg-blue-500'>
                      <CheckCircle />
                    </Button>
                    <Button
                      onClick={() => deleteMutation.mutate(data.id)}
                      variant='destructive'
                      className='flex h-6 w-6 p-0 data-[state=open]:bg-muted'>
                      <Trash />
                    </Button>
                  </div>
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

      <VesselFormEdit data={dataEdit} open={open} setOpen={setOpen} />
    </>
  );
};

export default OptTable;
