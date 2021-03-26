import React, { useState } from "react";
import { fleet } from "../../boats/boats";
import required from "../../icons/required.png";
import { motion } from "framer-motion";
export default function Dropdown({ state, formVariants }) {
  const [open, setOpen] = useState(false);
  const { values, setValues, errors, setErrors } = state;
  function handleClick(e) {
    const name = e.target.getAttribute("name");
    const targetValue = e.target.getAttribute("value");
    setValues({ ...values, [name]: targetValue });
    setErrors({ ...errors, [name]: null });
    setOpen(false);
  }
  return (
    <>
      <label htmlFor="boat">Boat Interested</label>
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
      <ul className={`dropdown ${open ? "visible" : "invisible"}`}>
        {fleet.map((item, index) => (
          <li
            key={index}
            name="boat"
            value={item.name}
            onMouseDown={(e) => handleClick(e)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}
