export interface IntelSubscribeRequest {
  email: string;
  name?: string;
}

export type IntelSubscribeResponse = { success: true } | { error: string };
