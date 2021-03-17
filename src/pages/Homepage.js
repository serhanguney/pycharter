import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import gsap, { Expo } from "gsap";

export default function Homepage() {
  useEffect(() => {
    gsap.from(".description", {
      opacity: 0,
      // height: 0,
      ease: Expo.easeInOut,
      duration: 1.2,
    });
  }, []);
  return (
    <main id="homepage">
      <Navbar />
      <section className="landing-page grid">
        <div className="description">
          <div className="text-content">
            <Reveal delay={0.6}>
              <h2>Ahoy!</h2>
            </Reveal>
            <Reveal delay={0.8}>
              <p>
                A unique blue cruise experience on the magnificent bays and
                Greek islands of the Aegean and Mediterranean Sea
              </p>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <button className="secondary-button">Request callback</button>
            <button className="primary-button">
              <Link to="/fleet/eldoris">Go to fleet</Link>
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
