"use client";

import { customerData } from "@/data/testimonials";
import Slider from "react-slick";

export default function Testimonials() {
  return (
    <section className="boxcar-customers-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>What our customers say</h2>
          <div className="text">
            Rated 4.7 / 5 based on 28,370 reviews Showing our 4 &amp; 5 star
            reviews
          </div>
        </div>
        <Slider
          className="row car-slider-three wow fadeInUp"
          data-wow-delay="200ms"
          slidesToScroll={1}
          slidesToShow={4}
          responsive={[
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                infinite: true,
              },
            },
            {
              breakpoint: 1300,
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
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
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
          ]}
          arrows
        >
          {customerData.map((customer, index) => (
            <div
              className="customer-block col-lg-3 col-md-6 col-sm-12"
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
