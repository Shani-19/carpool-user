import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Cta() {
  return (
    <section className="boxcar-pricing-section-two pt-0 pb-0">
      <div className="boxcar-container">
        <div className="row">
          {/* content-column */}
          <div className="content-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="boxcar-title">
                <h2>
                  Online, in-person, <br />
                  everywhere
                </h2>
                <div className="text">
                  Choose from thousands of vehicles from multiple brands and buy
                  online with
                  <br />
                  Click &amp; Drive, or visit us at one of our dealerships
                  today.
                </div>
              </div>
              <Link href={`/contact`} className="read-more">
                get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_669_4430)">
                    <path
                      d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_669_4430">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
          {/* image-column */}
          <div className="image-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="image-box">
                <figure className="image">
                  <Image
                    alt=""
                    src="/images/resource/pricing2-1.jpg"
                    width={686}
                    height={600}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
