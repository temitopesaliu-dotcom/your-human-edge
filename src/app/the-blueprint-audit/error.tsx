"use client";

import ErrorFallback from "@/components/error-fallback";

export default function BlueprintAuditError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      reset={reset}
      title="This page hit a snag."
      message="Try again — your application progress is safe."
    />
  );
}
