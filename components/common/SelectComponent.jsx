"use client";

import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
  onChange
}) {
  const [isDromdownOpen, setIsDromdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef(null);
  
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDromdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsDromdownOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

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
            onClick={() => handleSelect(option)}
            key={index}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}