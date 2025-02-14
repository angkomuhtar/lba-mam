import { Metadata } from "next";
import AppBreadcrumb from "@/components/app-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OptTable from "./table";
import Search from "@/components/search";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vessels",
  description: "PT Lintas Bahtera Abadi",
};

export default async function Home() {
  return (
    <main>
      <AppBreadcrumb item={["Vessels"]} />
      <div className='w-full grid grid-cols-1 gap-4 p-4'>
        <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
          <Card className='w-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <div className='flex flex-col items-center'>
                <CardTitle>List Vessel</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex py-4'>
                <Suspense fallback={<div>Loading search...</div>}>
                  <Search />
                </Suspense>
              </div>
              <Suspense fallback={<div>Loading Table...</div>}>
                <OptTable />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
