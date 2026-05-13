"use client";

import { testimonials } from "@/data/testimonials";
import Slider from "react-slick";
import Image from "next/image";
export default function Testimonials() {
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
  return (
    <section className="boxcar-testimonial-section home1">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>What our customers say</h2>
          <div className="text">
            Rated 4.7 / 5 based on 28,370 reviews Showing our 4 &amp; 5 star
            reviews
          </div>
        </div>
        <Slider {...slickOptions} className="testimonial-slider-two">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-slide-two" key={index}>
              <div className="row">
                <div className="image-column col-lg-4 col-md-12 col-sm-12">
                  <div className="inner-column wow fadeInUp">
                    <div className="image-box">
                      <figure className="image">
                        <Image
                          alt=""
                          src={testimonial.imgSrc}
                          width={448}
                          height={470}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  <div
                    className="inner-column wow fadeInUp"
                    data-wow-delay={testimonial.wowDelay}
                  >
                    <ul className="rating">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <li key={starIndex}>
                          <i className="fa fa-star" />
                        </li>
                      ))}
                      <span>{testimonial.rating}</span>
                    </ul>
                    <h6 className="title">{testimonial.name}</h6>
                    <span>{testimonial.position}</span>
                    <div className="text">{testimonial.review}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
