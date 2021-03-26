import React from "react";
import { motion } from "framer-motion";
export default function Reveal({ children, delay, direction, complete }) {
  const positiveDirection = {
    initial: {
      opacity: 0,
      y: `100%`,
      skewY: 3,
    },
    animate: {
      opacity: 1,
      y: "0%",
      skewY: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.9],
        delay: delay,
        onComplete: () => complete(true),
      },
    },
    exit: {
      opacity: 0,
      y: `100%`,
      skewY: 3,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.9],
      },
    },
  };
  const negativeDirection = {
    initial: {
      y: `0%`,
      skewY: 0,
    },
    animate: {
      y: "100%",
      skewY: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.9],
        delay: delay,
        backgroundColor: { duration: 0.5, delay: 0 },
        onComplete: () => complete(true),
      },
    },
    exit: {
      y: `0%`,
      skewY: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.9],
      },
    },
  };
  return (
    <div className="reveal-container">
      <motion.span
        initial="initial"
        animate="animate"
        exit="exit"
        variants={direction > 0 ? positiveDirection : negativeDirection}
      >
        {children}
      </motion.span>
    </div>
  );
}

Reveal.defaultProps = {
  direction: 1,
  delay: 0,
  complete: () => null,
};
