import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import AppBreadcrumb from "@/components/app-breadcrumb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OptTable from "./table";
import Search from "@/components/search";

export const metadata: Metadata = {
  title: "Vessels",
  description: "PT Lintas Bahtera Abadi",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.query || "";
  return (
    <main>
      <AppBreadcrumb item={["Vessels"]} />
      <div className='flex flex-1 flex-col gap-4 p-4'>
        <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
          <Card className='w-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <div className='flex flex-col items-center gap-2'>
                <CardTitle>List Vessel</CardTitle>
                <CardDescription className='capitalize'>
                  tambah data vessel baru
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex py-4'>
                <Search />
              </div>
              <OptTable page={page} search={search} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
