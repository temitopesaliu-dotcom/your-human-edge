import FieldError from "./FieldError";
import {
  SYSTEMATIZE_OPTIONS,
  OTHER_SYSTEMATIZE_PREFIX,
  stripOtherSystematize,
  withOtherSystematize,
} from "./blueprint-apply.data";
import { useState } from "react";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepThreeProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  toggleSystematize: (value: string) => void;
  goNext: () => void;
  goBack: () => void;
}

export default function StepThree({ data, errors, update, toggleSystematize, goNext, goBack }: StepThreeProps) {
  const otherEntry = data.systematize.find(
    (v) => v === "other" || v.startsWith(OTHER_SYSTEMATIZE_PREFIX)
  );
  const otherChecked = Boolean(otherEntry);
  const [otherText, setOtherText] = useState(
    otherEntry && otherEntry.startsWith(OTHER_SYSTEMATIZE_PREFIX)
      ? otherEntry.slice(OTHER_SYSTEMATIZE_PREFIX.length).trim()
      : ""
  );
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 3 of 5</p>
      <h2 className="form-step-title">Where are you right now?</h2>
      <p className="form-step-subtitle">We want to understand your current operational reality.</p>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label" htmlFor="biggestPain">
            What is your biggest operational pain point right now? <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="biggestPain"
            rows={4}
            placeholder="Describe the single biggest friction or bottleneck in your business operations."
            value={data.biggestPain}
            onChange={(e) => update("biggestPain", e.target.value)}
          />
          <FieldError field="biggestPain" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="bottleneck">
            Where does your business stop when you stop? <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="bottleneck"
            rows={3}
            placeholder="What specific processes depend entirely on you showing up personally?"
            value={data.bottleneck}
            onChange={(e) => update("bottleneck", e.target.value)}
          />
          <FieldError field="bottleneck" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label">
            Which areas do you most want to systematize? (select all that apply)
          </label>
          <div className="form-checkbox-group" role="group" aria-label="Areas to systematize">
            {SYSTEMATIZE_OPTIONS.map((opt) => (
              <label className="form-checkbox-item" key={opt.value}>
                <input
                  type="checkbox"
                  checked={opt.value === "other" ? otherChecked : data.systematize.includes(opt.value)}
                  onChange={() => {
                    if (opt.value === "other") {
                      if (otherChecked) {
                        // Unchecking: drop the whole "Other" selection and keep
                        // the text in state so re-checking restores it.
                        update("systematize", stripOtherSystematize(data.systematize));
                      } else {
                        // Checking: add the selection (bare "other" when the
                        // field is still empty, "Other: text" once typed).
                        update("systematize", withOtherSystematize(data.systematize, otherText));
                      }
                    } else {
                      toggleSystematize(opt.value);
                    }
                  }}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {Boolean(otherEntry) && (
            <input
              type="text"
              className="form-input mt-3"
              id="systematizeOther"
              aria-label="Other area you want to systematize"
              placeholder="Tell us what you'd like to systematize..."
              value={otherText}
              onChange={(e) => {
                const next = e.target.value;
                setOtherText(next);
                update("systematize", withOtherSystematize(data.systematize, next));
              }}
            />
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="currentTools">
            What tools are you currently using for operations and communication?{" "}
            <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="currentTools"
            rows={3}
            placeholder="e.g. HubSpot CRM, Gmail, Slack, Notion, Calendly, Zapier..."
            value={data.currentTools}
            onChange={(e) => update("currentTools", e.target.value)}
          />
          <FieldError field="currentTools" errors={errors} />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost btn-back" onClick={goBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary btn-lg btn-arrow btn-next" onClick={goNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
