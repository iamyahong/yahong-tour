"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  moduleId: string;
};

export default function ModuleImage({ src, alt, moduleId }: Props) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <span
          className="font-en-body text-[11px] tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          {moduleId}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      loading="lazy"
    />
  );
}
