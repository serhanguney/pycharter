import React, { useContext } from "react";
import contactImage from "../images/homepage.png";
import Reveal from "../components/Reveal";
import Form from "../components/Form/Form";
import { motion } from "framer-motion";
import { Portfolio } from "../context";

export default function Contact() {
  const { motionMenu } = useContext(Portfolio);
  const pageLoader = {
    initial: { y: "0%" },
    animate: {
      y: "100%",
      transition: { duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] },
    },
    exit: {
      y: "0%",
      transition: { duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] },
    },
  };

  return (
    <motion.main id="contact" className="grid" style={{ y: motionMenu }}>
      <div className="text-content">
        <Reveal>
          <h2>Contact</h2>
        </Reveal>
        <Form />
      </div>
      <div className="visual-content">
        <div className="image-container">
          <motion.div
            className="overlay"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageLoader}
          ></motion.div>
          <img src={contactImage} alt="contact" />
        </div>
      </div>
    </motion.main>
  );
}
