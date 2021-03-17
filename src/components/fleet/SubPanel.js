import React, { useEffect, useRef, useState, useContext } from "react";
import gsap, { Expo } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Portfolio } from "../../context";

export default function SubPanel() {
  const [sticky, setSticky] = useState(false);
  const { dimensions } = useContext(Portfolio);
  const ref = useRef(null);
  let panelHeight = useRef(0);
  let ctaButton = useRef(null);

  const features = [
    "Description",
    "Features",
    "Exterior",
    "Reviews",
    "Interior",
  ];
  function handleScroll() {
    if (window.scrollY > dimensions.height - panelHeight.current) {
      setSticky(true);
    } else if (window.scrollY < dimensions.height) {
      setSticky(false);
    }
  }
  function handleClick(e) {
    gsap.fromTo(
      window,
      { scrollTo: window.scrollY },
      {
        scrollTo: { y: `#${e.target.name}`, offsetY: panelHeight.current },
        ease: Expo.easeInOut,
        duration: 2,
      }
    );
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => gsap.registerPlugin(ScrollToPlugin), []);
  useEffect(() => {
    panelHeight.current = ref.current.getBoundingClientRect().height;
  }, [dimensions]);
  useEffect(() => {
    if (dimensions.width > 620) {
      if (sticky) {
        gsap.to(ctaButton, {
          autoAlpha: 1,
          y: 0,
          skewY: 0,
          ease: Expo.easeInOut,
          duration: 1,
        });
      } else {
        gsap.to(ctaButton, {
          autoAlpha: 0,
          y: 15,
          skewY: 2,
          ease: Expo.easeInOut,
          duration: 1,
        });
      }
    }
  }, [sticky, dimensions.width]);
  return (
    <div className={`sub-panel ${sticky ? "sticky" : ""}`} ref={ref}>
      <ul>
        {features.map((item, index) => (
          <li key={index}>
            <a
              name={item.toLowerCase()}
              datatext={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleClick(e)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      {dimensions.width > 620 && (
        <button
          ref={(el) => (ctaButton = el)}
          className={`secondary-button ${sticky ? "fade-in" : "fade-out"}`}
        >
          Make an inquiry
        </button>
      )}
    </div>
  );
}
