"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
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
import Link from "next/link";
import { storeVessel } from "@/lib/action/data";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VesselForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
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
      start_date: "",
      end_date: "",
      posisi: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VesselFormSchema>) => {
    setLoading(true);
    storeVessel(values)
      .then((result) => {
        if (result?.success) {
          toast({
            title: "Success",
            description: "data berhasil disimpan",
          });
        } else {
          toast({
            title: "Error",
            description: "data gagal disimpan",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        router.push("/vessels");
      });
  };

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='flex flex-col items-center gap-2'>
          <CardTitle>Tambah Vessel</CardTitle>
          <CardDescription className='capitalize'>
            tambah data vessel baru
          </CardDescription>
        </div>
        {/* <Button variant='default'>Tambah</Button> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className='grid grid-cols-3 gap-4'>
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
                <div className='flex gap-2'>
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
                    <FormControl></FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          <CalendarIcon />
                          {field.value ? field.value : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(dat) => {
                            field.onChange(moment(dat).format("YYYY-MM-DD"));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                    <FormControl></FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          <CalendarIcon />
                          {field.value ? field.value : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(dat) => {
                            field.onChange(moment(dat).format("YYYY-MM-DD"));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
      </CardContent>
      <CardFooter className='flex justify-end gap-5 border-t border-gray-200 pt-5'>
        <Button variant='outline' asChild>
          <Link href='/vessels'>Cancel</Link>
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
          {`${loading ? "Saving..." : "Simpan"}`}
        </Button>
      </CardFooter>
    </Card>
  );
}
