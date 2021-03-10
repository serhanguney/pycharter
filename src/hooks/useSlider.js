import { useReducer } from "react";

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

  function nextSlide(limit) {
    dispatch({ type: "increment", payload: limit });
  }
  function previousSlide(limit = 0) {
    dispatch({ type: "decrement", payload: limit });
  }

  return { slide, nextSlide, previousSlide };
}
