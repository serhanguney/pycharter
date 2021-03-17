import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDom from "react-dom";
import useSlider from "../../hooks/useSlider";
import Modal from "../Modal";
import { animate, motion, useMotionValue } from "framer-motion";
import { Portfolio } from "../../context";

export default function Slider({ images }) {
  //create a state and fetch its reducers using custom hook
  const { slide, nextSlide, previousSlide } = useSlider();

  const {
    dimensions: { width },
  } = useContext(Portfolio);

  let gallery = useRef(null);
  const slideMotionValue = useMotionValue(0);
  const motionTransition = { duration: 0.8, ease: [0.79, 0.14, 0.15, 0.86] };

  //for scaling
  const imageVariants = {
    initial: { scale: 1 },
    animate: (i) => ({
      scale: Math.max(1, (i - slide.no) * 0.2 + 1),
      transition: motionTransition,
    }),
  };
  const paginationVariants = {
    initial: {
      scale: 1,
      backgroundColor: "#ffffff",
    },
    animate: {
      scale: 1.3,
      backgroundColor: "#0092b2",
    },
  };

  //can't use the reducer for modal because it triggers the useeffect unnecessarily
  const [modal, setModal] = useState(false);

  //handle clicks using reducers.
  //Notice the slide.no conditions; without them at the edge of limits the animations get buggy.
  //also without them the slidebuttons fall off the edge.
  //prevent double slides using isActive of gsap
  function handleClick(e) {
    if (!slideMotionValue.isAnimating()) {
      if (e.target.name === "previous" && slide.no > 0) {
        previousSlide(0);
        const width = gallery.children[0].getBoundingClientRect().width;
        const previousValue = slideMotionValue.get();

        // const scaleRatio = Array.from(gallery.children).map((item,index)=> )
        animate(slideMotionValue, previousValue + width, motionTransition);
      } else if (e.target.name === "next" && slide.no < images.length - 1) {
        nextSlide(images.length);

        const width = gallery.children[0].getBoundingClientRect().width;
        const previousValue = slideMotionValue.get();
        animate(slideMotionValue, previousValue - width, motionTransition);
      }
    }
  }

  function handleToggle() {
    setModal(true);
  }
  //handle sliding based on limits and direction. Use gallery ref to fetch children and grandchildren of parent.
  //children for sliding, grandchildren for scaling
  useEffect(() => {
    if (slideMotionValue.hasAnimated) {
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
    <div className="slider">
      <div ref={(el) => (gallery = el)} className="gallery">
        {images.map((image, index) => (
          <motion.div
            style={{ x: slideMotionValue }}
            key={index}
            className="image-container"
            onClick={handleToggle}
          >
            <motion.img
              custom={index}
              key={index}
              src={image}
              alt="boat"
              initial="intial"
              animate="animate"
              variants={imageVariants}
            />
          </motion.div>
        ))}
      </div>
      <div className="button-container">
        <button name="previous" onClick={(e) => handleClick(e)}>{`<`}</button>
        <button name="next" onClick={(e) => handleClick(e)}>{`>`}</button>
      </div>
      <div className="pagination">
        {images.map((el, i) => (
          <motion.span
            custom={i}
            initial="initial"
            animate={i === slide.no ? "animate" : "initial"}
            variants={paginationVariants}
            transition={{ duration: 0.4, ease: [0.68, -0.55, 0.27, 1.55] }}
            key={i}
            name={el}
          ></motion.span>
        ))}
      </div>
      {ReactDom.createPortal(
        <Modal open={modal} close={() => setModal(false)}>
          <div className="image-container">
            <img src={images[slide.no]} alt="boat" />
          </div>
        </Modal>,
        document.getElementById("portal")
      )}
    </div>
  );
}
