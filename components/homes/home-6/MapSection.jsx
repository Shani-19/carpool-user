import React from "react";

export default function MapSection() {
  return (
    <section className="map-section">
      <div className="goole-iframe">
        <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
      </div>
      <div className="boxcar-container">
        <div className="map-box">
          <h2 className="title">Get in Touch</h2>
          <div className="text">Contact our Sales Departament</div>
          <a href="#" className="btn-two">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={26}
              height={26}
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M17.3333 2.4375H8.66667C7.02325 2.4375 5.6875 3.77325 5.6875 5.41667V20.5833C5.6875 22.2268 7.02325 23.5625 8.66667 23.5625H17.3333C18.9768 23.5625 20.3125 22.2268 20.3125 20.5833V5.41667C20.3125 3.77325 18.9768 2.4375 17.3333 2.4375ZM18.6875 20.5833C18.6875 21.3298 18.0798 21.9375 17.3333 21.9375H8.66667C7.92025 21.9375 7.3125 21.3298 7.3125 20.5833V5.41667C7.3125 4.67025 7.92025 4.0625 8.66667 4.0625H17.3333C18.0798 4.0625 18.6875 4.67025 18.6875 5.41667V20.5833ZM14.8958 6.5C14.8958 6.9485 14.5318 7.3125 14.0833 7.3125H11.9167C11.4682 7.3125 11.1042 6.9485 11.1042 6.5C11.1042 6.0515 11.4682 5.6875 11.9167 5.6875H14.0833C14.5318 5.6875 14.8958 6.0515 14.8958 6.5Z"
                fill="#050B20"
              />
            </svg>
            +76 956 039 967
          </a>
          <ul className="shaduel-list">
            <li>Monday: 9:00-13:00</li>
            <li>Tuesday: 9:00-13:00</li>
            <li>Wednesday: 9:00-13:00</li>
            <li>Thursday: 9:00-13:00</li>
            <li>Friday: 9:00-13:00</li>
            <li>Saturday: 9:00-13:00</li>
            <li>Sunday: CLOSED</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
