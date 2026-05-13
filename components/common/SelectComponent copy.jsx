"use client";

import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
}) {
  const [isDromdownOpen, setIsDromdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    // Check if the click was outside the referenced element
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDromdownOpen(false); // Close the element or perform an action
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={`drop-menu  ${isDromdownOpen ? "active" : ""} `}>
      <div className="select" onClick={() => setIsDromdownOpen((pre) => !pre)}>
        <span>{selectedOption}</span>
        <i className="fa fa-angle-down" />
      </div>

      <ul
        className="dropdown"
        style={
          isDromdownOpen
            ? {
                display: "block",
                opacity: 1,
                visibility: "visible",
                transition: "0.4s",
              }
            : {
                display: "block",
                opacity: 0,
                visibility: "hidden",
                transition: "0.4s",
              }
        }
      >
        {options.map((option, index) => (
          <li
            onClick={() => {
              setSelectedOption(option);
              setIsDromdownOpen(false);
            }}
            key={index}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
