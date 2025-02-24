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
import { VesselFormSchema } from "@/lib/zod";
import { useToast } from "@/hooks/use-toast";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import { storeVessel } from "@/lib/action/data";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "./date-timepicker";

const addShip = async (data: z.infer<typeof VesselFormSchema>) => {
  try {
    const response = await storeVessel(data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default function VesselForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof VesselFormSchema>>({
    resolver: zodResolver(VesselFormSchema),
    defaultValues: {
      name: "",
      mechanic: "",
      pbm: "",
      foreman: "",
      dozer: "",
      loader: "",
      muatan: "",
      start_date: undefined,
      end_date: undefined,
      posisi: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addShip,
    onSuccess: (res) => {
      // console.log(res);
      if (res?.success) {
        queryClient.invalidateQueries({ queryKey: ["ships"] });
        form.reset();
        setOpen(false);
        toast({
          title: "Success",
          description: "data berhasil disimpan",
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
  });

  const onSubmit = async (values: z.infer<typeof VesselFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline'>Tambah Data</Button>
      </SheetTrigger>
      <SheetContent side='bottom' className='overflow-auto'>
        <div className='max-w-4xl mx-auto'>
          <SheetHeader>
            <SheetTitle>Tambah Data</SheetTitle>
            <SheetDescription>Tambah data vessel baru</SheetDescription>
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
                  {`${mutation.isPending ? "Saving..." : "Simpan"}`}
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
    // <Card className='w-full'>
    //   <CardHeader className='flex flex-row justify-between items-center'>
    //     <div className='flex flex-col items-center gap-2'>
    //       <CardTitle>Tambah Vessel</CardTitle>
    //       <CardDescription className='capitalize'>
    //         tambah data vessel baru
    //       </CardDescription>
    //     </div>
    //     {/* <Button variant='default'>Tambah</Button> */}
    //   </CardHeader>
    //   <CardContent>

    //   </CardContent>
    //   <CardFooter className='flex justify-end gap-5 border-t border-gray-200 pt-5'>
    //     <Button variant='outline' asChild>
    //       <Link href='/vessels'>Cancel</Link>
    //     </Button>
    //     <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
    //       {`${loading ? "Saving..." : "Simpan"}`}
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
