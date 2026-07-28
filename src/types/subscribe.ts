import type { ArchetypeKey } from '@/lib/utils/archetypes';

export interface SubscribeRequest {
  email: string;
  name?: string;
  source?: string;
  /** Accepted as either a real boolean or the string 'true' — some callers serialize it loosely. */
  isCompany?: boolean | string;
  archetype?: ArchetypeKey;
  /** Any role string; the route maps 'coach'/'company' specially and
   *  defaults anything else to 'professional'. */
  signupType?: string;
}

export type SubscribeResponse =
  | { success: true; isNew: boolean }
  | { error: string };
