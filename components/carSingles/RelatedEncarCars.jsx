"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { getRelatedEncarVehicles, getEncarVehicles, normalizeEncarSimple } from "@/utils/vehicles/encarAPI";
import { useCurrency } from "@/context/CurrencyContext";

export default function RelatedEncarCars({ carId, urlType, modelName }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, format, convert } = useCurrency();

  useEffect(() => {
    if (!carId) {
      console.warn("RelatedEncarCars: No carId provided");
      setLoading(false);
      return;
    }

    const fetchRelated = async () => {
      setLoading(true);
      try {
        console.log(`RelatedEncarCars: Fetching for ID ${carId}, type ${urlType}`);

        let data = [];
        if (urlType === 'cargo') {
          // Fetch up to 50 vehicles to increase chances of finding the same model
          const res = await getEncarVehicles(1, 50, 'default', { category: 'truck', car_type: 'Y' });
          if (res && res.data) {
            let filtered = res.data;
            if (modelName) {
              filtered = filtered.filter(v => v.Model === modelName);
            }

            data = filtered.map(v => {
              const imgBase = "https://ci.encar.com";
              let mainImage = "/images/resource/inventory1-6.png";
              if (v.Photos && v.Photos.length > 0) {
                mainImage = `${imgBase}${v.Photos[0].location || v.Photos[0].Location || v.Photos[0].path || ''}?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30`;
              } else if (v.Photo) {
                mainImage = `${imgBase}${v.Photo}001.jpg`;
              }

              const originalPrice = v.Price;
              const isLowPrice = typeof originalPrice === 'number' && originalPrice < 500;

              return {
                id: v.Id || v.id,
                name: `${v.FormYear || ''} ${v.Manufacturer || ''} ${v.Model || ''} ${v.Badge || ''}`.trim(),
                price: typeof originalPrice === 'number' ? originalPrice + 44 : originalPrice,
                isLowPrice,
                mileage: v.Mileage || 0,
                capacity: v.Capacity || "",
                formDetail: v.FormDetail || "",
                fuel_type: v.FuelType || "-",
                transmission_type: v.Transmission || "-",
                main_image: mainImage
              };
            }).filter(v => v !== null && v.id !== carId).slice(0, 8);
          }
        } else {
          data = await getRelatedEncarVehicles(carId);
        }

        console.log(`RelatedEncarCars: Found ${data.length} vehicles`);
        setCars(data);
      } catch (err) {
        console.error("RelatedEncarCars: Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [carId]);

  if (loading) return (
    <section className="cars-section-three">
      <div className="boxcar-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    </section>
  );

  if (!cars || cars.length === 0) {
    console.log("RelatedEncarCars: No cars to display");
    return null;
  }

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
          <Link href={`/${urlType || 'domestic'}`} className="btn-title">
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
          infinite={cars.length > 4}
          responsive={[
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                infinite: cars.length > 4,
              },
            },
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: cars.length > 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: cars.length > 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: cars.length > 1,
              },
            },
          ]}
          arrows
          className="row car-slider-three wow fadeInUp"
        >
          {cars.map((car, index) => {
            const displayPrice = typeof car.price === 'number'
              ? (currency === 'KRW'
                ? (
                  <>
                    ₩{((car.price * 10000 + (car.isLowPrice ? convert(300, "USD") : 0)) / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <small style={{ fontSize: '0.6em', fontWeight: 'normal' }}> Million</small>
                  </>
                )
                : format(convert(car.price * 10000, "KRW") + (car.isLowPrice ? convert(300, "USD") : 0)))
              : car.price;

            return (
              <div
                key={index}
                className="car-block-three col-lg-3 col-md-6 col-sm-12"
                onClick={() => window.open(`/${urlType || 'domestic'}/${car.id}`, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <div className="inner-box">
                  <div className="image-box">
                    <div className="slider-thumb">
                      <div className="image">
                        <Link href={`/${urlType || 'domestic'}/${car.id}`} target="_blank">
                          <Image
                            alt={car.name}
                            src={car.main_image}
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
                      <Link href={`/${urlType || 'domestic'}/${car.id}`} target="_blank">
                        {car.name}
                      </Link>
                    </h6>
                    <ul className="list-info mt-3 justify-content-between">
                      <li>
                        <i className="flaticon-speedometer" /> {fmtNumber(car.mileage)} km
                      </li>
                      {urlType === 'cargo' ? (
                        <>
                          <li>
                            <i className="fa-solid fa-truck" style={{ marginRight: '5px' }} /> {car.capacity || "-"}
                          </li>
                          <li>
                            <i className="fa-solid fa-layer-group" style={{ marginRight: '5px' }} /> {car.formDetail.slice(0, 11) || "-"}
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <i className="flaticon-gasoline-pump" /> {car.fuel_type}
                          </li>
                          <li>
                            <i className="flaticon-gearbox" /> {car.transmission_type}
                          </li>
                        </>
                      )}
                    </ul>
                    <div className="btn-box">
                      <span>{displayPrice}</span>
                      <Link
                        href={`/${urlType || 'domestic'}/${car.id}`}
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
