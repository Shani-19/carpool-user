"use client";

import Slider from "react-slick";
import Image from "next/image";
import { bannerSlides2 } from "@/data/heroSlides";
import Link from "next/link";
export default function Hero() {
  const slickOptions = {
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
    draggable: false,
    dots: true,
  };
  return (
    <section className="boxcar-banner-section-four hero-2">
      <Slider {...slickOptions} className="banner-slider-v4 inner-slide">
        {bannerSlides2.map((slide, index) => (
          <div key={index} className="banner-slide">
            <Image alt="" src={slide.imgSrc} width={1920} height={960} />
            <div className="right-box">
              <div className="boxcar-container">
                <div className="content-box">
                  <span className="sub-title" data-animation-in="fadeInDown">
                    {slide.price}
                    <small>/ Month</small>
                  </span>
                  <h1 data-animation-in="fadeInUp" data-delay-in="0.2">
                    {slide.title}
                  </h1>
                </div>
              </div>
              <div
                className="list-box"
                data-animation-in="fadeInUp"
                data-delay-in="0.3"
              >
                {slide.details.map((item, itemIndex) => (
                  <div key={itemIndex} className="items">
                    <i className={item.icon} />
                    <span>{item.label}</span>
                    <h6 className="title">{item.value}</h6>
                  </div>
                ))}
                <div className="btn-box">
                  <Link href={`/inventory-list-01`} className="btn">
                    More Info
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={14}
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_743_1816)">
                        <path
                          d="M14.1106 0H5.55509C5.34013 0 5.16619 0.173943 5.16619 0.388901C5.16619 0.603859 5.34013 0.777802 5.55509 0.777802H13.1719L0.613453 13.3362C0.461531 13.4881 0.461531 13.7342 0.613453 13.8861C0.689396 13.962 0.788927 14 0.888422 14C0.987917 14 1.08741 13.962 1.16339 13.8861L13.7218 1.3277V8.94447C13.7218 9.15943 13.8957 9.33337 14.1107 9.33337C14.3256 9.33337 14.4996 9.15943 14.4996 8.94447V0.388901C14.4995 0.173943 14.3256 0 14.1106 0Z"
                          fill="#050B20"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_743_1816">
                          <rect
                            width={14}
                            height={14}
                            fill="white"
                            transform="translate(0.5)"
                          />
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
    </section>
  );
}
