"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const defaultSearch = searchParams.get("query") || "";

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <Input
      placeholder='Search'
      className='max-w-xs'
      defaultValue={defaultSearch}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default Search;
