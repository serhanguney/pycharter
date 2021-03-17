import { useContext, useEffect, useState } from "react";
import { Portfolio } from "../context";

//useArray hook returns a dynamic array structure depending on the size of device.
export default function useArray(array, desktop, mobile) {
  const [list, setList] = useState([]);
  const {
    dimensions: { width },
  } = useContext(Portfolio);
  //why it doesn't wok without useeffect ?

  useEffect(() => {
    if (width < 620) {
      const cloneOfArray = array.slice();
      const adjustedArray = new Array(Math.ceil(cloneOfArray.length / mobile))
        .fill()
        .map((_) => cloneOfArray.splice(0, mobile));
      setList(adjustedArray);
    } else {
      const cloneOfArray = array.slice();
      const adjustedArray = new Array(Math.ceil(cloneOfArray.length / desktop))
        .fill()
        .map((_) => cloneOfArray.splice(0, desktop));
      setList(adjustedArray);
    }
  }, [width, array, desktop, mobile]);

  return list;
}
