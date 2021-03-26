import React, { useEffect, useContext, useState } from "react";
import { animate, motion, useTransform, useMotionValue } from "framer-motion";
import { Portfolio } from "../context";
import sailor from "../icons/sailor.png";

export default function Loading() {
  //the animations take 6 seconds to complete

  const { portfolio, setPortfolio } = useContext(Portfolio);
  //this state for final screen to collapse to an element from the next page
  const [reference, setReference] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  //VARIANTS
  const pageVariants = {
    initial: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "rgba(255,255,255,1)",
      opacity: 1,
    },
    animate: {
      x: reference.x,
      y: reference.y,
      width: reference.width,
      height: reference.height,
      backgroundColor: "rgba(255,255,255,0.75)",
      opacity: 0,
      transition: {
        opacity: { delay: 5.5, duration: 0.6 },
        delay: 4.5,
        duration: 1.4,
        ease: [0.77, 0, 0.18, 1],
        onComplete: () => setPortfolio({ ...portfolio, loading: false }),
      },
    },
  };

  const imageVariants = {
    initia: { opacity: 1 },
    animate: { opacity: 0, transition: { duration: 1, delay: 1.5 } },
  };
  const textVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 0,
      transition: { delay: 2 },
    },
  };

  //TRANSFORMS
  //t will controll text only.
  const t = useMotionValue(0);
  const transformText = useTransform(
    t,
    [0, 250, 500, 750],
    [
      "linear-gradient(to right ,#FFFFFF , #FFFFFF,#FFFFFF )",
      "linear-gradient(to right ,#0091B1 , #FFFFFF,#FFFFFF )",
      "linear-gradient(to right ,#FFFFFF , #0091B1 ,#FFFFFF )",
      "linear-gradient(to right ,#FFFFFF,#FFFFFF,#0091B1 )",
    ]
  );
  useEffect(() => {
    setReference(
      document.querySelector(".description").getBoundingClientRect()
    );
    animate(t, 750, {
      delay: 1,
      duration: 1,
      ease: [0.49, 0.25, 0.7, 0.9],
    });
  }, [t]);
  return (
    <motion.div
      className="loading-page"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.div className="loader-image" variants={imageVariants}>
        <img src={sailor} alt="loader" />
      </motion.div>
      <motion.h2
        style={{ backgroundImage: transformText }}
        variants={textVariants}
      >
        Private Yacht Charter
      </motion.h2>
    </motion.div>
  );
}
