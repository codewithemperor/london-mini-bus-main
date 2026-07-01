import React from "react";

const Map = () => {
  return (
    <section className="h-[600px] w-full overflow-hidden rounded-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.042912671606!2d-0.06398272352981749!3d51.47572661301683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760308ff0559ab%3A0x891faf5eaf23ef7c!2sOakdene%2C%20Carlton%20Grove%2C%20London%20SE15%202UQ%2C%20UK!5e0!3m2!1sen!2sng!4v1766069719572!5m2!1sen!2sng"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Map;
