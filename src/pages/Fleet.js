import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SubPanel from "../components/fleet/SubPanel";
import Slider from "../components/fleet/Slider";
import { fleet } from "../boats/boats";
import { useParams } from "react-router-dom";
import Reviews from "../components/fleet/Reviews";
import CallToAction from "../components/fleet/CallToAction";
import OtherBoats from "../components/fleet/OtherBoats";
import Features from "../components/fleet/Features";

export default function Fleet() {
  const { boat } = useParams();
  const activeBoat = fleet.find((item) => item.name.toLowerCase() === boat);
  const {
    name,
    title,
    subTitle,
    paragraph,
    description,
    specs,
    features,
    coverImage,
    images,
  } = activeBoat;
  useEffect(() => {
    console.log(`You're viewing ${name}`);
  }, [name]);
  return (
    <main id="fleet">
      <Navbar />
      <section id="landing-page" className="grid">
        <div className="description">
          <div className="text-content">
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <p>{paragraph}</p>
            <p>{specs.length}</p>
            <p>{specs.capacity}</p>
            <p>{specs.motor}</p>
          </div>
          <button className="secondary-button">Request Callback</button>
          <button className="primary-button">View Gallery</button>
        </div>
        <SubPanel />
      </section>
      <section id="description" className="grid">
        <div className="text-content">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
          <ul>
            <li>8 Guests</li>
            <li>4 Cabins</li>
            <li>Info</li>
            <li>Info</li>
          </ul>
          <p>{description}</p>
        </div>
        <div className="visual-content">
          <img src={coverImage} alt="coverImage" />
        </div>
      </section>
      <Features features={features} />
      <CallToAction />
      <section id="exterior" className="grid">
        <span className="title">
          <h1>Exterior</h1>
        </span>
        <Slider images={images} />
      </section>
      <Reviews />
      <section id="interior" className="grid">
        <span className="title">
          <h1>Interior</h1>
        </span>
        <Slider images={images} />
      </section>
      <CallToAction />
      <OtherBoats />
      <footer className="grid"></footer>
    </main>
  );
}
