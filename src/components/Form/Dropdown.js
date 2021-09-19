import React, { useContext, useState } from "react";
import { fleet } from "../../boats/boats";
import required from "../../icons/required.svg";
import { motion } from "framer-motion";
import dropdownArrow from "../../icons/dropdownArrow.svg";
import { Portfolio } from "../../context";
import { content } from "../../content/content";
export default function Dropdown({ state }) {
  const { portfolio } = useContext(Portfolio);
  const [open, setOpen] = useState(false);
  const { values, setValues, errors, setErrors, isSubmitting } = state;
  function handleClick(e) {
    const name = e.target.getAttribute("name");
    const targetValue = e.target.getAttribute("value");
    setValues({ ...values, [name]: targetValue });
    setErrors({ ...errors, [name]: null });
    setOpen(false);
  }
  const arrowVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 180 },
  };
  return (
    <>
      <label htmlFor="boat">
        {content[portfolio.language].dropdown.placeholder}
      </label>

      <input
        type="button"
        id="boat"
        name="boat"
        value={errors.boat ? errors.boat : values.boat}
        className={`dropdown-label ${errors.boat ? "required" : ""}`}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <img
        src={required}
        alt="required"
        className={errors.boat ? "visible" : "invisible"}
      />
      <motion.img
        src={dropdownArrow}
        alt="dropdown arrow"
        initial="initial"
        animate={open ? "animate" : "initial"}
        transition={{ duration: 0.4 }}
        variants={arrowVariants}
      />

      <ul
        className={`dropdown ${open ? "visible" : "invisible"}`}
        style={
          isSubmitting ? { pointerEvents: "none" } : { pointerEvents: "auto" }
        }
      >
        {fleet.map((item, index) => (
          <li
            key={index}
            name="boat"
            value={item[portfolio.language].name}
            onMouseDown={(e) => handleClick(e)}
          >
            {item[portfolio.language].name}
          </li>
        ))}
      </ul>
    </>
  );
}
