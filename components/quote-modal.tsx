"use client";
import { QuoteFormState } from "@/types/form";
import { Mail } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sendEmail: () => void;
  fullData: QuoteFormState;
  setFullData: React.Dispatch<React.SetStateAction<QuoteFormState>>;
};

function QuoteModal({
  isOpen,
  onClose,
  sendEmail,
  fullData,
  setFullData,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-white/50 lg:bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <form className="relative z-10 flex w-5/6 max-w-md flex-col rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-lg font-semibold">Get Your Quote</h2>
        <div className="bg-primary-50 my-2 grid rounded-xl font-bold">
          <p className="w-4/5 justify-self-center py-4 text-center text-xs">
            Enter your email address to view your quote and receive a copy in
            your inbox
          </p>
        </div>

        <div className="flex flex-col py-3">
          <div>
            <h2 className="text-xs">Email Address</h2>
            <div className="focus-within:border-secondary-600 bg-light mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-xs focus-within:ring-2 hover:shadow-sm">
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                value={fullData.email}
                onChange={(e) =>
                  setFullData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="johndoe@gmail.com"
                className="w-full bg-transparent text-neutral-800 placeholder-neutral-400 outline-none"
              />
            </div>
          </div>
          <div className="bg-light mt-4 flex h-fit flex-col rounded-md p-3 text-xs sm:text-sm">
            <h2 className="font-semibold">Trip details</h2>
            <div className="mt-4 grid grid-cols-2 px-3 text-gray-600">
              <p>Distance:</p>
              <p className="justify-self-end">{fullData.distanceMiles}</p>
            </div>
            <div className="mt-2 grid grid-cols-2 px-3 text-gray-600">
              <p>Duration:</p>
              <p className="justify-self-end">{fullData.totalDuration}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-x-8">
          <button
            type="button"
            onClick={onClose}
            className="border-secondary/40 hover:border-secondary-600 text-secondary-600 w-full rounded-lg border py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={sendEmail}
            disabled={!fullData.email}
            className="bg-secondary hover:bg-secondary-600 disabled:bg-secondary/40 disabled:hover:*:none w-full rounded-lg py-2 text-black hover:text-white disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuoteModal;
