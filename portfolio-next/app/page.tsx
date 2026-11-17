import { CursorGlow } from "@/components/cursor-glow";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="ambient" aria-hidden="true" />
      <CursorGlow />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero />
        <Experience />
        <Projects />
        <Stack />
        <Footer />
      </main>
    </div>
  );
}
