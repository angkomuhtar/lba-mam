"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Anchor, HardHat, Ship } from "lucide-react";
import { getDashCount } from "@/lib/action/data";
import { useQuery } from "@tanstack/react-query";

const CardCount = () => {
  const { data: count } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashCount,
  });
  return (
    <>
      <Card className='py-4 px-3 shadow-md bg-white'>
        <CardContent className='grid py-3 px-2 gap-3'>
          <div className='text-white bg-green-500 rounded-lg p-4 justify-self-start'>
            <Ship size={32} />
          </div>
          <div>
            <h3 className='font-medium text-lg'>Vessel On Board</h3>
            <p className='text-xs text-gray-500 font-thin'>
              Data Vessel yang Bekerja
            </p>
          </div>
          <div className='flex items-center gap-10'>
            <h3 className='text-3xl font-bold'>
              {count?.onboard}{" "}
              <span className='font-medium text-sm text-slate-500'>
                Motor Vessels
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
      <Card className='py-4 px-3 shadow-md bg-white'>
        <CardContent className='grid py-3 px-2 gap-3'>
          <div className='text-white bg-yellow-500 rounded-lg p-4 justify-self-start'>
            <Anchor size={32} />
          </div>
          <div>
            <h3 className='font-medium text-lg'>Vessel Preparing</h3>
            <p className='text-xs text-gray-500 font-thin'>
              Data Vessel yang Bersiap
            </p>
          </div>
          <div className='flex items-center gap-10'>
            <h3 className='text-3xl font-bold'>
              {count?.prepare}{" "}
              <span className='font-medium text-sm text-slate-500'>
                Motor Vessels
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
      <Card className='py-4 px-3 shadow-md bg-white'>
        <CardContent className='grid py-3 px-2 gap-3'>
          <div className='text-white bg-yellow-500 rounded-lg p-4 justify-self-start'>
            <HardHat size={32} />
          </div>
          <div>
            <h3 className='font-medium text-lg'>Operator Standby</h3>
            <p className='text-xs text-gray-500 font-thin'>
              Operator yang siap
            </p>
          </div>
          <div className='flex items-center gap-10'>
            <h3 className='text-3xl font-bold'>
              {count?.opt}{" "}
              <span className='font-medium text-sm text-slate-500'>
                / {count?.optTotal} Operator
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardCount;
