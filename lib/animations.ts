import { Variants } from "framer-motion";

export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

export const stagger: Variants = {
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};