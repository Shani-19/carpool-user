"use client";
import Slider from "rc-slider";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { getCars } from "@/utils/carAPI";
import Link from "next/link";
import Pagination from "../common/NewPagination";

const filters = [
  { text: "SUV" },
  { text: "Automatic" },
  { text: "$5,0000-$10,000" },
  { text: "Hatchback" },
  { text: "2020+" },
  { text: "All Wheel Drive" },
  { text: "Great Price" },
  { text: "Up to 75,000 miles" },
  { text: "Low Mileage" },
  { text: "Diesel" },
];

const CarImage = ({ src, alt, priority }) => {
  const [imgSrc, setImgSrc] = useState(src);

  // if src changes, update image
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={imgSrc}
      width={260}
      height={195}
      style={{ objectFit: "fill", height: "100%" }}
      priority={priority}
      onError={() => setImgSrc("/images/resource/about-inner1-5.jpg")}
    />
  );
};

export default function Listings5Copy() {
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState([5000, 35000]);
  const handlePrice = (value) => setPrice(value);

  const getStatusBadge = (car) => {
    const booking = String(car?.booking_status || "").trim().toLowerCase();
    const status = String(car?.status || "").trim().toLowerCase();

    // Highest priority
    if (booking === "temporary booked") {
      return { text: "Reserved", color: "#dc3545" }; // red
    }

    // Sale (even if both booking_status & status are Sale)
    if (status === "sale") {
      return { text: "Sale", color: "#198754" }; // green
    }

    // Everything else
    return { text: "Sold", color: "#dc3545" }; // red
  };



  // Safe formatters
  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };

  const fetchCars = useCallback(async (pageNo, aliveRef) => {
    setLoading(true);
    try {
      const res = await getCars(pageNo, perPage);

      if (aliveRef && !aliveRef.current) return;

      setCars(res?.data || []);
      setPagination(res?.pagination || null);

      // Correct log: logs fresh API response
      console.log("Cars API response:", res);
    } catch (err) {
      console.error("Failed to load cars", err);

      if (aliveRef && !aliveRef.current) return;

      setCars([]);
      setPagination(null);
    } finally {
      if (aliveRef && !aliveRef.current) return;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const aliveRef = { current: true };
    fetchCars(page, aliveRef);

    return () => {
      aliveRef.current = false;
    };
  }, [page, fetchCars]);

  return (
    <section className="cars-section-thirteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>What Kind of Car Should I Get? Try Boxcars Car Finder to Find a Car</h2>
          <ul className="service-list">
            {filters.map((filter, index) => (
              <li key={index}>
                <a href="#">{filter.text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          {/* SIDEBAR */}
          <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
            <div className="sidebar-handle">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
                  fill="#050B20"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
                  fill="#050B20"
                />
              </svg>
              Show Filter
            </div>

            <div className="inventory-sidebar">
              <div className="inventroy-widget widget-location">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Location</label>
                      <SelectComponent options={["New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="form_boxes">
                      <label>Search within</label>
                      <SelectComponent options={["200 miles", "200 mile", "200 mile"]} />
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="form_boxes">
                      <label>Zip Code</label>
                      <SelectComponent options={["02111", "02111", "02111"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Condition</label>
                      <SelectComponent
                        options={["New and Used", "New York", "Los Vegas", "California"]}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="categories-box">
                      <h6 className="title">Type</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          SUV (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Sedan (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Hatchback (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Coupe (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Convertible (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Make</label>
                      <SelectComponent options={["Add Make", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Model</label>
                      <SelectComponent options={["Add Model", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Min year</label>
                      <SelectComponent options={["2019", "2020", "2021", "2022"]} />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Max year</label>
                      <SelectComponent options={["2023", "2020", "2021", "2022"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Mileage</label>
                      <SelectComponent options={["Any Mileage", "New York", "Los Vega", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Drive Type</label>
                      <SelectComponent options={["Any Type", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="price-box">
                      <h6 className="title">Price</h6>
                      <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                        <div className="form-column col-lg-6">
                          <div className="form_boxes">
                            <label>Min price</label>
                            <div className="drop-menu">${fmtNumber(price[0])}</div>
                          </div>
                        </div>
                        <div className="form-column v2 col-lg-6">
                          <div className="form_boxes">
                            <label>Max price</label>
                            <div className="drop-menu">${fmtNumber(price[1])}</div>
                          </div>
                        </div>
                      </form>

                      <div className="widget-price">
                        <Slider
                          formatLabel={() => ``}
                          range
                          max={50000}
                          min={0}
                          defaultValue={price}
                          onChange={(value) => handlePrice(value)}
                          id="slider"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom">
                      <h6 className="title">Transmission</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          Automatic (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Manual (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          CVT (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom">
                      <h6 className="title">Fuel Type</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          Diesel (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Petrol (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Hybird (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Electric (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Exterior Color</label>
                      <SelectComponent options={["Blue", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Interior Color</label>
                      <SelectComponent options={["Black", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Doors</label>
                      <SelectComponent options={["3", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Cylinders</label>
                      <SelectComponent options={["6", "New York", "Los Vegas", "California"]} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="categories-box border-none-bottom m-0">
                      <h6 className="title">Key Features</h6>
                      <div className="cheak-box">
                        <label className="contain">
                          360-degree camera (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Bluetooth (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Keyless start (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Navigation System (1,456)
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Active head restraints (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Brake assist (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                        <label className="contain">
                          Parking assist systems (1,456)
                          <input type="checkbox" defaultChecked="checked" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <a href="#" title="" className="show-more">
                        Show 8 more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIST */}
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box">
              <div className="text-box">
                <div className="text">
                  {loading ? (
                    <span>Loading vehicles...</span>
                  ) : (
                    <span>
                      Showing {pagination?.from} to {pagination?.to} of{" "}
                      {pagination?.total} vehicles
                    </span>
                  )}
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes v3">
                    <small>Sort by</small>
                    <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
                  </div>
                </form>
              </div>

              <div className="cars-container">
                {loading && (
                  <div className="content-column rounded">
                    <div className="inner-column vh-100 bg-light rounded">
                      <div className="text-center py-5">
                        <div className="spinner-border position-fixed" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && cars.length === 0 && (
                  <div className="py-5 text-center">
                    <p>No vehicles found.</p>
                  </div>
                )}

                {cars.map((elm, i) => (
                  <div key={elm?.id ?? i} className="service-block-thirteen cl-row-block">
                    <div className="inner-box">
                      <div className="image-box cl-leftBox">
                        <figure className="image" style={{ height: "100%" }}>
                          <Link href={`/inventory-page-single-v1/${elm.id}`}>
                            <CarImage
                              src={`${process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW}/${elm.main_image}`}
                              alt={elm.name}
                              priority={i <= 2}
                            />
                          </Link>
                        </figure>
                      </div>

                      <div className="right-box cl-rightBox">
                        <div className="content-box">
                          <h4 className="title">
                            <Link href={`/inventory-page-single-v1/${elm.id}`}>
                              {elm.name}
                            </Link>
                          </h4>

                          <div className="text mb-1">VIN No. {elm.vin}</div>

                          <div className="inspection-sec mb-1">
                            <div className="inspection-box">
                              <span className="icon">{/* icon svg kept */}</span>
                              <div className="info">
                                <span>Mileage</span>
                                <small>{fmtNumber(elm.odometer)} Km</small>
                              </div>
                            </div>

                            <div className="inspection-box">
                              <span className="icon">{/* icon svg kept */}</span>
                              <div className="info">
                                <span>Fuel Type</span>
                                <small>{elm.fuel_type}</small>
                              </div>
                            </div>

                            <div className="inspection-box">
                              <span className="icon">{/* icon svg kept */}</span>
                              <div className="info">
                                <span>Transmission</span>
                                <small>{elm.transmission}</small>
                              </div>
                            </div>
                          </div>

                          <ul className="ul-cotent">
                            <li>
                              <a href="#">{fmtNumber(elm.engine_volume)} CC</a>
                            </li>
                            <li>
                              <a href="#">{elm.drive_type}</a>
                            </li>
                            <li>
                              <a href="#">{elm.vehicle_type}</a>
                            </li>
                            <li>
                              <a href="#">{Number(elm.passenger || 0)} Seats</a>
                            </li>
                          </ul>
                        </div>

                        <div className="content-box-two cl-contentBoxTwo">
                          <h4 className="title">${fmtNumber(elm.price)}</h4>
                          <span>
                              {(() => {
                                const badge = getStatusBadge(elm);
                                return (
                                  <span style={{ color: badge.color, fontWeight: 700 }}>
                                    {badge.text}
                                  </span>
                                );
                              })()}
                            </span>
                          <Link
                            href={`/inventory-page-single-v1/${elm.id}`}
                            className="button"
                          >
                            View Details
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={14}
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_989_6940)">
                                <path
                                  d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                  fill="#405FF2"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_989_6940">
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
              </div>

              {/* PAGINATION */}
              {pagination && (
                <div className="pagination-sec">
                  <Pagination
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    onPageChange={setPage}
                  />
                  <div className="text">
                    Showing {pagination.from} to {pagination.to} of{" "}
                    {pagination.total} vehicles
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
