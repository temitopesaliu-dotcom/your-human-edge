import AiosNav from "../_components/AiosNav";
import AiosFooter from "../_components/AiosFooter";
import BlueprintQuiz from "@/components/features/blueprint-quiz/BlueprintQuiz";

export const metadata = {
  title: "The Blueprint Audit | Temitope Saliu",
  description:
    "Answer a few questions about your business and get a first-draft AI architecture on the spot: where the time goes, what to build first, and what 90 days from now looks like.",
};

export default function ApplyPage() {
  return (
    <>
      <AiosNav variant="apply" />
      <BlueprintQuiz />
      <AiosFooter variant="apply" />
    </>
  );
}
