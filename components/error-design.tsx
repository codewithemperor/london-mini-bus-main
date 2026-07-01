"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorDesign = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center space-y-6 py-16 sm:space-y-12">
      {/* desktop */}
      <div className="bg-secondary hidden h-24 w-24 items-center justify-center rounded-full sm:flex sm:h-48 sm:w-48">
        <div className="bg-secondary-600 flex h-20 w-20 items-center justify-center rounded-full sm:h-40 sm:w-40">
          <X size={60} className="text-white" />
        </div>
      </div>

      {/* mobile */}
      <div className="bg-secondary flex h-24 w-24 items-center justify-center rounded-full sm:hidden">
        <div className="bg-secondary-600 flex h-20 w-20 items-center justify-center rounded-full">
          <X size={30} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-6 w-4/5 text-sm sm:text-lg">
          We couldn’t submit your message at the moment. Please try again or
          come back later.
        </p>
      </div>

      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:gap-x-12">
        <button
          className="bg-secondary hover:bg-secondary-600 rounded-md px-3 py-2 text-[12px] text-white hover:cursor-pointer sm:px-6 sm:text-[18px]"
          onClick={() => router.back()}
        >
          Try Again
        </button>

        <button
          className="text-secondary-600 border-secondary/50 rounded-md border px-3 py-2 text-[12px] hover:cursor-pointer hover:border-2 sm:px-6 sm:text-[18px]"
          onClick={() => router.push("/")}
        >
          Return to Home
        </button>
      </div>
    </section>
  );
};

export default ErrorDesign;
