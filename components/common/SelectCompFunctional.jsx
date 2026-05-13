"use client";

import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
  selectedValue, 
  values = options,
  onChange,
}) {
  // console.log(values)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);
  
  const selectedOption = selectedValue || options[0];

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option, value) => {
    setIsDropdownOpen(false);
    if (onChange) {
      // console.log('option & value selected:', option, value);
      onChange(option, value);
    }
  };

  return (
    <div ref={ref} className={`drop-menu ${isDropdownOpen ? "active" : ""}`}>
      <div className="select" onClick={() => setIsDropdownOpen((pre) => !pre)}>
        <span>{selectedOption}</span>
        <i className="fa fa-angle-down" />
      </div>

      <ul
        className="dropdown"
        style={
          isDropdownOpen
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
        {options.map((option, index, arr) => (
          // console.log(option, index, arr),
          <li
            // onClick={() => handleOptionSelect(option)}
            onClick={() => handleOptionSelect(option, values[index])}
            key={index}
            className={`text-nowrap ${option === selectedOption ? "selected" : ""}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}