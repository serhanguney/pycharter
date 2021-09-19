import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import validate from "../Form/validate";
import Dropdown from "./Dropdown";
import required from "../../icons/required.svg";
import lottie from "lottie-web";
import data from "../../images/confetti.json";
import { content } from "../../content/content";
import { Portfolio } from "../../context";

export default function Form() {
  let container = useRef(null);
  const {
    portfolio: { language },
  } = useContext(Portfolio);
  console.log(language);
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
        <h2>{content[language].contact.success.h1}</h2>
        <p>{content[language].contact.success.p}</p>
        <Link to="/">
          <button className="primary-button">
            {content[language].contact.success.button}
          </button>
        </Link>
      </div>
    </>
  ) : (
    <form>
      <div className="form-element">
        <label htmlFor="fullName">{content[language].contact.fill.name}</label>
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
        <label htmlFor="mobile">{content[language].contact.fill.phone}</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={(e) => handleChange(e)}
          disabled={isSubmitting}
        />
      </div>
      <div className="form-element">
        <label htmlFor="from">{content[language].contact.fill.email}</label>
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
        <label htmlFor="message">
          {content[language].contact.fill.message}
        </label>
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
            {content[language].contact.fill.legal}
          </label>
        </div>
        <button
          type="submit"
          className={isSubmitting ? "button-submitting" : "primary-button"}
          style={{ pointerEvents: `${submitted ? "none" : "auto"}` }}
          onClick={(e) => handleSubmit(e)}
        >
          {isSubmitting
            ? content[language].contact.button.loading
            : content[language].contact.button.send}
        </button>
      </div>
    </form>
  );
}
