import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * yahong tour 브랜드 마크.
 * icon.svg(파비콘)와 동일한 디자인 — 단청 브릭 배경 + 아이보리 세리프 이탤릭 y.
 */
export default function BrandMark({ size = 40, className }: BrandMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="yahong tour"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect width="512" height="512" rx="72" fill="#9C4A3B" />
      <text
        x="256"
        y="360"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Georgia', serif"
        fontSize="380"
        fontWeight="500"
        fontStyle="italic"
        fill="#FAF7F2"
      >
        y
      </text>
    </svg>
  );
}
