import Image from "next/image";
import React from "react";
import MissionVision from "../../components/about/mission-vision";
import FadeInSection from "@/utils/fade-in-section";
import Head from "next/head";

const AboutPage = () => {
  const headerImg = "/about/header-image.png";

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>
          About London Minibus Rental | Trusted Minibus Hire in London
        </title>

        <meta
          name="description"
          content="Learn about London Minibus Rental, a trusted provider of reliable and affordable minibus hire with driver services across London and the UK."
        />

        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.londonminibusrental.co.uk/about"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About London Minibus Rental" />
        <meta
          property="og:description"
          content="Discover our story, mission and commitment to reliable minibus hire services across London and the UK."
        />
        <meta
          property="og:url"
          content="https://www.londonminibusrental.co.uk/about"
        />
        <meta property="og:site_name" content="London Minibus Rental" />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "London Minibus Rental",
              url: "https://www.londonminibusrental.co.uk/",
              email: "info@londonminibusrental.co.uk",
              telephone: "+44-20-8987-8046",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Oakdene Street, Carlton Grove, Peckham",
                addressLocality: "London",
                postalCode: "SE15 2UQ",
                addressCountry: "GB",
              },
              areaServed: "United Kingdom",
              sameAs: ["https://share.google/nOyWB8gFMNP2Zds8O"],
            }),
          }}
        />
      </Head>
      <main className="my-6 md:my-18">
        {/* header */}
        <FadeInSection delay={200}>
          <header className="mb-10">
            <div className="flex w-full flex-col items-center justify-center">
              <p className="bg-primary-50 mb-2 rounded-2xl px-3 py-2">
                We provide reliable minibus services
              </p>
              <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl">
                Our Story Is About Our
                <span className="text-primary">Journeys</span>
              </h1>
              <p className="mx-auto mt-6 mb-8 max-w-3xl self-center p-3 text-center md:px-0 md:text-xl">
                Enjoy budget friendly group travel with transparent pricing and
                quotes tailored to your trip
              </p>
            </div>

            <div className="relative h-[700px] w-full">
              <Image
                src={headerImg}
                fill
                className="object-cover"
                alt="two men smiling in a minibus"
              />
            </div>
          </header>
        </FadeInSection>

        {/* mission and vision */}

        <MissionVision />
      </main>
    </>
  );
};

export default AboutPage;
