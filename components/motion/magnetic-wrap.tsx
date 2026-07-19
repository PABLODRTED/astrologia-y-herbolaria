"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PULL_RATIO = 0.3;
const SPRING = { stiffness: 150, damping: 20 };

type MagneticWrapProps = {
  children: React.ReactNode;
  className?: string;
};

export function MagneticWrap({ children, className }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * PULL_RATIO);
    y.set((event.clientY - bounds.top - bounds.height / 2) * PULL_RATIO);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
