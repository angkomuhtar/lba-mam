import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getVessel } from "@/lib/action/data";
import {
  BadgeAlert,
  BellRing,
  HardHat,
  Loader,
  MoreHorizontal,
} from "lucide-react";
import moment from "moment";
import React from "react";
import Pagination from "@/components/pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteButton from "@/components/delete-button";

const OptTable = async ({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
}) => {
  const {
    data: operator,
    totalData,
    currentPage,
    totalPage,
  } = await getVessel({
    where: {
      AND: [
        {
          name: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {},
    page: page,
    perPage: 20,
  });

  console.log(operator);

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
            <TableHead>Tannggal Selesai</TableHead>
            <TableHead>Hari Kerja</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operator.length > 0 ? (
            operator.map((data) => (
              <TableRow key={data.id} className='hover:bg-gray-100'>
                <TableCell className='font-medium'>{data.name}</TableCell>
                <TableCell>{data.mechanic}</TableCell>
                <TableCell>{data.pbm}</TableCell>
                <TableCell>{data.foreman}</TableCell>
                <TableCell>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant='outline'>{`${data.dozer}D/${data.loader}L`}</Button>
                    </DrawerTrigger>
                    <DrawerTitle></DrawerTitle>
                    <DrawerContent>
                      <div className='mx-auto w-full max-w-4xl grid gap-4 py-4 md:grid-cols-2'>
                        <Card className='self-start'>
                          <CardHeader>
                            <CardTitle>Dozer</CardTitle>
                            <CardDescription>
                              {data.dozer ? parseInt(data.dozer) * 2 : 0}{" "}
                              Operator
                            </CardDescription>
                          </CardHeader>
                          <CardContent className='grid gap-4'>
                            <div>
                              {data.Ship_operator.map((operator, index) => {
                                if (operator.type == "D")
                                  return (
                                    <div
                                      className=' flex items-center space-x-4 p-3'
                                      key={index}>
                                      <HardHat />
                                      <div className='flex-1 space-y-1'>
                                        <p className='text-xs font-medium leading-none'>
                                          {operator.profile.nickname}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                          {` ${operator.profile.phone} - ${
                                            operator.type == "D"
                                              ? "Dozer"
                                              : "Loader"
                                          }`}
                                        </p>
                                      </div>
                                      <div className='flex space-x-2'>
                                        <div className='flex gap-1 items-center p-2 rounded-sm border border-red-500 text-xs font-semibold text-red-500'>
                                          <BadgeAlert size={16} />
                                          <span>{operator.status}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                        <Card className='self-start'>
                          <CardHeader>
                            <CardTitle>Loader</CardTitle>
                            <CardDescription>
                              {data.loader ? parseInt(data.loader) * 2 : 0}{" "}
                              Operator
                            </CardDescription>
                          </CardHeader>
                          <CardContent className='grid gap-4'>
                            <div>
                              {data.Ship_operator.map((operator, index) => {
                                if (operator.type == "L")
                                  return (
                                    <div
                                      className=' flex items-center space-x-4 p-3'
                                      key={index}>
                                      <HardHat />
                                      <div className='flex-1 space-y-1'>
                                        <p className='text-xs font-medium leading-none'>
                                          {operator.profile.nickname}
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                          {` ${operator.profile.phone} - Loader`}
                                        </p>
                                      </div>
                                      <div className='flex space-x-2'>
                                        <div className='flex gap-1 items-center p-2 rounded-sm border border-red-500 text-xs font-semibold text-red-500'>
                                          <BadgeAlert size={16} />
                                          <span>{operator.status}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </DrawerContent>
                  </Drawer>
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
                  {moment(data.end_date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell>1 Hari</TableCell>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
                        <MoreHorizontal />
                        <span className='sr-only'>Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-[160px]'>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Make a copy</DropdownMenuItem>
                      <DropdownMenuItem>Favorite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteButton id={data.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex justify-between items-center border-t border-gray-200 py-4'>
        <p>
          Showing {(currentPage - 1) * 20 + operator.length} of {totalData}{" "}
          results
        </p>
        <Pagination currentPage={currentPage} totalPage={totalPage} />
      </div>
    </>
  );
};

export default OptTable;
