import ContactForm from "@/components/contact/contact-form";
import FAQ from "@/components/contact/faq";
import Map from "@/components/contact/map";
import Socials from "@/components/contact/socials";
import FadeInSection from "@/utils/fade-in-section";
import Head from "next/head";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>
          Contact London Minibus Rental | Get a Quote | Minibus Hire London & UK
        </title>

        <meta
          name="description"
          content="Contact London Minibus Rental for reliable minibus hire with driver. Get instant quotes for airport transfers, weddings, school trips & group travel across London, Bromley, Bath & UK."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.londonminibusrental.co.uk/contact"
        />

        {/* Location-specific meta keywords (less important but still helpful) */}
        <meta
          name="keywords"
          content="minibus hire London, minibus with driver, contact minibus rental, London transport, airport transfers, group travel UK, Bromley minibus, Bath minibus hire, minibus, rent bus, rent bus london, london car"
        />

        {/* Open Graph - Enhanced */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Contact London Minibus Rental | Get Your Instant Quote"
        />
        <meta
          property="og:description"
          content="Get in touch for professional minibus hire services across London and the UK. Instant quotes, 24/7 support for airport transfers, events & group travel."
        />
        <meta
          property="og:url"
          content="https://www.londonminibusrental.co.uk/contact"
        />
        <meta property="og:site_name" content="London Minibus Rental" />

        {/* ContactPage + LocalBusiness Structured Data - ENHANCED */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ContactPage",
                  "@id": "https://www.londonminibusrental.co.uk/contact",
                  name: "Contact London Minibus Rental",
                  description:
                    "Contact page for minibus hire services in London and across the UK",
                  breadcrumb: {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://www.londonminibusrental.co.uk",
                      },
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: "Contact Us",
                        item: "https://www.londonminibusrental.co.uk/contact",
                      },
                    ],
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.londonminibusrental.co.uk/#localbusiness",
                  name: "London Minibus Rental",
                  telephone: "+44-20-8987-8046",
                  email: "info@londonminibusrental.co.uk",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Oakdene Street, Carlton Grove, Peckham",
                    addressLocality: "London",
                    postalCode: "SE15 2UQ",
                    addressCountry: "GB",
                    addressRegion: "England",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 51.475723, // Add actual coordinates for better local SEO
                    longitude: -0.061588,
                  },
                  areaServed: [
                    {
                      "@type": "City",
                      name: "London",
                    },
                    {
                      "@type": "City",
                      name: "Bromley",
                    },
                    {
                      "@type": "City",
                      name: "Bath",
                    },
                    {
                      "@type": "Country",
                      name: "United Kingdom",
                    },
                  ],
                  serviceArea: {
                    "@type": "GeoCircle",
                    geoMidpoint: {
                      "@type": "GeoCoordinates",
                      latitude: 51.474,
                      longitude: -0.0735,
                    },
                    geoRadius: "500000",
                  },
                  openingHours: "Mo-Su 08:00-22:00",
                  priceRange: "££",
                  url: "https://www.londonminibusrental.co.uk",
                  sameAs: ["https://share.google/nOyWB8gFMNP2Zds8O"],
                  makesOffer: [
                    {
                      "@type": "Service",
                      name: "Minibus Hire with Driver",
                      description:
                        "Professional minibus rental with driver for group transportation",
                    },
                    {
                      "@type": "Service",
                      name: "Airport Transfers",
                      description:
                        "Minibus transfers to and from all major UK airports",
                    },
                  ],
                  image: "https://www.londonminibusrental.co.uk/logo.png",
                },
              ],
            }),
          }}
        />
      </Head>

      <main className="mt-6 md:mt-18">
        <FadeInSection delay={200}>
          <div className="flex w-full flex-col items-center justify-center px-6">
            <p className="bg-primary-50 mb-2 rounded-2xl px-3 py-2">
              Your trusted minibus partner
            </p>
            <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl">
              Get In Touch With Us <span className="text-primary">Today</span>
            </h1>
            <p className="mx-auto mt-6 mb-8 hidden self-center text-center md:text-xl lg:block">
              Do you have an upcoming trip or event to organize? Our support
              team is here to assist you.
              <br /> Reach out to us today to plan your trip.
            </p>

            {/* mobile */}
            <p className="md:text-x mx-auto mt-6 mb-8 max-w-3xl self-center text-center lg:hidden">
              Do you have an upcoming trip or event to organize? Our support
              team is here to assist you. Reach out to us today to plan your
              trip.
            </p>
          </div>
        </FadeInSection>

        {/* Contact form */}
        <FadeInSection delay={200}>
          <ContactForm />
        </FadeInSection>

        {/* Contact form */}
        <FadeInSection delay={200}>
          <FAQ />
        </FadeInSection>

        {/* socials */}
        <FadeInSection delay={200}>
          <Socials />
        </FadeInSection>

        {/* map */}
        <Map />
      </main>
    </>
  );
};

export default ContactUs;
