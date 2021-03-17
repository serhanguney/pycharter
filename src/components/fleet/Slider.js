import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import useSlider from "../../hooks/useSlider";
import gsap, { Power3 } from "gsap";
import Modal from "../Modal";

export default function Slider({ images }) {
  //create a state and fetch its reducers using custom hook
  const { slide, nextSlide, previousSlide } = useSlider();
  let gallery = useRef(null);

  //can't use the reducer for modal because it triggers the useeffect unnecessarily
  const [modal, setModal] = useState(false);

  //for modal animation
  let modalPosition = useRef(null);

  //create tween references to get isActive methods.
  let tweenToNext = useRef(null);
  let tweenToPrevious = useRef(null);

  //handle clicks using reducers.
  //Notice the slide.no conditions; without them at the edge of limits the animations get buggy.
  //also without them the slidebuttons fall off the edge.
  //prevent double slides using isActive of gsap
  function handleClick(e) {
    if (
      !tweenToNext.current.isActive() &&
      !tweenToPrevious.current.isActive()
    ) {
      if (e.target.name === "previous" && slide.no > 0) {
        previousSlide(0);
      } else if (e.target.name === "next" && slide.no < images.length - 1) {
        nextSlide(images.length);
      }
    }
  }

  function handleToggle() {
    modalPosition.current = {
      height: gallery.children[slide.no].getBoundingClientRect().height,
      width: gallery.children[slide.no].getBoundingClientRect().width,
      top: gallery.children[slide.no].getBoundingClientRect().top,
      left: gallery.children[slide.no].getBoundingClientRect().left,
    };
    setModal(true);
  }
  //handle sliding based on limits and direction. Use gallery ref to fetch children and grandchildren of parent.
  //children for sliding, grandchildren for scaling
  useEffect(() => {
    tweenToNext.current = gsap.to(gallery.children, {
      x: `-=100%`,
      ease: Power3.easeInOut,
      duration: 1,
      paused: true,
    });
    tweenToPrevious.current = gsap.to(gallery.children, {
      x: `+=100%`,
      ease: Power3.easeInOut,
      duration: 1,
      paused: true,
    });
    if (slide.no < images.length && slide.moveTo === "next") {
      //prevent interruptions using isActive
      if (!tweenToNext.current.isActive()) {
        tweenToNext.current.play();
        gsap.from(gallery.children[slide.no].children, {
          scale: 1.3,
          ease: Power3.easeInOut,
          duration: 1,
        });
      }
    } else if (slide.no > -1 && slide.moveTo === "previous") {
      //prevent interruptions using isActive
      if (!tweenToPrevious.current.isActive()) {
        tweenToPrevious.current.play();
        gsap.from(gallery.children[slide.no].children, {
          scale: 1.3,
          ease: Power3.easeInOut,
          duration: 1,
        });
      }
    }
  }, [slide]);
  return (
    <div className="slider">
      <div ref={(el) => (gallery = el)} className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container" onClick={handleToggle}>
            <img key={index} src={image} alt="boat" />
          </div>
        ))}
      </div>
      <div className="button-container">
        <button name="previous" onClick={(e) => handleClick(e)}>{`<`}</button>
        <button name="next" onClick={(e) => handleClick(e)}>{`>`}</button>
      </div>
      <div className="pagination">
        {images.map((el, i) => (
          <span
            key={i}
            name={el}
            className={i === slide.no ? "active" : ""}
          ></span>
        ))}
      </div>
      {ReactDom.createPortal(
        <Modal
          open={modal}
          close={() => setModal(false)}
          position={modalPosition.current}
        >
          <div className="image-container">
            <img src={images[slide.no]} alt="boat" />
          </div>
        </Modal>,
        document.getElementById("portal")
      )}
    </div>
  );
}
