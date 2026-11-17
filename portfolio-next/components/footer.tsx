import { Github, Linkedin, Phone } from "lucide-react";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { Tactile } from "@/components/tactile";
import { closingLine, profile } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-line py-16 sm:py-24">
      <Reveal>
        <p className="section-label">04 / Contact</p>
        <h2 id="contact-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s build something reliable.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{closingLine}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmailButton variant="inline" />
          <Tactile>
            <a href={profile.phoneHref} className="btn-ghost font-mono">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {profile.phone}
            </a>
          </Tactile>
          <Tactile>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="icon-btn">
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </Tactile>
          <Tactile>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="icon-btn">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          </Tactile>
        </div>
      </Reveal>

      <p className="mt-16 font-mono text-xs text-subtle">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
