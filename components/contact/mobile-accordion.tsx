"use client";

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  content: string;
};

const MobileAccordionItem = ({ title, content }: AccordionItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-5/6 max-w-3xl space-y-3 transition-all duration-200 hover:scale-[1.01]">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl bg-white p-4 text-left text-xs font-medium md:text-base ${
          open ? "shadow-lg" : "shadow"
        }`}
      >
        <span className="pr-4">{title}</span>
        <span className="bg-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="rounded-xl bg-white p-4 text-xs leading-relaxed text-gray-800">
          {content}
        </div>
      )}
    </div>
  );
};
export default MobileAccordionItem;
