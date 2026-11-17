"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

type Props = {
  variant: "desktop" | "mobile";
};

export function NavLinks({ variant }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const targets = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const current = hovered ?? active;
  const listClass =
    variant === "desktop"
      ? "hidden items-center md:flex"
      : "flex items-center justify-between px-3 py-1";

  return (
    <ul className={listClass} onMouseLeave={() => setHovered(null)}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            aria-current={active === link.href ? "location" : undefined}
            onMouseEnter={() => setHovered(link.href)}
            onFocus={() => setHovered(link.href)}
            onBlur={() => setHovered(null)}
            onClick={() => setActive(link.href)}
            className={`relative block rounded-full text-muted transition-colors duration-150 hover:text-fg ${
              variant === "desktop" ? "px-3 py-1.5 text-sm" : "px-2 py-1.5 text-[13px]"
            } ${current === link.href ? "!text-fg" : ""}`}
          >
            {current === link.href && (
              <motion.span
                layoutId={`nav-pill-${variant}`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent/15"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
