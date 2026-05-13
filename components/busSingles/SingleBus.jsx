"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import RelatedBuses from "./RelatedBuses";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Financing from "../carSingles/sections/Financing";

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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.src = original;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [original]);

  if (dimensions.width === 0) {
    return children({ ref: { current: null }, open: () => { } });
  }

  return (
    <Item
      original={original}
      thumbnail={thumbnail}
      width={dimensions.width}
      height={dimensions.height}
    >
      {children}
    </Item>
  );
};

export default function SingleBus({ busItem, relatedBuses = [] }) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = busItem?.images?.length > 0 ? busItem.images : [busItem?.main_image || "/images/resource/inventory1-6.png"];
  const imageBase = process.env.NEXT_PUBLIC_BUSES_IMG_SRC_S3 || "https://media.carpoolkr.com/assets/car/cars";

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

  // Filter specifications to hide null/empty values
  const detailedSpecs = [
    { label: "Overall Length", value: busItem?.length ? `${busItem.length} mm` : null },
    { label: "Overall Width", value: busItem?.width ? `${busItem.width} mm` : null },
    { label: "Overall Height", value: busItem?.height ? `${busItem.height} mm` : null },
    { label: "Seating Capacity", value: busItem?.passenger ? `${busItem.passenger} Persons` : null },
    { label: "Total Weight", value: busItem?.weight ? `${busItem.weight} Ton` : null },
    { label: "Doors", value: busItem?.doors ? `${busItem.doors} Doors` : null },
    { label: "Fuel Type", value: busItem?.fuel_type },
    { label: "Transmission", value: busItem?.transmission },
    { label: "Engine Volume", value: busItem?.engine_volume ? `${fmtNumber(busItem.engine_volume)} cc` : null },
    { label: "Engine Power", value: busItem?.engine_power ? `${busItem.engine_power} hp` : null },
    { label: "Port Size", value: busItem?.port_size },
    { label: "Color", value: busItem?.color },
    { label: "Registration Date", value: busItem?.registration_date },
    { label: "Class", value: busItem?.class },
    { label: "Category", value: busItem?.category },
    { label: "Model Detail", value: busItem?.model_detail },
    { label: "Cargo", value: busItem?.cargo },
    { label: "Cylinders", value: busItem?.no_of_cylinder },
  ].filter(spec => spec.value !== null && spec.value !== undefined && spec.value !== "");

  return (
    <section className="inventory-section v1 layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><span>Buses for Sale</span></li>
          </ul>

          <h2>{busItem?.name || "Bus Name"}</h2>

          <div className="text" style={{ color: "gray" }}>
            {busItem?.registration_date} ({busItem?.year}), {busItem?.fuel_type}, {busItem?.transmission}, {busItem?.passenger ? `${busItem?.passenger} Seater` : ""}, {
              busItem?.options?.length > 0
                ? (typeof busItem.options[0] === 'string'
                  ? busItem.options.slice(0, 3).join(", ")
                  : busItem.options.map(opt => opt.names).flat().slice(0, 3).join(", "))
                : ""
            }
          </div>

          <ul className="spectes-list">
            <li><span><img src="/images/resource/spec1-1.svg" alt="" />NON ACCIDENT</span></li>
            <li><span><img src="/images/resource/spec1-2.svg" alt="" />CLEAN TITLE</span></li>
            <li><span><img src="/images/resource/spec1-3.svg" alt="" />INSPECTED</span></li>
            <li><span><img src="/images/resource/spec1-4.svg" alt="" />VIN CHECK</span></li>
            <li><span><img src="/images/resource/spec1-2.svg" alt="" />FAST SHIPPING</span></li>
          </ul>

          <div className="content-box">
            <div className="btn-box">
              <div className="share-btn">
                <span>Share</span>
                <a href="#" className="share"><img src="/images/resource/share.svg" alt="" /></a>
              </div>
              <div className="share-btn">
                <span>Save</span>
                <a href="#" className="share"><img src="/images/resource/share1-1.svg" alt="" /></a>
              </div>
            </div>
            <h3 className="title">${fmtNumber(busItem?.final_price || busItem?.price)}</h3>
            <span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_163_10380)">
                  <path d="M7.8047 17.4287C7.80429 17.4287 7.80378 17.4287 7.80326 17.4287C7.2752 17.4283 6.77865 17.2223 6.40539 16.8484L1.14802 11.5835C0.379045 10.8131 0.379045 9.55955 1.14802 8.78923L8.23503 1.68863C8.96538 0.956841 9.93715 0.553711 10.9712 0.553711H15.4676C16.5579 0.553711 17.4451 1.44072 17.4451 2.53125V7.01377C17.4451 8.04714 17.0424 9.01851 16.3113 9.74875L9.20227 16.8504C8.8288 17.2233 8.33246 17.4287 7.8047 17.4287ZM10.9712 1.87207C10.2898 1.87207 9.64948 2.1377 9.16818 2.61993L2.08107 9.72053C1.82471 9.97741 1.82471 10.3952 2.08107 10.652L7.33844 15.9169C7.46276 16.0414 7.62817 16.1102 7.80429 16.1104H7.80481C7.98073 16.1104 8.14614 16.0419 8.27056 15.9176L15.3796 8.81612C15.8614 8.33492 16.1267 7.69469 16.1267 7.01377V2.53125C16.1267 2.16777 15.831 1.87207 15.4676 1.87207H10.9712ZM12.6659 7.24438C11.5755 7.24438 10.6884 6.35738 10.6884 5.26685C10.6884 4.17632 11.5755 3.28931 12.6659 3.28931C13.7564 3.28931 14.6435 4.17632 14.6435 5.26685C14.6435 6.35738 13.7564 7.24438 12.6659 7.24438ZM12.6659 4.60767C12.3025 4.60767 12.0068 4.90337 12.0068 5.26685C12.0068 5.63032 12.3025 5.92603 12.6659 5.92603C13.0295 5.92603 13.3251 5.63032 13.3251 5.26685C13.3251 4.90337 13.0295 4.60767 12.6659 4.60767Z" fill="#050B20"></path>
                </g>
                <defs><clippath id="clip0_163_10380"><rect width="18" height="18" fill="white"></rect></clippath></defs>
              </svg>
              &nbsp;&nbsp; {busItem?.status?.toLowerCase() === 'sale' && busItem?.booking_status?.toLowerCase() === 'sale' ? 'Sale' : (busItem?.status !== 'Sale' ? 'Sold' : 'Reserved')}
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
                height: 520px;
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
                        {images.map((img, idx) => {
                          const imageUrl = img.startsWith("http") ? img : `${imageBase}${img}`;
                          return (
                            <div className="image-box" key={idx}>
                              <figure className="image TTBFS">
                                <PhotoItem original={imageUrl} thumbnail={imageUrl}>
                                  {({ ref, open }) => (
                                    <img ref={ref} onClick={open} src={imageUrl} alt="" style={{ cursor: "pointer" }} />
                                  )}
                                </PhotoItem>
                              </figure>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>

                    <div className="content-box">
                      <ul className="video-list">
                        {busItem?.embed_code && (
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); setOpen(true); }}>
                              <img src="/images/resource/video1-1.svg" alt="" />Video
                            </a>
                          </li>
                        )}
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); }}>
                            <img src="/images/resource/video1-4.svg" alt="" />+{images.length}
                          </a>
                        </li>
                        <li>
                          <a href="#"><img src="/images/resource/eye.svg" alt="" />{busItem?.view || 0}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Gallery>
              </div>

              <div className="overview-sec-two v2">
                <ul className="list">
                  {busItem?.odometer && busItem.odometer !== "-" && (
                    <li>
                      <img src="/images/resource/insep2-1.svg" alt="" />
                      <span>Kilometer</span>
                      <small>{fmtNumber(busItem.odometer)}</small>
                    </li>
                  )}
                  {busItem?.fuel_type && busItem.fuel_type !== "-" && (
                    <li>
                      <img src="/images/resource/insep2-2.svg" alt="" />
                      <span>Fuel Type</span>
                      <small>{busItem.fuel_type}</small>
                    </li>
                  )}
                  {busItem?.transmission && busItem.transmission !== "-" && (
                    <li>
                      <img src="/images/resource/insep2-3.svg" alt="" />
                      <span>Transmission</span>
                      <small>{busItem.transmission}</small>
                    </li>
                  )}
                  {busItem?.passenger && busItem.passenger !== "-" && (
                    <li>
                      <img src="/images/resource/insep2-4.svg" alt="" />
                      <span>Seating</span>
                      <small>{`${busItem.passenger} Persons`}</small>
                    </li>
                  )}
                  {busItem?.make_name && busItem.make_name !== "-" && (
                    <li>
                      <img src="/images/resource/insep2-5.svg" alt="" />
                      <span>Manufacturer</span>
                      <small>{busItem.make_name}</small>
                    </li>
                  )}
                </ul>
              </div>

              <div className="description-sec v2">
                <h4 className="title">Description</h4>
                <div className="text" dangerouslySetInnerHTML={{ __html: busItem?.description || "No description available." }} />
              </div>

              {busItem?.options?.length > 0 && (
                <div className="features-sec v2">
                  <h4 className="title">Features & Options</h4>
                  <div style={{
                    maxHeight: showAllFeatures ? 'none' : '300px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'max-height 0.3s ease'
                  }}>
                    <div className="row">
                      {typeof busItem.options[0] === 'string' ? (
                        // Handle flat array of strings (Bus API format)
                        <div className="list-column col-12">
                          <div className="inner-column">
                            <ul className="feature-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                              {busItem.options.map((option, idx) => (
                                <li key={idx} style={{ marginBottom: 0 }}>
                                  <i className="fa-solid fa-check" style={{ color: '#0f172a', marginRight: '10px' }}></i>
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        // Handle nested objects (Car API format)
                        busItem.options.map((option, idx) => (
                          <div className="list-column col-lg-4 col-md-6 col-sm-12" key={idx}>
                            <div className="inner-column">
                              <h6 className="title">{option.title}</h6>
                              <ul className="feature-list">
                                {option.names?.map((name, i) => (
                                  <li key={i}><i className="fa-solid fa-check"></i>{name}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {!showAllFeatures && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '80px',
                        background: 'linear-gradient(transparent, white)',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </div>
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="theme-btn btn-style-one mt-3"
                    style={{ padding: '10px 25px', borderRadius: '8px', fontSize: '14px', background: '#405FF2', color: '#fff' }}
                  >
                    {showAllFeatures ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}

              {detailedSpecs.length > 0 && (
                <div className="features-sec v2" style={{ marginTop: "40px" }}>
                  <h4 className="title">Detailed Specifications</h4>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="spec-box" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px 40px",
                        background: "#f8f9fb",
                        padding: "30px",
                        borderRadius: "15px",
                        border: "1px solid #eee",
                      }}>
                        {detailedSpecs.filter(spec => spec.value && spec.value !== "-").map((spec, idx) => (
                          <div key={idx} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: "10px",
                          }}>
                            <span style={{ color: "#64748b", fontWeight: "500", fontSize: "14px" }}>{spec.label}</span>
                            <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "15px" }}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="side-bar-column v2 v3 v4 col-xl-4 col-lg-12 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="overview-box">
                <h4 className="title">Bus Overview</h4>
                <ul className="list v2">
                  <li><span><img src="/images/resource/insep1-5.svg" alt="" />Manufacturer</span>{busItem?.make_name || "-"}</li>
                  <li><span><img src="/images/resource/insep1-3.svg" alt="" />Model</span>{busItem?.model_name || "-"}</li>
                  <li><span><img src="/images/resource/insep1-4.svg" alt="" />Year</span>{busItem?.year || "-"}</li>
                  <li><span><img src="/images/resource/insep1-11.svg" alt="" />Color</span>{busItem?.color || "-"}</li>
                  <li><span><img src="/images/resource/insep1-7.svg" alt="" />Steering</span>{busItem?.steering || "LHD"}</li>
                  <li><span><img src="/images/resource/insep1-7.svg" alt="" />Seats</span>{busItem?.passenger ? `${busItem.passenger}-seat` : "-"}</li>
                  <li><span><img src="/images/resource/insep1-9.svg" alt="" />Doors</span>{busItem?.doors ? `${busItem.doors}-door` : "-"}</li>
                  <li><span><img src="/images/resource/insep1-1.svg" alt="" />Engine Power</span>{busItem?.engine_power ? `${busItem.engine_power} hp` : "-"}</li>
                  <li><span><img src="/images/resource/insep1-2.svg" alt="" />Engine No.</span>{busItem?.engine_no || "-"}</li>
                  <li><span><img src="/images/resource/insep1-12.svg" alt="" />VIN</span>{busItem?.vin || "-"}</li>
                </ul>
              </div>

              <div className="contact-box">
                <div className="icon-box"><img src="/images/resource/volvo.svg" alt="" /></div>
                <div className="content-box">
                  <h6 className="title">Carpool Korea</h6>
                  <div className="text">Incheon, South Korea</div>
                  <div className="btn-box">
                    <a href="#" className="side-btn">Message Dealer</a>
                    <a href="#" className="side-btn two">Chat Via Whatsapp</a>
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
      <RelatedBuses buses={relatedBuses} />
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={busItem?.embed_code || ""}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
