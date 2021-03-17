import React, { useEffect, useRef, useState, useContext } from "react";
import { Portfolio } from "../../context";
import { animate, useMotionValue, motion } from "framer-motion";

export default function SubPanel() {
  const features = [
    "Description",
    "Features",
    "Exterior",
    "Reviews",
    "Interior",
  ];
  const [sticky, setSticky] = useState(false);
  const { dimensions } = useContext(Portfolio);
  const subPanel = useRef(null);
  let panelHeight = useRef(0);
  let unsubscribe = useRef(null);

  const scrollMotion = useMotionValue(0);
  const buttonVariants = {
    initial: {
      opacity: 0,
      skewY: 15,
      y: 30,
      visibility: "hidden",
      transition: { visibility: { delay: 1 } },
    },
    animate: {
      opacity: 1,
      skewY: 0,
      visibility: "visible",
      y: 0,
    },
  };

  function handleScroll() {
    if (window.scrollY > dimensions.height - panelHeight.current) {
      setSticky(true);
    } else if (window.scrollY < dimensions.height) {
      setSticky(false);
    }
  }
  function handleClick(e) {
    scrollMotion.set(window.scrollY);
    const scrollTarget = document.getElementById(e.target.name);
    const scrollPosition =
      scrollTarget.getBoundingClientRect().top +
      window.scrollY -
      panelHeight.current;

    animate(scrollMotion, scrollPosition, {
      duration: 1,
    });
  }
  useEffect(() => {
    unsubscribe.current = scrollMotion.onChange((value) => {
      window.scrollTo({ top: value });
    });
  }, [scrollMotion]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    panelHeight.current = subPanel.current.getBoundingClientRect().height;
  }, [dimensions]);

  return (
    <div className={`sub-panel ${sticky ? "sticky" : ""}`} ref={subPanel}>
      <ul>
        {features.map((item, index) => (
          <li key={index}>
            <a
              name={item.toLowerCase()}
              datatext={item}
              onClick={(e) => handleClick(e)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      {dimensions.width > 620 && (
        <motion.button
          initial="initial"
          animate={sticky ? "animate" : "initial"}
          variants={buttonVariants}
          className="secondary-button"
        >
          Make an inquiry
        </motion.button>
      )}
    </div>
  );
}
