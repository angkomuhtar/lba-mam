"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { VesselUpdateSchema } from "@/lib/zod";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateVessel } from "@/lib/action/data";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "./date-timepicker";

export default function VesselFormEdit({
  data,
  open,
  setOpen,
}: {
  data: z.infer<typeof VesselUpdateSchema>;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof VesselUpdateSchema>>({
    resolver: zodResolver(VesselUpdateSchema),
  });

  useEffect(() => {
    form.reset({
      id: data.id,
      name: data.name,
      pbm: data.pbm,
      mechanic: data.mechanic ?? undefined,
      foreman: data.foreman ?? undefined,
      dozer: data.dozer ? data.dozer : "",
      loader: data.loader ? data.loader : "",
      muatan: data.muatan ? data.muatan.toString() : "0",
      start_date: moment(data.start_date).toDate() ?? undefined,
      end_date: !data.end_date ? undefined : moment(data.end_date).toDate(),
      posisi: data.posisi,
    });
  }, [data]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateVessel,
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["ships"] });
        form.reset();
        setOpen(false);
        toast({
          title: "Success",
          description: "data berhasil diupdate",
          duration: 1500,
        });
      } else {
        toast({
          title: "Error",
          description: "terjadi kesalahan",
          variant: "destructive",
          duration: 1500,
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = async (values: z.infer<typeof VesselUpdateSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='bottom' className='overflow-auto'>
        <div className='max-w-4xl mx-auto'>
          <SheetHeader>
            <SheetTitle>Edit Data</SheetTitle>
            <SheetDescription>Edit data vessel</SheetDescription>
          </SheetHeader>
          <div className='py-4 my-2'>
            <Form {...form}>
              <form>
                <div className='grid md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Vessel</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='PT. Lintas Bahtera Abadi'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='muatan'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Muatan</FormLabel>
                        <FormControl>
                          <Input placeholder='30000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='pbm'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PBM</FormLabel>
                        <FormControl>
                          <Input placeholder='penascope' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <div className='grid grid-cols-2 gap-2'>
                      <FormField
                        control={form.control}
                        name='dozer'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl className='flex'>
                              <div className='relative'>
                                <Input placeholder='0' {...field} />
                                <div className='absolute right-0 top-0 h-full bg-gray-200 rounded-e-md flex items-center px-3'>
                                  <span className='font-thin text-xs text-gray-500'>
                                    Dozer
                                  </span>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='loader'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className='relative'>
                                <Input placeholder='0' {...field} />
                                <div className='absolute right-0 top-0 h-full bg-gray-200 rounded-e-md flex items-center px-3'>
                                  <span className='font-thin text-xs text-gray-500'>
                                    Loader
                                  </span>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormItem>
                  <FormField
                    control={form.control}
                    name='start_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Mulai</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value}
                            onChange={(dat) => {
                              field.onChange(dat);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='end_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tanggal Selesai</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value}
                            onChange={(dat) => {
                              field.onChange(dat);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='posisi'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Posisi</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Pick One' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Posisi Pengerjaan</SelectLabel>
                                <SelectItem value='muara jawa'>
                                  Muara Jawa
                                </SelectItem>
                                <SelectItem value='muara berau'>
                                  Muara Berau
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='foreman'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Foreman</FormLabel>
                        <FormControl>
                          <Input placeholder='Nama Foreman' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='mechanic'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Mekanik</FormLabel>
                        <FormControl>
                          <Input placeholder='Nama Mekanik' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div className='flex justify-end gap-5 pt-5'>
                <Button
                  variant='outline'
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={mutation?.isPending}>
                  {`${mutation.isPending ? "Saving..." : "Update"}`}
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
