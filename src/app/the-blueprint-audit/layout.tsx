import "./aios.css";

export const metadata = {
  title: "AI Operating System — Build a Business That Runs Without You",
  description:
    "We design AI Operating Systems for coaches, consultants, founders and service businesses. Stop babysitting your business. Get your free AI blueprint in three minutes.",
};

export default function AiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="aios-root">{children}</div>;
}
