import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import Reveal from "../components/Reveal";
import Form from "../components/Form/Form";
import { motion } from "framer-motion";
import { Portfolio } from "../context";
import Overlay from "../components/Overlay";
import { content } from "../content/content";

export default function Contact() {
  const {
    motionMenu,
    loadPage,
    pageTransition,
    portfolio: { ease, language },
  } = useContext(Portfolio);

  useEffect(() => pageTransition(), []);

  return (
    <motion.main id="contact" className="grid" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
        <Overlay loadPage={loadPage} ease={ease} />,
        document.getElementById("portal")
      )}
      <div className="text-content">
        <Reveal delay={0.2}>
          <h2>{content[language].contact.title}</h2>
        </Reveal>
        <Form />
      </div>
      <div className="visual-content">
        <div className="image-container"></div>
      </div>
    </motion.main>
  );
}
