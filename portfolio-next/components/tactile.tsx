"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const SPRING = { type: "spring", stiffness: 480, damping: 30, mass: 0.6 } as const;

type Props = {
  children: ReactNode;
  className?: string;
};

/** Spring hover lift and press feedback for buttons and links. */
export function Tactile({ children, className = "" }: Props) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
    >
      {children}
    </motion.span>
  );
}
