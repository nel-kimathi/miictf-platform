"use client";

import { ImgWithFallback } from "./img-with-fallback";

interface Brand {
  name: string;
  image?: string;
  href?: string;
}

export function BrandCarousel({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;

  const doubled = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      {/* Scrolling track */}
      <div className="flex w-max animate-scroll gap-12 px-6">
        {doubled.map((brand, i) => {
          const img = brand.image ? (
            <ImgWithFallback
              src={brand.image}
              alt={`${brand.name} logo`}
              className="h-14 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              fallback={
                <span className="text-lg font-semibold text-muted-foreground/70">
                  {brand.name}
                </span>
              }
            />
          ) : (
            <span className="text-lg font-semibold text-muted-foreground/70">
              {brand.name}
            </span>
          );

          return brand.href ? (
            <a
              key={`${brand.name}-${i}`}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center"
            >
              {img}
            </a>
          ) : (
            <div key={`${brand.name}-${i}`} className="flex shrink-0 items-center">
              {img}
            </div>
          );
        })}
      </div>
    </div>
  );
}
