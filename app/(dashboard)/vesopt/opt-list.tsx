import AddOptDialog from "@/components/add-opt-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  addRentOptToShip,
  updateStatusOp,
  updateStatusShip,
} from "@/lib/action/data";
import { ShipOptRent } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BadgeAlert,
  BadgeCheckIcon,
  CheckCheck,
  CircleDollarSign,
  HardHat,
  MessageCircleCode,
  RefreshCcw,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type OptType = {
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
    id: string;
    isrental: boolean;
    nama: string | null;
    phone: string | null;
    type: string;
    status: string;
    profile: { nickname: string; phone: string | null } | null;
  }[];
} | null;

const OptList = ({ operator }: { operator: OptType }) => {
  const [changeOptRental, setChangeOptRental] = React.useState(false);
  const [changeOpt, setChangeOpt] = React.useState(false);
  const [defaultvalue, setDefaultValue] = React.useState({
    type: "D",
  });
  const QueryClient = useQueryClient();
  const StatusOpMutate = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStatusOp(id, status),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["shipDetail", operator?.id] });
      toast({
        title: "Success",
        description: "data berhasil dihapus",
        duration: 1500,
      });
    },
  });

  const dozer = operator?.Ship_operator.filter(
    (d) => d.type == "D" && d.status !== "cancel"
  );
  const loader = operator?.Ship_operator.filter(
    (d) => d.type == "L" && d.status !== "cancel"
  );

  const dozerCount = dozer?.filter((d) => d.status == "pending").length;
  const loaderCount = loader?.filter((d) => d.status == "pending").length;

  const queryClient = useQueryClient();
  const formRent = useForm<z.infer<typeof ShipOptRent>>({
    resolver: zodResolver(ShipOptRent),
    defaultValues: {
      shipId: (operator?.id as string) ?? "",
      phone: "",
      nama: "",
      type: defaultvalue.type,
    },
  });

  const rentAdd = useMutation({
    mutationFn: addRentOptToShip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipDetail", operator?.id] });
      formRent.reset();
      setChangeOptRental(false);
      toast({
        title: "Success",
        description: "data berhasil disimpan",
        duration: 1500,
      });
    },
  });
  const handleSubmitRent = (data: z.infer<typeof ShipOptRent>) => {
    // console.log("data form", { ...data, shipId: operator?.id });
    const shipId = operator?.id as string;
    rentAdd.mutate({ ...data, shipId: shipId, type: defaultvalue.type });
  };

  const updateSts = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateStatusShip(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ships"] });
      console.log("data", data);
      toast({
        title: "Success",
        description: "data berhasil Di update",
        duration: 1500,
      });
    },
  });

  return (
    <div className='w-full grid gap-4 py-2 md:grid-cols-2'>
      <Card className='self-start'>
        <CardHeader>
          <CardTitle>Dozer</CardTitle>
          <CardDescription>
            {operator?.dozer ? parseInt(operator.dozer) * 2 : 0} Operator
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div>
            {dozer?.map((dataopt, index) => {
              if (dataopt.type == "D")
                return (
                  <div className='flex items-center space-x-4 p-3' key={index}>
                    <HardHat />
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center space-x-2'>
                        <p className='text-xs font-medium leading-none'>
                          {dataopt.isrental
                            ? dataopt.nama
                            : dataopt.profile?.nickname}
                        </p>
                        {dataopt.isrental && (
                          <CircleDollarSign
                            size={14}
                            className='text-red-500'
                          />
                        )}
                        {dataopt.status == "pending" ? (
                          <BadgeAlert size={14} className='text-yellow-500' />
                        ) : (
                          <BadgeCheckIcon size={14} className='text-blue-500' />
                        )}
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {` ${dataopt.profile?.phone ?? dataopt.phone} - ${
                          dataopt.type == "D" ? "Dozer" : "Loader"
                        }`}
                      </p>
                    </div>
                    <div className='flex space-x-1'>
                      {dataopt.status == "pending" && (
                        <button
                          className='rounded-sm p-1 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer'
                          onClick={() => {
                            StatusOpMutate.mutate({
                              id: dataopt.id,
                              status: "ready",
                            });
                          }}>
                          <CheckCheck size={16} />
                        </button>
                      )}
                      <button
                        className='rounded-sm p-1 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'
                        onClick={() => {
                          StatusOpMutate.mutate({
                            id: dataopt.id,
                            status: "cancel",
                          });
                        }}>
                        <RefreshCcw size={16} />
                      </button>
                      <div className='rounded-sm p-1 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>
                        <a
                          href={`https:/wa.me/${(
                            dataopt.profile?.phone ?? dataopt.phone
                          )
                            ?.toString()
                            .replace(/^0/, "62")}`}
                          target='_blank'>
                          <MessageCircleCode size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
            })}
            {(operator?.dozer ? parseInt(operator.dozer) : 0) * 2 >
              (dozer?.length ?? 0) && (
              <div className='w-full grid grid-cols-2 gap-2'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setDefaultValue({ type: "D" });
                    setChangeOpt(true);
                  }}>
                  Tambah Opt MAM
                </Button>
                <Button
                  variant='outline'
                  onClick={() => {
                    setDefaultValue({ type: "D" });
                    setChangeOptRental(true);
                  }}>
                  Tambah Opt Rental
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className='self-start'>
        <CardHeader>
          <CardTitle>Loader</CardTitle>
          <CardDescription>
            {operator?.loader ? parseInt(operator.loader) * 2 : 0} Operator
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div>
            {loader?.map((dataopt, index) => (
              <div className='flex items-center space-x-4 p-3' key={index}>
                <HardHat />
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center space-x-2'>
                    <p className='text-xs font-medium leading-none'>
                      {dataopt.isrental
                        ? dataopt.nama
                        : dataopt.profile?.nickname}
                    </p>
                    {dataopt.isrental && (
                      <CircleDollarSign size={14} className='text-red-500' />
                    )}
                    {dataopt.status == "pending" ? (
                      <BadgeAlert size={14} className='text-yellow-500' />
                    ) : (
                      <BadgeCheckIcon size={14} className='text-blue-500' />
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {` ${dataopt.profile?.phone ?? dataopt.phone} - ${
                      dataopt.type == "D" ? "Dozer" : "Loader"
                    }`}
                  </p>
                </div>
                <div className='flex space-x-1'>
                  {dataopt.status == "pending" && (
                    <button
                      className='rounded-sm p-1 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer'
                      onClick={() => {
                        StatusOpMutate.mutate({
                          id: dataopt.id,
                          status: "ready",
                        });
                      }}>
                      <CheckCheck size={16} />
                    </button>
                  )}
                  <button
                    className='rounded-sm p-1 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'
                    onClick={() => {
                      StatusOpMutate.mutate({
                        id: dataopt.id,
                        status: "cancel",
                      });
                    }}>
                    <RefreshCcw size={16} />
                  </button>
                  <div className='rounded-sm p-1 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer'>
                    <a
                      href={`https:/wa.me/${(
                        dataopt.profile?.phone ?? dataopt.phone
                      )
                        ?.toString()
                        .replace(/^0/, "62")}`}
                      target='_blank'>
                      <MessageCircleCode size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {(operator?.loader ? parseInt(operator.loader) : 0) * 2 >
              (loader?.length ?? 0) && (
              <div className='w-full grid grid-cols-2 gap-2'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setDefaultValue({ type: "L" });
                    setChangeOpt(true);
                  }}>
                  Tambah Opt MAM
                </Button>
                <Button
                  variant='outline'
                  onClick={() => {
                    setDefaultValue({ type: "L" });
                    setChangeOptRental(true);
                  }}>
                  Tambah Opt Rental
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {dozerCount == 0 && loaderCount == 0 && operator?.status == "created" && (
        <div className='md:col-span-2 flex justify-end'>
          <Button
            variant='default'
            onClick={() =>
              operator &&
              updateSts.mutate({ id: operator.id, status: "onboard" })
            }
            className='bg-blue-500'>
            Set to ready
          </Button>
        </div>
      )}

      <Dialog open={changeOptRental} onOpenChange={setChangeOptRental}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Tambah Operator Rental</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Form {...formRent}>
              <FormField
                control={formRent.control}
                name='nama'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Operator</FormLabel>
                    <FormControl>
                      <Input placeholder='Jhon Wick' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formRent.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Operator</FormLabel>
                    <FormControl>
                      <Input placeholder='Jhon Wick' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={formRent.handleSubmit(handleSubmitRent)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddOptDialog
        open={changeOpt}
        setOpen={setChangeOpt}
        type={defaultvalue.type}
        shipId={operator?.id as string}
      />
    </div>
  );
};

export default OptList;
