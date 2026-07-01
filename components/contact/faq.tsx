import React from "react";
import AccordionItem from "./accordion-item";
import MobileAccordionItem from "./mobile-accordion";

const accordionData = [
  {
    question: "How do I get a quote and book a minibus?",
    answer:
      "You can get a free quote by filling out our online form or calling us at 02089878046.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 1–4 weeks in advance, especially for weekends, holidays, or peak seasons like summer and December. However, we do our best to accommodate last minute requests.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard), bank transfers, and mobile payments like Apple Pay and Google Pay.",
  },
  {
    question: "Can I change my booking details after confirmation?",
    answer:
      "Yes, you can request changes to your route, pickup time, or vehicle size. Note that significant changes to mileage or time may result in a price adjustment.",
  },
  {
    question: "Is the driver's cost included in the price?",
    answer:
      "Yes. The quote we provide is all-inclusive of the driver’s professional fees and fuel for the agreed route.",
  },
  {
    question: "What happens if my flight is delayed for an airport transfer?",
    answer:
      "We monitor flight arrival times in real time. If your flight is delayed, your driver will adjust the pickup time accordingly.",
  },
  {
    question: "Are we responsible for parking fees or tolls?",
    answer:
      "Standard quotes usually cover the journey itself and parking fees (if anything changes, we will notify you accordingly).",
  },

  {
    question: "Do you offer self drive options?",
    answer: "No we do not. We only accept bookings with a driver.",
  },
  {
    question: "Are your vehicles wheelchair accessible?",
    answer:
      "We have specific vehicles equipped with ramps or lifts. Please mention your requirements during the booking process so we can allocate a suitable wheelchair-accessible minibus for your group.",
  },
  {
    question: "Are pets allowed on board?",
    answer: "Yes, pets are allowed during your trips.",
  },
];

const FAQ = () => {
  return (
    <section className="my-6 flex w-full flex-col items-center justify-center md:my-18">
      <div className="flex w-full flex-col px-6 md:px-0" id="faq">
        <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Got questions about Our{" "}
          <span className="text-primary">Services?</span>
        </h1>
        <p className="mx-auto mt-6 mb-8 self-center text-center sm:w-2/5 md:text-xl">
          Find clear answers about bookings, pricing, and our minibus hire
          services across London.
        </p>
      </div>

      {/* faq accordion */}
      {/* desktop */}
      <div className="bg-light hidden h-fit w-3/5 flex-col items-center justify-center p-8 md:flex md:w-full lg:w-3/5">
        <div className="mb-8 flex w-full flex-col items-center justify-center space-y-3">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.question}
              content={item.answer}
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="mb-4 text-2xl font-semibold">
            Still have further questions?
          </h1>
          <a
            href="tel:+442089878046"
            className="bg-primary-700 flex w-1/5 items-center justify-center rounded-lg py-3 font-semibold text-white"
          >
            Speak With Us
          </a>
        </div>
      </div>

      {/* mobile */}
      <div className="bg-light flex h-fit w-full max-w-5xl flex-col items-center justify-center p-6 md:hidden">
        <div className="mb-10 flex w-full flex-col items-center justify-center space-y-4">
          {accordionData.map((item, index) => (
            <MobileAccordionItem
              key={index}
              title={item.question}
              content={item.answer}
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-xl font-semibold md:text-2xl">
            Still have further questions?
          </h1>

          <a
            href="tel:+442089878046"
            className="bg-primary-700 flex w-3/5 max-w-xs items-center justify-center rounded-lg py-2 font-semibold text-white transition hover:scale-[1.02] md:w-1/5"
          >
            Speak With Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
