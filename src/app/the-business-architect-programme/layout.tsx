import "./business-architect-programme.css";

export const metadata = {
  title: "The Business Architect Programme — Founding Cohort",
  description:
    "Six weeks. From invisible expert to Business Architect — with a premium consulting offer, a complete client system, and the personal brand that commands the room.",
};

export default function BusinessArchitectProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bap-page">{children}</div>;
}
