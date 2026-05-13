"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCarMakes } from "@/utils/vehicles/vehicleAPI";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getCarMakes();
        if (response.success && response.data) {
          // Shuffle and pick 6
          const shuffled = [...response.data].sort(() => 0.5 - Math.random());
          setBrands(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch brands for homepage:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const getLogoUrl = (name) => {
    return `https://carpoolkr.com/assets/images/img/${encodeURIComponent(name)}.webp`;
  };

  if (loading) return null;

  return (
    <section className="boxcar-brand-section section-radius-top bg-1 pt-100 pb-100">
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className="wow fadeInUp">Explore Our Premium Brands</h2>
          <Link href={`/brands`} className="btn-title">
            Show All Brands
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_3199)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_3199">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <div className="row">
          {brands.map((car, index) => (
            <div
              key={index}
              className="cars-block style-1 col-lg-2 col-md-6 col-sm-6"
            >
              <div
                className={`inner-box wow fadeInUp`}
                data-wow-delay={`${index * 100}ms`}
              >
                <div className="image-box">
                  <figure className="image">
                    <Link href={`/cars?make=${encodeURIComponent(car.name)}`}>
                      <Image
                        alt={car.name}
                        src={getLogoUrl(car.name)}
                        width={100}
                        height={100}
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = "/images/resource/brand-1.png"; // Fallback icon
                        }}
                      />
                    </Link>
                  </figure>
                </div>
                <div className="content-box text-center">
                  <h6 className="title">
                    <Link href={`/cars?make=${encodeURIComponent(car.name)}`}>
                      {car.name}
                    </Link>
                  </h6>
                  <p className="count text-muted small">({car.count} Vehicles)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
