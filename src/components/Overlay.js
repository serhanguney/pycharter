import React from "react";
import { motion } from "framer-motion";

export default function Overlay({ loadPage, ease }) {
  return (
    <motion.div
      className="page__background"
      initial={{ width: "100%" }}
      animate={loadPage}
      exit={{
        width: "100%",
        left: [-100, 0],
        skewX: [0, -3, 0],
        transition: { duration: 1.2, ease: ease },
      }}
    >
      <motion.h3
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: { duration: 1.2, ease: ease },
        }}
        exit={{ opacity: [0, 0, 1], transition: { duration: 1.2, ease: ease } }}
      >
        Private Yacht Charter
      </motion.h3>
    </motion.div>
  );
}
