import React from "react";

export default function Location() {
  return (
    <>
      <h4 className="title">Location</h4>
      <div className="text">
        Ford Shirley, 361 - 369 Stratford Road, Shirley, Solihull, B90 3BS Open
        today 9am - 6pm
      </div>
      <a href="#" className="brand-btn">
        Get Directions
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={14}
          viewBox="0 0 15 14"
          fill="none"
        >
          <g clipPath="url(#clip0_881_14440)">
            <path
              d="M14.1111 0H5.55558C5.34062 0 5.16668 0.173943 5.16668 0.388901C5.16668 0.603859 5.34062 0.777802 5.55558 0.777802H13.1723L0.613941 13.3362C0.46202 13.4881 0.46202 13.7342 0.613941 13.8861C0.689884 13.962 0.789415 14 0.88891 14C0.988405 14 1.0879 13.962 1.16388 13.8861L13.7222 1.3277V8.94447C13.7222 9.15943 13.8962 9.33337 14.1111 9.33337C14.3261 9.33337 14.5 9.15943 14.5 8.94447V0.388901C14.5 0.173943 14.3261 0 14.1111 0Z"
              fill="#405FF2"
            />
          </g>
          <defs>
            <clipPath id="clip0_881_14440">
              <rect
                width={14}
                height={14}
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
      <div className="goole-iframe">
        <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
      </div>
    </>
  );
}
