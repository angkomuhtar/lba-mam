import AppBreadcrumb from "@/components/app-breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import OptTable from "./table";
import Search from "@/components/search";
export const metadata: Metadata = {
  title: "Operator",
  description: "PT. Lintas Bahtera Abadi",
};

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.query || "";
  return (
    <main>
      <AppBreadcrumb item={[]} />
      <div className='flex flex-1 flex-col gap-4 p-4'>
        <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
          <Card className='w-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
              <div className='flex flex-col items-center gap-2'>
                <CardTitle>List Operator</CardTitle>
                <CardDescription className='capitalize'>
                  tambah data vessel baru
                </CardDescription>
              </div>
              {/* <Button variant='default'>Tambah</Button> */}
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
};

export default Page;
