import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import validate from "../Form/validate";
import Dropdown from "./Dropdown";
import required from "../../icons/required.svg";
import lottie from "lottie-web";
import data from "../../images/confetti.json";

export default function Form() {
  let container = useRef(null);
  const {
    handleChange,
    handleSubmit,
    handleFocus,
    setValues,
    values,
    errors,
    setErrors,
    submitted,
    isSubmitting,
  } = useForm(validate);
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: data,
    });
    if (submitted && container) {
      anim.play();
    }
  }, [submitted]);

  return submitted ? (
    <>
      <div ref={(el) => (container = el)} className="submitted__form">
        <h2>Your message is received!</h2>
        <p>A member of our team will be getting in touch with you very soon.</p>
        <Link to="/">
          <button className="primary-button">Go to homepage</button>
        </Link>
      </div>
    </>
  ) : (
    <form>
      <div className="form-element">
        <label htmlFor="fullName">Your Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={errors.fullName ? errors.fullName : values.fullName}
          onFocus={(e) => handleFocus(e)}
          className={errors.fullName ? "required" : ""}
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
        />
        <img
          src={required}
          alt="required"
          className={errors.fullName ? "visible" : "invisible"}
        />
      </div>
      <div className="form-element">
        <label htmlFor="mobile">Your Mobile</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-element">
        <label htmlFor="from">Your Email</label>
        <input
          type="email"
          id="from"
          name="from"
          value={errors.from ? errors.from : values.from}
          onFocus={(e) => handleFocus(e)}
          className={errors.from ? "required" : ""}
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
        />
        <img
          src={required}
          alt="required"
          className={errors.from ? "visible" : "invisible"}
        />
      </div>
      <div className="form-element">
        <Dropdown
          state={{ values, setValues, errors, setErrors, isSubmitting }}
        />
      </div>
      <div className="form-message">
        <label htmlFor="message">Your Message</label>
        <textarea
          name="message"
          id="message"
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
        />
      </div>
      <div className="submit-section">
        <div className="checkbox">
          <input type="checkbox" id="checkbox" disabled={isSubmitting} />
          <label htmlFor="checkbox">
            Legal consent text goes here, this is the selected state
          </label>
        </div>
        <button
          type="submit"
          className={isSubmitting ? "button-submitting" : "primary-button"}
          style={{ pointerEvents: `${submitted ? "none" : "auto"}` }}
          onClick={(e) => handleSubmit(e)}
        >
          {isSubmitting ? "Submit in process. Please wait..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
