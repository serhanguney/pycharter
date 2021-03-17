import React, { useContext, useEffect, useRef } from "react";
import { Portfolio } from "../../context";
import useSlider from "../../hooks/useSlider";
import useArray from "../../hooks/useArray";
import { motion } from "framer-motion";
import Pagination from "./Pagination";

export default function Features({ features }) {
  const { dimensions } = useContext(Portfolio);
  const { slide, nextSlide, previousSlide, slideMotionValue } = useSlider();
  let gallery = useRef(null);

  //useArray hook returns a dynamic array structure depending on the size of device.
  let myFeatures = useArray(features, 5, 10);

  useEffect(() => {}, [slide.no, myFeatures]);
  function handleClick(e) {
    if (!slideMotionValue.isAnimating()) {
      if (e.target.name === "next") {
        nextSlide(myFeatures.length - 1, gallery.children[0]);
      } else if (e.target.name === "previous") {
        previousSlide(0, gallery.children[0]);
      }
    }
  }
  return (
    <section id="features">
      <h1>Features</h1>

      <div className="features-content">
        <button name="previous" onClick={(e) => handleClick(e)}>
          {"<"}
        </button>
        <div
          ref={(el) => (gallery = el)}
          className={`features-container ${
            dimensions.width > 960 ? "grid" : ""
          }`}
        >
          {myFeatures.map((list, index) => (
            <motion.ul key={index} style={{ x: slideMotionValue }}>
              {list.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </motion.ul>
          ))}
        </div>
        <button name="next" onClick={(e) => handleClick(e)}>
          {">"}
        </button>
      </div>
      <Pagination slide={slide} array={myFeatures} />
    </section>
  );
}
