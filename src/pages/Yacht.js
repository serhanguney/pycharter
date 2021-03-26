import React, { useContext } from "react";
import SubPanel from "../components/fleet/SubPanel";
import Slider from "../components/fleet/Slider";
import { fleet } from "../boats/boats";
import { useParams } from "react-router-dom";
import Reviews from "../components/fleet/Reviews";
import CallToAction from "../components/fleet/CallToAction";
import OtherBoats from "../components/fleet/OtherBoats";
import Features from "../components/fleet/Features";
import { Portfolio } from "../context";

import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

export default function Yacht() {
  window.scrollTo({
    top: 0,
  });
  const {
    portfolio: { motionProps },
    motionMenu,
  } = useContext(Portfolio);
  console.log(motionProps);
  const { boat } = useParams();
  const activeBoat = fleet.find((item) => item.name.toLowerCase() === boat);
  const {
    title,
    subTitle,
    paragraph,
    description,
    specs,
    features,
    coverImage,
    images,
  } = activeBoat;
  const ease = [0.65, 0.05, 0.36, 1];
  const xOffset =
    (window.innerWidth / motionProps.gridCount) * motionProps.column;
  const finalDelay = motionProps.delay + motionProps.duration;
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
    stagger: {
      initial: { opacity: 1 },
      animate: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          delay: finalDelay,
          staggerChildren: 0.1,
        },
      },
    },
    revealChildren: {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      exit: { scaleY: 0 },
    },
  };

  return (
    <motion.main id="yacht" style={{ y: motionMenu }}>
      <section id="landing-page" className="grid">
        <motion.div
          className="description"
          initial="initial"
          animate="animate"
          variants={pageLoaders.parent}
        >
          <motion.div className="text-content" variants={pageLoaders.child}>
            <Reveal delay={0.2}>
              <h1>{title}</h1>
            </Reveal>
            <Reveal delay={0.4}>
              <h2>{subTitle}</h2>
            </Reveal>
            <Reveal delay={0.6}>
              <p>{paragraph}</p>
            </Reveal>

            <motion.ul variants={pageLoaders.stagger}>
              <motion.li variants={pageLoaders.revealChildren}>
                {specs.length}
              </motion.li>
              <motion.li variants={pageLoaders.revealChildren}>
                {specs.capacity}
              </motion.li>
              <motion.li variants={pageLoaders.revealChildren}>
                {specs.motor}
              </motion.li>
            </motion.ul>
          </motion.div>
          <Reveal delay={finalDelay}>
            <div className="button-container">
              <button className="secondary-button">Request callback</button>
              <button className="primary-button">View Gallery</button>
            </div>
          </Reveal>
        </motion.div>
        <SubPanel />
      </section>
      <section id="description" className="grid">
        <div className="text-content">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
          <ul>
            <li>
              <span />8 Guests
            </li>
            <li>
              <span />4 Cabins
            </li>
            <li>
              <span />
              Info
            </li>
            <li>
              <span />
              Info
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
          <h1>Exterior</h1>
        </span>
        <Slider images={images.exterior} />
      </section>
      <Reviews />
      <section id="interior" className="grid">
        <span className="title">
          <h1>Interior</h1>
        </span>
        <Slider images={images.interior} />
      </section>
      <CallToAction />
      <OtherBoats />
      <footer className="grid"></footer>
    </motion.main>
  );
}
