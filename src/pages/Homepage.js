import React from "react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { Portfolio } from "../context";
import { motion } from "framer-motion";
export default function Homepage() {
  const {
    portfolio: { motionProps },
    motionMenu,
  } = useContext(Portfolio);

  const ease = [0.65, 0.05, 0.36, 1];
  console.log(window.innerHeight, motionProps.gridCount);
  const xOffset =
    (window.innerWidth / motionProps.gridCount) * motionProps.column;

  const pageLoaders = {
    parent: {
      initial: {
        backgroundColor: "#EDFCFF",
        x: xOffset * -1,
        y: motionProps.y * -1,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      animate: {
        backgroundColor: "#ffffffbb",
        x: 0,
        y: 0,
        width: (window.innerWidth / motionProps.gridCount) * motionProps.span,
        height: 400,
        transition: {
          duration: motionProps.duration,
          delay: motionProps.delay,
          ease: ease,
        },
      },
      exit: {
        backgroundColor: "#EDFCFF",
        x: xOffset * -1,
        y: motionProps.y * -1,
        width: window.innerWidth,
        height: window.innerHeight,
        transition: {
          duration: motionProps.duration,
          ease: ease,
          delay: 0.3,
        },
      },
    },
    child: {
      initial: {
        marginLeft: xOffset,
        marginTop: motionProps.y,
      },
      animate: {
        marginLeft: 0,
        marginTop: 0,
        transition: {
          duration: motionProps.duration,
          delay: motionProps.delay,
          ease: ease,
        },
      },
    },
  };

  return (
    <motion.main id="homepage" style={{ y: motionMenu }}>
      <section className="landing-page grid">
        <motion.div
          className="description"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageLoaders.parent}
        >
          <motion.div className="text-content" variants={pageLoaders.child}>
            <Reveal>
              <h2>Ahoy!</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                A unique blue cruise experience on the magnificent bays and
                Greek islands of the Aegean and Mediterranean Sea
              </p>
            </Reveal>
          </motion.div>
          <Reveal delay={2.5}>
            <div className="button-container">
              <button className="secondary-button">Request callback</button>
              <button className="primary-button">
                <Link to="/fleet/eldoris">Go to fleet</Link>
              </button>
            </div>
          </Reveal>
        </motion.div>
      </section>
    </motion.main>
  );
}
