import React, { useContext } from "react";
import { Portfolio } from "../context";

export default function Language() {
  const {
    portfolio,
    setPortfolio,
    dimensions: { width },
  } = useContext(Portfolio);

  function handleLanguage(e) {
    setPortfolio({ ...portfolio, language: e.target.value });
  }
  return (
    <div>
      <select onChange={(e) => handleLanguage(e)}>
        <option value="en">English</option>
        <option value="tur">Turkish</option>
      </select>
    </div>
  );
}
