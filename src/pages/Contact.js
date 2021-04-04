import React, { useContext } from "react";
import ReactDom from "react-dom";
import contactImage from "../images/homepage.png";
import Reveal from "../components/Reveal";
import Form from "../components/Form/Form";
import { motion } from "framer-motion";
import { Portfolio } from "../context";
import { useEffect } from "react/cjs/react.development";

export default function Contact() {
  const {
    motionMenu,
    loadPage,
    pageTransition,
    portfolio: { ease },
  } = useContext(Portfolio);

  useEffect(() => pageTransition(), []);

  return (
    <motion.main id="contact" className="grid" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
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
        ></motion.div>,
        document.getElementById("portal")
      )}
      <div className="text-content">
        <Reveal delay={0.2}>
          <h2>Contact</h2>
        </Reveal>
        <Form />
      </div>
      <div className="visual-content">
        <div className="image-container">
          {/* <img src={contactImage} alt="contact" /> */}
        </div>
      </div>
    </motion.main>
  );
}
