"use client";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://partners.carpoolkr.com/api";
const MEDIA_URL = process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/car/thumbnail/";


export default function Cars2() {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${API_BASE_URL}/cars?page=1&per_page=30&sort_by=price_high_low`;
        const res = await axios.get(url);
        const rawData = res.data.data || [];

        const formatted = rawData.map(item => ({
          id: item.id,
          slug: item.slug,
          name: item.name || `${item.model_year} ${item.make}`,
          imageUrl: item.main_image ? `${MEDIA_URL}${item.main_image}` : '/images/placeholder.jpg',
          model_year: item.model_year,
          make: item.make,
          fuel_type: item.fuel_type,
          transmission: item.transmission,
          odometer: item.odometer,
          final_price: item.final_price,
          price: item.price,
          badge: item.badge || '',
          linkUrl: `/cars/${item.slug || item.id}`
        }));

        setCarsData(formatted);
      } catch (err) {
        console.error(err);
        setCarsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const slickOptions = {
    infinite: false,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
    ],
  };

  const renderContent = () => {
    if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
    if (carsData.length === 0) return <div className="text-center py-5 text-white">No vehicles found.</div>;

    return (
      <Slider
        {...slickOptions}
        className="row car-slider slider-layout-1"
        data-preview="2.3"
      >
        {carsData.map((elm, i) => (
          <div
            key={i}
            className="car-block-two col-lg-4 col-md-6 col-sm-12"
          >
            <div className="inner-box">
              <div className="image-box">
                <figure className="image">
                  <Link href={elm.linkUrl} target="_blank">
                    <Image
                      alt={elm.name}
                      src={elm.imageUrl}
                      width={320}
                      height={320}
                      style={{ objectFit: 'cover', width: '100%', height: '320px' }}
                      unoptimized
                    />
                  </Link>
                </figure>
                {elm.badge && <span>{elm.badge}</span>}
              </div>
              <div className="content-box">
                <h6 className="title">
                  <Link href={elm.linkUrl} target="_blank">
                    {elm.name?.slice(0, 27)}
                  </Link>
                </h6>
                <div className="text"></div>
                <ul>
                  <li><i className="flaticon-gasoline-pump" /> {elm.fuel_type}</li>
                  <li><i className="flaticon-gearbox" /> {elm.transmission}</li>
                  <li><i className="flaticon-dashboard" /> {elm.odometer?.toLocaleString()} km</li>
                </ul>
                <div className="btn-box">
                  <small>${elm.final_price ? elm.final_price?.toLocaleString() : '0'}</small>
                  <Link href={elm.linkUrl} className="details" target="_blank">
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_601_1238)">
                        <path
                          d="M13.6109 0H5.05533C4.84037 0 4.66642 0.173943 4.66642 0.388901C4.66642 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.11369 13.3362C-0.0382322 13.4881 -0.0382322 13.7342 0.11369 13.8861C0.189632 13.962 0.289164 14 0.388658 14C0.488153 14 0.587648 13.962 0.663627 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_601_1238">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <section className="cars-section-two">
      <div className="boxcar-container">
        <div className="boxcar-title light wow fadeInUp">
          <h2>Premium Cars</h2>
          <Link href={`/cars`} className="btn-title">
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_675)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_675">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
      <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
        <div className="tab-pane fade show active">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
