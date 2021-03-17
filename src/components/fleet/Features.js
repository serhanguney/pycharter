import gsap, { Power3 } from "gsap";
import React, { useContext, useEffect, useRef } from "react";
import { Portfolio } from "../../context";
import useSlider from "../../hooks/useSlider";
import useArray from "../../hooks/useArray";

export default function Features({ features }) {
  const { dimensions } = useContext(Portfolio);
  const { slide, nextSlide, previousSlide } = useSlider();
  let gallery = useRef(null);
  let tween = useRef(null);

  //useArray hook returns a dynamic array structure depending on the size of device.
  let myFeatures = useArray(features, 5, 10);

  useEffect(() => {
    if (myFeatures) {
      const nextSlide = slide.moveTo === "next" ? 1 : -1;

      const scaleBack = gsap.set(gallery.children[slide.no - nextSlide], {
        paused: true,
        scale: 1,
      });
      tween.current = {
        next: gsap.to(gallery.children, {
          paused: true,
          x: `-=100%`,
          ease: Power3.easeInOut,
          duration: 0.5,
        }),
        back: gsap.to(gallery.children, {
          paused: true,
          x: `+=100%`,
          ease: Power3.easeInOut,
          duration: 0.5,
        }),
        scale: gsap.to(gallery.children[slide.no - nextSlide], {
          paused: true,
          scale: 0.8,
          ease: Power3.easeInOut,
          duration: 0.5,
          onComplete: () => scaleBack.play(),
        }),
      };
      const { next, back, scale } = tween.current;
      if (slide.moveTo === "next") {
        next.play();
        scale.play();
      } else if (slide.moveTo === "previous" && slide.no > -1) {
        back.play();
        scale.play();
      }
    }
  }, [slide.no, myFeatures]);
  function handleClick(e) {
    const { next, back } = tween.current;
    let inProgress = next.isActive() || back.isActive();
    if (e.target.name === "next" && !inProgress) {
      nextSlide(myFeatures.array.length - 1);
    } else if (e.target.name === "previous" && !inProgress) {
      previousSlide(0);
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
          {myFeatures.paint}
        </div>
        <button name="next" onClick={(e) => handleClick(e)}>
          {">"}
        </button>
      </div>
    </section>
  );
}
