"use client";
import React from "react";
import ListingMap1 from "./MapComponent";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { cars } from "@/data/cars";
import Link from "next/link";
import Pagination from "../common/Pagination";
export default function Listings3() {
  return (
    <section className="cars-section-four v1 v5 section-radius-top">
      <div className="full-container">
        <div className="row">
          <div className="col-lg-5 col-md-12 col-sm-12">
            <div className="right-box">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-box inventory"
              >
                <div className="form_boxes">
                  <SelectComponent options={["New", "Used", "used", "new"]} />
                </div>
                <div className="form_boxes">
                  <SelectComponent options={["Make", "Tofan", "Tofan"]} />
                </div>
                <div className="form_boxes">
                  <SelectComponent options={["Models", "2010", "2012"]} />
                </div>
                <div className="form_boxes">
                  <SelectComponent options={["Price", "2010", "2012"]} />
                </div>
                <div className="form_boxes">
                  <a href="#" title="" className="filter-btn filter-popup">
                    <Image
                      alt=""
                      src="/images/icons/filter.svg"
                      width={24}
                      height={24}
                    />{" "}
                    More Filters
                  </a>
                </div>
              </form>
              <div className="text-box">
                <div className="text">Showing 1 to 16 of 1559 vehicles</div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes v3">
                    <small>Sort by</small>

                    <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
                  </div>
                </form>
              </div>
              <div className="row wow fadeInUp">
                {/* car-block-ten */}
                {cars.slice(0, 4).map((elm, i) => (
                  <div
                    key={i}
                    className="car-block-ten col-xl-6 col-lg-12 col-md-6 col-sm-12"
                  >
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <Link href={`/inventory-page-single-v1/${elm.id}`}>
                            <Image
                              alt=""
                              src={elm.imgSrc}
                              width={329}
                              height={220}
                            />
                          </Link>
                        </figure>
                        <a href="#" className="icon-box">
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
                        </a>
                      </div>
                      <div className="content-box">
                        <h6 className="title">
                          <Link href={`/inventory-page-single-v1/${elm.id}`}>
                            {elm.title}
                          </Link>
                        </h6>
                        <ul>
                          <li>{elm.mileage}</li>
                          <li>{elm.fuel}</li>
                          <li>Automatic</li>
                        </ul>
                        <div className="btn-box">
                          <small>{elm.price}</small>
                          <Link
                            href={`/inventory-page-single-v1/${elm.id}`}
                            className="details"
                          >
                            View Details
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={14}
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_601_4346)">
                                <path
                                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                                  fill="#405FF2"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_601_4346">
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
          <div className="map-column col-lg-7 col-md-12 col-sm-12">
            <ListingMap1 />
          </div>
        </div>
      </div>
    </section>
  );
}
