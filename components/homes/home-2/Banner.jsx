import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <section className="brand-boxcar-banner-section">
      <div className="boxcar-container">
        <div className="row">
          <div className="content-column col-xl-7 col-lg-12 col-md-12 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <h2 className="title">We make finding the right car simple</h2>
              <Link href={`/inventory-list-01`} className="btn">
                Find Out More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={14}
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_634_2178)">
                    <path
                      d="M14.1109 0H5.55533C5.34037 0 5.16643 0.173943 5.16643 0.388901C5.16643 0.603859 5.34037 0.777802 5.55533 0.777802H13.1721L0.613697 13.3362C0.461775 13.4881 0.461775 13.7342 0.613697 13.8861C0.68964 13.962 0.789171 14 0.888666 14C0.988161 14 1.08766 13.962 1.16363 13.8861L13.722 1.3277V8.94447C13.722 9.15943 13.8959 9.33337 14.1109 9.33337C14.3259 9.33337 14.4998 9.15943 14.4998 8.94447V0.388901C14.4998 0.173943 14.3258 0 14.1109 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_634_2178">
                      <rect
                        width={14}
                        height={14}
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
