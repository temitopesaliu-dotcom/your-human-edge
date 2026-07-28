"use client";

import { notFound } from "next/navigation";
import { getArchetypeBySlug } from "@/lib/archetypes";
import CreativeAmplifierPage from "@/components/results/creative-amplifier";
import GrowthCatalystPage from "@/components/results/growth-catalyst";
import SystemsArchitectPage from "@/components/results/systems-architect";
import HumanBridgePage from "@/components/results/human-bridge";

export default function ResultsClient({ slug }: { slug: string }) {
  const arch = getArchetypeBySlug(slug);
  if (!arch) return notFound();
  const archKey = arch.key;

  if (archKey === "C") return <CreativeAmplifierPage />;
  if (archKey === "G") return <GrowthCatalystPage />;
  if (archKey === "S") return <SystemsArchitectPage />;
  if (archKey === "H") return <HumanBridgePage />;

  return notFound();
}
