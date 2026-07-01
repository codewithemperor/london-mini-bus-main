"use client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessDesign = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center space-y-6 py-16 sm:space-y-12">
      <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-[#59D91D] sm:flex sm:h-48 sm:w-48">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4BC910] sm:h-40 sm:w-40">
          <Check size={60} className="text-white" />
        </div>
      </div>

      {/* mobile */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#59D91D] sm:hidden">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4BC910]">
          <Check size={30} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold sm:text-4xl">
          Your Message has been submitted successfully
        </h1>
        <p className="mt-6 w-4/5 text-sm sm:text-lg">
          Thank you for reaching out. We have received your enquiry and will get
          back to you within seconds.
        </p>
      </div>

      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:gap-x-12">
        <button
          className="bg-primary hover:bg-primary-50 hover:text-primary-700 rounded-md px-3 py-2 text-[12px] text-white hover:cursor-pointer sm:px-6 sm:text-[18px]"
          onClick={() => router.push("/")}
        >
          Return to Home
        </button>
        <button
          className="border-primary/60 hover:border-primary text-primary-700 rounded-md border px-3 py-2 text-[12px] hover:cursor-pointer hover:border-2 sm:px-6 sm:text-[18px]"
          onClick={() => router.push("/services")}
        >
          Explore Our Services
        </button>
      </div>
    </section>
  );
};

export default SuccessDesign;
