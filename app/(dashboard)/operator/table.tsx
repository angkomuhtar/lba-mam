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
import { findMany } from "@/lib/action/data";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import React from "react";
import Pagination from "@/components/pagination";

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
  } = await findMany({
    where: {
      AND: [
        {
          fullname: {
            contains: search,
          },
        },
        {
          OR: [
            {
              type: {
                contains: "L",
              },
            },
            {
              type: {
                contains: "D",
              },
            },
          ],
        },
      ],
    },
    orderBy: {},
    page: page,
    perPage: 20,
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Nick Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>last work</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operator.length > 0 ? (
            operator.map((data) => (
              <TableRow key={data.id} className='hover:bg-gray-100'>
                <TableCell className='font-medium'>{data.fullname}</TableCell>
                <TableCell>{data.nickname}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.type}</TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${
                      data.status === "ready"
                        ? "bg-blue-500"
                        : data.status === "onboard"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}>
                    {data.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {moment(data.last_work).format("DD MMM YYYY")}
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
                      <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className='h-24 text-center'>
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
