"use client";

import {
  Briefcase,
  CornerDownLeft,
  Download,
  Github,
  Layers,
  LayoutGrid,
  Linkedin,
  Mail,
  Search,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { useToast } from "@/components/toast";
import { profile } from "@/lib/data";

type Command = {
  id: string;
  label: string;
  group: "Actions" | "Navigate" | "Links";
  icon: LucideIcon;
  keywords: string;
  run: () => void;
};

type PaletteContextValue = { open: () => void };

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function usePalette(): PaletteContextValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used within PaletteProvider");
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {isOpen && <CommandPalette onClose={close} />}
    </PaletteContext.Provider>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function CommandPalette({ onClose }: { onClose: () => void }) {
  const { copyEmail, notify } = useToast();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const downloadResume = useCallback(() => {
    const a = document.createElement("a");
    a.href = profile.resume;
    a.download = profile.resumeFileName;
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    notify("Downloading Resume...");
  }, [notify]);

  const commands = useMemo<Command[]>(
    () => [
      { id: "copy-email", label: "Copy Email", group: "Actions", icon: Mail, keywords: "mail address contact", run: () => void copyEmail() },
      { id: "resume", label: "Download Resume", group: "Actions", icon: Download, keywords: "cv pdf", run: downloadResume },
      { id: "nav-experience", label: "Jump to Experience", group: "Navigate", icon: Briefcase, keywords: "work jobs timeline", run: () => scrollToId("experience") },
      { id: "nav-projects", label: "Jump to Projects", group: "Navigate", icon: LayoutGrid, keywords: "campus connect work", run: () => scrollToId("projects") },
      { id: "nav-skills", label: "Jump to Skills", group: "Navigate", icon: Layers, keywords: "skills tech", run: () => scrollToId("skills") },
      { id: "nav-contact", label: "Jump to Contact", group: "Navigate", icon: Send, keywords: "hire footer phone", run: () => scrollToId("contact") },
      { id: "github", label: "View GitHub", group: "Links", icon: Github, keywords: "code repos", run: () => openExternal(profile.github) },
      { id: "linkedin", label: "View LinkedIn", group: "Links", icon: Linkedin, keywords: "profile social", run: () => openExternal(profile.linkedin) },
    ],
    [copyEmail, downloadResume],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    window.setTimeout(command.run, 60);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[active]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="card w-full max-w-lg overflow-hidden !shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            aria-label="Search commands"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-subtle"
          />
          <span className="kbd">Esc</span>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-subtle">No matching commands</li>}
          {filtered.map((c, i) => {
            const Icon = c.icon;
            const showHeader = i === 0 || filtered[i - 1].group !== c.group;
            const isActive = i === active;
            return (
              <li key={c.id} role="presentation">
                {showHeader && (
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{c.group}</p>
                )}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={isActive}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => execute(c)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                    isActive ? "bg-fg/[0.07] text-fg" : "text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{c.label}</span>
                  {isActive && <CornerDownLeft className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-subtle">
          <span className="flex items-center gap-1.5">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="kbd">↵</span> select
          </span>
        </div>
      </div>
    </div>
  );
}
