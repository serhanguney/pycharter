import React, { useContext } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { Portfolio } from "../context";

export default function About() {
  const { motionMenu } = useContext(Portfolio);
  return (
    <motion.main id="about" className="grid" style={{ y: motionMenu }}>
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
