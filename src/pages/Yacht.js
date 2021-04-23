import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import SubPanel from "../components/fleet/SubPanel";
import Slider from "../components/fleet/Slider";
import { fleet } from "../boats/boats";
import { useParams } from "react-router-dom";
import Reviews from "../components/fleet/Reviews";
import CallToAction from "../components/fleet/CallToAction";
import OtherBoats from "../components/fleet/OtherBoats";
import Features from "../components/fleet/Features";
import { Portfolio } from "../context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import Overlay from "../components/Overlay";
import mobileLanding from "../images/mobileYachtLanding.jpg";
import desktopLanding from "../images/aboutCover.jpg";
import { content } from "../content/content";
import Footer from "../components/Footer";

export default function Yacht() {
  const {
    portfolio,
    motionMenu,
    loadPage,
    pageTransition,
    dimensions: { width },
  } = useContext(Portfolio);
  const { boat } = useParams();
  const activeBoat = fleet.find(
    (item) => item[portfolio.language].name.toLowerCase() === boat
  );
  const {
    title,
    subTitle,
    paragraph,
    description,
    specs,
    features,
  } = activeBoat[portfolio.language];
  const { coverImage, images } = activeBoat;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    pageTransition();
  }, []);

  return (
    <motion.main id="yacht" style={{ y: motionMenu }}>
      {ReactDom.createPortal(
        <Overlay loadPage={loadPage} ease={portfolio.ease} />,
        document.getElementById("portal")
      )}
      <section id="landing-page" className="grid">
        <img src={width < 620 ? mobileLanding : desktopLanding} alt="landing" />
        <div className="description">
          <div className="text-content">
            <Reveal delay={0.2}>
              <h1>{title}</h1>
            </Reveal>
            <Reveal delay={0.4}>
              <h2>{subTitle}</h2>
            </Reveal>
            <Reveal delay={0.6}>
              <p>{paragraph}</p>
            </Reveal>

            <ul>
              <Reveal delay={0.4}>
                <li>{specs.length}</li>
              </Reveal>
              <Reveal delay={0.5}>
                <li>{specs.capacity}</li>
              </Reveal>
              <Reveal delay={0.6}>
                <li>{specs.wc}</li>
              </Reveal>
              <Reveal delay={0.7}>
                <li>{specs.additionals}</li>
              </Reveal>
            </ul>
          </div>
          <Reveal delay={0.4}>
            <div className="button-container">
              <button className="secondary-button">
                <Link to="/contact">
                  {content[portfolio.language].yacht.buttons.secondary}
                </Link>
              </button>
              {/* <button className="primary-button">
                {content[portfolio.language].yacht.buttons.primary}
              </button> */}
            </div>
          </Reveal>
        </div>
        <SubPanel />
      </section>
      <section id="description" className="grid">
        <div className="text-content">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
          <ul>
            {specs.staff !== "" ? (
              <li>
                <span />
                {specs.staff}
              </li>
            ) : null}
            <li>
              <span />
              {specs.capacity}
            </li>
            <li>
              <span />
              {specs.length}
            </li>
            <li>
              <span />
              {specs.motor}
            </li>
            <li>
              <span />
              {specs.fuel}
            </li>
          </ul>
          <p>{description}</p>
        </div>
        <div className="visual-content">
          <img src={coverImage} alt="coverImage" />
        </div>
      </section>
      <Features features={features} />
      <CallToAction />
      <section id="exterior" className="grid">
        <span className="title">
          <h1>{content[portfolio.language].yacht.exterior}</h1>
        </span>
        <Slider images={images.exterior} />
      </section>
      {/* <Reviews /> */}
      <section id="interior" className="grid">
        <span className="title">
          <h1>{content[portfolio.language].yacht.interior}</h1>
        </span>
        <Slider images={images.interior} />
      </section>
      <CallToAction />
      <OtherBoats />
      <Footer />
    </motion.main>
  );
}
