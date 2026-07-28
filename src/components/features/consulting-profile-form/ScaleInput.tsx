interface ScaleInputProps {
  value: string;
  labelLow: string;
  labelHigh: string;
  onChange: (value: string) => void;
}

export default function ScaleInput({ value, labelLow, labelHigh, onChange }: ScaleInputProps) {
  return (
    <div className="cpf-scale-wrap">
      <div className="cpf-scale-track">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            className={`cpf-scale-btn${value === String(n) ? " selected" : ""}`}
            onClick={() => onChange(String(n))}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="cpf-scale-labels">
        <span>{labelLow}</span>
        <span>{labelHigh}</span>
      </div>
    </div>
  );
}
