import { money, sum } from "./business-architect.data";

export default function ValueStack({
  rows,
  price,
  totalLabel = "Total value",
  accent = "b",
}: {
  rows: { label: string; value: number }[];
  price: number;
  totalLabel?: string;
  accent?: "b" | "p";
}) {
  const total = sum(rows);
  const gap = total - price;

  return (
    <div className={`vstack ${accent}`}>
      <div className="vstack-lbl">What it is worth</div>
      {rows.map((row) => (
        <div className="vrow" key={row.label}>
          <span className="vrow-label">{row.label}</span>
          <span className="vrow-value">{money(row.value)}</span>
        </div>
      ))}
      <div className="vrow vrow-total">
        <span className="vrow-label">{totalLabel}</span>
        <span className="vrow-value">{money(total)}</span>
      </div>
      <div className="vrow vrow-price">
        <span className="vrow-label">You pay</span>
        <span className="vrow-value">{money(price)}</span>
      </div>
      <div className="vstack-gap">
        You keep <strong>{money(gap)}</strong> of it.
      </div>
    </div>
  );
}
