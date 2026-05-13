"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { bannerSlides } from "@/data/heroSlides";
import Link from "next/link";
export default function Hero() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const slickOptions = {
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,

    arrows: false,
    draggable: false,
    dots: false,
  };
  const thumbOptions = {
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
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
  return (
    <section className="boxcar-banner-section-two hero-2">
      <Slider
        {...slickOptions}
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
        className="banner-slider inner-slide"
      >
        {bannerSlides.map((slide, index) => (
          <div className="banner-slide " key={index}>
            <Image alt="" src={slide.imgSrc} width={1920} height={960} />
            <div className="right-box">
              <div className="boxcar-container">
                <div className="content-box">
                  <span className="sub-title" data-animation-in="fadeInDown">
                    {slide.subTitle}
                    <small>{slide.subTitleSmall}</small>
                  </span>
                  <h1 data-animation-in="fadeInUp" data-delay-in="0.2">
                    {slide.title}
                  </h1>
                  <ul data-animation-in="fadeInUp" data-delay-in="0.2">
                    {slide.details.map((detail, idx) => (
                      <li key={idx}>
                        <i className={detail.iconClass} /> {detail.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/inventory-list-01`}
                    data-animation-in="fadeInUp"
                    data-delay-in="0.4"
                    className="banner-btn btn-anim"
                  >
                    {slide.btnText}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_634_1882)">
                        <path
                          d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                          fill="#050B20"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_634_1882">
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
      </Slider>
      <div className="banner-thumbs">
        <div className="boxcar-container">
          <Slider
            {...thumbOptions}
            infinite={false}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
            className="banner-slider-thumbs"
          >
            <div className="banner-slide-thumb">Mercedes Benz E-Class</div>
            <div className="banner-slide-thumb">BMW 5 Series</div>
            <div className="banner-slide-thumb">Jaguar I-PACE</div>
            <div className="banner-slide-thumb">
              Land Rover Range Rover Evoque
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}
