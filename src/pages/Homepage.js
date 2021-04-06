import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import Reveal from "../components/Reveal";
import Overlay from "../components/Overlay";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import { motion } from "framer-motion";
import { content } from "../content/content";
export default function Homepage() {
  const { loadPage, pageTransition, motionMenu, portfolio } = useContext(
    Portfolio
  );

  useEffect(() => pageTransition(), []);

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
              <h2>{content[portfolio.language].homepage.description.title}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                {content[portfolio.language].homepage.description.paragraph}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.5}>
            <div className="button-container">
              <button className="secondary-button">
                <Link to="/contact">
                  {content[portfolio.language].homepage.buttons.secondary}
                </Link>
              </button>
              <Link to="/fleet">
                <button className="primary-button">
                  {content[portfolio.language].homepage.buttons.primary}
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.main>
  );
}
