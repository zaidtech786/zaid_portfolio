import { Github } from "lucide-react";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";
import { Tactile } from "@/components/tactile";
import { campusConnect, workModules } from "@/lib/data";
import { techColor } from "@/lib/tech";

function Pills({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((t) => (
        <Pill key={t} color={techColor(t)}>
          {t}
        </Pill>
      ))}
    </ul>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="02 / Projects" title="Selected work">
      <div className="grid gap-4">
        <Reveal>
          <SpotlightCard as="article" labelledBy="p-campus" className="p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Featured · {campusConnect.kicker}</p>
            <h3 id="p-campus" className="mt-2 text-2xl font-semibold tracking-tight">
              {campusConnect.title}
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">Problem</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{campusConnect.problem}</p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">Solution</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{campusConnect.solution}</p>
              </div>
            </div>

            <h4 className="mt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">Implementation</h4>
            <ul className="mt-3 space-y-2.5">
              {campusConnect.implementation.map((point) => (
                <li key={point} className="relative pl-4 text-[15px] leading-relaxed text-muted">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2 bg-accent/50" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <Pills items={campusConnect.tech} label="Campus Connect tech stack" />
              <Tactile>
                <a
                  href={campusConnect.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !h-9 !px-3"
                  aria-label="Campus Connect GitHub repository"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub Repo
                </a>
              </Tactile>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.06}>
          <SpotlightCard as="section" labelledBy="p-work" className="p-6 sm:p-8">
            <h3 id="p-work" className="text-lg font-semibold tracking-tight">
              Enterprise &amp; Open-Source Work
            </h3>
            <p className="mt-1 text-sm text-subtle">Modules I have built across production and team codebases.</p>

            <ul className="mt-6 divide-y divide-[var(--line)]">
              {workModules.map((m) => (
                <li key={m.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h4 className="text-[15px] font-medium">{m.title}</h4>
                    <p className="font-mono text-xs text-subtle sm:text-right">{m.context}</p>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted">{m.description}</p>
                  <div className="mt-3">
                    <Pills items={m.tech} label={`${m.title} technologies`} />
                  </div>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
