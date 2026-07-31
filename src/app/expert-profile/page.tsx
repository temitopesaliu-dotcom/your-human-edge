"use client";

import { useState, useCallback, type FormEvent } from "react";
import "@/components/features/consulting-profile-form/consulting-profile-form.css";
import { isValidEmail } from "@/lib/utils/validation";
import { useAsyncForm } from "@/hooks/use-async-form";
import type { ConsultingProfileFormRequest, ConsultingProfileFormResponse } from "@/types/consulting-profile-form";
import { REQUIRED_FIELDS, FIELD_MAP, type FieldName } from "@/components/features/consulting-profile-form/consulting-profile-form.data";
import Nav from "@/components/features/consulting-profile-form/Nav";
import Hero from "@/components/features/consulting-profile-form/Hero";
import ProgressBar from "@/components/features/consulting-profile-form/ProgressBar";
import SectionAboutYou from "@/components/features/consulting-profile-form/SectionAboutYou";
import SectionBackground from "@/components/features/consulting-profile-form/SectionBackground";
import SectionExpertise from "@/components/features/consulting-profile-form/SectionExpertise";
import SectionGoals from "@/components/features/consulting-profile-form/SectionGoals";
import SectionAiRelationship from "@/components/features/consulting-profile-form/SectionAiRelationship";
import SectionBusiness from "@/components/features/consulting-profile-form/SectionBusiness";
import SectionReflection from "@/components/features/consulting-profile-form/SectionReflection";
import SubmitSection from "@/components/features/consulting-profile-form/SubmitSection";
import ConfirmationScreen from "@/components/features/consulting-profile-form/ConfirmationScreen";
import Footer from "@/components/features/consulting-profile-form/Footer";

export default function ConsultingProfileFormPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const { status, submit } = useAsyncForm<ConsultingProfileFormRequest, ConsultingProfileFormResponse>({
    url: "/api/consulting-profile-form/submit",
  });

  const set = useCallback((name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  const filledCount = REQUIRED_FIELDS.filter(
    (name) => (formData[name] || "").trim() !== ""
  ).length;
  const progressPct = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, boolean> = {};

    REQUIRED_FIELDS.forEach((name) => {
      if (!(formData[name] || "").trim()) {
        newErrors[name] = true;
      }
    });

    const email = (formData.email || "").trim();
    if (email && !isValidEmail(email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;

    if (hasErrors) {
      const firstErrorField = Object.keys(newErrors)[0];
      const fieldId = FIELD_MAP[firstErrorField];
      if (fieldId) {
        setTimeout(() => {
          document.getElementById(fieldId)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }

    return !hasErrors;
  }, [formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: ConsultingProfileFormRequest = {};
    const allFields: FieldName[] = [
      ...REQUIRED_FIELDS,
      "linkedin", "business_size", "anything_else", "marketing_consent",
    ];
    allFields.forEach((name) => {
      const v = (formData[name] || "").trim();
      if (v) payload[name] = v;
    });

    // Always proceed to the confirmation screen even if the submit fails —
    // the applicant shouldn't be blocked by a webhook outage.
    await submit(payload);

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="cpf-page">
      <Nav />

      {!submitted ? (
        <>
          <Hero />
          <ProgressBar progressPct={progressPct} />

          <div className="cpf-form-wrap">
            <form onSubmit={handleSubmit} noValidate>
              <SectionAboutYou formData={formData} errors={errors} set={set} />
              <SectionBackground formData={formData} errors={errors} set={set} />
              <SectionExpertise formData={formData} errors={errors} set={set} />
              <SectionGoals formData={formData} errors={errors} set={set} />
              <SectionAiRelationship formData={formData} errors={errors} set={set} />
              <SectionBusiness formData={formData} errors={errors} set={set} />
              <SectionReflection formData={formData} errors={errors} set={set} />
              <SubmitSection
                submitting={status === "submitting"}
                consent={formData.marketing_consent === "true"}
                onConsentChange={(checked) => set("marketing_consent", checked ? "true" : "")}
              />
            </form>
          </div>
        </>
      ) : (
        <ConfirmationScreen />
      )}

      <Footer />
    </div>
  );
}
