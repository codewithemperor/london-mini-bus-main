"use client";
import VehicleGallery from "@/components/fleet/vehicle-gallery";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Ford1 = () => {
  const router = useRouter();

  return (
    <main className="flex h-fit flex-col space-y-6 p-6 md:space-y-18 md:p-12">
      <button
        className="text-primary-700 flex items-center space-x-2 font-semibold hover:animate-pulse hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} /> <span>Back to Fleet</span>
      </button>

      <VehicleGallery car="ford-1" />
    </main>
  );
};

export default Ford1;
