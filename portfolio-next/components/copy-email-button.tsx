"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tactile } from "@/components/tactile";
import { useToast } from "@/components/toast";
import { profile } from "@/lib/data";

type Props = {
  variant?: "secondary" | "inline";
};

export function CopyEmailButton({ variant = "secondary" }: Props) {
  const { copyEmail } = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onClick = async () => {
    const ok = await copyEmail();
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "inline") {
    return (
      <Tactile>
        <button
          type="button"
          onClick={onClick}
          aria-label={`Copy email address ${profile.email}`}
          className="group inline-flex h-10 items-center gap-2.5 rounded-lg border border-line bg-surface px-4 font-mono text-sm transition-colors duration-150 ease-out hover:border-line-strong"
        >
          <Mail className="h-4 w-4 text-muted" aria-hidden="true" />
          <span>{profile.email}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-subtle transition-colors duration-150 group-hover:text-fg" aria-hidden="true" />
          )}
        </button>
      </Tactile>
    );
  }

  return (
    <Tactile>
      <button type="button" onClick={onClick} className="btn-ghost min-w-[8.5rem]" aria-label="Copy email address">
        {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy Email"}
      </button>
    </Tactile>
  );
}
