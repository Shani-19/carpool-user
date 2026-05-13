import React from "react";

export default function FooterBanner() {
  return (
    <section className="banner-footer-section">
      <div className="boxcar-container">
        <div className="wrapper-banner">
          <div className="title">Have a Questions? Feel Free To Ask...</div>
          <div className="box-right">
            <svg
              width={50}
              height={50}
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3333 4.6875H16.6667C13.5062 4.6875 10.9375 7.25625 10.9375 10.4167V39.5833C10.9375 42.7437 13.5062 45.3125 16.6667 45.3125H33.3333C36.4937 45.3125 39.0625 42.7437 39.0625 39.5833V10.4167C39.0625 7.25625 36.4937 4.6875 33.3333 4.6875ZM35.9375 39.5833C35.9375 41.0187 34.7687 42.1875 33.3333 42.1875H16.6667C15.2312 42.1875 14.0625 41.0187 14.0625 39.5833V10.4167C14.0625 8.98125 15.2312 7.8125 16.6667 7.8125H33.3333C34.7687 7.8125 35.9375 8.98125 35.9375 10.4167V39.5833ZM28.6458 12.5C28.6458 13.3625 27.9458 14.0625 27.0833 14.0625H22.9167C22.0542 14.0625 21.3542 13.3625 21.3542 12.5C21.3542 11.6375 22.0542 10.9375 22.9167 10.9375H27.0833C27.9458 10.9375 28.6458 11.6375 28.6458 12.5Z"
                fill="white"
              />
            </svg>
            <span>+69 884 273 842</span>
          </div>
        </div>
      </div>
    </section>
  );
}
