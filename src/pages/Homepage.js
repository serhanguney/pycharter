import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import Reveal from "../components/Reveal";
import Overlay from "../components/Overlay";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import { motion } from "framer-motion";
export default function Homepage() {
  const { loadPage, pageTransition, motionMenu, portfolio } = useContext(
    Portfolio
  );

  useEffect(() => pageTransition(), []);
  // function handleLanguage() {
  //   setPortfolio({ ...portfolio, language: "tur" });
  // }

  return (
    <motion.main id="homepage" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
        <Overlay loadPage={loadPage} ease={portfolio.ease} />,
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
              <Link to="/fleet">
                <button className="primary-button">Go to fleet</button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.main>
  );
}
