"use client";

import { useRef } from "react";
import type { ElementType, PointerEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  labelledBy?: string;
};

export function SpotlightCard({ children, className = "", as, labelledBy }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} aria-labelledby={labelledBy} className={`spotlight-card ${className}`}>
      {children}
    </Tag>
  );
}
