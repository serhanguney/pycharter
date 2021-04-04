import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div>
      <div className="cta-like">
        <h1>Like what you see?</h1>
        <button className="secondary-button">
          <Link to="/contact">Make an inquiry</Link>
        </button>
      </div>
    </div>
  );
}
