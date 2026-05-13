"use client";

import { useState } from "react";

export default function Faqs() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="inner-container">
      {/* FAQ Column */}
      <h4 className="title">Specifications</h4>
      <div className="faq-column wow fadeInUp" data-wow-delay="400ms">
        <div className="inner-column">
          <ul className="widget-accordion wow fadeInUp">
            {/*Block*/}
            <li
              className={`accordion block  ${
                activeTab == 1 ? "active-block" : ""
              } `}
            >
              <div
                onClick={() => setActiveTab(1)}
                className={`acc-btn ${activeTab == 1 ? "active" : ""} `}
              >
                DEngine and Transmission
                <div className="icon fa fa-angle-down" />
              </div>
              <div
                className={`acc-content ${activeTab == 1 ? "current" : ""} `}
              >
                <div className="content">
                  <div className="row">
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Length</span>4950mm
                          </li>
                          <li>
                            <span>Height</span>1776mm
                          </li>
                          <li>
                            <span>Front Tread</span>1668mm
                          </li>
                          <li>
                            <span>Kerb Weight</span>2350
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Width</span>2140mm
                          </li>
                          <li>
                            <span>Wheel Base</span>2984mm
                          </li>
                          <li>
                            <span>Rear Tread</span>1671mm
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/*Block*/}
            <li
              className={`accordion block  ${
                activeTab == 2 ? "active-block" : ""
              } `}
            >
              <div
                onClick={() => setActiveTab(2)}
                className={`acc-btn ${activeTab == 2 ? "active" : ""} `}
              >
                Dimensions &amp; Capacity
                <div className="icon fa fa-angle-down" />
              </div>
              <div
                className={`acc-content ${activeTab == 2 ? "current" : ""} `}
              >
                <div className="content">
                  <div className="row">
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Length</span>4950mm
                          </li>
                          <li>
                            <span>Height</span>1776mm
                          </li>
                          <li>
                            <span>Front Tread</span>1668mm
                          </li>
                          <li>
                            <span>Kerb Weight</span>2350
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Width</span>2140mm
                          </li>
                          <li>
                            <span>Wheel Base</span>2984mm
                          </li>
                          <li>
                            <span>Rear Tread</span>1671mm
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/*Block*/}
            <li
              className={`accordion block v2 ${
                activeTab == 3 ? "active-block " : ""
              } `}
            >
              <div
                onClick={() => setActiveTab(3)}
                className={`acc-btn ${activeTab == 3 ? "active" : ""} `}
              >
                Miscellaneous
                <div className="icon fa fa-angle-down" />
              </div>
              <div
                className={`acc-content ${activeTab == 3 ? "current" : ""} `}
              >
                <div className="content">
                  <div className="row">
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Length</span>4950mm
                          </li>
                          <li>
                            <span>Height</span>1776mm
                          </li>
                          <li>
                            <span>Front Tread</span>1668mm
                          </li>
                          <li>
                            <span>Kerb Weight</span>2350
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="list-column col-lg-6 col-md-6 col-sm-12">
                      <div className="inner-column">
                        <ul className="spects-list">
                          <li>
                            <span>Width</span>2140mm
                          </li>
                          <li>
                            <span>Wheel Base</span>2984mm
                          </li>
                          <li>
                            <span>Rear Tread</span>1671mm
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
