import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import { motion } from "framer-motion";
import content from "../content/content";
export default function Homepage() {
  const {
    loadPage,
    pageTransition,
    motionMenu,
    setPortfolio,
    portfolio,
  } = useContext(Portfolio);

  useEffect(() => pageTransition(), []);
  // function handleLanguage() {
  //   setPortfolio({ ...portfolio, language: "tur" });
  // }

  return (
    <motion.main id="homepage" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
        <motion.div
          className="page__background"
          initial={{ width: "100%" }}
          animate={loadPage}
          exit={{
            width: "100%",
            left: [-100, 0],
            skewX: [0, -3, 0],
            transition: { duration: 1.2, ease: portfolio.ease },
          }}
        ></motion.div>,
        document.getElementById("portal")
      )}

      <section className="landing-page grid">
        <div className="description">
          <div className="text-content">
            <Reveal>
              <h2>Ahoy!</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                A unique blue cruise experience on the magnificent bays and
                Greek islands of the Aegean and Mediterranean Sea
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.5}>
            <div className="button-container">
              <button className="secondary-button">
                <Link to="/contact">Request callback</Link>
              </button>
              <button className="primary-button">
                <Link to="/fleet">Go to fleet</Link>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.main>
  );
}
