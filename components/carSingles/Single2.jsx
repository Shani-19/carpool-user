"use client";
import Image from "next/image";
import Slider from "react-slick";
import RelatedCars from "./RelatedCars";

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
import { useState } from "react";
import Link from "next/link";
const images = [
  {
    src: "/images/resource/inventory1-6.png",
    alt: "",
    width: 924,
    height: 550,
  },
  {
    src: "/images/resource/inventory1-6.png",
    alt: "",
    width: 924,
    height: 550,
  },
];
export default function Single2() {
  const slickOptions = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
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
            <div className="text">
              2.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate
            </div>
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
              <div className="btn-box v2">
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
            </div>
          </div>
          <div className="row">
            <div className="inspection-column v2 col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="gallery-sec">
                  <div className="image-column wrap-gallery-box">
                    <Gallery>
                      <Slider
                        {...slickOptions}
                        className="inner-column inventry-slider-two inner-slide"
                      >
                        {images.map(({ src, alt, width, height }, index) => (
                          <div key={index} className="image-box d-block">
                            <figure className="image">
                              <Item
                                original={src}
                                thumbnail={src}
                                width={width}
                                height={height}
                              >
                                {({ ref, open }) => (
                                  <a onClick={open}>
                                    <Image
                                      ref={ref}
                                      alt={alt}
                                      src={src}
                                      style={{
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                      width={width}
                                      height={height}
                                    />
                                  </a>
                                )}
                              </Item>
                            </figure>
                          </div>
                        ))}
                      </Slider>
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
                          <li>
                            <Item
                              original="/images/resource/inventory1-6.png"
                              thumbnail="/images/resource/inventory1-6.png"
                              width={924}
                              height={550}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    ref={ref}
                                    src="/images/resource/video1-4.svg"
                                    width={18}
                                    height={18}
                                    alt=""
                                  />
                                  All Photos
                                </a>
                              )}
                            </Item>
                          </li>
                        </ul>
                      </div>{" "}
                    </Gallery>
                  </div>
                </div>
                {/* overview-sec */}
                <div className="overview-sec v2">
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
                  <Faqs />
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
            <div className="side-bar-column v2 col-xl-4 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="contact-box-two">
                  <span>Our Price</span>
                  <h3 className="title">$45,900</h3>
                  <small>Instant Saving : $7.000</small>
                  <div className="btn-box">
                    <a href="#" className="side-btn">
                      <Image
                        src="/images/resource/tag.svg"
                        width={19}
                        height={18}
                        alt=""
                      />
                      Make An Offer Price
                    </a>
                    <a href="#" className="side-btn two">
                      <Image
                        src="/images/resource/tag1-1.svg"
                        width={18}
                        height={18}
                        alt=""
                      />
                      Schedule Test Drive
                    </a>
                  </div>
                </div>
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
      </section>{" "}
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
