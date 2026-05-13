import { carGroups } from "@/data/categories";
import Link from "next/link";
import React from "react";

export default function Features3() {
  return (
    <section className="cars-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Shop BoxCar Your Way</h2>
          <Link href={`/inventory-list-01`} className="btn-title">
            View More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_3199)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_3199">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <ul
          className="nav nav-tabs wow fadeInUp"
          data-wow-delay="100ms"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              New Cars For Sale
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Used Cars For Sale
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Browse By Type
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Browse By Brand
            </button>
          </li>
        </ul>
        <div
          className="tab-content wow fadeInUp"
          data-wow-delay="200ms"
          id="myTabContent"
        >
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="shop-cars">
              {carGroups.map((group, groupIndex) => (
                <ul key={groupIndex} className="cars-list">
                  {group.map((car, index) => (
                    <li key={index}>
                      <a href="#">{car}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="shop-cars">
              {carGroups.map((group, groupIndex) => (
                <ul key={groupIndex} className="cars-list">
                  {group.map((car, index) => (
                    <li key={index}>
                      <a href="#">{car}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="shop-cars">
              {carGroups.map((group, groupIndex) => (
                <ul key={groupIndex} className="cars-list">
                  {group.map((car, index) => (
                    <li key={index}>
                      <a href="#">{car}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="shop-cars">
              {carGroups.map((group, groupIndex) => (
                <ul key={groupIndex} className="cars-list">
                  {group.map((car, index) => (
                    <li key={index}>
                      <a href="#">{car}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
