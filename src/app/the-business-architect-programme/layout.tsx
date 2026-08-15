import "./business-architect-programme.css";

export const metadata = {
  title: "The Business Architect Programme — Founding Cohort",
  description:
    "For Intelligence Layer Workshop graduates. Six weeks to turn the offer, ICP and site you already built into a priced consulting practice — with the discovery process to sell it and the AI Operating System to deliver it.",
};

export default function BusinessArchitectProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bap-page">{children}</div>;
}
