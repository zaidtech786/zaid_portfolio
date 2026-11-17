import { Cloud, Database, LayoutDashboard, Server, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";
import { stack } from "@/lib/data";
import { techColor } from "@/lib/tech";

const CATEGORY: Record<string, { icon: LucideIcon; color: string }> = {
  "Backend & APIs": { icon: Server, color: "#22D3EE" },
  "Frontend & Mobile": { icon: LayoutDashboard, color: "#60A5FA" },
  "Databases & Caching": { icon: Database, color: "#818CF8" },
  "AI Integration & DevOps": { icon: Sparkles, color: "#A78BFA" },
};

const FALLBACK = { icon: Cloud, color: "#22D3EE" };

export function Stack() {
  return (
    <Section id="skills" eyebrow="03 / Skills" title="Tools I work with">
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.map((group, i) => {
          const { icon: Icon, color } = CATEGORY[group.title] ?? FALLBACK;
          return (
            <Reveal key={group.title} delay={(i % 2) * 0.06}>
              <SpotlightCard className="h-full p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg border"
                    style={{ color, borderColor: `${color}40`, background: `${color}14` }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight">{group.title}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={group.title}>
                  {group.items.map((item) => (
                    <Pill key={item} color={techColor(item, color)}>
                      {item}
                    </Pill>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
