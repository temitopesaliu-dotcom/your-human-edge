import AiosNav from "../_components/AiosNav";
import AiosFooter from "../_components/AiosFooter";
import AiosScripts from "../_components/AiosScripts";
import Hero from "@/components/features/blueprint/Hero";
import WhatIsThis from "@/components/features/blueprint/WhatIsThis";
import Deliverables from "@/components/features/blueprint/Deliverables";
import WhoThisIsFor from "@/components/features/blueprint/WhoThisIsFor";
import SessionStructure from "@/components/features/blueprint/SessionStructure";
import Investment from "@/components/features/blueprint/Investment";
import Testimonial from "@/components/features/blueprint/Testimonial";
import FinalCta from "@/components/features/blueprint/FinalCta";

export default function BlueprintPage() {
  return (
    <>
      <AiosScripts />
      <AiosNav variant="blueprint" />
      <Hero />
      <WhatIsThis />
      <Deliverables />
      <WhoThisIsFor />
      <SessionStructure />
      <Investment />
      <Testimonial />
      <FinalCta />
      <AiosFooter variant="blueprint" />
    </>
  );
}
