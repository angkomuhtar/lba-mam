"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const Pagination = ({
  currentPage = 1,
  totalPage,
}: {
  currentPage?: number;
  totalPage: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNav = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", value);
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  console.log(currentPage, totalPage);
  return (
    <div className='flex items-center justify-end space-x-2 py-4'>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage === 1}
        onClick={() => handleNav((currentPage - 1).toString())}>
        Previous
      </Button>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage == totalPage || totalPage < 2 ? true : false}
        onClick={() => handleNav((currentPage + 1).toString())}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
