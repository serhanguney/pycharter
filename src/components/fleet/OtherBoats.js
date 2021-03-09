import React from "react";
import { fleet } from "../../boats/boats";
import arrowIcon from "../../icons/rightArrow.svg";

export default function OtherBoats() {
  return (
    <section id="other-boats" className="grid">
      <span className="title">
        <h1>Other Boats</h1>
      </span>
      {fleet.map((boat, index) => (
        <div key={index} className="boat-card">
          <div className="image-container">
            <img src={boat.coverImage} alt="coverImage" />
          </div>
          <h1>{boat.name}</h1>
          <h2>{boat.subTitle}</h2>
          <p>{boat.paragraph}</p>
          <a href={boat.name.toLowerCase()}>
            View this boat{" "}
            <span>
              <img src={arrowIcon} alt="arrowIcon" />
            </span>
          </a>
        </div>
      ))}
    </section>
  );
}
