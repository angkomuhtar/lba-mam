import { Metadata } from "next";
import AppBreadcrumb from "@/components/app-breadcrumb";
import VesselForm from "@/components/vessel-form";

export const metadata: Metadata = {
  title: "Tambah Vessel",
  description: "PT Lintas Bahtera Abadi",
};

export default async function Home() {
  return (
    <main>
      <AppBreadcrumb item={["vessel", "tambah"]} />
      <div className='flex flex-1 flex-col gap-4 p-4'>
        <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
          <VesselForm />
        </div>
      </div>
    </main>
  );
}
