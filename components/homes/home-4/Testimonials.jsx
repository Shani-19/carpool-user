"use client";

import { customerData } from "@/data/testimonials";
import Slider from "react-slick";

export default function Testimonials() {
  const sliderOptions = {
    infinite: false,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
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
  return (
    <section className="boxcar-customers-section-two pt-0">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>What our customers say</h2>
          <div className="text">
            Rated 4.7 / 5 based on 28,370 reviews Showing our 4 &amp; 5 star
            reviews
          </div>
        </div>
        <Slider
          className="row cus-slider slider-layout-1 wow fadeInUp"
          data-wow-delay="200ms"
          {...sliderOptions}
        >
          {customerData.map((customer, index) => (
            <div
              className="customer-block-two col-lg-3 col-md-6 col-sm-12"
              key={index}
            >
              <div className="inner-box">
                <div className="rating-area">
                  <ul className="rating">
                    {Array.from({ length: customer.rating }).map((_, i) => (
                      <li key={i}>
                        <i className="fa fa-star" />
                      </li>
                    ))}
                  </ul>
                  {customer.verified && (
                    <span>
                      <i className="fa-solid fa-circle-check" /> Verified
                    </span>
                  )}
                </div>
                <h6 className="title">
                  <a href="E">{customer.title}</a>
                </h6>
                <div className="text">{customer.text}</div>
                <span>{customer.author}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
