import React from "react";
import Services from "../../components/services/services";
import WhyUs from "../../components/services/why-us";
import Clients from "../../components/clients";
import Fleet from "../../components/homepage/fleet";
import Link from "next/link";
import FleetMobile from "@/components/homepage/mobile-fleet";
import FadeInSection from "@/utils/fade-in-section";
import Head from "next/head";

const ServicesPage = () => {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>
          Minibus Hire Services London | Airport, Wedding & School Transport UK
        </title>

        <meta
          name="description"
          content="Professional minibus hire with driver services in London, Bromley & Bath. Airport transfers, wedding transport, school trips, corporate events & group travel across the UK."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.londonminibusrental.co.uk/services"
        />

        {/* Location-specific meta keywords */}
        <meta
          name="keywords"
          content="minibus hire services London, airport transfers minibus, wedding transport London, school trip minibus hire, corporate minibus rental, funeral transport minibus, group travel UK, Bromley minibus services, Bath transport services, minibus with driver"
        />

        {/* Open Graph - Enhanced */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Professional Minibus Hire Services in London & UK | London Minibus Rental"
        />
        <meta
          property="og:description"
          content="Reliable minibus hire with driver services for airport transfers, weddings, school trips, corporate events & group travel across London, Bromley, Bath and UK."
        />
        <meta
          property="og:url"
          content="https://www.londonminibusrental.co.uk/services"
        />
        <meta property="og:site_name" content="London Minibus Rental" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "CollectionPage",
                  "@id": "https://www.londonminibusrental.co.uk/services",
                  name: "Minibus Hire Services",
                  description:
                    "Comprehensive minibus hire with driver services available in London and across the UK",
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
                        name: "Our Services",
                        item: "https://www.londonminibusrental.co.uk/services",
                      },
                    ],
                  },
                },
                {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "Service",
                      name: "Airport Transfers",
                      description:
                        "Professional minibus transfers to and from all major UK airports including Heathrow, Gatwick, Stansted and Luton",
                      serviceType: "Airport Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#airport-transfers",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                    {
                      "@type": "Service",
                      name: "School Trips",
                      description:
                        "Safe and secure minibus transport for students, teachers and educational outings with DBS checked drivers",
                      serviceType: "Student Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#school-trips",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                    {
                      "@type": "Service",
                      name: "Wedding Transport",
                      description:
                        "Elegant minibus hire for wedding parties, ensuring timely arrival for ceremonies and receptions",
                      serviceType: "Wedding Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#wedding-transport",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                    {
                      "@type": "Service",
                      name: "Corporate Events",
                      description:
                        "Professional minibus transport for corporate meetings, conferences, team building events and business travel",
                      serviceType: "Business Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#corporate-events",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                    {
                      "@type": "Service",
                      name: "Funeral Transport",
                      description:
                        "Respectful and punctual minibus services for funeral processions and memorial services",
                      serviceType: "Funeral Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#funeral-transport",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                    {
                      "@type": "Service",
                      name: "Tours & Excursions",
                      description:
                        "Comfortable minibus hire for sightseeing tours, group adventures and holiday excursions across the UK",
                      serviceType: "Tour Transportation",
                      url: "https://www.londonminibusrental.co.uk/services#tours-excursions",
                      provider: {
                        "@type": "LocalBusiness",
                        name: "London Minibus Rental",
                      },
                    },
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  name: "London Minibus Rental",
                  image: "https://www.londonminibusrental.co.uk/logo.png",
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
                    latitude: 51.475723,
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
                  url: "https://www.londonminibusrental.co.uk",
                  openingHours: "Mo-Su 08:00-22:00",
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Minibus Hire with Driver",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      <main>
        {/* hero */}
        <FadeInSection delay={200}>
          {" "}
          <div
            className="relative h-[650px] bg-cover bg-center"
            style={{ backgroundImage: "url('/buses/tower-bus.webp')" }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-start justify-center space-y-8 p-12 text-white sm:justify-end">
              <h1 className="text-4xl font-bold lg:text-6xl">
                Seamless Travel,{" "}
                <span className="text-secondary">Exceptional</span> Service
              </h1>

              <p className="hidden md:block md:text-xl">
                Reliable minibus with driver hire in London for business, events
                <br />
                and other activities
              </p>
              {/* mobile */}
              <p className="max-w-lg md:hidden">
                Reliable minibus with driver hire in London for business, events
                and other activities
              </p>
              <div className="flex space-x-3">
                <Link
                  href="/#quote"
                  className="bg-secondary hover:bg-secondary-600 rounded-md px-2 py-2 text-sm text-black hover:text-white md:px-5 md:text-lg"
                >
                  Book Your Trip
                </Link>
                <Link
                  href="/#calculator"
                  className="border-secondary/50 text-secondary hover:border-secondary-600 rounded-md border bg-transparent px-2 py-2 text-sm md:px-5 md:text-lg"
                >
                  Calculate Quote
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* content */}
        <Services />

        <FadeInSection delay={200}>
          <WhyUs />
        </FadeInSection>

        {/* Our clients */}
        <FadeInSection delay={200}>
          {" "}
          <Clients />
        </FadeInSection>

        {/* Fleet */}
        <FadeInSection delay={200}>
          {" "}
          <div className="relative overflow-hidden">
            <Fleet />
          </div>
          <FleetMobile />
        </FadeInSection>
      </main>
    </>
  );
};

export default ServicesPage;
