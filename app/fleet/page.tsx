import Clients from "@/components/clients";
import Buses from "@/components/fleet/buses";
import WhyUs from "@/components/services/why-us";
import FadeInSection from "@/utils/fade-in-section";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Fleet = () => {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>
          Our Minibus Fleet London | 8–16 Seater Minibus Hire with Driver UK
        </title>

        <meta
          name="description"
          content="View our full minibus fleet in London - 8, 12 & 16 seater vehicles for hire with driver. Perfect for airport transfers, school trips, weddings & group travel across London, Bromley, Bath & UK."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.londonminibusrental.co.uk/fleet"
        />

        {/* Location-specific meta keywords */}
        <meta
          name="keywords"
          content="minibus fleet London, 8 seater minibus hire, 16 seater minibus, minibus with driver London, minibus rental fleet, airport transfer minibus, school trip minibus, wedding transport minibus, Bromley minibus hire, Bath minibus rental, group travel vehicles UK"
        />

        {/* Open Graph - Enhanced */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Our Minibus Fleet | 8-16 Seater Minibuses for Hire in London & UK"
        />
        <meta
          property="og:description"
          content="Explore our modern minibus fleet including 8, 12 & 16 seater vehicles for hire with professional drivers. Perfect for all group transportation needs in London and across the UK."
        />
        <meta
          property="og:url"
          content="https://www.londonminibusrental.co.uk/fleet"
        />
        <meta property="og:site_name" content="London Minibus Rental" />
        {/* Uncomment and add when you have a fleet image */}
        {/* <meta property="og:image" content="https://www.londonminibusrental.co.uk/fleet-og-image.jpg" /> */}
        {/* <meta property="og:image:alt" content="London Minibus Rental Fleet - Various minibus sizes" /> */}

        {/* Enhanced Vehicle / Fleet Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "CollectionPage",
                  "@id": "https://www.londonminibusrental.co.uk/fleet",
                  name: "Minibus Fleet",
                  description:
                    "Collection of minibuses available for hire with driver in London and across the UK",
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
                        name: "Our Fleet",
                        item: "https://www.londonminibusrental.co.uk/fleet",
                      },
                    ],
                  },
                },
                {
                  "@type": "ItemList",
                  itemListElement: [
                    {
                      "@type": "Vehicle",
                      name: "8 Seater Minibus",
                      description:
                        "Compact minibus ideal for small groups, airport transfers, and corporate travel",
                      vehicleSeatingCapacity: 8,
                      vehicleTransmission: "Automatic",
                      fuelType: "Diesel",
                      brand: {
                        "@type": "Brand",
                        name: "Various",
                      },
                      url: "https://www.londonminibusrental.co.uk/fleet#8-seater",
                    },
                    {
                      "@type": "Vehicle",
                      name: "12 Seater Minibus",
                      description:
                        "Mid-size minibus perfect for school trips, wedding parties, and group excursions",
                      vehicleSeatingCapacity: 12,
                      vehicleTransmission: "Automatic",
                      fuelType: "Diesel",
                      brand: {
                        "@type": "Brand",
                        name: "Various",
                      },
                      url: "https://www.londonminibusrental.co.uk/fleet#12-seater",
                    },
                    {
                      "@type": "Vehicle",
                      name: "16 Seater Minibus",
                      description:
                        "Large capacity minibus for bigger groups, sports teams, and event transportation",
                      vehicleSeatingCapacity: 16,
                      vehicleTransmission: "Automatic",
                      fuelType: "Diesel",
                      brand: {
                        "@type": "Brand",
                        name: "Various",
                      },
                      url: "https://www.londonminibusrental.co.uk/fleet#16-seater",
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
                },
              ],
            }),
          }}
        />
      </Head>

      <main className="mb-18">
        {/* hero */}
        <FadeInSection delay={200}>
          <div
            className="relative h-[650px] bg-cover bg-center"
            style={{ backgroundImage: "url('/buses/tower-bus.png')" }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-start justify-center space-y-8 p-12 text-white sm:justify-end">
              <h1 className="text-4xl font-bold lg:text-6xl">
                Explore Our <span className="text-secondary">Fleet</span> For
                Every Journey
              </h1>

              <p className="hidden text-xl sm:block">
                Choose from a range of well maintained vehicles designed for
                comfort,
                <br /> safety and every travel need
              </p>
              {/* mobile */}
              <p className="max-w-lg text-xl sm:hidden">
                Choose from a range of well maintained vehicles designed for
                comfort, safety and every travel need
              </p>

              <div className="flex space-x-3">
                <Link
                  href="/#quote"
                  className="bg-secondary hover:bg-secondary-600 rounded-md px-2 py-2 text-black hover:text-white md:px-5 md:text-lg"
                >
                  Book Your Trip
                </Link>
                <Link
                  href="/#calculator"
                  className="border-secondary/50 hover:border-secondary text-secondary rounded-md border bg-transparent px-2 py-2 md:px-5 md:text-lg"
                >
                  Calculate Quote
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* buses */}

        <Buses />

        {/* clients */}
        <FadeInSection delay={200}>
          <WhyUs />
        </FadeInSection>
        <FadeInSection delay={200}>
          <Clients />
        </FadeInSection>
      </main>
    </>
  );
};

export default Fleet;
