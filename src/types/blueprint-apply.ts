export interface BlueprintApplyRequest {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  website: string;
  businessType: string;
  industry: string;
  teamSize: string;
  businessDesc: string;
  biggestPain: string;
  bottleneck: string;
  systematize: string[];
  currentTools: string;
  implementationBudget: string;
  timeline: string;
  howHeard: string;
  additionalContext: string;
  contactPref: string;
}

export type BlueprintApplyResponse = { ok: true } | { error: string };

export interface BlueprintCreateCheckoutRequest {
  email: string;
}

export type BlueprintCreateCheckoutResponse = { url: string } | { error: string };
