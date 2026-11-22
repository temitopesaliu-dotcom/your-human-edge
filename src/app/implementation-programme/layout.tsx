import "./iap.css";

export const metadata = {
  title: "Implementation and Accountability Programme",
  description:
    "Six months of weekly accountability and implementation support, so what you learned becomes a working, revenue-generating business.",
  robots: { index: false, follow: false },
};

export default function ImplementationProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="iap-page">{children}</div>;
}
