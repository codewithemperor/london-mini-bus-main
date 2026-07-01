import { Check } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
};

function SuccessModal({ isOpen, onClose, amount }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <form className="relative z-10 flex w-5/6 max-w-lg flex-col items-center justify-center space-y-4 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-lg font-bold">Check Inbox!</h2>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#59D91D]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4BC910]">
            <Check size={20} className="text-white" />
          </div>
        </div>

        <div className="grid">
          <p className="py-4 text-center text-xs">
            Your quote for the trip is:
          </p>
          <p className="text-center text-lg font-bold">{amount}</p>
        </div>

        <div className="bg-light mb-6 rounded-md p-4">
          <p className="text-xs sm:text-sm">
            A copy of your quote estimate has been sent to your email. Click the
            button below to chat about the price with our representative.
          </p>
        </div>

        <div className="flex w-full gap-x-8 text-center">
          <button
            type="button"
            onClick={onClose}
            className="border-secondary/40 hover:border-secondary-600 text-secondary-600 w-full rounded-lg border py-2 hover:shadow-md"
          >
            Close
          </button>
          <a
            href="tel:+442089878046"
            className="bg-secondary hover:bg-secondary-600 w-full rounded-lg py-2 hover:text-white hover:shadow-md"
          >
            Speak to Us
          </a>
        </div>
      </form>
    </div>
  );
}

export default SuccessModal;
