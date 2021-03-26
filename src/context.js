import { createContext } from "react";

export const Portfolio = createContext({});

let span = 5;
let y = 200;
if (window.innerWidth < 620) {
  span = 3;
  y = 150;
}

export const portfolioObject = {
  loading: true,
  menuOpen: false,
  motionProps: {
    gridCount: 12,
    column: 1,
    span: span,
    y: y,
    height: 400,
    duration: 1.5,
    delay: 1.2,
  },
};
