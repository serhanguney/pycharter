import React from "react";
import { motion } from "framer-motion";
export default function Reveal({ children, delay }) {
  const reveal = {
    display: "inline-block",
    width: "100%",
    margin: 0,
    overflow: "hidden",
  };
  return (
    <motion.span
      style={reveal}
      initial={{ opacity: 0, y: `100%`, skewY: 3 }}
      animate={{ opacity: 1, y: "0%", skewY: 0 }}
      exit={{ opacity: 0, y: `100%`, skewY: 3 }}
      transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.9], delay: delay }}
    >
      {children}
    </motion.span>
  );
}
