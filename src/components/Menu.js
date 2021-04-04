import React from "react";
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
        <p key={index} onClick={close}>
          <Link to={item.path}>{item.name}</Link>
        </p>
      ))}
      <div className="media__icons">
        <Instagram />
        <Facebook />
      </div>
    </motion.div>
  );
}
