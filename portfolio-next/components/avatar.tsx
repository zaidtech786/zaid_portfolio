"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/lib/data";

export function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-[84px] w-[84px]">
      <div
        aria-hidden="true"
        className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-tr from-indigo-500/30 via-cyan-400/20 to-violet-500/30 blur-xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-full bg-surface ring-2 ring-accent/40 ring-offset-4 ring-offset-bg">
        {failed ? (
          <div
            role="img"
            aria-label={`${profile.name} monogram`}
            className="flex h-full w-full items-center justify-center font-mono text-2xl font-medium text-muted"
          >
            {profile.monogram}
          </div>
        ) : (
          <Image
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="84px"
            className="object-cover object-top"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5" title="Available for work">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" aria-hidden="true" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-live ring-2 ring-bg" />
        <span className="sr-only">Available for work</span>
      </span>
    </div>
  );
}
