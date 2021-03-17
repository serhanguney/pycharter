import React from "react";
import { motion } from "framer-motion";
export default function Reveal({ children, delay }) {
  const reveal = {
    overflow: "hidden",
  };
  return (
    <motion.div
      style={reveal}
      initial={{ opacity: 0, y: `100%` }}
      animate={{ opacity: 1, y: "0%" }}
      exit={{ opacity: 0, y: `100%` }}
      transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.9] }}
    >
      {children}
    </motion.div>
  );
}
