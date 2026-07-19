"use client";

import { motion, type Variants } from "framer-motion";

const REVEAL_TRANSITION = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: REVEAL_TRANSITION },
};

type StaggerGridProps = {
  children: React.ReactNode;
  className?: string;
};

type StaggerItemProps = StaggerGridProps & {
  hoverLift?: boolean;
};

export function StaggerGrid({ children, className }: StaggerGridProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, hoverLift = false }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      whileHover={hoverLift ? { y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } } : undefined}
    >
      {children}
    </motion.div>
  );
}
