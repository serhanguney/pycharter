import React, { useEffect, useRef, useContext } from "react";
import useSlider from "../../hooks/useSlider";
import Pagination from "./Pagination";
import { animate, motion } from "framer-motion";
import { Portfolio } from "../../context";
import rightArrow from "../../icons/sliderArrowRight.svg";
import leftArrow from "../../icons/sliderArrowLeft.svg";
export default function Slider({ images }) {
  //create a state and fetch its reducers using custom hook
  const { slide, nextSlide, previousSlide, slideMotionValue } = useSlider();

  const {
    dimensions: { width },
  } = useContext(Portfolio);

  let gallery = useRef(null);
  // const slideMotionValue = useMotionValue(0);
  const motionTransition = { duration: 0.8, ease: [0.79, 0.14, 0.15, 0.86] };

  //for scaling
  const imageVariants = {
    initial: { scale: 1 },
    animate: (i) => ({
      scale: Math.max(1, (i - slide.no) * 0.2 + 1),
      transition: motionTransition,
    }),
  };

  //handle clicks using reducers.
  //Notice the slide.no conditions; without them at the edge of limits the animations get buggy.
  //also without them the slidebuttons fall off the edge.
  //prevent double slides using isActive of gsap
  function handleClick(e) {
    if (!slideMotionValue.isAnimating()) {
      if (e.target.name === "previous" && slide.no > 0) {
        previousSlide(0, gallery.children[0]);
      } else if (e.target.name === "next" && slide.no < images.length - 1) {
        nextSlide(images.length, gallery.children[0]);
      }
    }
  }

  //handle sliding based on limits and direction. Use gallery ref to fetch children and grandchildren of parent.
  //children for sliding, grandchildren for scaling
  useEffect(() => {
    console.log("triggering resize based on width change");
    if (slideMotionValue.hasAnimated) {
      console.log("triggering resize based on width change");
      const width = gallery.children[0].getBoundingClientRect().width;
      slideMotionValue.prev < 0
        ? animate(slideMotionValue, width * -slide.no, motionTransition)
        : animate(
            slideMotionValue,
            width * slideMotionValue * slide.no,
            motionTransition
          );
    }
  }, [width]);
  return (
    <div className="slider grid">
      <button name="previous" onClick={(e) => handleClick(e)}>
        <img src={leftArrow} alt="left arrow" />
      </button>
      <div ref={(el) => (gallery = el)} className="gallery">
        {images.map((image, index) => (
          <motion.div
            style={{ x: slideMotionValue }}
            key={index}
            className="image-container"
          >
            <motion.img
              custom={index}
              key={index}
              src={image}
              alt="boat"
              initial="initial"
              animate="animate"
              variants={imageVariants}
            />
          </motion.div>
        ))}
      </div>
      <button name="next" onClick={(e) => handleClick(e)}>
        <img src={rightArrow} alt="right arrow" />
      </button>
      <Pagination slide={slide} array={images} />
    </div>
  );
}
