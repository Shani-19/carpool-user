"use client";
import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled 200px
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to the top
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (

        // 22/4/26 code updated with Maira's Changes
        <div
          className="scroll-to-top scroll-to-target cpk-back-to-top"
          onClick={scrollToTop}
          role="button"
          aria-label="Back to top"
          style={{ display: "inline-flex" }}
        >
          <img
            src="/css/images/back-to-top-car.png"
            className="cpk-car-img"
            alt="Back to top"
          />
        </div>

        // 22/4/26 old code
        // <div
        //   className="scroll-to-top scroll-to-target"
        //   onClick={scrollToTop}
        //   style={{ display: "block" }}
        // >
        //   <span className="fa fa-angle-up"></span>
        // </div>
      )}
    </>
  );
};

export default BackToTop;
