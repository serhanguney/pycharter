import React from "react";

export default function Slider({ images }) {
  return (
    <div className="slider grid">
      <button>{`<`}</button>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img key={index} src={image} alt="boat" />
          </div>
        ))}
      </div>
      <button>{`>`}</button>
      <div className="slide-buttons">
        {images.map((el, i) => (
          <span key={i} name={el}></span>
        ))}
      </div>
    </div>
  );
}
