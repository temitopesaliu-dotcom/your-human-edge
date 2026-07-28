"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AsyncFormStatus = "idle" | "submitting" | "done" | "error";

interface UseAsyncFormOptions {
  /** API route to POST the request body to. */
  url: string;
}

interface UseAsyncFormResult<Req> {
  status: AsyncFormStatus;
  error: string | null;
  /** Submit the request. Cancels any in-flight request from a previous call first. */
  submit: (body: Req) => Promise<void>;
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
): UseAsyncFormResult<Req> {
  const [status, setStatus] = useState<AsyncFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const submit = useCallback(
    async (body: Req) => {
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

        if (controller.signal.aborted) return;

        if (!res.ok || typeof errorMessage === "string") {
          setError(typeof errorMessage === "string" ? errorMessage : "Something went wrong.");
          setStatus("error");
          return;
        }

        setStatus("done");
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Network error. Please try again.");
        setStatus("error");
      }
    },
    [url]
  );

  return { status, error, submit };
}
