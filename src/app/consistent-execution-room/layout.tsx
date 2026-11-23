import "./cer.css";

export const metadata = {
  title: "The Consistent Execution Room",
  description:
    "From knowing to doing. A monthly implementation and accountability membership for alumni who are ready to turn what they learned into measurable business progress.",
  robots: { index: false, follow: false },
};

export default function ConsistentExecutionRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="cer-page">{children}</div>;
}
