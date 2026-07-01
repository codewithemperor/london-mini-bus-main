import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import React from "react";

const Socials = () => {
  return (
    <section className="mb-18 w-full px-6 md:px-0">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Stay <span className="text-primary">Connected</span> With Us
        </h1>
        <p className="mx-auto mt-6 mb-8 max-w-3xl self-center text-center text-lg md:text-xl">
          Follow us on social media to see what we’re up to
        </p>
      </div>

      <div className="mx-auto flex items-center justify-center space-x-8">
        <a
          href="https://web.facebook.com/profile.php?id=61578560925347"
          className="bg-primary hover:text-secondary-600 hover:bg-primary-50 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-[1.01] hover:transform"
        >
          <FacebookIcon />
        </a>
        <a
          href="#"
          className="bg-primary hover:text-secondary-600 hover:bg-primary-50 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-[1.01] hover:transform"
        >
          <InstagramIcon />
        </a>
        {/* <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-[1.01] hover:transform">
          <LinkedinIcon />
        </div> */}
      </div>
    </section>
  );
};

export default Socials;
