import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOptToShip, getOperatorSearch } from "@/lib/action/data";
import { toast } from "@/hooks/use-toast";

const AddOptDialog = ({
  open,
  setOpen,
  type,
  shipId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  shipId: string;
}) => {
  const [search, setSearch] = React.useState("");
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value.length > 2) {
      setSearch(value);
    } else if (value.length == 0) {
      setSearch("");
    }
  }, 1000);

  const queryClient = useQueryClient();
  const optAdd = useMutation({
    mutationFn: addOptToShip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipDetail", shipId] });
      queryClient.invalidateQueries({
        queryKey: ["optlistmam", { search, type }],
      });
      toast({
        title: "Success",
        description: "data berhasil disimpan",
        duration: 1500,
      });
    },
  });

  const fetchOpt = async () => {
    const res = await getOperatorSearch({ page: 1, perPage: 5, search, type });
    if (!res.success) throw new Error("Gagal mengambil data");
    return res.data;
  };

  const { data: operator } = useQuery({
    queryKey: ["optlistmam", { search, type }],
    queryFn: fetchOpt,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Tambah Operator MAM</DialogTitle>
          <DialogDescription>
            {type == "D" ? "Operator Dozer" : "Operator Loader"}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div>
            <Input
              placeholder='Search'
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <p className='text-xs font-thin my-2'>
              Type min 3 char to start search
            </p>
            {operator?.data?.map((data, index) => (
              <button
                onClick={() => optAdd.mutate({ id: data.id, shipId, type })}
                key={index}
                className='w-full px-2 py-1 hover:bg-gray-100 rounded-md mb-2'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                  <h3 className='text-sm'>{`${data.fullname} (${data.nickname})`}</h3>
                  <p className='text-xs'>
                    {data.phone} - ({data.type})
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOptDialog;
