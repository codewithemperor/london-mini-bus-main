import Image from "next/image";

export default function FloatingWhatsApp() {
  const phoneNumber = "+442089878046";
  const message = "Hello! I’d like to enquire about minibus hire.";

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    "+",
    "",
  )}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed right-6 bottom-16 z-50 flex flex-col items-center gap-2 lg:bottom-6">
      {/* Call link */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-primary-50 border-primary mb-2 flex h-[57px] w-[57px] animate-bounce items-center justify-center rounded-full border-3 text-lg font-semibold transition hover:scale-110 hover:cursor-pointer focus:outline-none lg:h-20 lg:w-20 lg:border-4"
        aria-label="Call us"
      >
        <p className="text-primary-600 md:text-md text-xs font-bold lg:text-lg">
          Call Us
        </p>
      </a>

      {/* WhatsApp link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="animate-bounce transition hover:scale-110 focus:outline-none"
      >
        <Image
          src="/icons/whatsapp.png"
          alt="WhatsApp icon"
          width={80}
          height={80}
          className="h-16 w-16 sm:h-18 sm:w-18 lg:h-22 lg:w-22"
          priority
        />
      </a>
    </div>
  );
}
