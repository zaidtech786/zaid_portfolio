"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePalette } from "@/components/command-palette";

export function PaletteButton() {
  const { open } = usePalette();
  const [mod, setMod] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.platform)) setMod("⌘");
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command menu"
      aria-keyshortcuts="Control+K Meta+K"
      className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-2.5 text-sm text-muted transition-colors duration-150 ease-out hover:border-accent/40 hover:text-fg sm:pl-3 sm:pr-2"
    >
      <Search className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Search</span>
      <span className="hidden items-center gap-1 sm:flex" aria-hidden="true">
        <span className="kbd">{mod}</span>
        <span className="kbd">K</span>
      </span>
    </button>
  );
}
