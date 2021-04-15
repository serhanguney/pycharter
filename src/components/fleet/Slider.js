import React, { useLayoutEffect, useRef } from "react";
import arrowLeft from "../../icons/sliderArrowLeft.svg";
import arrowRight from "../../icons/sliderArrowRight.svg";
import { useHistory } from "react-router-dom";

export default function Slider({ images }) {
  const history = useHistory();
  let gallery = useRef(null);
  let x = useRef(0);
  let index = useRef(0);
  let widthArray = useRef(null);

  function handleScroll(e) {
    const totalWidth = widthArray.current.reduce((acc, val) => acc + val);
    const nextPosition =
      x.current + widthArray.current[index.current] * +e.target.value;
    x.current = Math.max(0, Math.min(totalWidth, nextPosition));
    index.current = Math.max(
      0,
      Math.min(index.current, widthArray.current.length - 1)
    );
    gallery.scroll({ top: 0, left: x.current, behavior: "smooth" });
  }

  function trackScroll() {
    if (widthArray.current) {
      x.current = gallery.scrollLeft;
    }
  }
  useLayoutEffect(() => {
    setTimeout(() => {
      widthArray.current = Array.from(gallery.children).map(
        (el) => el.getBoundingClientRect().width
      );
    }, 500);

    gallery.addEventListener("scroll", trackScroll);
    history.listen(() => gallery.removeEventListener("scroll", trackScroll));
  }, []);

  return (
    <div className="slider grid">
      <button
        value={1}
        onClick={(e) => handleScroll(e)}
        className="slider__button"
      >
        <img src={arrowLeft} alt="left" style={{ pointerEvents: "none" }} />
      </button>
      <div ref={(el) => (gallery = el)} className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img custom={index} key={index} src={image} alt="boat" />
          </div>
        ))}
      </div>
      <button
        value={-1}
        onClick={(e) => handleScroll(e)}
        className="slider__button"
      >
        <img src={arrowRight} alt="left" style={{ pointerEvents: "none" }} />
      </button>
    </div>
  );
}
