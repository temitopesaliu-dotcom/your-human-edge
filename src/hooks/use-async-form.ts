"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncFormStatus = "idle" | "submitting" | "done" | "error";

interface UseAsyncFormOptions {
  /** API route to POST the request body to. */
  url: string;
}

export type AsyncFormSubmitResult<Res> =
  | { ok: true; data: Res }
  | { ok: false; error: string };

interface UseAsyncFormResult<Req, Res> {
  status: AsyncFormStatus;
  error: string | null;
  /**
   * Submit the request. Cancels any in-flight request from a previous call
   * first. Also returns the result directly — use this (not `status`) to
   * branch on the outcome right after awaiting, since `status` is a stale
   * closure value until the component re-renders.
   */
  submit: (body: Req) => Promise<AsyncFormSubmitResult<Res>>;
}

/**
 * Shared submit/status state for a POST-and-wait form, replacing the
 * hand-rolled `useState<"idle"|"submitting"|"done"|"error">` + raw `fetch`
 * pattern duplicated across the site's forms.
 *
 * Cancels the previous in-flight request on unmount or re-submit via
 * AbortController, so a stale response can't overwrite a newer one.
 */
export function useAsyncForm<Req, Res = unknown>(
  { url }: UseAsyncFormOptions
): UseAsyncFormResult<Req, Res> {
  const [status, setStatus] = useState<AsyncFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const submit = useCallback(
    async (body: Req): Promise<AsyncFormSubmitResult<Res>> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus("submitting");
      setError(null);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        const data = (await res.json()) as Res;
        const errorMessage = (data as { error?: unknown })?.error;

        if (controller.signal.aborted) return { ok: false, error: "aborted" };

        if (!res.ok || typeof errorMessage === "string") {
          const message = typeof errorMessage === "string" ? errorMessage : "Something went wrong.";
          setError(message);
          setStatus("error");
          return { ok: false, error: message };
        }

        setStatus("done");
        return { ok: true, data };
      } catch (err: unknown) {
        if (controller.signal.aborted) return { ok: false, error: "aborted" };
        const message = err instanceof Error ? err.message : "Network error. Please try again.";
        setError(message);
        setStatus("error");
        return { ok: false, error: message };
      }
    },
    [url]
  );

  return { status, error, submit };
}
