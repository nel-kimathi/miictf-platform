"use client";

import { useState } from "react";

/**
 * Renders an <img> that swaps to a fallback node when the source fails to
 * load (e.g. image file not added yet). Keeps server components free of
 * event handlers while still showing graceful placeholders.
 */
export function ImgWithFallback({
  src,
  alt,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
