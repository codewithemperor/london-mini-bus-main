"use client";

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  content: string;
};

const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full space-y-4 text-sm transition-all duration-200 hover:scale-[1.01] hover:transform md:text-lg">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between space-x-3 rounded-xl bg-white p-4 text-left font-medium ${open ? "shadow-lg" : "shadow-none"}`}
      >
        <span>{title}</span>
        <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-xl text-white">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="rounded-xl bg-white p-4 pb-8 text-sm text-gray-800 sm:text-[15px]">
          {content}
        </div>
      )}
    </div>
  );
};
export default AccordionItem;
