import { createContext } from "react";

export const Portfolio = createContext({});

let span = 5;
let y = 200;
if (window.innerWidth < 620) {
  span = 3;
  y = 150;
}

export const portfolioObject = {
  language: "en",
  loading: true,
  menuOpen: false,
  ease: [0.65, 0.05, 0.36, 1],
};
