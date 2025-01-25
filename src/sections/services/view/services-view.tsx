'use client';

//
import ServicesHero from '../services-hero';
import AboutServices from '../about-services';
// import AboutVision from '../about-vision';
import AboutTestimonials from '../about-testimonials';

// ----------------------------------------------------------------------

export default function ServicesView() {
  return (
    <>
      <ServicesHero />

      <AboutServices />

      {/* <AboutVision /> */}

      <AboutTestimonials />
    </>
  );
}
