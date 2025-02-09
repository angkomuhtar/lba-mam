import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

const AppBreadcrumb = ({ item = [] }: { item: string[] }) => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
      <div className='flex items-center gap-2 px-3'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink asChild>
                <Link href='/'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {item?.length > 0 &&
              item?.map((d) => (
                <div key={d} className='flex items-center gap-2 justify-center'>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage className='capitalize'>{d}</BreadcrumbPage>
                  </BreadcrumbItem>
                </div>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AppBreadcrumb;
