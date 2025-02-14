import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  BadgeAlert,
  CheckCheck,
  Fuel,
  HardHat,
  MessageCircleCode,
  RefreshCcw,
} from "lucide-react";
import moment from "moment";
import React from "react";

export interface Data {
  id: string;
  name: string;
  start_date: string;
  end_date: string | null;
  capacity: number;
  loading_point: string;
  pbm: string;
  foreman: string | null;
  mechanic: string | null;
  loader: string | null;
  dozer: string | null;
  status: string;
  Ship_operator: {
    isrental: boolean;
    nama: string | null;
    phone: string | null;
    id: string;
    type: string;
    status: string;
    profile: { nickname: string; phone: string | null } | null;
  }[];
  fuel_consumption: {
    id: string;
    fuel_usage: number;
    date: Date;
    shipId: string;
  }[];
}

export const OptCell = ({ data }: { data: Data }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>{`${data.dozer}D/${data.loader}L`}</Button>
      </DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent className='max-h-screen'>
        <div className='mx-auto w-full max-w-4xl overflow-y-auto p-2'>
          <div className='grid md:grid-cols-3 rounded-lg border border-gray-200 p-4 gap-2'>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Nama Vessel
              </span>
              <h1 className='font-bold capitalize text-sm'>{data.name}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>PBM</span>
              <h1 className='font-bold capitalize text-sm'>{data.pbm}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Posisi Loading
              </span>
              <h1 className='font-bold capitalize text-sm'>
                {data.loading_point}
              </h1>
            </div>
          </div>
          <div className='w-full grid gap-4 py-2 md:grid-cols-2'>
            <Card className='self-start'>
              <CardHeader>
                <CardTitle>Dozer</CardTitle>
                <CardDescription>
                  {data.dozer ? parseInt(data.dozer) * 2 : 0} Operator
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
                            <div className='flex items-center space-x-2'>
                              <p className='text-xs font-medium leading-none'>
                                {operator.profile?.nickname ?? operator?.nama}
                              </p>
                              {operator.isrental && (
                                <span className='text-white px-2 py-0.5 font-semibold bg-red-400 text-[8px] rounded-md'>
                                  Rental
                                </span>
                              )}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {` ${
                                operator.profile?.phone ?? operator?.phone
                              } - ${operator.type == "D" ? "Dozer" : "Loader"}`}
                            </p>
                          </div>
                          <div className='flex space-x-2'>
                            <div
                              className={`flex gap-1 items-center p-2 rounded-sm border ${
                                operator.status == "pending"
                                  ? "border-red-500 text-red-500"
                                  : "border-blue-500 text-blue-500"
                              } text-xs font-semibold `}>
                              {operator.status === "pending" ? (
                                <BadgeAlert size={16} />
                              ) : (
                                <CheckCheck size={16} />
                              )}
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
                  {data.loader ? parseInt(data.loader) * 2 : 0} Operator
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
                            <div className='flex items-center space-x-2'>
                              <p className='text-xs font-medium leading-none'>
                                {operator.profile?.nickname ?? operator?.nama}
                              </p>
                              {operator.isrental && (
                                <span className='text-white px-2 py-0.5 font-semibold bg-red-400 text-[8px] rounded-md'>
                                  Rental
                                </span>
                              )}
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {` ${
                                operator.profile?.phone ?? operator?.phone
                              } - Loader`}
                            </p>
                          </div>
                          <div className='flex space-x-2'>
                            <div
                              className={`flex gap-1 items-center p-2 rounded-sm border ${
                                operator.status == "pending"
                                  ? "border-red-500 text-red-500"
                                  : "border-blue-500 text-blue-500"
                              } text-xs font-semibold `}>
                              {operator.status === "pending" ? (
                                <BadgeAlert size={16} />
                              ) : (
                                <CheckCheck size={16} />
                              )}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const FuelCell = ({
  data,
  editable = false,
}: {
  data: Data;
  editable: boolean;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>{`${data.fuel_consumption.reduce(
          (sum, d) => sum + d.fuel_usage,
          0
        )} L`}</Button>
      </DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent>
        <div className='mx-auto w-full max-w-xl'>
          <div className='grid md:grid-cols-3 rounded-lg border border-gray-200 p-4 gap-4 m-2'>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Nama Vessel
              </span>
              <h1 className='font-bold capitalize text-sm'>{data.name}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>PBM</span>
              <h1 className='font-bold capitalize text-sm'>{data.pbm}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Posisi Loading
              </span>
              <h1 className='font-bold capitalize text-sm'>
                {data.loading_point}
              </h1>
            </div>
          </div>
          <div className='w-full grid gap-4 py-2 px-2'>
            <Card className='self-start'>
              <CardContent className=''>
                {data.fuel_consumption.length <= 0 ? (
                  <div className='h-full w-full flex items-center justify-center pt-4'>
                    <h2 className='text-sm font-semibold'>Tidak ada data</h2>{" "}
                  </div>
                ) : (
                  <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-4'>
                    {data.fuel_consumption.map((fuel, index) => {
                      return (
                        <div
                          className=' flex items-center space-x-4 p-3'
                          key={index}>
                          <Fuel />
                          <div className='flex-1 space-y-1'>
                            <p className='text-xs font-medium leading-none'>
                              {fuel.fuel_usage} L
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {moment(fuel.date).format("DD MMM YYYY")}
                            </p>
                          </div>
                          {editable && <></>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const OptSelCell = ({ data }: { data: Data }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline'>{`${data.dozer}D/${data.loader}L`}</Button>
      </DrawerTrigger>
      <DrawerTitle></DrawerTitle>
      <DrawerContent>
        <div className='mx-auto w-full max-w-4xl'>
          <div className='grid md:grid-cols-3 rounded-lg border border-gray-200 p-4 gap-4'>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Nama Vessel
              </span>
              <h1 className='font-bold capitalize text-sm'>{data.name}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>PBM</span>
              <h1 className='font-bold capitalize text-sm'>{data.pbm}</h1>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Posisi Loading
              </span>
              <h1 className='font-bold capitalize text-sm'>
                {data.loading_point}
              </h1>
            </div>
          </div>
          <div className='w-full grid gap-4 py-2 md:grid-cols-2'>
            <Card className='self-start'>
              <CardHeader>
                <CardTitle>Dozer</CardTitle>
                <CardDescription>
                  {data.dozer ? parseInt(data.dozer) * 2 : 0} Operator
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div>
                  {data.Ship_operator.map((operator, index) => {
                    if (operator.type == "D")
                      return (
                        <div
                          className='flex items-center space-x-4 p-3'
                          key={index}>
                          <HardHat />
                          <div className='flex-1 space-y-1'>
                            <div className='flex items-center space-x-2'>
                              <p className='text-xs font-medium leading-none'>
                                {operator.profile?.nickname ?? operator?.nama}
                              </p>
                              <BadgeAlert size={14} className='text-red-500' />
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {` ${
                                operator.profile?.phone ?? operator?.phone
                              } - ${operator.type == "D" ? "Dozer" : "Loader"}`}
                            </p>
                          </div>
                          <div className='flex space-x-1'>
                            <div className='rounded-sm p-1 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
                              <RefreshCcw size={12} />
                            </div>
                            <div className='rounded-sm p-1 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'>
                              <MessageCircleCode size={12} />
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
                  {data.loader ? parseInt(data.loader) * 2 : 0} Operator
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
                              {operator.profile?.nickname ?? operator?.nama}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {` ${
                                operator.profile?.phone ?? operator?.phone
                              } - Loader`}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};
