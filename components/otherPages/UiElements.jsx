"use client";

import Slider from "rc-slider";
import { useState } from "react";

const categories = [
  "Banking",
  "Digital & Creative",
  "Retail",
  "Designer",
  "Developer",
];

export default function UiElements() {
  const [searchQuery1, setsearchQuery1] = useState("");
  const [searchQuery2, setsearchQuery2] = useState("");
  const [searchQuery3, setsearchQuery3] = useState("");
  const [activeValue1, setActiveValue1] = useState(categories[0]);
  const [activeValue2, setActiveValue2] = useState(categories[1]);
  const [activeValue3, setActiveValue3] = useState(categories[2]);
  const [price, setPrice] = useState([5000, 35000]);
  const handlePrice = (value) => {
    setPrice(value);
  };
  return (
    <div className="element-section layout-radius">
      <div className="boxcar-container">
        <ul className="breadcrumb">
          <li>
            <a className="item active" href="index.html" />
            Home
          </li>
          <li>
            <a className="item" href="#" />
            Cars for Sale
          </li>
        </ul>
        <h2>UI Elements</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="title-element">Accordions</div>
            <div className="box-accordion">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <div
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What methods of payments are supported?
                    <span className="icon">
                      <svg
                        className="minus"
                        width={16}
                        height={2}
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={16} height={2} fill="#222222" />
                      </svg>
                      <svg
                        className="plus"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 7H16V9H0V7Z" fill="#222222" />
                        <path
                          d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
                          fill="#222222"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Cras vitae ac nunc orci. Purus amet tortor non at
                      phasellus ultricies hendrerit. Eget a, sit morbi nunc sit
                      id massa. Metus, scelerisque volutpat nec sit vel donec.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I cancel at anytime?
                    <span className="icon">
                      <svg
                        className="minus"
                        width={16}
                        height={2}
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={16} height={2} fill="#222222" />
                      </svg>
                      <svg
                        className="plus"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 7H16V9H0V7Z" fill="#222222" />
                        <path
                          d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
                          fill="#222222"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Cras vitae ac nunc orci. Purus amet tortor non at
                      phasellus ultricies hendrerit. Eget a, sit morbi nunc sit
                      id massa. Metus, scelerisque volutpat nec sit vel donec.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    How do I get a receipt for my purchase?
                    <span className="icon">
                      <svg
                        className="minus"
                        width={16}
                        height={2}
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={16} height={2} fill="#222222" />
                      </svg>
                      <svg
                        className="plus"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 7H16V9H0V7Z" fill="#222222" />
                        <path
                          d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
                          fill="#222222"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Cras vitae ac nunc orci. Purus amet tortor non at
                      phasellus ultricies hendrerit. Eget a, sit morbi nunc sit
                      id massa. Metus, scelerisque volutpat nec sit vel donec.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Which license do I need?
                    <span className="icon">
                      <svg
                        className="minus"
                        width={16}
                        height={2}
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={16} height={2} fill="#222222" />
                      </svg>
                      <svg
                        className="plus"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 7H16V9H0V7Z" fill="#222222" />
                        <path
                          d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
                          fill="#222222"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Cras vitae ac nunc orci. Purus amet tortor non at
                      phasellus ultricies hendrerit. Eget a, sit morbi nunc sit
                      id massa. Metus, scelerisque volutpat nec sit vel donec.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    How do I get access to a theme I purchased?
                    <span className="icon">
                      <svg
                        className="minus"
                        width={16}
                        height={2}
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={16} height={2} fill="#222222" />
                      </svg>
                      <svg
                        className="plus"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 7H16V9H0V7Z" fill="#222222" />
                        <path
                          d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
                          fill="#222222"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    id="flush-collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      Cras vitae ac nunc orci. Purus amet tortor non at
                      phasellus ultricies hendrerit. Eget a, sit morbi nunc sit
                      id massa. Metus, scelerisque volutpat nec sit vel donec.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="title-element">Tabs</div>
            <div className="box-tabs-element">
              <ul
                className="nav nav-pills nav-tab-el1"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="development-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#development"
                    type="button"
                    role="tab"
                    aria-controls="development"
                    aria-selected="true"
                  >
                    Development &amp; IT
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="design-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#design"
                    type="button"
                    role="tab"
                    aria-controls="design"
                    aria-selected="false"
                  >
                    Design &amp; Creative
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="digital-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#digital"
                    type="button"
                    role="tab"
                    aria-controls="digital"
                    aria-selected="false"
                  >
                    Digital Marketing
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="development"
                  role="tabpanel"
                  aria-labelledby="development-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="design"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="digital"
                  role="tabpanel"
                  aria-labelledby="digital-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="box-tabs-element box-tabs-element-2">
              <ul
                className="nav nav-pills nav-tab-el2"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="item1-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#item1"
                    type="button"
                    role="tab"
                    aria-controls="item1"
                    aria-selected="true"
                  >
                    Item 1
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="item2-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#item2"
                    type="button"
                    role="tab"
                    aria-controls="item2"
                    aria-selected="false"
                  >
                    Item 2
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="item3-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#item3"
                    type="button"
                    role="tab"
                    aria-controls="item3"
                    aria-selected="false"
                  >
                    Item 3
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="item1"
                  role="tabpanel"
                  aria-labelledby="item1-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="item2"
                  role="tabpanel"
                  aria-labelledby="item2-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="item3"
                  role="tabpanel"
                  aria-labelledby="item3-tab"
                >
                  <p>
                    Pharetra nulla ullamcorper sit lectus. Fermentum mauris
                    pellentesque nec nibh sed et, vel diam, massa. Placerat quis
                    vel fames interdum urna lobortis sagittis sed pretium.
                    Aliquam eget posuere sit enim elementum nulla vulputate
                    magna. Morbi sed arcu proin quis tortor non risus.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="title-element">Accordions</div>
            <div className="box-table-el">
              <table>
                <thead>
                  <tr className="title">
                    <th>Description</th>
                    <th>Hour</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="content">
                    <td>Design UX and UI</td>
                    <td>14</td>
                    <td>3</td>
                  </tr>
                  <tr className="content">
                    <td>Design UX and UI</td>
                    <td>14</td>
                    <td>3</td>
                  </tr>
                  <tr className="content">
                    <td>Design UX and UI</td>
                    <td>14</td>
                    <td>3</td>
                  </tr>
                  <tr className="content">
                    <td>Design UX and UI</td>
                    <td>14</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="title-element">Message Boxes</div>
            <div className="messages-box-el">
              <div className="alert alert-info fade show" role="alert">
                <p>Info: User pending action</p>
                <span data-bs-dismiss="alert" aria-label="Close">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.48881 11.5962L12.0954 0.98963L13.5096 2.40384L2.90302 13.0104L1.48881 11.5962Z"
                      fill="#4780AA"
                    />
                    <path
                      d="M12.0954 13.7176L0.781703 2.40384L2.19592 0.989631L13.5096 12.3033L12.0954 13.7176Z"
                      fill="#4780AA"
                    />
                  </svg>
                </span>
              </div>
              <div className="alert alert-warning fade show" role="alert">
                <p>Warning: User has to be admin</p>
                <span data-bs-dismiss="alert" aria-label="Close">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.48881 11.5962L12.0954 0.98963L13.5096 2.40384L2.90302 13.0104L1.48881 11.5962Z"
                      fill="#927238"
                    />
                    <path
                      d="M12.0954 13.7176L0.781703 2.40384L2.19592 0.989631L13.5096 12.3033L12.0954 13.7176Z"
                      fill="#927238"
                    />
                  </svg>
                </span>
              </div>
              <div className="alert alert-error fade show" role="alert">
                <p>Error: Internal Server Error</p>
                <span data-bs-dismiss="alert" aria-label="Close">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.48881 11.5962L12.0954 0.98963L13.5096 2.40384L2.90302 13.0104L1.48881 11.5962Z"
                      fill="#AB3331"
                    />
                    <path
                      d="M12.0954 13.7176L0.781703 2.40384L2.19592 0.989631L13.5096 12.3033L12.0954 13.7176Z"
                      fill="#AB3331"
                    />
                  </svg>
                </span>
              </div>
              <div className="alert alert-success fade show" role="alert">
                <p>Success: Updated members status</p>
                <span data-bs-dismiss="alert" aria-label="Close">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.48881 11.5962L12.0954 0.98963L13.5096 2.40384L2.90302 13.0104L1.48881 11.5962Z"
                      fill="#5B7052"
                    />
                    <path
                      d="M12.0954 13.7176L0.781703 2.40384L2.19592 0.989631L13.5096 12.3033L12.0954 13.7176Z"
                      fill="#5B7052"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="title-element">Buttons</div>
            <div className="box-button-el">
              <a href="#" className="tf-btn primary">
                Button Primary
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn primary-hover">
                Button Primary Hover
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn secondary">
                Button Secondary
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3167_613)">
                    <path
                      d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                      fill="#405FF2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3167_613">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a href="#" className="tf-btn secondary-hover">
                Button Secondary Hover
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn third">
                Button Third
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="#405FF2"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn third-hover">
                Button Third Hover
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn fourth">
                Button Fourth
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="#050B20"
                  />
                </svg>
              </a>
              <a href="#" className="tf-btn fourth-hover">
                Button Fourth Hover
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="title-element">Form</div>
          <div className="col-lg-6">
            <div className="form-box">
              <fieldset className="input-box">
                <label htmlFor="">Input Text</label>
                <input type="text" placeholder="Ali Tufan" />
              </fieldset>
              <div className="select-box-el">
                <div
                  className="select-header"
                  data-bs-toggle="collapse"
                  data-bs-target="#select1"
                  aria-expanded="false"
                  aria-controls="select1"
                >
                  <div className="label">Search Select boxes, Hover</div>
                  <span className="field-select-el">{activeValue1}</span>
                  <span className="icon">
                    <svg
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.86941 0.529619C9.68892 0.338178 9.38702 0.331049 9.19653 0.511045L4.99976 4.48685L0.803467 0.511065C0.612983 0.330581 0.311545 0.338197 0.130592 0.529638C-0.0503606 0.720591 -0.0422749 1.02203 0.148697 1.20298L4.67261 5.4888C4.76404 5.57548 4.88214 5.61928 4.99976 5.61928C5.11737 5.61928 5.23594 5.57548 5.32738 5.4888L9.8513 1.20298C10.0423 1.02201 10.0504 0.720591 9.86941 0.529619Z"
                        fill="#050B20"
                      />
                    </svg>
                  </span>
                </div>
                <div id="select1" className="collapse show">
                  <div className="select-body">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search"
                        className="search-field"
                        onChange={(e) => setsearchQuery1(e.target.value)}
                      />
                      <span className="icon">
                        <svg
                          width={15}
                          height={15}
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_200_8303)">
                            <path
                              d="M6.60568 0C2.96341 0 0 2.96341 0 6.60568C0 10.2482 2.96341 13.2114 6.60568 13.2114C10.2482 13.2114 13.2114 10.2482 13.2114 6.60568C13.2114 2.96341 10.2482 0 6.60568 0ZM6.60568 11.9919C3.63577 11.9919 1.21951 9.57562 1.21951 6.60571C1.21951 3.6358 3.63577 1.21951 6.60568 1.21951C9.57559 1.21951 11.9919 3.63577 11.9919 6.60568C11.9919 9.57559 9.57559 11.9919 6.60568 11.9919Z"
                              fill="#051036"
                            />
                            <path
                              d="M14.822 13.9591L11.326 10.4632C11.0878 10.225 10.702 10.225 10.4638 10.4632C10.2256 10.7012 10.2256 11.0874 10.4638 11.3254L13.9598 14.8214C14.0789 14.9405 14.2348 15 14.3909 15C14.5468 15 14.7029 14.9405 14.822 14.8214C15.0602 14.5834 15.0602 14.1972 14.822 13.9591Z"
                              fill="#051036"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_200_8303">
                              <rect width={15} height={15} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <ul className="box-search-select">
                      {categories
                        .filter((elm) =>
                          elm.toLowerCase().includes(searchQuery1)
                        )
                        .map((elm, i) => (
                          <li
                            key={i}
                            className={`search-result-item ${
                              activeValue1 == elm ? "active" : ""
                            }`}
                            onClick={() => setActiveValue1(elm)}
                          >
                            {elm}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="box-textarea">
                <label htmlFor="">Textarea</label>
                <textarea defaultValue={"Lorem Ipsum Dolar Sit Amet"} />
              </div>
              <div className="wrap-booltip-el">
                <div className="title-element">Tooltips</div>
                <div className="box-tooltip">
                  <a
                    href="#"
                    className="btn-tooltip"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Top"
                  >
                    Top
                  </a>
                  <a
                    href="#"
                    className="btn-tooltip"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Bottom"
                  >
                    Bottom
                  </a>
                  <a
                    href="#"
                    className="btn-tooltip"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Left"
                  >
                    Left
                  </a>
                  <a
                    href="#"
                    className="btn-tooltip"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Right"
                  >
                    Right
                  </a>
                </div>
              </div>
              <div className="wrap-range-el">
                <div className="title-element">Range Slider</div>
                <div className="widget-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={50000}
                    min={0}
                    defaultValue={price}
                    onChange={(value) => handlePrice(value)}
                    id="slider"
                  />
                  <div className="box-val-range-el">
                    ${price[0]}
                    <span>-</span>${price[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-box">
              <fieldset className="input-box active">
                <label htmlFor="">Input Text</label>
                <input type="text" placeholder="Ali Tufan" />
              </fieldset>
              <div className="select-box-el style1">
                <div
                  className="select-header collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#select2"
                  aria-expanded="false"
                  aria-controls="select2"
                >
                  <div className="label">Select Box</div>
                  <span className="field-select-el2">{activeValue2}</span>
                  <span className="icon">
                    <svg
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.86941 0.529619C9.68892 0.338178 9.38702 0.331049 9.19653 0.511045L4.99976 4.48685L0.803467 0.511065C0.612983 0.330581 0.311545 0.338197 0.130592 0.529638C-0.0503606 0.720591 -0.0422749 1.02203 0.148697 1.20298L4.67261 5.4888C4.76404 5.57548 4.88214 5.61928 4.99976 5.61928C5.11737 5.61928 5.23594 5.57548 5.32738 5.4888L9.8513 1.20298C10.0423 1.02201 10.0504 0.720591 9.86941 0.529619Z"
                        fill="#050B20"
                      />
                    </svg>
                  </span>
                </div>
                <div id="select2" className="collapse">
                  <div className="select-body">
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="Search"
                        className="search-field"
                        onChange={(e) => setsearchQuery2(e.target.value)}
                      />
                      <span className="icon">
                        <svg
                          width={15}
                          height={15}
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_200_8303)">
                            <path
                              d="M6.60568 0C2.96341 0 0 2.96341 0 6.60568C0 10.2482 2.96341 13.2114 6.60568 13.2114C10.2482 13.2114 13.2114 10.2482 13.2114 6.60568C13.2114 2.96341 10.2482 0 6.60568 0ZM6.60568 11.9919C3.63577 11.9919 1.21951 9.57562 1.21951 6.60571C1.21951 3.6358 3.63577 1.21951 6.60568 1.21951C9.57559 1.21951 11.9919 3.63577 11.9919 6.60568C11.9919 9.57559 9.57559 11.9919 6.60568 11.9919Z"
                              fill="#051036"
                            />
                            <path
                              d="M14.822 13.9591L11.326 10.4632C11.0878 10.225 10.702 10.225 10.4638 10.4632C10.2256 10.7012 10.2256 11.0874 10.4638 11.3254L13.9598 14.8214C14.0789 14.9405 14.2348 15 14.3909 15C14.5468 15 14.7029 14.9405 14.822 14.8214C15.0602 14.5834 15.0602 14.1972 14.822 13.9591Z"
                              fill="#051036"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_200_8303">
                              <rect width={15} height={15} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </div>
                    <ul className="box-search-select">
                      {categories
                        .filter((elm) =>
                          elm.toLowerCase().includes(searchQuery2)
                        )
                        .map((elm, i) => (
                          <li
                            key={i}
                            className={`search-result-item ${
                              activeValue2 == elm ? "active" : ""
                            }`}
                            onClick={() => setActiveValue2(elm)}
                          >
                            {elm}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="select-box-el">
                <div
                  className="select-header"
                  data-bs-toggle="collapse"
                  data-bs-target="#select3"
                  aria-expanded="false"
                  aria-controls="select3"
                >
                  <div className="label">Select Box</div>
                  <span className="field-select-el3">{activeValue3}</span>
                  <span className="icon">
                    <svg
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.86941 0.529619C9.68892 0.338178 9.38702 0.331049 9.19653 0.511045L4.99976 4.48685L0.803467 0.511065C0.612983 0.330581 0.311545 0.338197 0.130592 0.529638C-0.0503606 0.720591 -0.0422749 1.02203 0.148697 1.20298L4.67261 5.4888C4.76404 5.57548 4.88214 5.61928 4.99976 5.61928C5.11737 5.61928 5.23594 5.57548 5.32738 5.4888L9.8513 1.20298C10.0423 1.02201 10.0504 0.720591 9.86941 0.529619Z"
                        fill="#050B20"
                      />
                    </svg>
                  </span>
                </div>
                <div id="select3" className="collapse show">
                  <div className="select-body">
                    <ul className="box-check-el">
                      {categories
                        .filter((elm) =>
                          elm.toLowerCase().includes(searchQuery3)
                        )
                        .map((elm, i) => (
                          <li
                            key={i}
                            className="field-radio-item"
                            onClick={() => setActiveValue3(elm)}
                          >
                            <input
                              className="tf-check"
                              type="radio"
                              name="radioCheck"
                              readOnly
                              checked={activeValue3 == elm}
                            />
                            <label
                              htmlFor="radioCheck1"
                              className="check-val-item"
                            >
                              {elm}
                            </label>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="wrap-check-btn-el">
                <div className="box-radio-btn">
                  <p>Radiobox</p>
                  <ul className="box-check-el style2">
                    <li>
                      <input
                        className="tf-check circle"
                        type="radio"
                        name="radio2"
                        id="rad1"
                      />
                      <label htmlFor="rad1">Items</label>
                    </li>
                    <li>
                      <input
                        className="tf-check circle"
                        type="radio"
                        name="radio2"
                        id="rad2"
                      />
                      <label htmlFor="rad2">Items</label>
                    </li>
                    <li>
                      <input
                        className="tf-check circle"
                        type="radio"
                        name="radio2"
                        id="rad3"
                        defaultChecked=""
                      />
                      <label htmlFor="rad3">Items</label>
                    </li>
                    <li>
                      <input
                        className="tf-check circle"
                        type="radio"
                        name="radio2"
                        id="rad4"
                      />
                      <label htmlFor="rad4">Items</label>
                    </li>
                  </ul>
                </div>
                <div className="box-checkbox-btn">
                  <p>Checkbox</p>
                  <ul className="box-check-el style2">
                    <li>
                      <input className="tf-check" type="checkbox" id="cb1" />
                      <label htmlFor="cb1">Items</label>
                    </li>
                    <li>
                      <input className="tf-check" type="checkbox" id="cb2" />
                      <label htmlFor="cb2">Items</label>
                    </li>
                    <li>
                      <input
                        className="tf-check"
                        type="checkbox"
                        id="cb3"
                        defaultChecked=""
                      />
                      <label htmlFor="cb3">Items</label>
                    </li>
                    <li>
                      <input className="tf-check" type="checkbox" id="cb4" />
                      <label htmlFor="cb4">Items</label>
                    </li>
                  </ul>
                </div>
                <div className="box-switch">
                  <p>Switch</p>
                  <ul className="box-check-el">
                    <li>
                      <input
                        className="tf-switch-check"
                        type="checkbox"
                        id="sw1"
                      />
                      <label htmlFor="sw1">Items</label>
                    </li>
                    <li>
                      <input
                        className="tf-switch-check"
                        type="checkbox"
                        id="sw2"
                        defaultChecked=""
                      />
                      <label htmlFor="sw2">Items</label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="wrap-process">
                <div className="title-element">Progress bars</div>
                <div className="box-process-el">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                      aria-valuenow={90}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="val-process">90%</span>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow={50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="val-process">50%</span>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="val-process">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="wrap-typo">
              <div className="title-element">Typography</div>
              <div className="title-typo">
                Bringing the culture of sharing to everyone
              </div>
              <div className="box-p">
                <p>
                  Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan
                  nec. Quisque bibendum orci ac nibh facilisis, at malesuada
                  orci congue. Nullam tempus sollicitudin cursus. Ut et
                  adipiscing erat. Curabitur this is a text link libero tempus
                  congue.
                </p>
                <p>
                  Duis mattis laoreet neque, et ornare neque sollicitudin at.
                  Proin sagittis dolor sed mi elementum pretium. Donec et justo
                  ante. Vivamus egestas sodales est, eu rhoncus urna semper eu.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Integer tristique elit lobortis purus
                  bibendum, quis dictum metus mattis. Phasellus posuere felis
                  sed eros porttitor mattis. Curabitur massa magna, tempor in
                  blandit id, porta in ligula. Aliquam laoreet nisl massa, at
                  interdum mauris sollicitudin et.
                </p>
              </div>
              <div className="box-quote">
                <blockquote className="quote">
                  Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan
                  nec. Quisque bibendum orci ac nibh facilisis, at malesuada
                  orci congue.
                </blockquote>
                <cite className="author">Luis Pickford</cite>
              </div>
            </div>
            <div className="wrap-listview">
              <div className="title-listview">What you'll learn</div>
              <div className="box-listview">
                <ul>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Become a UI/UX designer.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    You will be able to start earning money Figma skills.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Build a UI project from beginning to end.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Work with colors &amp; fonts.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    You will create your own UI Kit.
                  </li>
                </ul>
                <ul>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Build &amp; test a complete mobile app.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Learn to design mobile apps &amp; websites.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Design 3 different logos.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Create low-fidelity wireframe.
                  </li>
                  <li className="listview-item">
                    <span className="icon-check">
                      <svg
                        width={8}
                        height={6}
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.45982 1.66964C7.45982 1.55804 7.41518 1.44643 7.33482 1.36607L6.72768 0.758928C6.64732 0.678571 6.53571 0.633928 6.42411 0.633928C6.3125 0.633928 6.20089 0.678571 6.12054 0.758928L3.19196 3.69196L1.87946 2.375C1.79911 2.29464 1.6875 2.25 1.57589 2.25C1.46429 2.25 1.35268 2.29464 1.27232 2.375L0.665179 2.98214C0.584821 3.0625 0.540179 3.17411 0.540179 3.28571C0.540179 3.39732 0.584821 3.50893 0.665179 3.58929L2.28125 5.20536L2.88839 5.8125C2.96875 5.89286 3.08036 5.9375 3.19196 5.9375C3.30357 5.9375 3.41518 5.89286 3.49554 5.8125L4.10268 5.20536L7.33482 1.97321C7.41518 1.89286 7.45982 1.78125 7.45982 1.66964Z"
                          fill="#405FF2"
                        />
                      </svg>
                    </span>
                    Downloadable exercise files.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
