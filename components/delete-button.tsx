"use client";
import React from "react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { removeVessel } from "@/lib/action/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const response = await removeVessel(id);
      console.log(response);
      if (response.success) {
        toast({
          title: "Success",
          description: "data berhasil dihapus",
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenuItem asChild>
      <Dialog>
        <DialogTrigger className='w-full flex items-center p-2 '>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Batal
              </Button>
            </DialogClose>
            <Button
              type='button'
              onClick={() => handleDelete(id)}
              variant='destructive'>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};

export default DeleteButton;
