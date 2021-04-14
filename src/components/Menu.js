import React from "react";
import Language from "./Language";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Facebook from "../icons/facebook";
import Instagram from "../icons/instagram";

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
      transition: { duration: 1.2 },
    },
  };
  return (
    <motion.div
      id="menu"
      className={menuOpen ? "active" : "inactive"}
      initial="initial"
      animate={menuOpen ? "animate" : "initial"}
      variants={menuVariants}
    >
      {options.map((item, index) => (
        <Link key={index} to={item.path} onClick={close}>
          {item.name}
        </Link>
      ))}

      <div className="media__icons">
        <Language />
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>
      </div>
    </motion.div>
  );
}
