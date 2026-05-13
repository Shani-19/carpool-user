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
      {/* Edited by Maira — back-to-top uses uploaded car image */}
      {isVisible && (
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
      )}
    </>
  );
};

export default BackToTop;
