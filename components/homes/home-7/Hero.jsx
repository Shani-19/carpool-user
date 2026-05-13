"use client";

import Slider from "react-slick";
import Image from "next/image";
import { bannerSlides3 } from "@/data/heroSlides";
export default function Hero() {
  const slickOptions = {
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
    draggable: false,
    dots: false,
  };
  return (
    <section className="boxcar-banner-section-seven">
      <Slider {...slickOptions} className="banner-slider-v7 inner-slide">
        {bannerSlides3.map((slide, index) => (
          <div key={index} className="inner-box">
            <div className="large-container">
              <div className="banner-slide">
                <Image
                  alt=""
                  src={slide.imageSrc}
                  width={slide.width}
                  height={slide.height}
                />
                <div className="right-box">
                  <div className="boxcar-container">
                    <div className="content-box">
                      <span
                        className="sub-title"
                        data-animation-in="fadeInDown"
                      >
                        {slide.subTitle}
                      </span>
                      <h1 data-animation-in="fadeInUp" data-delay-in="0.2">
                        <span
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
