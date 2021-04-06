import React, { useContext } from "react";
import { fleet } from "../../boats/boats";
import arrowIcon from "../../icons/rightArrow.svg";
import { Link, useParams } from "react-router-dom";
import { Portfolio } from "../../context";
import { content } from "../../content/content";
export default function OtherBoats() {
  const { boat } = useParams();
  const { portfolio } = useContext(Portfolio);

  const otherBoats = fleet.filter(
    (yacht) => yacht[portfolio.language].name.toLowerCase() !== boat
  );
  return (
    <section id="other-boats" className="grid">
      <span className="title">
        <h1>{content[portfolio.language].yacht.others.title}</h1>
      </span>
      <div className="boat-card-container">
        {otherBoats.map((boat, index) => (
          <div key={index} className="boat-card">
            <div className="image-container">
              <img src={boat.coverImage} alt="coverImage" />
            </div>
            <h1>{boat[portfolio.language].name}</h1>
            <h2>{boat[portfolio.language].subTitle}</h2>
            <p>{boat[portfolio.language].paragraph}</p>
            <Link to={boat[portfolio.language].name.toLowerCase()}>
              {content[portfolio.language].yacht.others.button}
              <span>
                <img src={arrowIcon} alt="arrowIcon" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
