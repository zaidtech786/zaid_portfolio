"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Pill } from "@/components/pill";
import { ResumeLink } from "@/components/resume-link";
import { Tactile } from "@/components/tactile";
import { heroTech, profile } from "@/lib/data";
import { techColor } from "@/lib/tech";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
};

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-20 pt-32 sm:pb-28 sm:pt-44">
      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div variants={item}>
          <Avatar />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-7 rounded-full border border-line bg-surface/50 px-3.5 py-1 font-mono text-xs text-muted backdrop-blur-md"
        >
          {profile.status} · {profile.location}
        </motion.p>

        <motion.h1 variants={item} id="hero-title" className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          <span className="text-fg">{profile.name}</span>
          <span className="text-gradient mt-2 block pb-1 text-2xl font-semibold sm:text-4xl">{profile.role}</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.bio}
        </motion.p>

        <motion.ul variants={item} aria-label="Core technologies" className="mt-7 flex flex-wrap justify-center gap-2">
          {heroTech.map((t) => (
            <Pill key={t} color={techColor(t)}>
              {t}
            </Pill>
          ))}
        </motion.ul>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ResumeLink className="btn-glow btn">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </ResumeLink>
          <CopyEmailButton />
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
        </motion.div>
      </motion.div>
    </section>
  );
}
