import Image from "next/image";
import React from "react";

export default function Ratings() {
  return (
    <>
      <div className="content-box">
        <div className="auther-name">
          <span>A.T</span>
          <h6 className="name">Ali Tufan</h6>
          <small>April 2023</small>
        </div>
        <div className="rating-list">
          <ul className="list">
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
          </ul>
          <span>Take this tour!--its fantastic!</span>
        </div>
        <div className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </div>
        <div className="image-box">
          <Image src="/images/resource/blog5-4.jpg" width={130} height={130}  alt=""/>
          <Image src="/images/resource/blog5-5.jpg" width={130} height={130}  alt=""/>
          <Image src="/images/resource/blog5-6.jpg" width={130} height={130}  alt=""/>
        </div>
        <div className="btn-box">
          <a href="#" className="like-btn">
            <i className="fa-solid fa-thumbs-up" />
            Helpful
          </a>
          <a href="#" className="like-btn">
            <i className="fa-solid fa-thumbs-down" />
            Not helpful
          </a>
        </div>
      </div>
      <div className="content-box two">
        <div className="auther-name">
          <span>A.T</span>
          <h6 className="name">Ali Tufan</h6>
          <small>April 2023</small>
        </div>
        <div className="rating-list">
          <ul className="list">
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
            <li>
              <i className="fa fa-star" />
            </li>
          </ul>
          <span>Take this tour!--its fantastic!</span>
        </div>
        <div className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </div>
        <div className="btn-box">
          <a href="#" className="like-btn">
            <i className="fa-solid fa-thumbs-up" />
            Helpful
          </a>
          <a href="#" className="like-btn">
            <i className="fa-solid fa-thumbs-down" />
            Not helpful
          </a>
        </div>
        <a href="#" className="review">
          See more reviews
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={14}
            viewBox="0 0 15 14"
            fill="none"
          >
            <g clipPath="url(#clip0_881_13248)">
              <path
                d="M14.1106 0H5.55509C5.34013 0 5.16619 0.173943 5.16619 0.388901C5.16619 0.603859 5.34013 0.777802 5.55509 0.777802H13.1719L0.613453 13.3362C0.461531 13.4881 0.461531 13.7342 0.613453 13.8861C0.689396 13.962 0.788927 14 0.888422 14C0.987917 14 1.08741 13.962 1.16339 13.8861L13.7218 1.3277V8.94447C13.7218 9.15943 13.8957 9.33337 14.1107 9.33337C14.3256 9.33337 14.4996 9.15943 14.4996 8.94447V0.388901C14.4995 0.173943 14.3256 0 14.1106 0Z"
                fill="#405FF2"
              />
            </g>
            <defs>
              <clipPath id="clip0_881_13248">
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
      </div>
    </>
  );
}
