"use client";

import ErrorFallback from "@/components/error-fallback";

export default function IntelError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      reset={reset}
      title="The quiz hit a snag."
      message="Your answers weren't lost. Try again to continue where you left off."
    />
  );
}
