"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Financing from "./sections/Financing";
import RelatedEncarCars from "./RelatedEncarCars";
import { useCurrency } from "@/context/CurrencyContext";

// Helper to format numbers
const fmtNumber = (val) => {
  const n = Number(val);
  if (Number.isNaN(n)) return "0";
  return n.toLocaleString("en-US");
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-prev slick-arrow" onClick={onClick} type="button">
      Previous
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-next slick-arrow" onClick={onClick} type="button">
      Next
    </button>
  );
};

const PhotoItem = ({ original, thumbnail, children }) => {
  return (
    <Item
      original={original}
      thumbnail={thumbnail}
      width={1280}
      height={768}
    >
      {children}
    </Item>
  );
};

export default function EncarSingle({ carItem }) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { currency, format, convert } = useCurrency();

  useEffect(() => {
    console.log("EncarSingle carItem:", carItem);
    console.log("EncarSingle images:", carItem?.images);
  }, [carItem]);

  const images = carItem?.images?.length > 0
    ? carItem.images
    : ["/images/resource/inventory1-6.png"];

  const sliderSettings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: (current) => setActiveImage(current),
  };

  const displayPrice = typeof carItem?.price === 'number'
    ? (currency === 'KRW'
      ? (
        <>
          ₩{((carItem.price * 10000 + (carItem.isLowPrice ? convert(300, "USD") : 0)) / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <small style={{ fontSize: '0.6em', fontWeight: 'normal' }}> Million</small>
        </>
      )
      : format(convert(carItem.price * 10000, "KRW") + (carItem.isLowPrice ? convert(300, "USD") : 0)))
    : carItem?.price || "Ask Price";

  return (
    <>
      <section className="inventory-section v1 layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span>Inventory</span>
              </li>
            </ul>

            <h2>{carItem?.name || "Car Name"}</h2>

            <div className="text" style={{ color: "gray" }}>
              {carItem?.registration_date} ({carItem?.year}), {carItem?.fuel_type}, {carItem?.engine_volume ? `${fmtNumber(carItem.engine_volume)} cc` : ""}, {carItem?.drive_type}, {carItem?.transmission}, {carItem?.passenger ? `${carItem?.passenger} Seater` : ""}
            </div>

            <ul className="spectes-list">
              <li>
                <span>
                  <img src="/images/resource/spec1-1.svg" alt="" />
                  {carItem?.damaged === "No" ? "NON ACCIDENT" : "ACCIDENT RECORD"}
                </span>
              </li>
              <li>
                <span>
                  <img src="/images/resource/spec1-2.svg" alt="" />
                  CLEAN TITLE
                </span>
              </li>
              <li>
                <span>
                  <img src="/images/resource/spec1-3.svg" alt="" />
                  INSPECTED
                </span>
              </li>
              <li>
                <span>
                  <img src="/images/resource/spec1-4.svg" alt="" />
                  VIN CHECK
                </span>
              </li>
              <li>
                <span>
                  <img src="/images/resource/spec1-2.svg" alt="" />
                  FAST SHIPPING
                </span>
              </li>
            </ul>

            <div className="content-box">
              <div className="btn-box">
                <div className="share-btn">
                  <span>Share</span>
                  <a href="#" className="share">
                    <img src="/images/resource/share.svg" alt="" />
                  </a>
                </div>
                <div className="share-btn">
                  <span>Save</span>
                  <a href="#" className="share">
                    <img src="/images/resource/share1-1.svg" alt="" />
                  </a>
                </div>
              </div>

              <h3 className="title">{displayPrice}</h3>

              <span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_163_10380)">
                    <path d="M7.8047 17.4287C7.80429 17.4287 7.80378 17.4287 7.80326 17.4287C7.2752 17.4283 6.77865 17.2223 6.40539 16.8484L1.14802 11.5835C0.379045 10.8131 0.379045 9.55955 1.14802 8.78923L8.23503 1.68863C8.96538 0.956841 9.93715 0.553711 10.9712 0.553711H15.4676C16.5579 0.553711 17.4451 1.44072 17.4451 2.53125V7.01377C17.4451 8.04714 17.0424 9.01851 16.3113 9.74875L9.20227 16.8504C8.8288 17.2233 8.33246 17.4287 7.8047 17.4287ZM10.9712 1.87207C10.2898 1.87207 9.64948 2.1377 9.16818 2.61993L2.08107 9.72053C1.82471 9.97741 1.82471 10.3952 2.08107 10.652L7.33844 15.9169C7.46276 16.0414 7.62817 16.1102 7.80429 16.1104H7.80481C7.98073 16.1104 8.14614 16.0419 8.27056 15.9176L15.3796 8.81612C15.8614 8.33492 16.1267 7.69469 16.1267 7.01377V2.53125C16.1267 2.16777 15.831 1.87207 15.4676 1.87207H10.9712ZM12.6659 7.24438C11.5755 7.24438 10.6884 6.35738 10.6884 5.26685C10.6884 4.17632 11.5755 3.28931 12.6659 3.28931C13.7564 3.28931 14.6435 4.17632 14.6435 5.26685C14.6435 6.35738 13.7564 7.24438 12.6659 7.24438ZM12.6659 4.60767C12.3025 4.60767 12.0068 4.90337 12.0068 5.26685C12.0068 5.63032 12.3025 5.92603 12.6659 5.92603C13.0295 5.92603 13.3251 5.63032 13.3251 5.26685C13.3251 4.90337 13.0295 4.60767 12.6659 4.60767Z" fill="#050B20"></path>
                  </g>
                  <defs>
                    <clippath id="clip0_163_10380">
                      <rect width="18" height="18" fill="white"></rect>
                    </clippath>
                  </defs>
                </svg>
                &nbsp;&nbsp; Sale
              </span>
            </div>
          </div>

          <div className="row">
            <style dangerouslySetInnerHTML={{
              __html: `
            .TTBFS {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 550px;
                background-color: #f3f4f6;
                overflow: hidden;
                border-radius: 20px;
                width: 100%;
            }
            .TTBFS img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                margin: auto;
            }
          ` }} />
            <div className="inspection-column v2 col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="gallery-sec">
                  <Gallery>
                    <div className="image-column wrap-gallery-box">
                      <div className="inner-column inventry-slider-two">
                        <Slider {...sliderSettings}>
                          {images.map((imageUrl, idx) => (
                            <div className="image-box" key={idx}>
                              <figure className="image TTBFS">
                                <PhotoItem
                                  original={imageUrl}
                                  thumbnail={imageUrl}
                                >
                                  {({ ref, open }) => (
                                    <img
                                      ref={ref}
                                      onClick={open}
                                      src={imageUrl}
                                      alt=""
                                      style={{ cursor: "pointer" }}
                                    />
                                  )}
                                </PhotoItem>
                              </figure>
                            </div>
                          ))}
                        </Slider>
                      </div>

                      <div className="content-box">
                        <ul className="video-list">
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); }}>
                              <img src="/images/resource/video1-4.svg" alt="" />
                              +{images.length} Photos
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); }}>
                              <i className="fa-regular fa-eye" style={{ marginRight: '8px' }}></i>
                              {carItem?.view_count ? fmtNumber(carItem.view_count) : 0} Views
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Gallery>
                </div>

                <div className="overview-sec-two v2">
                  <ul className="list">
                    {carItem?.odometer && (
                      <li>
                        <img src="/images/resource/insep2-1.svg" alt="" />
                        <span>Kilometer</span>
                        <small>{fmtNumber(carItem.odometer)}</small>
                      </li>
                    )}
                    {carItem?.fuel_type && carItem.fuel_type !== "-" && (
                      <li>
                        <img src="/images/resource/insep2-2.svg" alt="" />
                        <span>Fuel Type</span>
                        <small>{carItem.fuel_type}</small>
                      </li>
                    )}
                    {carItem?.transmission && carItem.transmission !== "-" && (
                      <li>
                        <img src="/images/resource/insep2-3.svg" alt="" />
                        <span>Transmission</span>
                        <small>{carItem.transmission}</small>
                      </li>
                    )}
                    {carItem?.engine_volume && carItem.engine_volume > 0 && (
                      <li>
                        <img src="/images/resource/insep2-4.svg" alt="" />
                        <span>Engine Volume</span>
                        <small>{fmtNumber(carItem.engine_volume)} cc</small>
                      </li>
                    )}
                    {carItem?.vehicle_type && carItem.vehicle_type !== "-" && (
                      <li>
                        <img src="/images/resource/insep2-5.svg" alt="" />
                        <span>Body Style</span>
                        <small>{carItem.vehicle_type}</small>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="description-sec v2">
                  <h4 className="title">Description</h4>
                  <div className="text" dangerouslySetInnerHTML={{ __html: carItem?.content || "No description available." }} />
                </div>

                <div className="features-sec v2">
                  <h4 className="title">Features</h4>
                  <div style={{
                    maxHeight: showAllFeatures ? '5000px' : '300px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'max-height 0.5s ease-in-out'
                  }}>
                    <div className="row">
                      {carItem?.options?.map((option, idx) => (
                        <div className="list-column col-lg-4 col-md-6 col-sm-12" key={idx}>
                          <div className="inner-column">
                            <h6 className="title">{option.title}</h6>
                            <ul className="feature-list">
                              {option.names?.map((name, i) => (
                                <li key={i}>
                                  <i className="fa-solid fa-check"></i>
                                  {name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    {!showAllFeatures && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100px',
                        background: 'linear-gradient(transparent, white 90%)',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </div>
                  {carItem?.options?.length > 0 && (
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="theme-btn btn-style-one mt-3"
                      style={{ padding: '10px 25px', borderRadius: '8px', fontSize: '14px', background: '#405FF2', color: '#fff' }}
                    >
                      {showAllFeatures ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

              </div>
            </div>

            <div className="side-bar-column v2 v3 v4 col-xl-4 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="overview-box">
                  <h4 className="title">Vehicle Overview</h4>
                  <ul className="list v2">
                    {carItem?.make_name && carItem.make_name !== "-" && (
                      <li>
                        <span>Manufacturer</span>
                        {carItem.make_name}
                      </li>
                    )}
                    {carItem?.model_name && carItem.model_name !== "-" && (
                      <li>
                        <span>Model</span>
                        {carItem.model_name}
                      </li>
                    )}
                    {carItem?.year && carItem.year !== "-" && (
                      <li>
                        <span>Year</span>
                        {carItem.year}
                      </li>
                    )}
                    {carItem?.drive_type && carItem.drive_type !== "-" && (
                      <li>
                        <span>Drive Type</span>
                        {carItem.drive_type}
                      </li>
                    )}
                    {carItem?.color && carItem.color !== "-" && (
                      <li>
                        <span>Color</span>
                        {carItem.color}
                      </li>
                    )}
                    {carItem?.passenger && carItem.passenger !== "-" && (
                      <li>
                        <span>Seats</span>
                        {`${carItem.passenger}-seat`}
                      </li>
                    )}
                    {carItem?.vin && carItem.vin !== "-" && (
                      <li>
                        <span>VIN</span>
                        <small style={{ fontSize: '0.85em' }}>{carItem.vin}</small>
                      </li>
                    )}
                    {carItem?.vehicle_no && carItem.vehicle_no !== "-" && (
                      <li>
                        <span>Vehicle Number</span>
                        {carItem.vehicle_no}
                      </li>
                    )}
                    {carItem?.engine_power && carItem.engine_power !== "-" && (
                      <li>
                        <span>Engine Power</span>
                        {carItem.engine_power}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="contact-box">
                  <div className="icon-box">
                    <i className="fa-solid fa-user-tie" style={{ fontSize: '30px', color: '#050B20' }}></i>
                  </div>
                  <div className="content-box">
                    <h6 className="title">Dealer Info</h6>
                    <div className="text" style={{ fontSize: '0.9em', marginBottom: '5px' }}>
                      <strong>Carpool Korea</strong>
                    </div>
                    <div className="text" style={{ fontSize: '0.85em', opacity: 0.8 }}>
                      South Korea
                    </div>
                    <div className="btn-box">
                      <a href="tel:+82XXXXXXXXXX" className="side-btn">
                        <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i>
                        +82 XXXXXXXXXX
                      </a>
                      <a href="https://wa.me/82XXXXXXXXXX" className="side-btn two">
                        Chat Via Whatsapp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="form-box v2 mt-4">
                  <Financing />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={"7e90gBu4pas"}
          onClose={() => setOpen(false)}
        />
      </section>
      <RelatedEncarCars carId={carItem?.id} />
    </>
  );
}
