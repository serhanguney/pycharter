import React from "react";
import useForm from "../../hooks/useForm";
import validate from "../Form/validate";
import Dropdown from "./Dropdown";
import required from "../../icons/required.svg";
import { motion } from "framer-motion";

export default function Form() {
  const {
    handleChange,
    handleSubmit,
    handleFocus,
    setValues,
    values,
    errors,
    setErrors,
    submitted,
  } = useForm(validate);
  // useEffect(() => console.log(values), [values]);
  const ease = [0.46, 0.03, 0.52, 0.96];
  const formVariants = {
    parent: {
      initial: { opacity: 1 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delay: 0.5,
          when: "beforeChildren",
        },
      },
      exit: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    children: {
      initial: { scale: 0.5, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: ease },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.5, ease: ease },
      },
    },
  };

  return (
    <motion.form
      initial="initial"
      animate="animate"
      exit="exit"
      variants={formVariants.parent}
    >
      <motion.div className="form-element" variants={formVariants.children}>
        <label htmlFor="fullName">Your Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={errors.fullName ? errors.fullName : values.fullName}
          onFocus={(e) => handleFocus(e)}
          className={errors.fullName ? "required" : ""}
          onChange={(e) => handleChange(e)}
        />
        <img
          src={required}
          alt="required"
          className={errors.fullName ? "visible" : "invisible"}
        />
      </motion.div>
      <motion.div className="form-element" variants={formVariants.children}>
        <label htmlFor="mobile">Your Mobile</label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={(e) => handleChange(e)}
        />
      </motion.div>
      <motion.div className="form-element" variants={formVariants.children}>
        <label htmlFor="from">Your Email</label>
        <input
          type="email"
          id="from"
          name="from"
          value={errors.from ? errors.from : values.from}
          onFocus={(e) => handleFocus(e)}
          className={errors.from ? "required" : ""}
          onChange={(e) => handleChange(e)}
        />
        <img
          src={required}
          alt="required"
          className={errors.from ? "visible" : "invisible"}
        />
      </motion.div>
      <motion.div className="form-element" variants={formVariants.children}>
        <Dropdown state={{ values, setValues, errors, setErrors }} />
      </motion.div>
      <motion.div className="form-message" variants={formVariants.children}>
        <label htmlFor="message">Your Message</label>
        <textarea
          name="message"
          id="message"
          onChange={(e) => handleChange(e)}
        />
      </motion.div>
      <motion.div className="submit-section" variants={formVariants.children}>
        <div className="checkbox">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            Legal consent text goes here, this is the selected state
          </label>
        </div>
        <button
          type="submit"
          className={submitted ? "primary-button" : "tertiary-button"}
          style={{ pointerEvents: `${submitted ? "none" : "auto"}` }}
          onClick={(e) => handleSubmit(e)}
        >
          {submitted ? "Submitted" : "Submit"}
        </button>
      </motion.div>
    </motion.form>
  );
}
