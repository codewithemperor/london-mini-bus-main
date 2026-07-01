import React from "react";
import Head from "next/head";
import Script from "next/script";
import HomePage from "../components/homepage/homepage";

const MainPage = () => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WLW3WDNV');
        `}
      </Script>

      <Head>
        {/* Primary SEO */}
        <title>
          London Minibus Rental | Hire with Driver Across UK
        </title>

        <meta
          name="description"
          content="Affordable minibus hire with professional drivers across London, Bromley, Bath & UK. Instant quotes for airport transfers, weddings, school trips & group travel."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.londonminibusrental.co.uk/"
        />

        <meta
          name="keywords"
          content="minibus hire London, minibus with driver, airport transfers London, wedding transport minibus, school trip minibus, group travel UK"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="London Minibus Rental | Hire with Driver Across UK"
        />
        <meta
          property="og:description"
          content="Reliable and affordable minibus hire with professional drivers across London & UK."
        />
        <meta
          property="og:url"
          content="https://www.londonminibusrental.co.uk/"
        />
        <meta
          property="og:site_name"
          content="London Minibus Rental"
        />
        <meta
          property="og:image"
          content="https://www.londonminibusrental.co.uk/buses/tower-bus.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="London Minibus Rental | Hire with Driver Across UK"
        />
        <meta
          name="twitter:description"
          content="Affordable minibus hire across London, Bromley, Bath & UK."
        />
        <meta
          name="twitter:image"
          content="https://www.londonminibusrental.co.uk/buses/tower-bus.webp"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.londonminibusrental.co.uk/#website",
                  url: "https://www.londonminibusrental.co.uk/",
                  name: "London Minibus Rental",
                  inLanguage: "en-GB",
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.londonminibusrental.co.uk/#localbusiness",
                  name: "London Minibus Rental",
                  telephone: "+44-20-8987-8046",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Oakdene Street, Carlton Grove, Peckham",
                    addressLocality: "London",
                    postalCode: "SE15 2UQ",
                    addressCountry: "GB",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WLW3WDNV"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <div className="scrollbar-hide">
        <HomePage />
      </div>
    </>
  );
};

export default MainPage;
