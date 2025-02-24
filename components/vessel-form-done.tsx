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
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateStatusShip } from "@/lib/action/data";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTimePicker } from "./date-timepicker";

const VesselSchema = z.object({
  end_date: z.date({ required_error: "Start date is required" }),
  id: z.string({ required_error: "Id Not Found" }),
});

export default function VesselFormDone({
  data,
  open,
  setOpen,
}: {
  data: z.infer<typeof VesselSchema>;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof VesselSchema>>({
    resolver: zodResolver(VesselSchema),
  });

  useEffect(() => {
    form.reset({
      id: data.id,
      end_date: data.end_date,
    });
  }, [data]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      id,
      status,
      end_date,
    }: {
      id: string;
      status: string;
      end_date: Date;
    }) => updateStatusShip(id, status, end_date),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["ships"] });
        setOpen(false);
        toast({
          title: "Success",
          description: "data berhasil Di update",
          duration: 1500,
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "terjadi kesalahan saat update data",
          duration: 1500,
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof VesselSchema>) => {
    mutation.mutate({
      id: values.id,
      status: "done",
      end_date: values.end_date,
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='bottom' className='overflow-auto'>
        <div className='max-w-4xl mx-auto'>
          <SheetHeader>
            <SheetTitle>Vesesel Done</SheetTitle>
            <SheetDescription>Update Status Vessel to Done</SheetDescription>
          </SheetHeader>
          <div className='py-4 my-2'>
            <Form {...form}>
              <form>
                <div className='grid md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>shipID</FormLabel>
                        <FormControl>
                          <Input placeholder='Ship ID' {...field} readOnly />
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
