import React, { useContext } from "react";
import { Portfolio } from "../../context";
import { content } from "../../content/content";
export default function Reviews() {
  const { portfolio } = useContext(Portfolio);
  return (
    <section id="reviews" className="grid">
      <div className="content">
        <h1>{content[portfolio.language].yacht.reviews.title}</h1>
        <p>{content[portfolio.language].yacht.reviews.paragraph}</p>
        <h3>{content[portfolio.language].yacht.reviews.author}</h3>
      </div>
    </section>
  );
}
