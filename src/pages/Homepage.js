import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useContext } from "react/cjs/react.development";
import { Portfolio } from "../context";
import { motion } from "framer-motion";
export default function Homepage() {
  const { portfolio } = useContext(Portfolio);
  let descriptionPanel = useRef(null);

  return (
    <main id="homepage">
      {portfolio.loading && <Loading ref={descriptionPanel} />}

      <Navbar />
      <section className="landing-page grid">
        <motion.div
          ref={(el) => (descriptionPanel = el)}
          className="description"
          initial={{ backgroundColor: "rgba(255,255,255,0)" }}
          animate={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          transition={{ delay: 5.5, duration: 0.5 }}
        >
          <div className="text-content">
            <Reveal delay={3}>
              <h2>Ahoy!</h2>
            </Reveal>
            <Reveal delay={3.2}>
              <p>
                A unique blue cruise experience on the magnificent bays and
                Greek islands of the Aegean and Mediterranean Sea
              </p>
            </Reveal>
          </div>
          <Reveal delay={3.5}>
            <button className="secondary-button">Request callback</button>
            <button className="primary-button">
              <Link to="/fleet/eldoris">Go to fleet</Link>
            </button>
          </Reveal>
        </motion.div>
      </section>
    </main>
  );
}
