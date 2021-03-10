import React, { useEffect, useRef, useState, useContext } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Portfolio } from "../context";

export default function SubPanel() {
  const [sticky, setSticky] = useState(false);
  const { dimensions } = useContext(Portfolio);
  const ref = useRef(null);
  const panelHeight = useRef(0);

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
        ease: "expo.inOut",
        duration: 2,
      }
    );
  }
  useEffect(() => {
    panelHeight.current = ref.current.getBoundingClientRect().height;
  }, [dimensions]);
  useEffect(() => gsap.registerPlugin(ScrollToPlugin), []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className={`sub-panel ${sticky && "sticky"}`} ref={ref}>
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
      <button className="secondary-button">Make an inquiry</button>
    </div>
  );
}
