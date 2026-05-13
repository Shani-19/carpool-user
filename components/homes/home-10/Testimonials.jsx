"use client";
import { testiSlides } from "@/data/testimonials";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
export default function Testimonials() {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    arrows: false,
    variableWidth: true,
  };
  return (
    <section className="testimonila-section-two bg-1">
      <div className="boxcar-container">
        <div className="row">
          {/* content-column */}
          <div className="content-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="boxcar-title">
                <h2>
                  What our <br />
                  customers say
                </h2>
              </div>
              <div className="content-box">
                <span>Great</span>
                <ul className="rating">
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                </ul>
                <small>Based on 5,801 reviews</small>
                <sub>
                  <i className="fa fa-star" />
                  trustpilot
                </sub>
              </div>
            </div>
          </div>
          {/* slider-column */}
          <div className="slider-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp" data-wow-delay="200ms">
              <div className="rating-area">
                <ul className="rating">
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                  <li>
                    <i className="fa fa-star" />
                  </li>
                </ul>
                <span>
                  <i className="fa-solid fa-circle-check" />
                  Verified
                </span>
              </div>
              <div className="auther-info">
                <h6 className="name">Ali TUFAN</h6>
                <span className="designation">Designer</span>
                <Slider
                  {...slickOptions}
                  asNavFor={nav2}
                  ref={(slider) => (sliderRef1 = slider)}
                  className="testi-two-slider"
                >
                  {testiSlides.map((slide, index) => (
                    <div key={index} className="testi-two-slide">
                      <div className="text">{slide.text}</div>
                    </div>
                  ))}
                </Slider>
                <Slider
                  {...thumbOptions}
                  infinite={false}
                  asNavFor={nav1}
                  ref={(slider) => (sliderRef2 = slider)}
                  className="testi-two-thumbs-slider inner-slide"
                >
                  <div className="testi-two-thumb-slide">
                    <Image
                      alt=""
                      src="/images/resource/thumb1.jpg"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="testi-two-thumb-slide">
                    <Image
                      alt=""
                      src="/images/resource/thumb2.jpg"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="testi-two-thumb-slide">
                    <Image
                      alt=""
                      src="/images/resource/thumb3.jpg"
                      width={60}
                      height={60}
                    />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
