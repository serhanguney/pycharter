import React from "react";
import { motion } from "framer-motion";

export default function Pagination({ slide, array }) {
  const paginationVariants = {
    initial: {
      scale: 1,
      backgroundColor: "#ffffff",
    },
    animate: {
      scale: 1.3,
      backgroundColor: "#0092b2",
    },
  };
  return (
    <div className="pagination">
      {array.map((el, i) => (
        <motion.span
          custom={i}
          initial="initial"
          animate={i === slide.no ? "animate" : "initial"}
          variants={paginationVariants}
          transition={{ duration: 0.4, ease: [0.68, -0.55, 0.27, 1.55] }}
          key={i}
          name={el}
        ></motion.span>
      ))}
    </div>
  );
}
