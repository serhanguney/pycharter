import React, { useRef, useEffect } from "react";
import gsap, { Power3 } from "gsap";

export default function Modal({ open, children, close, position }) {
  let modal = useRef(null);
  let overlay = useRef(null);
  let animation = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    } else {
      const { height, width, top, left } = position;
      console.log(height, width);
      const duration = 0.5;
      animation.current = {
        modal: gsap.fromTo(
          modal,
          {
            opacity: 0,
            x: left,
            y: top,
            height: height,
            width: width,
          },
          {
            opacity: 1,
            x: 0,
            y: top,
            height: 0,
            width: window.innerWidth,
            ease: Power3.easeInOut,
            duration: duration,
          }
        ),
        overlay: gsap.to(overlay, {
          opacity: 1,
          ease: Power3.easeInOut,
          duration: duration,
        }),
      };
      animation.current.modal.play();
      animation.current.overlay.play();
    }
  }, [open, position]);
  if (!open) {
    return null;
  }
  return (
    <>
      <div
        ref={(el) => (overlay = el)}
        className="modal-overlay"
        onClick={() => close()}
      ></div>
      <div ref={(el) => (modal = el)} className="modal">
        {children}
      </div>
    </>
  );
}
