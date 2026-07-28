interface OptionButtonsProps {
  options: { value: string; label: string }[];
  type: "radio" | "checkbox";
  value: string;
  onChange: (value: string) => void;
}

export default function OptionButtons({ options, type, value, onChange }: OptionButtonsProps) {
  const selected = value.split(",").map((s) => s.trim()).filter(Boolean);

  const handleClick = (v: string) => {
    if (type === "radio") {
      onChange(v);
    } else {
      const next = selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v];
      onChange(next.join(", "));
    }
  };

  return (
    <div className="cpf-options-list">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            className={`cpf-option-btn${isSelected ? " selected" : ""}${type === "checkbox" ? " cpf-option-check" : ""}`}
            onClick={() => handleClick(opt.value)}
          >
            <span className="cpf-option-indicator" />
            <span className="cpf-option-text">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
