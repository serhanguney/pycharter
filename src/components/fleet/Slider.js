import React, { useEffect, useRef } from "react";
import useSlider from "../../hooks/useSlider";
import gsap, { Power3 } from "gsap";

export default function Slider({ images }) {
  //create a state and fetch its reducers using custom hook
  const { slide, nextSlide, previousSlide } = useSlider();
  let gallery = useRef(null);
  let slideButtons = useRef(null);

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

  //handle sliding based on limits and direction. Use gallery ref to fetch children and grandchildren of parent.
  //children for sliding, grandchildren for scaling
  useEffect(() => {
    tweenToNext.current = gsap.to(gallery.children, {
      x: `-=${100}%`,
      ease: Power3.easeInOut,
      duration: 1,
      paused: true,
    });
    tweenToPrevious.current = gsap.to(gallery.children, {
      x: `+=${100}%`,
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
    console.log(slide.no);
  }, [slide]);
  return (
    <div className="slider grid">
      <button name="previous" onClick={(e) => handleClick(e)}>{`<`}</button>
      <div ref={(el) => (gallery = el)} className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img key={index} src={image} alt="boat" />
          </div>
        ))}
      </div>
      <button name="next" onClick={(e) => handleClick(e)}>{`>`}</button>
      <div ref={(el) => (slideButtons = el)} className="slide-buttons">
        {images.map((el, i) => (
          <span
            key={i}
            name={el}
            className={i === slide.no ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
}
