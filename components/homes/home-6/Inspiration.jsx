import React from "react";
import Image from "next/image";
import { carCategories2 } from "@/data/categories";
export default function Inspiration() {
  return (
    <section className="boxcar-inspiration-section-two pt-0">
      <div className="large-container">
        <div className="right-box-two">
          <div className="uper-box">
            <div className="content-box">
              <figure className="icon">
                <a href="#">
                  <Image
                    alt=""
                    src="/images/resource/search.png"
                    width={94}
                    height={94}
                  />
                </a>
              </figure>
              <div className="boxcar-title light">
                <h2>Search over 150,000 vehicles</h2>
                <div className="text">
                  Choose from thousands of trusted used cars and vans across
                  <br />
                  the UK, from our national network of vetted dealers.
                </div>
              </div>
            </div>
            <div className="btn-box">
              <a href="#" className="read-more">
                Search Cars
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_669_4430)">
                    <path
                      d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_669_4430">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" className="read-more">
                Search Vans
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_669_4430)">
                    <path
                      d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_669_4430">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
          <div className="right-box wow fadeInUp" data-wow-delay="100ms">
            <div className="boxcar-title light wow fadeInUp">
              <h6>Or browse by type:</h6>
            </div>
            <ul className="service-list">
              {carCategories2.map((category, index) => (
                <li key={index}>
                  <a href="#">{category}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
