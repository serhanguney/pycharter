import React, { useContext } from "react";
import { Portfolio } from "../context";

export default function Language() {
  const { portfolio, setPortfolio } = useContext(Portfolio);

  function handleLanguage(e) {
    const language = e.target.getAttribute("value");
    setPortfolio({ ...portfolio, language: language });
  }
  return (
    <div id="language">
      <p value="en" onClick={(e) => handleLanguage(e)}>
        EN
      </p>
      <p value="tur" onClick={(e) => handleLanguage(e)}>
        TUR
      </p>
    </div>
  );
}
