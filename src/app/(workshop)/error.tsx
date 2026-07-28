"use client";

import ErrorFallback from "@/components/error-fallback";

export default function WorkshopError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      reset={reset}
      title="The workshop page hit a snag."
      message="Try again — if this keeps happening, reach out and we'll get you sorted."
    />
  );
}
