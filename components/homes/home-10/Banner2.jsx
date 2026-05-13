import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner2() {
  return (
    <section className="boxcar-pricing-section-six bg-1">
      <div className="boxcar-container">
        <div className="row">
          {/* image-column */}
          <div className="image-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="image-box">
                <figure className="image">
                  <a href="#">
                    <Image
                      alt=""
                      src="/images/resource/pricing6-1.jpg"
                      width={567}
                      height={500}
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          {/* content-column */}
          <div className="content-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="boxcar-title">
                <h2>Have more questions?Don’t hesitate to reach us</h2>
                <div className="text">
                  329 Queensberry Street, North <br />
                  Melbourne VIC3051, Australia.
                </div>
              </div>
              <div className="btn-box">
                <Link href={`/contact`} className="btn-two">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M17.3333 2.4375H8.66667C7.02325 2.4375 5.6875 3.77325 5.6875 5.41667V20.5833C5.6875 22.2268 7.02325 23.5625 8.66667 23.5625H17.3333C18.9768 23.5625 20.3125 22.2268 20.3125 20.5833V5.41667C20.3125 3.77325 18.9768 2.4375 17.3333 2.4375ZM18.6875 20.5833C18.6875 21.3298 18.0798 21.9375 17.3333 21.9375H8.66667C7.92025 21.9375 7.3125 21.3298 7.3125 20.5833V5.41667C7.3125 4.67025 7.92025 4.0625 8.66667 4.0625H17.3333C18.0798 4.0625 18.6875 4.67025 18.6875 5.41667V20.5833ZM14.8958 6.5C14.8958 6.9485 14.5318 7.3125 14.0833 7.3125H11.9167C11.4682 7.3125 11.1042 6.9485 11.1042 6.5C11.1042 6.0515 11.4682 5.6875 11.9167 5.6875H14.0833C14.5318 5.6875 14.8958 6.0515 14.8958 6.5Z"
                      fill="#050B20"
                    />
                  </svg>
                  +76 956 039 967
                </Link>
                <a href="#" className="btn-two">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M20.5833 4.604H5.41667C3.77325 4.604 2.4375 5.93975 2.4375 7.58317V18.4165C2.4375 20.0599 3.77325 21.3957 5.41667 21.3957H20.5833C22.2268 21.3957 23.5625 20.0599 23.5625 18.4165V7.58317C23.5625 5.93975 22.2268 4.604 20.5833 4.604ZM20.5833 6.229C20.6083 6.229 20.6299 6.242 20.6538 6.24309L13.8125 11.3748C13.3337 11.7334 12.6653 11.7334 12.1875 11.3748L5.34625 6.24309C5.37117 6.242 5.39175 6.229 5.41667 6.229H20.5833ZM21.9375 18.4165C21.9375 19.1629 21.3298 19.7707 20.5833 19.7707H5.41667C4.67025 19.7707 4.0625 19.1629 4.0625 18.4165V7.58317C4.0625 7.49975 4.09608 7.42717 4.11017 7.34809L11.2125 12.6748C11.739 13.0692 12.3695 13.2663 13 13.2663C13.6305 13.2663 14.2621 13.0692 14.7875 12.6748L21.8898 7.34809C21.9039 7.42717 21.9375 7.49975 21.9375 7.58317V18.4165Z"
                      fill="#050B20"
                    />
                  </svg>
                  ali@boxcars.com
                </a>
              </div>
              <a href="#" className="read-more">
                Contact Us
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
