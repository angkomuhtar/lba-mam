"use client";
import { getOptReady } from "@/lib/action/data";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ChevronLeft, ChevronRight, HardHat } from "lucide-react";
import moment from "moment";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const CardOptList = () => {
  const [optPage, setOptPage] = React.useState(1);

  const {
    data: operatorlist,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["optReady"],
    queryFn: () => getOptReady({ page: optPage }),
  });

  return (
    <Card className='py-4 px-0 shadow-md bg-white col-span-2'>
      <CardContent className='grid py-3 gap-3 px-0'>
        <div className='px-4'>
          <h3 className='font-medium text-lg'>List Operator Standby</h3>
          <p className='text-xs text-gray-500 font-thin'>Operator yang siap</p>
        </div>
        <div className='grid gap-4 overflow-y-auto max-h-96 px-4'>
          {isPending ? (
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          ) : operatorlist?.data ? (
            operatorlist?.data?.map((d) => (
              <div
                className='flex justify-between items-center space-x-4'
                key={d.id}>
                <div className='bg-gray-600 text-white rounded-full p-2'>
                  <HardHat />
                </div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-xs uppercase'>
                    {d.nickname}
                  </h3>
                  <p className='text-xs'>
                    {d.phone} - {d.type}
                  </p>
                </div>
                <div>
                  <span className='text-xs font-semibold text-slate-500'>
                    Last Works
                  </span>
                  <h3 className='text-xs'>
                    {moment(d.last_work).format("dddd, DD MMM YYYY")}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <h3>nodata </h3>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex justify-end space-x-4'>
        <Button
          variant='outline'
          onClick={() => {
            if (optPage > 1) {
              setOptPage(optPage - 1);
              setTimeout(() => {
                refetch();
              }, 500);
            }
          }}
          disabled={optPage === 1}>
          <ChevronLeft />
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            if (operatorlist?.totalPage === optPage) return;
            setOptPage(optPage + 1);
            setTimeout(() => {
              refetch();
            }, 500);
          }}
          disabled={operatorlist?.totalPage === optPage}>
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardOptList;
