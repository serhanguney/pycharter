import React from "react";
import { motion } from "framer-motion";

export default function Modal({ children, close }) {
  return (
    <motion.div
      className="modal-container"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ type: "spring", stiffness: 270, damping: 27 }}
    >
      <div className="modal-overlay" onClick={() => close()}></div>
      <div className="modal">{children}</div>
    </motion.div>
  );
}
