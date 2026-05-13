import React from "react";

export default function Review() {
  return (
    <>
      <h4 className="title">Customer Reviews</h4>
      <div className="review-box">
        <div className="rating-box">
          <div className="content-box">
            <span>Overall Rating</span>
            <h3 className="title">4.8</h3>
            <small>Out Of 5</small>
          </div>
        </div>
        <ul className="review-list two">
          <li>
            <div className="review-title">
              <span>Comfort</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
          <li>
            <div className="review-title">
              <span>Performance</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
          <li>
            <div className="review-title">
              <span>Exterior styling</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
        </ul>
        <ul className="review-list">
          <li>
            <div className="review-title">
              <span>Interior design</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
          <li>
            <div className="review-title">
              <span>Value for the money</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
          <li>
            <div className="review-title">
              <span>Reliability</span>
              <small>Excellent</small>
            </div>
            <sub>
              <i className="fa fa-star" />
              5.0
            </sub>
          </li>
        </ul>
      </div>
    </>
  );
}
