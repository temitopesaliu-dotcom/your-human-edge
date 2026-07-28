import type { ArchetypeKey } from '@/lib/utils/archetypes';

export interface SubscribeRequest {
  email: string;
  name?: string;
  source?: string;
  isCompany?: boolean;
  archetype?: ArchetypeKey;
  signupType?: 'coach' | 'company';
}

export type SubscribeResponse =
  | { success: true; isNew: boolean }
  | { error: string };
