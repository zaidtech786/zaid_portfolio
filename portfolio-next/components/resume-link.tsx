"use client";

import type { ReactNode } from "react";
import { useToast } from "@/components/toast";
import { Tactile } from "@/components/tactile";
import { profile } from "@/lib/data";

type Props = {
  className?: string;
  children: ReactNode;
};

export function ResumeLink({ className, children }: Props) {
  const { notify } = useToast();

  return (
    <Tactile>
      <a
        href={profile.resume}
        download={profile.resumeFileName}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => notify("Downloading Resume...")}
        className={className}
      >
        {children}
      </a>
    </Tactile>
  );
}
