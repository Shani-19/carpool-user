"use client";
import React, { useState } from "react";
import RelatedCars from "./RelatedCars";
import Image from "next/image";

import Overview from "./sections/Overview";
import Description from "./sections/Description";
import Features from "./sections/Features";
import Faqs from "./sections/Faqs";
import Location from "./sections/Location";
import Financing from "./sections/Financing";
import Review from "./sections/Review";
import Ratings from "./sections/Ratings";
import Replay from "./sections/Replay";
import CommentForm from "./sections/CommentForm";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Link from "next/link";
export default function Single1({ carItem }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>Volvo XC90</h2>
            <div className="text">{carItem.title}</div>
            <ul className="spectes-list">
              <li>
                <span>
                  <Image
                    src="/images/resource/spec1-1.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  2023
                </span>
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/spec1-2.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  35,000 miles
                </span>
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/spec1-3.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Automatic
                </span>
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/spec1-4.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Diesel
                </span>
              </li>
            </ul>
            <div className="content-box">
              <div className="btn-box">
                <div className="share-btn">
                  <span>Share</span>
                  <a href="#" className="share">
                    <Image
                      src="/images/resource/share.svg"
                      width={12}
                      height={12}
                      alt=""
                    />
                  </a>
                </div>
                <div className="share-btn">
                  <span>Save</span>
                  <a href="#" className="share">
                    <Image
                      src="/images/resource/share1-1.svg"
                      width={12}
                      height={12}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <h3 className="title">$45,900</h3>
              <span>
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_163_10380)">
                    <path
                      d="M7.8047 17.4287C7.80429 17.4287 7.80378 17.4287 7.80326 17.4287C7.2752 17.4283 6.77865 17.2223 6.40539 16.8484L1.14802 11.5835C0.379045 10.8131 0.379045 9.55955 1.14802 8.78923L8.23503 1.68863C8.96538 0.956841 9.93715 0.553711 10.9712 0.553711H15.4676C16.5579 0.553711 17.4451 1.44072 17.4451 2.53125V7.01377C17.4451 8.04714 17.0424 9.01851 16.3113 9.74875L9.20227 16.8504C8.8288 17.2233 8.33246 17.4287 7.8047 17.4287ZM10.9712 1.87207C10.2898 1.87207 9.64948 2.1377 9.16818 2.61993L2.08107 9.72053C1.82471 9.97741 1.82471 10.3952 2.08107 10.652L7.33844 15.9169C7.46276 16.0414 7.62817 16.1102 7.80429 16.1104H7.80481C7.98073 16.1104 8.14614 16.0419 8.27056 15.9176L15.3796 8.81612C15.8614 8.33492 16.1267 7.69469 16.1267 7.01377V2.53125C16.1267 2.16777 15.831 1.87207 15.4676 1.87207H10.9712ZM12.6659 7.24438C11.5755 7.24438 10.6884 6.35738 10.6884 5.26685C10.6884 4.17632 11.5755 3.28931 12.6659 3.28931C13.7564 3.28931 14.6435 4.17632 14.6435 5.26685C14.6435 6.35738 13.7564 7.24438 12.6659 7.24438ZM12.6659 4.60767C12.3025 4.60767 12.0068 4.90337 12.0068 5.26685C12.0068 5.63032 12.3025 5.92603 12.6659 5.92603C13.0295 5.92603 13.3251 5.63032 13.3251 5.26685C13.3251 4.90337 13.0295 4.60767 12.6659 4.60767Z"
                      fill="#050B20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_163_10380">
                      <rect width={18} height={18} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Make An Offer Price
              </span>
            </div>
          </div>
          <Gallery>
            <div className="gallery-sec">
              <div className="row">
                <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="image-box">
                      <figure className="image">
                        <Item
                          original="/images/resource/inventory1-1.jpg"
                          thumbnail="/images/resource/inventory1-1.jpg"
                          width={805}
                          height={550}
                        >
                          {({ ref, open }) => (
                            <a onClick={open}>
                              <Image
                                alt=""
                                src="/images/resource/inventory1-1.jpg"
                                width={805}
                                height={550}
                                ref={ref}
                              />
                            </a>
                          )}
                        </Item>
                      </figure>
                      <div className="content-box">
                        <ul className="video-list">
                          <li>
                            <a onClick={() => setOpen(true)}>
                              <Image
                                src="/images/resource/video1-1.svg"
                                width={18}
                                height={18}
                                alt=""
                              />
                              Video
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <Image
                                src="/images/resource/video1-2.svg"
                                width={18}
                                height={18}
                                alt=""
                              />
                              360 View
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="image-column-two item2 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-1.png"
                              thumbnail="/images/resource/car-single-1.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open} className="fancybox">
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-2.jpg"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item3 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-2.png"
                              thumbnail="/images/resource/car-single-2.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-3.png"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item4 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-3.png"
                              thumbnail="/images/resource/car-single-3.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a
                                  href="/images/resource/car-single-3.png"
                                  onClick={open}
                                >
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-4.jpg"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item5 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-4.png"
                              thumbnail="/images/resource/car-single-4.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-5.png"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </Gallery>
          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* overview-sec */}
                <div className="overview-sec">
                  <Overview />
                </div>
                {/* description-sec */}
                <div className="description-sec">
                  <Description />
                </div>
                {/* features-sec */}
                <div className="features-sec">
                  <Features />
                </div>
                {/* faq-section */}
                <div className="faqs-section pt-0">
                  <div className="inner-container">
                    <Faqs />
                  </div>
                </div>
                {/* End faqs-section */}
                <div className="location-box">
                  <Location />
                </div>
                <div className="form-box">
                  <Financing />
                </div>
                <div className="review-sec">
                  <Review />
                </div>
                <div className="reviews">
                  <Ratings />
                </div>
                <div className="Reply-sec">
                  <Replay />
                </div>
                <CommentForm />
              </div>
            </div>
            <div className="side-bar-column style-1 col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="contact-box">
                  <div className="icon-box">
                    <Image
                      src="/images/resource/volvo.svg"
                      width={55}
                      height={54}
                      alt=""
                    />
                  </div>
                  <div className="content-box">
                    <h6 className="title">Volvo Cars Marin</h6>
                    <div className="text">
                      619 Francisco Blvd E, San Rafael, CA 94901
                    </div>
                    <ul className="contact-list">
                      <li>
                        <a href="#">
                          <div className="image-box">
                            <Image
                              src="/images/resource/phone1-1.svg"
                              width={18}
                              height={18}
                              alt=""
                            />
                          </div>
                          Get Directions
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="image-box">
                            <Image
                              src="/images/resource/phone1-2.svg"
                              width={18}
                              height={18}
                              alt=""
                            />
                          </div>
                          +76 956 039 967
                        </a>
                      </li>
                    </ul>
                    <div className="btn-box">
                      <a href="#" className="side-btn">
                        Message Dealer
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_881_7563)">
                            <path
                              d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_881_7563">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="side-btn two">
                        Chat Via Whatsapp
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_881_8744)">
                            <path
                              d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                              fill="#60C961"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_881_8744">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                      <a href="#" className="side-btn-three">
                        View all stock at this dealer
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_881_10193)">
                            <path
                              d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                              fill="#050B20"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_881_10193">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cars-section-three */}
        <RelatedCars />
        {/* End shop section two */}
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="7e90gBu4pas"
        onClose={() => setOpen(false)}
      />{" "}
    </>
  );
}
