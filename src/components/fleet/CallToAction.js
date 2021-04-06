import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { content } from "../../content/content";
import { Portfolio } from "../../context";

export default function CallToAction() {
  const { portfolio } = useContext(Portfolio);
  return (
    <div>
      <div className="cta-like">
        <h1>{content[portfolio.language].yacht.cta.title}</h1>
        <button className="secondary-button">
          <Link to="/contact">
            {content[portfolio.language].yacht.cta.button}
          </Link>
        </button>
      </div>
    </div>
  );
}
