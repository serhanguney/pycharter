import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { Portfolio } from "../context";
import Overlay from "../components/Overlay";
import { content } from "../content/content";

export default function About() {
  const {
    motionMenu,
    loadPage,
    pageTransition,
    portfolio: { ease },
    portfolio,
  } = useContext(Portfolio);

  useEffect(() => pageTransition(), []);
  return (
    <motion.main id="about" className="grid" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
        <Overlay loadPage={loadPage} ease={ease} />,
        document.getElementById("portal")
      )}
      <section className="text-content">
        <Reveal delay={0.5}>
          <h2>{content[portfolio.language].about.title}</h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p>{content[portfolio.language].about.paragraph1}</p>
        </Reveal>
        <Reveal delay={0.5}>
          <p>{content[portfolio.language].about.paragraph2}</p>
        </Reveal>
        <Reveal delay={0.5}>
          <p>{content[portfolio.language].about.paragraph3}</p>
        </Reveal>
      </section>
      <section className="visual-content"></section>
    </motion.main>
  );
}
