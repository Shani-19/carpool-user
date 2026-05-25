"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import RelatedCars from "./RelatedCars";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Financing from "./sections/Financing";
import { api } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

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
    // Return a dummy item or just the children while loading dimensions
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

export default function SingleNew({ carItem, relatedCars = [] }) {
  const { user } = useAuth();
  const [reportCode, setReportCode] = useState(null);
  const [hasReport, setHasReport] = useState(false);
  const [loadingReport, setLoadingReport] = useState(true);
  const [reportWarningMsg, setReportWarningMsg] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    remarks: ""
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");
  const [modalErrorMsg, setModalErrorMsg] = useState("");

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (carItem?.vin) {
      setLoadingReport(true);
      api.post('/report-check', { vin: carItem.vin })
        .then(res => {
          if (res.data && res.data.success) {
            setHasReport(true);
            setReportCode(res.data.code);
            setReportWarningMsg(null);
          } else if (res.data && res.data.warning) {
            setHasReport(false);
            setReportCode(null);
            setReportWarningMsg(res.data.message);
          } else {
            setHasReport(false);
            setReportCode(null);
            setReportWarningMsg(null);
          }
        })
        .catch(err => {
          console.error("Error checking VIN report status:", err);
          setHasReport(false);
          setReportCode(null);
          setReportWarningMsg(null);
        })
        .finally(() => {
          setLoadingReport(false);
        });
    } else {
      setHasReport(false);
      setReportCode(null);
      setReportWarningMsg(null);
      setLoadingReport(false);
    }
  }, [carItem?.vin]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setModalErrorMsg("User not authenticated");
      return;
    }

    setModalSubmitting(true);
    setModalSuccessMsg("");
    setModalErrorMsg("");

    const payload = {
      vin: carItem?.vin || "",
      url: typeof window !== "undefined" ? window.location.href : "",
      plate_no: carItem?.plate_no || "",
      remarks: modalFormData.remarks
    };

    try {
      const res = await api.post('/carpool-request', payload);
      if (res.data?.success) {
        setModalSuccessMsg(res.data.message || "Inspection Request submitted successfully");
        setReportWarningMsg("Inspection Request is Pending");
        setTimeout(() => {
          setShowRequestModal(false);
          setModalSuccessMsg("");
          setModalFormData({ remarks: "" });
        }, 3000);
      } else {
        setModalErrorMsg(res.data?.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response?.data?.message) {
        setModalErrorMsg(err.response.data.message);
      } else {
        setModalErrorMsg("Sorry, There is an error on server!");
      }
    } finally {
      setModalSubmitting(false);
    }
  };
  // Mock data for images if not provided
  const images = carItem?.images?.length > 0 ? carItem.images : [carItem?.main_image || "/images/resource/inventory1-6.png"];
  const imageBase = process.env.NEXT_PUBLIC_CARS_IMG_SRC_S3 || "https://media.carpoolkr.com/assets/car/cars";

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

  return (
    <section className="inventory-section v1 layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>

          <h2>{carItem?.name || "Car Name"}</h2>

          <div className="text" style={{ color: "gray" }}>
            {carItem?.registration_date} ({carItem?.year}), {carItem?.fuel_type} {carItem?.engine_volume ? (carItem?.engine_volume / 1000).toFixed(1) : "0.0"}, {carItem?.drive_type}, {carItem?.transmission}, {carItem?.passenger ? `${carItem?.passenger} Seater` : ""}, {carItem?.options?.map((option) => option.names)?.flat()?.slice(0, 3)?.join(", ")}
          </div>

          <ul className="spectes-list">
            <li>
              <span>
                <img src="/images/resource/spec1-1.svg" alt="" />
                NON ACCIDENT
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

            <h3 className="title">${fmtNumber(carItem?.final_price || carItem?.price)}</h3>

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
                          );
                        })}
                      </Slider>
                    </div>

                    <div className="content-box">
                      <ul className="video-list">
                        {carItem?.embed_code && (
                          <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); setOpen(true); }}>
                              <img src="/images/resource/video1-1.svg" alt="" />
                              Video
                            </a>
                          </li>
                        )}
                        <li>
                          <a href="#" onClick={(e) => { e.preventDefault(); }}>
                            <img src="/images/resource/video1-4.svg" alt="" />
                            +{images.length}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/resource/eye.svg" alt="" />
                            {carItem?.view || 0}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Gallery>
              </div>

              <div className="overview-sec-two v2">
                <ul className="list">
                  <li>
                    <img src="/images/resource/insep2-1.svg" alt="" />
                    <span>Kilometer</span>
                    <small>{carItem?.odometer ? fmtNumber(carItem.odometer) : "-"}</small>
                  </li>
                  <li>
                    <img src="/images/resource/insep2-2.svg" alt="" />
                    <span>Fuel Type</span>
                    <small>{carItem?.fuel_type || "-"}</small>
                  </li>
                  <li>
                    <img src="/images/resource/insep2-3.svg" alt="" />
                    <span>Transmission</span>
                    <small>{carItem?.transmission || "-"}</small>
                  </li>
                  <li>
                    <img src="/images/resource/insep2-4.svg" alt="" />
                    <span>Engine Volume</span>
                    <small>{carItem?.engine_volume ? `${fmtNumber(carItem.engine_volume)} cc` : "-"}</small>
                  </li>
                  <li>
                    <img src="/images/resource/insep2-5.svg" alt="" />
                    <span>Body Style</span>
                    <small>{carItem?.vehicle_type || "-"}</small>
                  </li>
                </ul>
              </div>

              {/* description-sec */}
              <div className="description-sec v2">
                <h4 className="title">Description</h4>
                <div className="text" dangerouslySetInnerHTML={{ __html: carItem?.description || "No description available." }} />
                <ul className="des-list">
                  {hasReport && (
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`https://inspection.carpoolkr.com/inspection-report-show-qr/${reportCode}`, "", "width=1400,height=695");
                        }}
                        className="item"
                      >
                        <img src="/images/resource/book1-1.svg" alt="" />
                        Inspection Report
                      </a>
                    </li>
                  )}
                  <li className="two">
                    <a href="#" className="item">
                      <img src="/images/resource/book1-2.svg" alt="" />
                      Car Brochure
                    </a>
                  </li>
                  <li className="three">
                    <a href="#" className="item">
                      <img src="/images/resource/book1-3.svg" alt="" />
                      Schedule Test Drive
                    </a>
                  </li>
                </ul>
              </div>

              {/* features-sec */}
              <div className="features-sec v2">
                <h4 className="title">Features</h4>
                <div style={{
                  maxHeight: showAllFeatures ? 'none' : '300px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'max-height 0.3s ease'
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
                      height: '80px',
                      background: 'linear-gradient(transparent, white)',
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

              {/* dimensions-sec */}
              <div className="features-sec v2" style={{ marginTop: "40px" }}>
                <h4 className="title">Dimensions & Capacities</h4>
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="spec-box"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px 40px",
                        background: "#f8f9fb",
                        padding: "30px",
                        borderRadius: "15px",
                        border: "1px solid #eee",
                      }}
                    >
                      {[
                        { label: "Overall Length", value: carItem?.length ? `${carItem.length} mm` : null },
                        { label: "Overall Width", value: carItem?.width ? `${carItem.width} mm` : null },
                        { label: "Overall Height", value: carItem?.height ? `${carItem.height} mm` : null },
                        {
                          label: "Passenger Capacity",
                          value: carItem?.passenger ? `${carItem.passenger} Persons` : null,
                        },
                        { label: "Doors", value: carItem?.doors ? `${carItem.doors} Doors` : null },
                        { label: "Class", value: carItem?.class },
                      ].map((spec, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: "10px",
                          }}
                        >
                          <span style={{ color: "#64748b", fontWeight: "500", fontSize: "14px" }}>{spec.label}</span>
                          <span style={{ color: "#0f172a", fontWeight: "600", fontSize: "15px" }}>
                            {spec.value || "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* condition-sec */}
              <div className="features-sec v2" style={{ marginTop: "40px" }}>
                <h4 className="title">Vehicle Condition Report (VCR)</h4>
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className="spec-box"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "20px 40px",
                        background: "#f8f9fb",
                        padding: "30px",
                        borderRadius: "15px",
                        border: "1px solid #eee",
                      }}
                    >
                      {[
                        { label: "Engine Status", value: carItem?.vcr?.engine },
                        { label: "Transmission", value: carItem?.vcr?.ttransmission },
                        { label: "Brake System", value: carItem?.vcr?.brake_system },
                        { label: "A/C System", value: carItem?.vcr?.ac },
                        { label: "Heater", value: carItem?.vcr?.heater },
                        { label: "Audio System", value: carItem?.vcr?.audio_system },
                        { label: "Window Switch", value: carItem?.vcr?.window_switch },
                        { label: "Corrosion Status", value: carItem?.vcr?.corrosion_status },
                        { label: "Accident/Damaged", value: carItem?.damaged },
                        { label: "Taxi Use", value: carItem?.is_taxi },
                        { label: "Rental Use", value: carItem?.is_rental },
                        { label: "Theft Record", value: carItem?.is_theft },
                      ].map((spec, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: "10px",
                          }}
                        >
                          <span style={{ color: "#64748b", fontWeight: "500", fontSize: "14px" }}>{spec.label}</span>
                          <span
                            style={{
                              color:
                                spec.value === "Working" || spec.value === "No" || spec.value === "Less than 25%"
                                  ? "#10b981"
                                  : spec.value === "Broken" || spec.value === "Yes"
                                    ? "#ef4444"
                                    : "#0f172a",
                              fontWeight: "600",
                              fontSize: "15px",
                            }}
                          >
                            {spec.value || "-"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="side-bar-column v2 v3 v4 col-xl-4 col-lg-12 col-md-12 col-sm-12">
            <div className="inner-column">
              {/* overview-sec */}
              <div className="overview-box">
                <h4 className="title">Car Overview</h4>
                <ul className="list v2">
                  {carItem?.make_name && carItem.make_name !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-5.svg" alt="" />Manufacturer</span>
                      {carItem.make_name}
                    </li>
                  )}
                  {carItem?.model_name && carItem.model_name !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-3.svg" alt="" />Model</span>
                      {carItem.model_name}
                    </li>
                  )}
                  {carItem?.year && carItem.year !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-4.svg" alt="" />Year</span>
                      {carItem.year}
                    </li>
                  )}
                  {carItem?.drive_type && carItem.drive_type !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-6.svg" alt="" />Drive Type</span>
                      {carItem.drive_type}
                    </li>
                  )}
                  {carItem?.steering && carItem.steering !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-7.svg" alt="" />Steering</span>
                      {carItem.steering}
                    </li>
                  )}
                  {carItem?.color && carItem.color !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-11.svg" alt="" />Color</span>
                      {carItem.color}
                    </li>
                  )}
                  {carItem?.passenger && carItem.passenger !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-7.svg" alt="" />Seats</span>
                      {`${carItem.passenger}-seat`}
                    </li>
                  )}
                  {carItem?.doors && carItem.doors !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-9.svg" alt="" />Doors</span>
                      {`${carItem.doors}-door`}
                    </li>
                  )}
                  {carItem?.no_of_cylinder && carItem.no_of_cylinder !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-10.svg" alt="" />Cylinders</span>
                      {carItem.no_of_cylinder}
                    </li>
                  )}
                  {carItem?.engine_power && carItem.engine_power !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-1.svg" alt="" />Engine Power</span>
                      {carItem.engine_power}
                    </li>
                  )}
                  {carItem?.engine_no && carItem.engine_no !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-2.svg" alt="" />Engine No.</span>
                      {carItem.engine_no}
                    </li>
                  )}
                  {carItem?.vin && carItem.vin !== "-" && (
                    <li>
                      <span><img src="/images/resource/insep1-12.svg" alt="" />VIN</span>
                      {carItem.vin}
                    </li>
                  )}
                </ul>
              </div>

              <div className="contact-box">
                <div className="icon-box">
                  <img src="/images/resource/volvo.svg" alt="" />
                </div>
                <div className="content-box">
                  <h6 className="title">Carpool Korea</h6>
                  <div className="text">Incheon, South Korea</div>
                  <ul className="contact-list">
                    <li>
                      <a href="#">
                        <div className="image-box">
                          <img src="/images/resource/phone1-1.svg" alt="" />
                        </div>
                        Get Directions
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="image-box">
                          <img src="/images/resource/phone1-2.svg" alt="" />
                        </div>
                        +82 10-XXXX-XXXX
                      </a>
                    </li>
                  </ul>
                  <div className="btn-box">
                    <a href="#" className="side-btn">
                      Message Dealer
                    </a>
                    <a href="#" className="side-btn two">
                      Chat Via Whatsapp
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-box v2 mt-4">
                <Financing />
              </div>

              {!hasReport && (
                <div className="mt-3" style={{ position: 'relative' }}>
                  <button
                    onClick={() => reportWarningMsg ? null : (user ? setShowRequestModal(true) : null)}
                    className="theme-btn btn-style-one w-100"
                    disabled={!!reportWarningMsg}
                    style={{
                      background: reportWarningMsg ? '#6c757d' : '#405FF2',
                      color: '#fff',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '15px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 14px rgba(64, 95, 242, 0.2)',
                      filter: (!user && !reportWarningMsg) ? 'blur(3px)' : 'none',
                      pointerEvents: (!user || reportWarningMsg) ? 'none' : 'auto',
                      opacity: (!user && !reportWarningMsg) ? 0.8 : (reportWarningMsg ? 0.6 : 1)
                    }}
                  >
                    {reportWarningMsg || "Request An Inspection"}
                  </button>

                  {!user && !reportWarningMsg && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 2
                    }}>
                      <Link href="/login" style={{
                        background: 'rgba(5, 11, 32, 0.85)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        Sign In / Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RelatedCars cars={relatedCars} />
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={carItem?.embed_code || "7e90gBu4pas"}
        onClose={() => setOpen(false)}
      />

      {showRequestModal && (
        <div
          className="modal d-block show"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: 'rgba(5, 11, 32, 0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 1050
          }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px' }}>
            <div
              className="modal-content border-0 shadow-lg rounded-4 overflow-hidden"
              style={{ background: '#fff' }}
            >
              {/* Header */}
              <div
                className="modal-header px-4 py-3 border-0 d-flex justify-content-between align-items-center"
                style={{
                  background: 'linear-gradient(135deg, #405FF2 0%, #2b40a6 100%)',
                  color: '#fff'
                }}
              >
                <h5 className="modal-title fw-bold text-white mb-0" style={{ fontSize: '18px' }}>
                  Request Vehicle Inspection
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white border-0 bg-transparent text-white fs-4"
                  onClick={() => setShowRequestModal(false)}
                  aria-label="Close"
                  style={{ opacity: 0.8, cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                <p className="text-muted mb-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  Please confirm your details and vehicle information to request a professional inspection report for <strong>{carItem?.name}</strong>.
                </p>

                <div className="bg-light p-3 rounded-3 mb-4" style={{ fontSize: '13px', border: '1px solid #e2e8f0' }}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <h6 className="fw-bold mb-2 text-primary" style={{ fontSize: '14px' }}>User Details</h6>
                      <div className="d-flex flex-column gap-1">
                        <div><span className="text-muted">Name:</span> <strong className="text-dark">{user?.name || "-"}</strong></div>
                        <div><span className="text-muted">Phone:</span> <strong className="text-dark">{user?.mobile || user?.phone || "-"}</strong></div>
                        <div><span className="text-muted">Email:</span> <strong className="text-dark">{user?.email || "-"}</strong></div>
                        <div><span className="text-muted">Country:</span> <strong className="text-dark">{user?.country || "-"}</strong></div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h6 className="fw-bold mb-2 text-primary" style={{ fontSize: '14px' }}>Vehicle Details</h6>
                      <div className="d-flex flex-column gap-1">
                        <div><span className="text-muted">VIN:</span> <strong className="text-dark">{carItem?.vin || "-"}</strong></div>
                        <div><span className="text-muted">Plate:</span> <strong className="text-dark">{carItem?.plate_no || "-"}</strong></div>
                        <div><span className="text-muted">Transmission:</span> <strong className="text-dark">{carItem?.transmission || "-"}</strong></div>
                        <div><span className="text-muted">Type:</span> <strong className="text-dark">{carItem?.vehicle_type || "-"}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {modalSuccessMsg && (
                  <div className="alert alert-success border-0 rounded-3 mb-3 d-flex align-items-center" style={{ backgroundColor: '#ecfdf5', color: '#065f46' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{modalSuccessMsg}</span>
                  </div>
                )}

                {modalErrorMsg && (
                  <div className="alert alert-danger border-0 rounded-3 mb-3 d-flex align-items-center" style={{ backgroundColor: '#fef2f2', color: '#991b1b' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{modalErrorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleModalSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Remarks (Optional)</label>
                    <textarea
                      className="form-control border p-3 rounded-3"
                      value={modalFormData.remarks}
                      onChange={(e) => setModalFormData({ ...modalFormData, remarks: e.target.value })}
                      placeholder="Add any optional notes here..."
                      rows="4"
                      style={{ fontSize: '14px', borderColor: '#e2e8f0', resize: 'none' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="theme-btn btn-style-one w-100 py-3"
                    style={{
                      background: '#405FF2',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '15px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(64, 95, 242, 0.2)',
                      cursor: 'pointer'
                    }}
                  >
                    {modalSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : "Submit Request"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
