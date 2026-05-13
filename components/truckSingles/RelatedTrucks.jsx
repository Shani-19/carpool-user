"use client";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

export default function RelatedTrucks({ trucks = [] }) {
  const imageBase = "https://media.carpoolkr.com/assets/truck/thumbnail/";

  if (!trucks || trucks.length === 0) return null;

  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };

  return (
    <section className="cars-section-three">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Related Listings</h2>
          <Link href="/trucks" className="btn-title">
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_243)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_243">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>

        <Slider
          slidesToScroll={1}
          slidesToShow={4}
          infinite={trucks.length > 4}
          responsive={[
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                infinite: trucks.length > 4,
              },
            },
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: trucks.length > 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: trucks.length > 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: trucks.length > 1,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: trucks.length > 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: trucks.length > 1,
              },
            },
          ]}
          arrows
          className="row car-slider-three wow fadeInUp"
        >
          {trucks.map((truck, index) => {
            const imageUrl = truck.main_image?.startsWith("http")
              ? truck.main_image
              : `${imageBase}${truck.main_image}`;

            return (
                <div
                  key={index}
                  className="car-block-three col-lg-3 col-md-6 col-sm-12"
                  onClick={() => window.open(`/trucks/${truck.slug}`, '_blank')}
                  style={{ cursor: 'pointer' }}
                >
                <div className="inner-box">
                  <div className="image-box">
                    <div className="slider-thumb">
                      <div className="image">
                        <Link href={`/trucks/${truck.slug}`} target="_blank">
                          <Image
                            alt={truck.name}
                            src={imageUrl}
                            width={329}
                            height={220}
                            style={{ objectFit: "cover" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <Link href={`/trucks/${truck.slug}`} target="_blank">
                        {truck.name}
                      </Link>
                    </h6>
                    <ul className="list-info mt-3 justify-content-between">
                      <li>
                        <i className="flaticon-speedometer" /> {fmtNumber(truck.odometer || truck.mileage)} km
                      </li>
                      <li>
                        <i className="flaticon-gasoline-pump" /> {truck.fuel_type}
                      </li>
                      <li>
                        <i className="flaticon-gearbox" /> {truck.transmission || truck.transmission_type}
                      </li>
                    </ul>
                    <div className="btn-box">
                      <span>${fmtNumber(truck.final_price || truck.price)}</span>
                      <Link
                        href={`/trucks/${truck.slug}`}
                        target="_blank"
                        className="details"
                      >
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_634_448)">
                            <path
                              d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_634_448">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
