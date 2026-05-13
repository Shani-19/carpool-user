"use client";
import Slider from "rc-slider";
import React, { useState } from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { cars } from "@/data/cars";
import Link from "next/link";
import Pagination from "../common/Pagination";
const filters = [
  { text: "SUV" },
  { text: "Automatic" },
  { text: "$5,0000-$10,000" },
  { text: "Hatchback" },
  { text: "2020+" },
  { text: "All Wheel Drive" },
  { text: "Great Price" },
  { text: "Up to 75,000 miles" },
  { text: "Low Mileage" },
  { text: "Diesel" },
];
export default function Listings5() {
  const [price, setPrice] = useState([5000, 35000]);
  const handlePrice = (value) => {
    setPrice(value);
  };
  return (
    <section className="cars-section-thirteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>
            What Kind of Car Should I Get? Try Boxcars Car Finder to Find a Car
          </h2>
          <ul className="service-list">
            {filters.map((filter, index) => (
              <li key={index}>
                <a href="#">{filter.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
            <div className="sidebar-handle">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
                  fill="#050B20"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
                  fill="#050B20"
                />
              </svg>
              Show Filter
            </div>
            <div className="inventory-sidebar">
              <div className="inventroy-widget widget-location">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Location</label>

                      <SelectComponent
                        options={["New York", "Los Vegas", "California"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="form_boxes">
                      <label>Search within</label>

                      <SelectComponent
                        options={["200 miles", "200 mile", "200 mile"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="form_boxes">
                      <label>Zip Code</label>

                      <SelectComponent options={["02111", "02111", "02111"]} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Condition</label>

                      <SelectComponent
                        options={[
                          "New and Used",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="categories-box">
                      <h6 className="title">Type</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          SUV (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Sedan (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Hatchback (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Coupe (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Convertible (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Make</label>

                      <SelectComponent
                        options={[
                          "Add Make",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Model</label>

                      <SelectComponent
                        options={[
                          "Add Model",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Min year</label>

                      <SelectComponent
                        options={["2019", "2020", "2021", "2022"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Max year</label>

                      <SelectComponent
                        options={["2023", "2020", "2021", "2022"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Mileage</label>

                      <SelectComponent
                        options={[
                          "Any Mileage",
                          "New York",
                          "Los Vega",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Drive Type</label>

                      <SelectComponent
                        options={[
                          "Any Type",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="price-box">
                      <h6 className="title">Price</h6>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="row g-0"
                      >
                        <div className="form-column col-lg-6">
                          <div className="form_boxes">
                            <label>Min price</label>
                            <div className="drop-menu">${price[0]}</div>
                          </div>
                        </div>
                        <div className="form-column v2 col-lg-6">
                          <div className="form_boxes">
                            <label>Max price</label>
                            <div className="drop-menu">${price[1]}</div>
                          </div>
                        </div>
                      </form>
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
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom">
                      <h6 className="title">Transmission</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          Automatic (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Manual (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          CVT (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom">
                      <h6 className="title">Fuel Type</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          Diesel (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Petrol (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Hybird (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Electric (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Exterior Color</label>

                      <SelectComponent
                        options={[
                          "Blue",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Interior Color</label>

                      <SelectComponent
                        options={[
                          "Black",
                          "New York",
                          "Los Vegas",
                          "California",
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Doors</label>

                      <SelectComponent
                        options={["3", "New York", "Los Vegas", "California"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Cylinders</label>

                      <SelectComponent
                        options={["6", "New York", "Los Vegas", "California"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom m-0">
                      <h6 className="title">Key Features</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          360-degree camera (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Bluetooth (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Keyless start (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Navigation System (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Active head restraints (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Brake assist (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Parking assist systems (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <a href="#" title="" className="show-more">
                        Show 8 more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box">
              <div className="text-box">
                <div className="text">Showing 1 to 16 of 1559 vehicles</div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes v3">
                    <small>Sort by</small>

                    <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
                  </div>
                </form>
              </div>
              {/* service-block-thirteen */}
              {cars.slice(0, 7).map((elm, i) => (
                <div key={i} className="service-block-thirteen">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image" style={{ height: "100%" }}>
                        <Link href={`/inventory-page-single-v1/${elm.id}`}>
                          <Image
                            alt=""
                            src={elm.imgSrc}
                            width={340}
                            height={320}
                            style={{ objectFit: "cover", height: "100%" }}
                          />
                        </Link>
                      </figure>
                    </div>
                    <div className="right-box">
                      <div className="content-box">
                        <h4 className="title">
                          <Link href={`/inventory-page-single-v1/${elm.id}`}>
                            {elm.title}
                          </Link>
                        </h4>
                        <div className="text">{elm.description}</div>
                        <div className="inspection-sec">
                          <div className="inspection-box">
                            <span className="icon">
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_2880_5319)">
                                  <path
                                    d="M18 10.6482C18 12.6227 17.3716 14.497 16.1827 16.0687C15.9482 16.379 15.5071 16.4391 15.1978 16.2052C14.8881 15.971 14.827 15.53 15.0612 15.2203C16.0638 13.895 16.5938 12.3139 16.5938 10.6482C16.5938 6.45117 13.1947 3.05859 9 3.05859C4.8024 3.05859 1.40625 6.45378 1.40625 10.6482C1.40625 12.3139 1.9362 13.895 2.93871 15.2203C3.17299 15.53 3.11188 15.971 2.8022 16.2052C2.49239 16.4395 2.05156 16.3784 1.81714 16.0687C0.628418 14.497 0 12.6227 0 10.6482C0 5.67361 4.02814 1.65234 9 1.65234C13.9746 1.65234 18 5.67636 18 10.6482ZM13.4551 6.41368C13.7296 6.6882 13.7296 7.13342 13.4551 7.40794L11.1632 9.69983C11.3519 10.0477 11.4593 10.4459 11.4593 10.8686C11.4593 12.2248 10.356 13.3279 9 13.3279C7.64388 13.3279 6.54071 12.2248 6.54071 10.8686C6.54071 9.51265 7.64388 8.40935 9 8.40935C9.42284 8.40935 9.82095 8.51674 10.1688 8.70543L12.4607 6.41354C12.7354 6.13902 13.1804 6.13902 13.4551 6.41368ZM10.053 10.8688C10.053 10.2881 9.58063 9.81573 9 9.81573C8.41937 9.81573 7.94696 10.2881 7.94696 10.8688C7.94696 11.4494 8.41937 11.9218 9 11.9218C9.58063 11.9218 10.053 11.4494 10.053 10.8688Z"
                                    fill="#050B20"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2880_5319">
                                    <rect width={18} height={18} fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <div className="info">
                              <span>Mileage</span>
                              <small>72,925</small>
                            </div>
                          </div>
                          <div className="inspection-box">
                            <span className="icon">
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_2880_5323)">
                                  <path
                                    d="M10.6875 3.375C10.6875 3.06432 10.4357 2.8125 10.125 2.8125H4.5C4.18932 2.8125 3.9375 3.06432 3.9375 3.375V7.875C3.9375 8.18568 4.18932 8.4375 4.5 8.4375H10.125C10.4357 8.4375 10.6875 8.18568 10.6875 7.875V3.375ZM9.5625 7.3125H5.0625V3.9375H9.5625V7.3125Z"
                                    fill="#050B20"
                                  />
                                  <path
                                    d="M17.14 3.98858L14.8967 2.86358C14.6182 2.72405 14.2843 2.8375 14.1453 3.11516C14.0064 3.39311 14.1206 3.73096 14.3986 3.86993L15.2529 4.29669C15.2301 4.35786 15.2005 4.42255 15.2005 4.49177C15.2005 5.22415 15.75 5.84269 16.3125 6.0756V12.9293C16.3125 13.2394 16.0601 13.4918 15.75 13.4918C15.4399 13.4918 15.1875 13.2394 15.1875 12.9293V8.42927C15.1875 7.07115 14.0625 5.93497 12.9375 5.67362V2.24177C12.9375 1.00114 11.955 0 10.7144 0H3.96436C2.72373 0 1.6875 1.00114 1.6875 2.24177V14.8315L0.873422 15.2386C0.682805 15.3339 0.5625 15.5286 0.5625 15.7418V17.4293C0.5625 17.7399 0.841219 18 1.15186 18H13.5269C13.8375 18 14.0625 17.7399 14.0625 17.4293V15.7418C14.0625 15.5286 13.9422 15.3339 13.7516 15.2386L12.9375 14.8315V6.84545C13.5 7.07836 14.0625 7.6969 14.0625 8.42927V12.9293C14.0625 13.8598 14.8194 14.6168 15.75 14.6168C16.6806 14.6168 17.4375 13.8598 17.4375 12.9293V4.49177C17.4375 4.27862 17.3306 4.08389 17.14 3.98858ZM12.9375 16.875H1.6875V16.0895L2.50158 15.6824C2.6922 15.5871 2.8125 15.3924 2.8125 15.1792V2.24174C2.8125 1.6213 3.34389 1.125 3.96436 1.125H10.7144C11.3348 1.125 11.8125 1.6213 11.8125 2.24177V15.1793C11.8125 15.3924 11.9328 15.5872 12.1234 15.6825L12.9375 16.0895V16.875Z"
                                    fill="#050B20"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_2880_5323">
                                    <rect width={18} height={18} fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            <div className="info">
                              <span>Fuel Type</span>
                              <small>{elm.fuel}</small>
                            </div>
                          </div>
                          <div className="inspection-box">
                            <span className="icon">
                              <svg
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3 1.6875C1.8615 1.6875 0.9375 2.6115 0.9375 3.75C0.9375 4.8885 1.8615 5.8125 3 5.8125C4.1385 5.8125 5.0625 4.8885 5.0625 3.75C5.0625 2.6115 4.1385 1.6875 3 1.6875ZM3 2.8125C3.5175 2.8125 3.9375 3.2325 3.9375 3.75C3.9375 4.2675 3.5175 4.6875 3 4.6875C2.4825 4.6875 2.0625 4.2675 2.0625 3.75C2.0625 3.2325 2.4825 2.8125 3 2.8125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3 12.1875C1.8615 12.1875 0.9375 13.1115 0.9375 14.25C0.9375 15.3885 1.8615 16.3125 3 16.3125C4.1385 16.3125 5.0625 15.3885 5.0625 14.25C5.0625 13.1115 4.1385 12.1875 3 12.1875ZM3 13.3125C3.5175 13.3125 3.9375 13.7325 3.9375 14.25C3.9375 14.7675 3.5175 15.1875 3 15.1875C2.4825 15.1875 2.0625 14.7675 2.0625 14.25C2.0625 13.7325 2.4825 13.3125 3 13.3125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9 1.6875C7.8615 1.6875 6.9375 2.6115 6.9375 3.75C6.9375 4.8885 7.8615 5.8125 9 5.8125C10.1385 5.8125 11.0625 4.8885 11.0625 3.75C11.0625 2.6115 10.1385 1.6875 9 1.6875ZM9 2.8125C9.5175 2.8125 9.9375 3.2325 9.9375 3.75C9.9375 4.2675 9.5175 4.6875 9 4.6875C8.4825 4.6875 8.0625 4.2675 8.0625 3.75C8.0625 3.2325 8.4825 2.8125 9 2.8125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9 12.1875C7.8615 12.1875 6.9375 13.1115 6.9375 14.25C6.9375 15.3885 7.8615 16.3125 9 16.3125C10.1385 16.3125 11.0625 15.3885 11.0625 14.25C11.0625 13.1115 10.1385 12.1875 9 12.1875ZM9 13.3125C9.5175 13.3125 9.9375 13.7325 9.9375 14.25C9.9375 14.7675 9.5175 15.1875 9 15.1875C8.4825 15.1875 8.0625 14.7675 8.0625 14.25C8.0625 13.7325 8.4825 13.3125 9 13.3125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15 1.6875C13.8615 1.6875 12.9375 2.6115 12.9375 3.75C12.9375 4.8885 13.8615 5.8125 15 5.8125C16.1385 5.8125 17.0625 4.8885 17.0625 3.75C17.0625 2.6115 16.1385 1.6875 15 1.6875ZM15 2.8125C15.5175 2.8125 15.9375 3.2325 15.9375 3.75C15.9375 4.2675 15.5175 4.6875 15 4.6875C14.4825 4.6875 14.0625 4.2675 14.0625 3.75C14.0625 3.2325 14.4825 2.8125 15 2.8125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15 12.1875C13.8615 12.1875 12.9375 13.1115 12.9375 14.25C12.9375 15.3885 13.8615 16.3125 15 16.3125C16.1385 16.3125 17.0625 15.3885 17.0625 14.25C17.0625 13.1115 16.1385 12.1875 15 12.1875ZM15 13.3125C15.5175 13.3125 15.9375 13.7325 15.9375 14.25C15.9375 14.7675 15.5175 15.1875 15 15.1875C14.4825 15.1875 14.0625 14.7675 14.0625 14.25C14.0625 13.7325 14.4825 13.3125 15 13.3125Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.4375 5.25V12.75C2.4375 13.0605 2.6895 13.3125 3 13.3125C3.3105 13.3125 3.5625 13.0605 3.5625 12.75V5.25C3.5625 4.9395 3.3105 4.6875 3 4.6875C2.6895 4.6875 2.4375 4.9395 2.4375 5.25Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.4375 5.25V12.75C8.4375 13.0605 8.6895 13.3125 9 13.3125C9.3105 13.3125 9.5625 13.0605 9.5625 12.75V5.25C9.5625 4.9395 9.3105 4.6875 9 4.6875C8.6895 4.6875 8.4375 4.9395 8.4375 5.25Z"
                                  fill="#050B20"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M14.4375 5.25V8.25C14.4375 8.3535 14.3535 8.4375 14.25 8.4375H3C2.6895 8.4375 2.4375 8.6895 2.4375 9C2.4375 9.3105 2.6895 9.5625 3 9.5625H14.25C14.9753 9.5625 15.5625 8.9745 15.5625 8.25C15.5625 7.15575 15.5625 5.25 15.5625 5.25C15.5625 4.9395 15.3105 4.6875 15 4.6875C14.6895 4.6875 14.4375 4.9395 14.4375 5.25Z"
                                  fill="#050B20"
                                />
                              </svg>
                            </span>
                            <div className="info">
                              <span>Transmission</span>
                              <small>{elm.transmission}</small>
                            </div>
                          </div>
                        </div>
                        <ul className="ul-cotent">
                          <li>
                            <a href="#">Bluetooth</a>
                          </li>
                          <li>
                            <a href="#">Keyless start</a>
                          </li>
                          <li>
                            <a href="#">Brake assist</a>
                          </li>
                        </ul>
                      </div>
                      <div className="content-box-two">
                        <a href="#" title="" className="icon-box">
                          <span>save</span>
                          <div className="box-bookmark">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={12}
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_601_1274)">
                                <path
                                  d="M9.39062 12C9.15156 12 8.91671 11.9312 8.71128 11.8009L6.11794 10.1543C6.04701 10.1091 5.95296 10.1096 5.88256 10.1543L3.28869 11.8009C2.8048 12.1082 2.13755 12.0368 1.72722 11.6454C1.47556 11.4047 1.33685 11.079 1.33685 10.728V1.2704C1.33738 0.570053 1.90743 0 2.60778 0H9.39272C10.0931 0 10.6631 0.570053 10.6631 1.2704V10.728C10.6631 11.4294 10.0925 12 9.39062 12ZM6.00025 9.06935C6.24193 9.06935 6.47783 9.13765 6.68169 9.26743L9.27503 10.9135C9.31233 10.9371 9.35069 10.9487 9.39114 10.9487C9.48046 10.9487 9.61286 10.8788 9.61286 10.728V1.2704C9.61233 1.14956 9.51356 1.05079 9.39272 1.05079H2.60778C2.48642 1.05079 2.38817 1.14956 2.38817 1.2704V10.728C2.38817 10.7911 2.41023 10.8436 2.45384 10.8851C2.52582 10.9539 2.63563 10.9708 2.72599 10.9135L5.31934 9.2669C5.52267 9.13765 5.75857 9.06935 6.00025 9.06935Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_601_1274">
                                  <rect width={12} height={12} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </a>
                        <h4 className="title">{elm.price}</h4>
                        <span>Calculate financing</span>
                        <Link
                          href={`/inventory-page-single-v1/${elm.id}`}
                          className="button"
                        >
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_989_6940)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="#405FF2"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_989_6940">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-sec">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <Pagination />
                </ul>
                <div className="text">Showing results 1-30 of 1,415</div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
