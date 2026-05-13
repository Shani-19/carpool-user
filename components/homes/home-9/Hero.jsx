"use client";
import SelectComponent from "@/components/common/SelectComponent";
import Link from "next/link";
import React, { useState } from "react";
const categories = ["All", "New", "Used"];
export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <section className="boxcar-banner-section-nine">
      <div className="container">
        <div className="banner-content">
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
                        options={["Any Models", "A3", "Accord"]}
                      />
                    </div>
                    <div className="form_boxes line-r">
                      <SelectComponent
                        options={["Any Makes", "Audi", "Honda"]}
                      />
                    </div>
                    <div className="form_boxes line-r">
                      <SelectComponent
                        options={["Any Models", "A3", "Aoccrd"]}
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
            </div>
          </div>
          <div className="content-box">
            <span className="wow fadeInUp">
              We make finding the right car simple
            </span>
            <h2 className="wow fadeInUp" data-wow-delay="100ms">
              Search Less. Live More.
            </h2>
            <div className="btn-box">
              <a
                href="#"
                className="read-more active wow fadeInUp"
                data-wow-delay="200ms"
              >
                View Inventory
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_919_4250)">
                    <path
                      d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                      fill="#050B20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_919_4250">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="#"
                className="read-more wow fadeInUp"
                data-wow-delay="200ms"
              >
                Contact Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_634_2156)">
                    <path
                      d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_634_2156">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
