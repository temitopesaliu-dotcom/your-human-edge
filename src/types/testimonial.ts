export interface TestimonialSubmitRequest {
  name: string;
  country: string;
  industry: string;
  experience: string;
  message: string;
  rating: number;
  consent: boolean;
}

export type TestimonialSubmitResponse =
  | { ok: true }
  | { error: string };
