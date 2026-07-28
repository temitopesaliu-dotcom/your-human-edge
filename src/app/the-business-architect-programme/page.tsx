"use client";

import { useCountdown } from "@/components/features/business-architect/useCountdown";
import AnnounceBar from "@/components/features/business-architect/AnnounceBar";
import Nav from "@/components/features/business-architect/Nav";
import Hero from "@/components/features/business-architect/Hero";
import TransformSection from "@/components/features/business-architect/TransformSection";
import CurriculumSection from "@/components/features/business-architect/CurriculumSection";
import FounderSection from "@/components/features/business-architect/FounderSection";
import PricingSection from "@/components/features/business-architect/PricingSection";
import CompareTable from "@/components/features/business-architect/CompareTable";
import FaqSection from "@/components/features/business-architect/FaqSection";
import FinalCta from "@/components/features/business-architect/FinalCta";
import Footer from "@/components/features/business-architect/Footer";

export default function BusinessArchitectProgrammePage() {
  const countdown = useCountdown();

  return (
    <>
      <AnnounceBar countdown={countdown} />
      <Nav countdown={countdown} />
      <Hero countdown={countdown} />
      <TransformSection />
      <CurriculumSection />
      <FounderSection />
      <PricingSection />
      <CompareTable />
      <FaqSection />
      <FinalCta />
      <Footer />
    </>
  );
}
