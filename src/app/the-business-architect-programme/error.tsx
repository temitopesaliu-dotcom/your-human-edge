"use client";

import ErrorFallback from "@/components/error-fallback";

export default function BusinessArchitectError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      reset={reset}
      title="This page hit a snag."
      message="Try again — if the issue persists, reach out and we'll get you sorted."
    />
  );
}
