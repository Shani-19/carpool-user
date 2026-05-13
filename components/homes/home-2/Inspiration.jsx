import { carCategories } from "@/data/categories";
import React from "react";

export default function Inspiration() {
  return (
    <section className="boxcar-inspiration-section pt-0">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Need Some Inspiration?</h2>
        </div>
        <div className="right-box wow fadeInUp" data-wow-delay="100ms">
          <ul className="service-list">
            {carCategories.map((category, index) => (
              <li key={index}>
                <a href="#">{category}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
