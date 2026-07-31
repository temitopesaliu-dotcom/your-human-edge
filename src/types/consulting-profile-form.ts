export interface ConsultingProfileFormRequest {
  full_name?: string;
  preferred_name?: string;
  email?: string;
  country?: string;
  timezone?: string;
  /** Data URL (e.g. "data:image/jpeg;base64,...") of the applicant's photo. */
  photo_base64?: string;
  linkedin?: string;
  current_role?: string;
  years_experience?: string;
  industry?: string;
  advice_areas?: string;
  greatest_strength?: string;
  core_problem?: string;
  proudest_work?: string;
  org_types?: string;
  why_joined?: string;
  best_workshop?: string;
  key_question?: string;
  ai_confidence?: string;
  ai_tools?: string;
  ai_transformative?: string;
  business_name?: string;
  business_industry?: string;
  business_size?: string;
  business_challenge?: string;
  business_friction?: string;
  business_why?: string;
  six_months_vision?: string;
  anything_else?: string;
  /** "true" if they checked the marketing consent box, otherwise omitted. */
  marketing_consent?: string;
}

export type ConsultingProfileFormResponse = { ok: true } | { error: string };
