"use client";
import { carData } from "@/data/cars";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
const buttons = [
  { label: "New cars", isActive: true },
  { label: "Used Cars", isActive: false },
  { label: "In Stock", isActive: false },
];

export default function Cars() {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [sortedItems, setSortedItems] = useState([...carData]);
  useEffect(() => {
    setSortedItems([
      ...carData.filter((elm) =>
        elm.filterCategories.includes(selectedCategory.label)
      ),
    ]);
  }, [selectedCategory]);

  return (
    <section className="cars-section-four bg-1  pt-5">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2 className="mb-0 ">Explore All Vehicles</h2>
        </div>
        <nav className="wow fadeInUp" data-wow-delay="100ms">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(button)}
                className={`nav-link ${selectedCategory == button ? "active" : ""
                  }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
          <div className="tab-pane fade show active">
            <div className="row">
              {sortedItems.map((car, index) => (
                <div
                  key={index}
                  className="box-car car-block-four style-bg col-xl-3 col-lg-4 col-md-6 col-sm-12"
                >
                  <div className="inner-box">
                    <div
                      className={`image-box ${car.badge == "Great Price" ? "two" : ""
                        }`}
                    >
                      <Slider
                        dots
                        slidesToShow={1}
                        key={car.id}
                        className="slider-thumb"
                      >
                        {car.images.map((image, i) => (
                          <div key={i} className="image d-block">
                            <Link href={`/cars/${car.slug}`}>
                              <Image
                                alt=""
                                src={image}
                                width={329}
                                height={220}
                              />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                      {car.badge && <span>{car.badge}</span>}
                      <Link
                        href={`/cars/${car.slug}`}
                        title=""
                        className="icon-box"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_601_1274)">
                            <path
                              d="M9.39062 12C9.15156 12 8.91671 11.9312 8.71128 11.8009L6.11794 10.1543C6.04701 10.1091 5.95296 10.1096 5.88256 10.1543L3.28869 11.8009C2.8048 12.1082 2.13755 12.0368 1.72722 11.6454C1.47556 11.4047 1.33685 11.079 1.33685 10.728V1.2704C1.33738 0.570053 1.90743 0 2.60778 0H9.39272C10.0931 0 10.6631 0.570053 10.6631 1.2704V10.728C10.6631 11.4294 10.0925 12 9.39062 12ZM6.00025 9.06935C6.24193 9.06935 6.47783 9.13765 6.68169 9.26743L9.27503 10.9135C9.31233 10.9371 9.35069 10.9487 9.39114 10.9487C9.48046 10.9487 9.61286 10.8788 9.61286 10.728V1.2704C9.61233 1.14956 9.51356 1.05079 9.39272 1.05079H2.60778C2.48642 1.05079 2.38817 1.14956 2.38817 1.2704V10.728C2.38817 10.7911 2.41023 10.8436 2.45384 10.8851C2.52582 10.9539 2.63563 10.9708 2.72599 10.9135L5.31934 9.2669C5.52267 9.13765 5.75857 9.06935 6.00025 9.06935Z"
                              fill="black"
                            ></path>
                          </g>
                          <defs>
                            <clippath id="clip0_601_1274">
                              <rect width="12" height="12" fill="white"></rect>
                            </clippath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link href={`/cars/${car.slug}`}>
                          {car.title}
                        </Link>
                      </h6>
                      <div className="text">{car.description}</div>
                      <ul>
                        {car.specs.map((spec, i) => (
                          <li key={i}>
                            <i className={spec.icon} /> {spec.text}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-box">
                        <span>{car.price}</span>
                        <small>{car.oldPrice}</small>
                        <Link
                          href={`/cars/${car.slug}`}
                          className="details"
                        >
                          View Details
                          {/* SVG content */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
