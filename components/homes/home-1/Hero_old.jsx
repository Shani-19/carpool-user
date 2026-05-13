"use client";
import SelectComponent from "@/components/common/SelectComponent";
import { carTypes } from "@/data/categories";
import Link from "next/link";
import React, { useState } from "react";
const categories = ["All", "New", "Used"];
export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <section className="boxcar-banner-section-v1">
      <div className="container">
        <div className="banner-content">
          <span className="wow fadeInUp">
            Find cars for sale and for rent near you
          </span>
          <h2 className="wow fadeInUp" data-wow-delay="100ms">
            Find Your Perfect Car
          </h2>
          <div className="form-tabs">
            <ul className="form-tabs-list wow fadeInUp" data-wow-delay="200ms">
              {categories.map((category, index) => (
                <li
                  className={selectedCategory == category ? "current" : ""}
                  onClick={() => setSelectedCategory(category)}
                  key={index}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="form-tab-content">
              <div
                className="form-tab-content wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="form-tab-pane current" id="tab-1">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form_boxes line-r">
                      <SelectComponent
                        options={["Any Makes", "Audi", "California"]}
                      />
                    </div>
                    <div className="form_boxes line-r">
                      <SelectComponent
                        options={["Any Models", "A3", "Accord"]}
                      />
                    </div>
                    <div className="form_boxes">
                      <SelectComponent
                        options={["Any Price", "200$", "300$"]}
                      />
                    </div>
                    <Link href={`/inventory-list-01`} className="form-submit">
                      <button type="submit" className="theme-btn">
                        <i className="flaticon-search" />
                        Search 9451 Cars
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
              <span className="wow fadeInUp" data-wow-delay="400ms">
                Or Browse Featured Model
              </span>
              <ul className="model-links">
                {carTypes.map((car, index) => (
                  <li key={index}>
                    <a href="#" title="">
                      <i className={car.iconClass} />
                      {car.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
