import React from "react";
import Image from "next/image";
import { testimonials2 } from "@/data/testimonials";
export default function Testimonials() {
  return (
    <section className="boxcar-testimonial-section-three">
      <div className="large-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="boxcar-title light">
                  <h2>Who is BoxCar</h2>
                  <div className="text">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id es
                  </div>
                </div>
              </div>
            </div>
            {/* testimonial-block */}
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="row">
                {testimonials2.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`testimonial-block-three col-lg-4 col-md-6 col-sm-12`}
                  >
                    <div className={`inner-box ${testimonial.styleClass}`}>
                      <div className="content-box">
                        <span>Great</span>
                        <ul className="rating">
                          {testimonial.rating.map((star, i) => (
                            <li key={i}>
                              <i className="fa fa-star" />
                            </li>
                          ))}
                        </ul>
                        <small>
                          Based on {testimonial.reviewsCount} reviews
                        </small>
                        <figure className="image">
                          <a href="#">
                            <Image
                              alt=""
                              src={testimonial.imgSrc}
                              width={testimonial.imgWidth}
                              height={testimonial.imgHeight}
                            />
                          </a>
                        </figure>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
