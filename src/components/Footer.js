import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";
import Instagram from "../icons/instagram";
import { content } from "../content/content";

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
        {content[portfolio.language].navbar.map((item) => (
          <Link to={item.link}>{item.name}</Link>
        ))}
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
