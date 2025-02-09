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
              <Button variant='default' asChild>
                <Link href='vessels/tambah'>Tambah Data</Link>
              </Button>
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

    // <div className='flex flex-col min-h-screen'>
    //   <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
    //     <div className='flex items-center gap-2 px-4'>
    //       <SidebarTrigger className='-ml-1' />
    //       <Separator orientation='vertical' className='mr-2 h-4' />
    //       <Breadcrumb>
    //         <BreadcrumbList>
    //           <BreadcrumbItem className='hidden md:block'>
    //             <BreadcrumbLink href='/'>Home</BreadcrumbLink>
    //           </BreadcrumbItem>
    //           <BreadcrumbSeparator className='hidden md:block' />
    //           <BreadcrumbItem>
    //             <BreadcrumbPage>Data Fetching</BreadcrumbPage>
    //           </BreadcrumbItem>
    //         </BreadcrumbList>
    //       </Breadcrumb>
    //     </div>
    //   </header>
    //   <main className='container mx-auto py-5 px-6'>
    //     <div className='w-full'>

    //     </div>
    //   </main>
    //   <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
    //     <a
    //       className='flex items-center gap-2 hover:underline hover:underline-offset-4'
    //       href='https://mitraabadimahakam.id'
    //       target='_blank'
    //       rel='noopener noreferrer'>
    //       <Image
    //         aria-hidden
    //         src='/globe.svg'
    //         alt='Globe icon'
    //         width={16}
    //         height={16}
    //       />
    //       Go to mitraabadimahakam.id →
    //     </a>
    //   </footer>
    // </div>
  );
}
