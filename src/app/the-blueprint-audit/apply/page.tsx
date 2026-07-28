"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AiosNav from "../_components/AiosNav";
import AiosFooter from "../_components/AiosFooter";
import { useAsyncForm } from "@/hooks/use-async-form";
import ProgressBar from "@/components/features/blueprint-apply/ProgressBar";
import StepOne from "@/components/features/blueprint-apply/StepOne";
import StepTwo from "@/components/features/blueprint-apply/StepTwo";
import StepThree from "@/components/features/blueprint-apply/StepThree";
import StepFour from "@/components/features/blueprint-apply/StepFour";
import StepFive from "@/components/features/blueprint-apply/StepFive";
import { LOW_BUDGET_VALUES } from "@/components/features/blueprint-apply/blueprint-apply.data";
import type {
  BlueprintApplyRequest,
  BlueprintApplyResponse,
  BlueprintCreateCheckoutRequest,
  BlueprintCreateCheckoutResponse,
} from "@/types/blueprint-apply";

type FormData = BlueprintApplyRequest;

const TOTAL_STEPS = 5;

export default function ApplyPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitForm = useAsyncForm<BlueprintApplyRequest, BlueprintApplyResponse>({
    url: "/api/the-blueprint-audit/submit",
  });
  const createCheckout = useAsyncForm<BlueprintCreateCheckoutRequest, BlueprintCreateCheckoutResponse>({
    url: "/api/the-blueprint-audit/create-checkout",
  });
  const submitting = submitForm.status === "submitting" || createCheckout.status === "submitting";
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    website: "",
    businessType: "",
    industry: "",
    teamSize: "",
    businessDesc: "",
    biggestPain: "",
    bottleneck: "",
    systematize: [],
    currentTools: "",
    implementationBudget: "",
    timeline: "",
    howHeard: "",
    additionalContext: "",
    contactPref: "email",
  });

  const update = (field: keyof FormData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleSystematize = (value: string) => {
    setData((prev) => {
      const arr = prev.systematize.includes(value)
        ? prev.systematize.filter((v) => v !== value)
        : [...prev.systematize, value];
      return { ...prev, systematize: arr };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const req = (field: string, label: string) => {
      const v =
        typeof data[field as keyof FormData] === "string"
          ? (data[field as keyof FormData] as string).trim()
          : "";
      if (!v) newErrors[field] = `${label} is required.`;
    };

    if (step === 1) {
      req("firstName", "First name");
      req("lastName", "Last name");
      req("email", "Email");
      req("businessName", "Business name");
    } else if (step === 2) {
      req("businessType", "Business type");
      req("industry", "Industry");
      req("teamSize", "Team size");
      req("businessDesc", "Business description");
    } else if (step === 3) {
      req("biggestPain", "Biggest pain point");
      req("bottleneck", "Bottleneck");
      req("currentTools", "Current tools");
    } else if (step === 4) {
      req("implementationBudget", "Budget");
      req("timeline", "Timeline");
    } else if (step === 5) {
      req("howHeard", "How you heard about us");
      req("contactPref", "Contact preference");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(current)) return;

    if (current === 4 && LOW_BUDGET_VALUES.includes(data.implementationBudget)) {
      router.push("/the-blueprint-audit/apply/not-a-fit");
      return;
    }

    if (current < TOTAL_STEPS) setCurrent(current + 1);
  };

  const goBack = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(current)) return;

    const submitResult = await submitForm.submit(data);
    if (!submitResult.ok) {
      setErrors({ submit: "Submission failed. Please try again." });
      return;
    }

    const checkoutResult = await createCheckout.submit({ email: data.email });
    if (checkoutResult.ok && "url" in checkoutResult.data) {
      window.location.href = checkoutResult.data.url;
    } else {
      setErrors({ submit: !checkoutResult.ok ? checkoutResult.error : "Could not start checkout. Please try again." });
    }
  };

  return (
    <>
      <AiosNav variant="apply" />

      <div className="form-page">
        <div className="form-page-header">
          <p className="label mb-2">Application</p>
          <h1 className="heading-2">Blueprint Session Application</h1>
          <p className="body-md mt-2" style={{ color: "var(--text-2)" }}>
            Takes 5–7 minutes. Secure your spot today.
          </p>
        </div>

        <ProgressBar current={current} total={TOTAL_STEPS} />

        <form onSubmit={handleSubmit} noValidate aria-label="Blueprint application form">
          {current === 1 && <StepOne data={data} errors={errors} update={update} goNext={goNext} />}
          {current === 2 && <StepTwo data={data} errors={errors} update={update} goNext={goNext} goBack={goBack} />}
          {current === 3 && (
            <StepThree
              data={data}
              errors={errors}
              update={update}
              toggleSystematize={toggleSystematize}
              goNext={goNext}
              goBack={goBack}
            />
          )}
          {current === 4 && <StepFour data={data} errors={errors} update={update} goNext={goNext} goBack={goBack} />}
          {current === 5 && (
            <StepFive data={data} errors={errors} update={update} goBack={goBack} submitting={submitting} />
          )}
        </form>
      </div>

      <AiosFooter variant="apply" />
    </>
  );
}
