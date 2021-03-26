import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Menu({ close, menuOpen }) {
  const options = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/fleet",
      name: "Fleet",
    },

    {
      path: "/contact",
      name: "Contact",
    },
  ];
  const menuVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
  return (
    <div id="menu" className={menuOpen ? "active" : "inactive"}>
      {options.map((item, index) => (
        <motion.p
          key={index}
          onClick={close}
          initial="initial"
          animate={menuOpen ? "animate" : "initial"}
          variants={menuVariants}
        >
          <Link to={item.path}>{item.name}</Link>
        </motion.p>
      ))}
    </div>
  );
}
