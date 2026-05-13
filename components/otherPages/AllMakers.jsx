"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCarMakes } from "@/utils/vehicles/vehicleAPI";

export default function AllMakers() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getCarMakes();
        if (response.success && response.data) {
          // Sort by count descending or name ascending
          const sortedBrands = response.data.sort((a, b) => b.count - a.count);
          setBrands(sortedBrands);
        }
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const getLogoUrl = (name) => {
    // Some names might need encoding for the URL
    return `https://carpoolkr.com/assets/images/img/${encodeURIComponent(name)}.webp`;
  };

  if (loading) {
    return (
      <section className="boxcar-brand-section section-radius-top bg-1 pt-100 pb-100">
        <div className="boxcar-container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading brands...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="boxcar-brand-section section-radius-top bg-1 pt-100 pb-100">
      <div className="boxcar-container">
        <div className="boxcar-title text-center mb-50">
          <h2 className="wow fadeInUp">Explore All Our Premium Brands</h2>
          <p className="wow fadeInUp">Discover a wide range of automobile makers available for you.</p>
        </div>
        <div className="row gy-5">
          {brands.map((car, index) => (
            <div
              key={index}
              className="cars-block style-1 col-lg-2 col-md-4 col-sm-6"
            >
              <div
                className="inner-box wow fadeInUp"
                data-wow-delay={`${(index % 6) * 100}ms`}
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
                <div className="content-box">
                  <h6 className="title text-center">
                    <Link href={`/cars?make=${encodeURIComponent(car.name)}`}>
                      {car.name}
                    </Link>
                  </h6>
                  <p className="count text-center text-muted small">({car.count} Vehicles)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
