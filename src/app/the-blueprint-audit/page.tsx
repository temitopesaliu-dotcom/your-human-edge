import AiosNav from "./_components/AiosNav";
import AiosFooter from "./_components/AiosFooter";
import AiosScripts from "./_components/AiosScripts";
import Hero from "@/components/features/blueprint-audit/Hero";
import Credibility from "@/components/features/blueprint-audit/Credibility";
import Problems from "@/components/features/blueprint-audit/Problems";
import Reframe from "@/components/features/blueprint-audit/Reframe";
import Solution from "@/components/features/blueprint-audit/Solution";
import Outcomes from "@/components/features/blueprint-audit/Outcomes";
import Process from "@/components/features/blueprint-audit/Process";
import Blueprint from "@/components/features/blueprint-audit/Blueprint";
import SocialProof from "@/components/features/blueprint-audit/SocialProof";
import Faq from "@/components/features/blueprint-audit/Faq";
import FinalCta from "@/components/features/blueprint-audit/FinalCta";

export default function AiosLandingPage() {
  return (
    <>
      <AiosScripts />
      <AiosNav />
      <Hero />
      <Credibility />
      <Problems />
      <Reframe />
      <Solution />
      <Outcomes />
      <Process />
      <Blueprint />
      <SocialProof />
      <Faq />
      <FinalCta />
      <AiosFooter variant="landing" />
    </>
  );
}
