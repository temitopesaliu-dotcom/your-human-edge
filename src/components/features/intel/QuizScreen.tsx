import type { RefObject } from "react";
import { ArrowRight } from "./Icons";
import type { Q } from "./intel.data";

interface QuizScreenProps {
  question: (typeof Q)[number];
  cur: number;
  pct: number;
  answers: Record<string, string>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onSelectOption: (key: string, value: string) => void;
  onTextarea: (key: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function QuizScreen({
  question: q,
  cur,
  pct,
  answers,
  textareaRef,
  onSelectOption,
  onTextarea,
  onBack,
  onNext,
}: QuizScreenProps) {
  return (
    <>
      <div className="ilp-quiz-header">
        <div className="ilp-progress-wrap">
          <div className="ilp-progress-track">
            <div
              className="ilp-progress-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="ilp-progress-text">
            {cur + 1} of 7
          </span>
        </div>
      </div>
      <div className="ilp-quiz-body">
        <div className="ilp-q-label">
          Question {cur + 1} of 7
        </div>
        <div className="ilp-q-text">{q.text}</div>
        <div className="ilp-q-hint">{q.hint}</div>

        {q.type === "textarea" ? (
          <textarea
            ref={textareaRef}
            className="ilp-textarea"
            placeholder={q.placeholder || ""}
            value={answers[q.key] || ""}
            onChange={(e) => onTextarea(q.key, e.target.value)}
          />
        ) : (
          <div className="ilp-options-grid">
            {q.options!.map((opt) => (
              <button
                key={opt}
                className={`ilp-opt-btn${answers[q.key] === opt ? " selected" : ""}`}
                onClick={() => onSelectOption(q.key, opt)}
              >
                <span className="ilp-opt-radio" />
                {opt}
              </button>
            ))}
          </div>
        )}

        <div className="ilp-quiz-nav">
          <button
            className="ilp-btn-back"
            onClick={onBack}
            style={{
              visibility: cur > 0 ? "visible" : "hidden",
            }}
          >
            Back
          </button>
          <button
            className="ilp-btn-next"
            onClick={onNext}
            disabled={!answers[q.key]}
          >
            Continue
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
