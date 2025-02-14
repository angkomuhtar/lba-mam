"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FuelFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Fuel } from "lucide-react";
import { Calendar } from "./ui/calendar";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFuel } from "@/lib/action/data";
import { toast } from "@/hooks/use-toast";

const AddFuel = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FuelFormSchema>>({
    resolver: zodResolver(FuelFormSchema),
    defaultValues: {
      shipId: id,
      fuel_usage: "",
      date: "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addFuel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ships"] });
      form.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: "data berhasil disimpan",
      });
    },
  });

  const handleSubmit = (data: z.infer<typeof FuelFormSchema>) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-6 w-6 p-0 data-[state=open]:bg-muted'>
          <Fuel />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Tambah BBM</DialogTitle>
          <DialogDescription>
            Input Pemakaian BBM Harian Vessel
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Form {...form}>
            <FormField
              control={form.control}
              name='shipId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ShipID</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
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
              name='date'
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
                    <PopoverContent className='pointer-events-auto z-[999]'>
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
              name='fuel_usage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BBM</FormLabel>
                  <FormControl>
                    <Input placeholder='100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
        <DialogFooter>
          <Button type='button' onClick={form.handleSubmit(handleSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFuel;
