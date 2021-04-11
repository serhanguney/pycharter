import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import { animate, motion } from "framer-motion";
import Instagram from "../icons/instagram.js";
import Facebook from "../icons/facebook.js";

export default function Navbar() {
  const {
    dimensions: { width, height },
    portfolio,
    setPortfolio,
    motionMenu,
  } = useContext(Portfolio);

  const motionEase = [0.77, 0, 0.18, 1];
  const duration = 1;

  const iconVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
    },
  };
  const iconPathVariants = {
    initial: {
      pathLength: 1,
      pathOffset: 0,
      opacity: 1,
      transition: { ease: motionEase, duration: duration, delay: 0.25 },
    },
    animate: {
      pathLength: 0,
      pathOffset: 1,
      opacity: 0,
      transition: { ease: motionEase, duration: duration },
    },
  };

  const circleVariants = {
    initial: {
      pathLength: 0,
      transition: { ease: motionEase, duration: duration },
    },
    animate: {
      pathLength: 1,
      transition: { ease: motionEase, duration: duration },
    },
  };
  const svgVariants = {
    initial: { display: "none", opacity: 0, transition: { delay: 1 } },
    animate: { display: "block", opacity: 1 },
  };
  const arrowVariants = {
    initial: {
      opacity: 0,
      transition: { ease: motionEase, duration: duration },
    },
    animate: {
      opacity: 1,
      transition: { ease: motionEase, duration: duration, delay: 0.4 },
    },
  };
  function handleMenu() {
    if (!motionMenu.isAnimating()) {
      setPortfolio({ ...portfolio, menuOpen: !portfolio.menuOpen });
    }
  }
  function handleScroll() {
    if (portfolio.menuOpen) {
      setPortfolio({ ...portfolio, menuOpen: false });
    }
  }
  useEffect(() => {
    if (!motionMenu.isAnimating()) {
      if (portfolio.menuOpen) {
        animate(motionMenu, height / 2, {
          ease: motionEase,
          duration: duration,
        });
      } else {
        animate(motionMenu, 0, {
          ease: motionEase,
          duration: duration,
        });
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [portfolio.menuOpen, height, motionMenu]);

  return (
    <motion.header
      id="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: duration, ease: portfolio.ease }}
    >
      {width < 620 ? (
        <>
          <h2>PYC</h2>
          <span className="menu-icon" onClick={handleMenu}>
            <motion.svg
              id="waves"
              width="30"
              height="30"
              viewBox="0 0 14 12"
              fill="none"
              initial="initial"
              animate={portfolio.menuOpen ? "animate" : "initial"}
              variants={iconVariants}
            >
              <motion.path
                variants={iconPathVariants}
                d="M1 2.14286C1 2.14286 3.72727 0.357144 7 1.25C10.2727 2.14286 13 2.14286 13 2.14286"
                stroke="#0091B1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                variants={iconPathVariants}
                d="M1 6.28574C1 6.28574 3.72727 4.50003 7 5.39288C10.2727 6.28574 13 6.28574 13 6.28574"
                stroke="#0091B1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <motion.path
                variants={iconPathVariants}
                d="M1 10.4286C1 10.4286 3.72727 8.64291 7 9.53577C10.2727 10.4286 13 10.4286 13 10.4286"
                stroke="#0091B1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>

            <motion.svg
              id="circle"
              width="45"
              height="45"
              viewBox="0 0 58 58"
              fill="none"
              initial="initial"
              animate={portfolio.menuOpen ? "animate" : "initial"}
              variants={svgVariants}
            >
              <g id="closeMenu">
                <motion.path
                  variants={circleVariants}
                  id="Circle"
                  d="M29 57C44.464 57 57 44.464 57 29C57 13.536 44.464 1 29 1C13.536 1 1 13.536 1 29C1 44.464 13.536 57 29 57Z"
                  stroke="#0091B1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <motion.path
                  variants={arrowVariants}
                  id="Arrow"
                  d="M40 30L30 20M30 20L20 30M30 20V40"
                  stroke="#0091B1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </motion.svg>
          </span>
        </>
      ) : (
        <>
          <h2>{width < 960 ? "PYC" : "Private Yacht Charter"}</h2>

          <div className="navigation">
            <Link to="/">Home</Link>
            <Link to="/fleet">Fleet</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="media__icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </a>
          </div>
        </>
      )}
    </motion.header>
  );
}
