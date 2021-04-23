import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import Instagram from "../icons/instagram";
import Facebook from "../icons/facebook";

export default function Footer() {
  const {
    portfolio,
    setPortfolio,
    dimensions: { width },
  } = useContext(Portfolio);
  function handleLanguage(e) {
    const value = e.target.getAttribute("value");
    setPortfolio({
      ...portfolio,
      language: value,
    });
  }
  return (
    <footer>
      <h2>{width < 620 ? "PYC" : "Private Yacht Charter"}</h2>
      <div className="page__links">
        <Link to="/about">About</Link>
        <Link to="/fleet">Fleet</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="media__links">
        <p value="tur" onClick={(e) => handleLanguage(e)}>
          TUR
        </p>
        <p value="en" onClick={(e) => handleLanguage(e)}>
          EN
        </p>
        <a
          href="https://www.instagram.com/privateyachtingturkey/"
          target="_blank"
        >
          <Instagram />
        </a>
      </div>
    </footer>
  );
}
