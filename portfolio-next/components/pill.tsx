"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING } from "@/components/tactile";

type Props = {
  children: ReactNode;
  color?: string;
};

export function Pill({ children, color }: Props) {
  return (
    <motion.li className="tag cursor-default" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={SPRING}>
      {color && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}99` }}
        />
      )}
      {children}
    </motion.li>
  );
}
