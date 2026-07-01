"use client";
/* eslint-disable @next/next/no-img-element */

import Hero from "./hero";
import RequestQuote from "./request-quote";
import AboutSection from "./about";
import Services from "./services";
import QuoteCalculator from "../quote-calculator";
import CustomerReview from "./customer-review";

import Fleet from "./fleet";
import CustomerReviewMobile from "./mobile-reviews";
import FleetMobile from "./mobile-fleet";
import FadeInSection from "@/utils/fade-in-section";

const HomePage = () => {
  return (
    <main className="bg-white px-8 text-slate-900 sm:px-16">
      {/* Hero */}
      <FadeInSection delay={200}>
        <Hero />
      </FadeInSection>

      {/* Request Quote Section  */}
      <FadeInSection delay={200}>
        <RequestQuote />
      </FadeInSection>
      {/* About */}
      <FadeInSection delay={200}>
        <AboutSection />
      </FadeInSection>

      {/* Services */}
      <FadeInSection delay={200}>
        <Services />
      </FadeInSection>

      {/* Instant Quote Calculator */}
      <FadeInSection delay={200}>
        <QuoteCalculator />
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection delay={200}>
        <CustomerReviewMobile />
        <CustomerReview />
      </FadeInSection>

      {/* Fleet */}
      <FadeInSection delay={200}>
        <FleetMobile />
        <Fleet />
      </FadeInSection>
    </main>
  );
};

export default HomePage;
