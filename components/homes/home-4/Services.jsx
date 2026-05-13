import React from "react";
import Image from "next/image";
export default function Services() {
  return (
    <section className="boxcar-service-section-two pt-0">
      <div className="large-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-lg-6 col-md-6 col-sm-12">
              <div className="inner-column wow fadeInUp">
                <h2 className="title">
                  Shop used cars, whether you're on the lot or on the go
                </h2>
                <div className="text">
                  Download our app to save cars and create alerts, scan window
                  stickers on our lot for more details, and even call dibs on a
                  car by holding it for up to 7 days.
                </div>
                <div className="btn-box">
                  <a href="#" className="store">
                    <Image
                      src="/images/resource/apple-1.png"
                      width={19}
                      height={23}
                      alt=""
                    />
                    <span>Download on the</span>
                    <h6 className="title">Apple Store</h6>
                  </a>
                  <a href="#" className="store two">
                    <Image
                      src="/images/resource/play-2-1.png"
                      width={23}
                      height={26}
                      alt=""
                    />
                    <span>Get in on</span>
                    <h6 className="title">Google Play</h6>
                  </a>
                </div>
              </div>
            </div>
            {/* image-column */}
            <div className="image-column col-lg-6 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <Image
                      alt=""
                      src="/images/resource/iphone.png"
                      width={850}
                      height={500}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
