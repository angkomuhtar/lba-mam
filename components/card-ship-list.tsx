"use client";
import { getVesDash } from "@/lib/action/data";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ChevronLeft, ChevronRight, Ship } from "lucide-react";
import moment from "moment-timezone";
import { Button } from "./ui/button";
import { FuelCell, OptCell } from "./cells";

const CardShipList = () => {
  const [shipPage, setOptPage] = React.useState(1);
  const { data: ship, refetch: refetchShip } = useQuery({
    queryKey: ["shipDash"],
    queryFn: () => getVesDash({ page: shipPage }),
  });
  moment.tz.setDefault("Asia/Makassar");
  moment.locale("id");

  return (
    <Card className='py-4 px-0 shadow-md bg-white col-span-3'>
      <CardContent className='grid py-3 gap-3 px-0'>
        <div className='px-4'>
          <h3 className='font-medium text-lg'>List Vessel</h3>
          <p className='text-xs text-gray-500 font-thin'>
            Vessel onboard dan preparing
          </p>
        </div>
        <div className='grid gap-4 overflow-y-auto max-h-96 px-4'>
          {ship?.data?.length ? (
            ship?.data?.map((d) => (
              <div
                className='flex justify-between items-center space-x-4'
                key={d.id}>
                <div className='bg-gray-600 text-white rounded-full p-2'>
                  <Ship />
                </div>
                <div className='flex-1 text-nowrap'>
                  <h3 className='font-semibold text-xs uppercase text-nowrap'>
                    {d.name}
                  </h3>
                  <p className='text-xs'>
                    {d.capacity} - {d.pbm}
                  </p>
                </div>
                <span
                  className={`py-0.5 px-2 rounded-md ${
                    d.status == "created" ? "bg-blue-500" : "bg-yellow-500"
                  }  text-white text-xs`}>
                  {d.status}
                </span>
                <FuelCell data={d} editable={false} />
                <OptCell data={d} />
                <div>
                  <span className='text-xs font-semibold text-slate-500'>
                    Tanggal Mulai
                  </span>
                  <h3 className='text-xs text-nowrap'>
                    {moment(d.start_date)
                      .locale("id")
                      .tz("Asia/Makassar")
                      .format("dddd, DD MMM YYYY")}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <h3 className='text-center'>Belum Ada Data Vessel saat ini </h3>
          )}
        </div>
      </CardContent>
      {ship?.data?.length ? (
        <CardFooter className='flex justify-end space-x-4'>
          <Button
            variant='outline'
            onClick={() => {
              setOptPage(shipPage - 1);
              refetchShip();
            }}
            disabled={shipPage === 1}>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setOptPage(shipPage + 1);
              refetchShip();
            }}
            disabled={(ship?.totalPage ?? 0) <= shipPage}>
            <ChevronRight />
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default CardShipList;
