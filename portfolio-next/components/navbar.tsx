import { Download } from "lucide-react";
import { NavLinks } from "@/components/nav-links";
import { PaletteButton } from "@/components/palette-button";
import { ResumeLink } from "@/components/resume-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/data";

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-4">
      <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-line bg-surface/70 shadow-[0_10px_40px_-14px_rgb(0_0_0/0.55)] backdrop-blur-md md:rounded-full">
        <nav aria-label="Primary" className="flex h-12 items-center justify-between pl-3 pr-2 md:pl-4">
          <a href="#top" aria-label={`${profile.name} — back to top`} className="flex items-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-[11px] font-medium">
              {profile.monogram}
            </span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <NavLinks variant="desktop" />
            <PaletteButton />
            <ThemeToggle />
            <ResumeLink className="btn-glow inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Resume
            </ResumeLink>
          </div>
        </nav>
        <nav aria-label="Sections" className="border-t border-line md:hidden">
          <NavLinks variant="mobile" />
        </nav>
      </div>
    </header>
  );
}
