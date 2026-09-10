"use client";

import { useState } from "react";

/**
 * Renders an <img> with lazy loading and proper decoding that swaps to a
 * fallback node when the source fails to load.
 */
export function ImgWithFallback({
  src,
  alt,
  className,
  fallback,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
