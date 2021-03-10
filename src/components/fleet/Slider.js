import React, { useEffect, useRef } from "react";
import useSlider from "../../hooks/useSlider";
import gsap, { Power3 } from "gsap";

export default function Slider({ images }) {
  //create a state and fetch its reducers using custom hook
  const { slide, nextSlide, previousSlide } = useSlider();
  let gallery = useRef(null);

  //handle clicks using reducers
  function handleClick(e) {
    if (e.target.name === "previous") {
      previousSlide(0);
    } else {
      nextSlide(images.length);
    }
  }

  //handle sliding based on limits and direction. Use gallery ref to fetch children and grandchildren of parent.
  //children for sliding, grandchildren for scaling
  useEffect(() => {
    if (slide.no < images.length && slide.moveTo === "next") {
      gsap.to(gallery.children, {
        x: `-=${100}%`,
        ease: Power3.easeInOut,
        duration: 1,
      });
      gsap.from(gallery.children[slide.no].children, {
        scale: 1.2,
        ease: Power3.easeInOut,
        duration: 1,
      });
    } else if (slide.no > -1 && slide.moveTo === "previous") {
      console.log("previous");
      gsap.to(gallery.children, {
        x: `+=${100}%`,
        ease: Power3.easeInOut,
        duration: 1,
      });
      gsap.from(gallery.children[slide.no].children, {
        scale: 1.2,
        ease: Power3.easeInOut,
        duration: 1,
      });
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
      <div className="slide-buttons">
        {images.map((el, i) => (
          <span key={i} name={el}></span>
        ))}
      </div>
    </div>
  );
}
