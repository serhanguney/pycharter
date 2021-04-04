import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { Portfolio } from "../context";
import Overlay from "../components/Overlay";

export default function About() {
  const {
    motionMenu,
    loadPage,
    pageTransition,
    portfolio: { ease },
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
          <h2>About</h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p>
            A unique blue cruise experience on the magnificent bays and Greek
            islands of the Aegean and Mediterranean Sea
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <p>
            A unique blue cruise experience on the magnificent bays and Greek
            islands of the Aegean and Mediterranean Sea a unique blue cruise
            experience on the magnificent bays and Greek islands of the Aegean
            and Mediterranean Sea
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <p>
            A unique blue cruise experience on the magnificent bays and Greek
            islands of the Aegean and Mediterranean Sea a unique blue cruise
            experience on the magnificent bays and Greek islands of the Aegean
            and Mediterranean Sea
          </p>
        </Reveal>
      </section>
      <section className="visual-content"></section>
    </motion.main>
  );
}
