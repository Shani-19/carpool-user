"use client";

import Slider from "react-slick";
import Image from "next/image";
import { testimonials6 } from "@/data/testimonials";
export default function Testimonials() {
  const slickOption = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    responsive: [
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
    ],
  };
  return (
    <section className="boxcar-testimonial-section-four v8 pt-0">
      <div className="large-container">
        <div className="right-box">
          <div className="boxcar-title light">
            <h2>What our customers say</h2>
            <div className="text">
              Rated 4.7 / 5 based on 28,370 reviews Showing our 4 &amp; 5 star
              reviews
            </div>
          </div>
          <Slider {...slickOption} className="row stories-slider inner-slide">
            {testimonials6.map((testimonial, index) => (
              <div
                className="testimonial-block-four col-lg-4 col-md-6 col-sm-12"
                key={index}
              >
                <div className="inner-box">
                  <figure className="icon">
                    <a href="#">
                      <Image
                        alt=""
                        src={testimonial.iconSrc}
                        width={37}
                        height={26}
                      />
                    </a>
                  </figure>
                  <h6 className="title">{testimonial.title}</h6>
                  <div className="text">{testimonial.text}</div>
                  <div className="auther-info">
                    <figure className="image">
                      <a href="#">
                        <Image
                          alt=""
                          src={testimonial.authorImageSrc}
                          width={60}
                          height={60}
                        />
                      </a>
                    </figure>
                    <h6 className="name">{testimonial.authorName}</h6>
                    <span>{testimonial.authorCompany}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
