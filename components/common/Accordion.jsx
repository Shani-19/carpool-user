"use client";
import { accordionData } from "@/data/faqs";

import React, { useState } from "react";

export default function Accordion({ faqs = accordionData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {faqs.map((item, index) => (
        <li
          key={index}
          className={`accordion block ${
            currentIndex == index ? "active-block" : ""
          }`}
        >
          <div
            className={`acc-btn ${currentIndex == index ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex((pre) => (pre == index ? -1 : index));
            }}
          >
            {item.question}
            <div
              className={`icon fa fa-${
                currentIndex == index ? "minus" : "plus"
              }`}
            />
          </div>
          <div
            className={`acc-content ${currentIndex == index ? "current" : ""}`}
          >
            <div className="content">
              <div className="text">{item.answer}</div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
