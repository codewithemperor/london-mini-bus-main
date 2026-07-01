import React from "react";
import RequestQuoteForm from "./request-quote-form";

const RequestQuote = () => {
  return (
    <section id="quote" className="mb-8">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Request A <span className="text-primary">Free</span> Quote
        </h2>
        <p className="mx-auto mt-6 max-w-4xl self-center text-center text-lg text-wrap sm:text-xl">
          Get an instant free quote for minibus hire with driver across the UK.
          Affordable rates, professional service and no hidden fees.
        </p>
      </div>

      {/* Form */}
      <RequestQuoteForm />
    </section>
  );
};

export default RequestQuote;
