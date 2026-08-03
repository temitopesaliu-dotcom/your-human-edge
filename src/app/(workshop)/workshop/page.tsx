"use client";

import "./workshop.css";
import Nav from "@/components/features/workshop/Nav";
import Countdown from "@/components/features/workshop/Countdown";
import SpotsRemaining from "@/components/features/workshop/SpotsRemaining";
import Hook from "@/components/features/workshop/Hook";
import Hero from "@/components/features/workshop/Hero";
import About from "@/components/features/workshop/About";
import WhatHappens from "@/components/features/workshop/WhatHappens";
import WhoItsFor from "@/components/features/workshop/WhoItsFor";
import WhyWorkingSession from "@/components/features/workshop/WhyWorkingSession";
import Testimonials from "@/components/features/workshop/Testimonials";
import Faq from "@/components/features/workshop/Faq";
import FinalCta from "@/components/features/workshop/FinalCta";
import Footer from "@/components/features/workshop/Footer";

export default function WorkshopPage() {
  return (
    <>
      <Nav />
      <Countdown />
      <SpotsRemaining />
      <Hook />
      <Hero />
      <About />
      <WhatHappens />
      <WhoItsFor />
      <WhyWorkingSession />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
