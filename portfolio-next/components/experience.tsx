"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";
import { experience } from "@/lib/data";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section id="experience" eyebrow="01 / Experience" title="Where I have shipped">
      <ol ref={listRef} className="relative ml-1.5 border-l border-line">
        <motion.span
          aria-hidden="true"
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-400 to-indigo-400/40 shadow-[0_0_8px_rgb(var(--accent)/0.55)]"
        />

        {experience.map((role, i) => {
          const dimmed = hovered !== null && hovered !== i;
          return (
            <li
              key={role.company}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`relative pl-6 sm:pl-8 ${i === experience.length - 1 ? "" : "pb-6"}`}
            >
              <span aria-hidden="true" className="absolute -left-[6px] top-7 flex h-[11px] w-[11px]">
                {role.current ? (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-50" />
                    <span className="relative inline-flex h-[11px] w-[11px] rounded-full bg-live shadow-[0_0_12px_rgb(var(--live)/0.8)]" />
                  </>
                ) : (
                  <span className="inline-flex h-[11px] w-[11px] rounded-full border border-line-strong bg-bg" />
                )}
              </span>

              <div className={`transition-opacity duration-200 ${dimmed ? "opacity-60" : "opacity-100"}`}>
                <Reveal>
                  <SpotlightCard as="article" className="group p-5 sm:p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                        {role.company}
                        {role.current && <span className="sr-only"> (current role)</span>}
                      </h3>
                      <p className="font-mono text-xs text-subtle sm:text-right">
                        {role.period}
                        {role.type && <span className="ml-1.5 text-accent">[{role.type}]</span>}
                      </p>
                    </div>
                    <p className="mt-0.5 flex items-center gap-2 text-sm text-muted">
                      {role.title}
                      {role.current && (
                        <span className="rounded-full border border-live/30 bg-live/10 px-2 py-px font-mono text-[10px] uppercase tracking-wider text-live">
                          Current
                        </span>
                      )}
                    </p>

                    <ul className="mt-4 space-y-2.5">
                      {role.bullets.map((b) => (
                        <li key={b} className="relative pl-4 text-[15px] leading-relaxed text-muted">
                          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2 bg-accent/50" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${role.company}`}>
                      {role.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
