import { useReducer } from "react";
import { animate, useMotionValue } from "framer-motion";

function reducer(slide, action) {
  switch (action.type) {
    case "increment":
      return {
        ...slide,
        no: Math.min(slide.no + 1, action.payload),
        moveTo: "next",
      };
    case "decrement":
      return {
        ...slide,
        no: Math.max(slide.no - 1, action.payload),
        moveTo: "previous",
      };
    default:
      return slide;
  }
}
const initialState = {
  no: 0,
  moveTo: "",
};
export default function useSlider() {
  const [slide, dispatch] = useReducer(reducer, initialState);
  const slideMotionValue = useMotionValue(0);
  const motionTransition = { duration: 0.8, ease: [0.79, 0.14, 0.15, 0.86] };

  function nextSlide(limit, ref) {
    dispatch({ type: "increment", payload: limit });
    const width = ref.getBoundingClientRect().width;
    const previousValue = slideMotionValue.get();
    animate(slideMotionValue, previousValue - width, motionTransition);
  }
  function previousSlide(limit = 0, ref) {
    dispatch({ type: "decrement", payload: limit });
    const width = ref.getBoundingClientRect().width;
    const previousValue = slideMotionValue.get();
    animate(slideMotionValue, previousValue + width, motionTransition);
  }

  return { slide, nextSlide, previousSlide, slideMotionValue };
}
