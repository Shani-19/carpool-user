"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import ShippingCalculator from "./sections/ShippingCalculator";
import RelatedEncarCars from "./RelatedEncarCars";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/utils/api";
import { usePathname } from "next/navigation";
import { isFavourite, toggleFavourite } from "@/utils/favourites";
import { addRecentlyViewed } from "@/utils/recentlyViewed";
import ShareModal from "../common/ShareModal";
const areaMap = {
  'Seoul': '서울', 'Busan': '부산', 'Incheon': '인천', 'Daegu': '대구', 'Daejeon': '대전',
  'Gwangju': '광주', 'Ulsan': '울산', 'Sejong': '세종', 'Suwon': '수원', 'Seongnam': '성남',
  'Goyang': '고양', 'Yongin': '용인', 'Bucheon': '부천', 'Ansan': '안산', 'Anyang': '안양',
  'Namyangju': '남양주', 'Hwaseong': '화성', 'Pyeongtaek': '평택', 'Uijeongbu': '의정부',
  'Siheung': '시흥', 'Paju': '파주', 'Gwangmyeong': '광명', 'Gunpo': '군포', 'Icheon': '이천',
  'Yangju': '양주', 'Osan': '오산', 'Guri': '구리', 'Anseong': '안성', 'Uiwang': '의왕',
  'Hanam': '하남', 'Dongducheon': '동두천', 'Gwacheon': '과천', 'Yeoju': '여주',
  'Chuncheon': '춘천', 'Wonju': '원주', 'Gangneung': '강릉', 'Donghae': '동해',
  'Taebaek': '태백', 'Sokcho': '속초', 'Samcheok': '삼척', 'Cheongju': '청주',
  'Chungju': '충주', 'Jecheon': '제천', 'Cheonan': '천안', 'Asan': '아산',
  'Boryeong': '보령', 'Nonsan': '논산', 'Gyeryong': '계룡', 'Dangjin': '당진',
  'Seosan': '서산', 'Jeonju': '전주', 'Iksan': '익산', 'Gunsan': '군산',
  'Jeongeup': '정읍', 'Namwon': '남원', 'Gimje': '김제', 'Mokpo': '목포',
  'Yeosu': '여수', 'Suncheon': '순천', 'Naju': '나주', 'Gwangyang': '광양',
  'Pohang': '포항', 'Gyeongju': '경주', 'Gimcheon': '김천', 'Andong': '안동',
  'Gumi': '구미', 'Yeongju': '영주', 'Yeongcheon': '영천', 'Sangju': '상주',
  'Mungyeong': '문경', 'Changwon': '창원', 'Jinju': '진주', 'Tongyeong': '통영',
  'Sacheon': '사천', 'Gimhae': '김해', 'Miryang': '밀양', 'Geoje': '거제',
  'Yangsan': '양산', 'Jeju City': '제주시', 'Seogwipo': '서귀포', 'Gwangju (Gyeonggi)': '광주'
};

const areaToAdminMapping = {
  // Tasadaq Raja (ID: 31)
  'Suwon': 31, 'Yongin': 31, 'Ansan': 31, 'Anyang': 31,
  'Hwaseong': 31, 'Pyeongtaek': 31, 'Siheung': 31, 'Gunpo': 31,
  'Icheon': 31, 'Osan': 31, 'Cheonan': 31, 'Asan': 31, 'Boryeong': 31, 'Nonsan': 31,

  // Ahmad Afzal (ID: 29)
  'Seoul': 29, 'Incheon': 29, 'Seongnam': 29, 'Goyang': 29, 'Bucheon': 29, 'Namyangju': 29,
  'Uijeongbu': 29, 'Paju': 29, 'Gwangmyeong': 29, 'Yangju': 29, 'Guri': 29,
  'Anseong': 29, 'Uiwang': 29, 'Hanam': 29, 'Dongducheon': 29, 'Gwacheon': 29,

  // Mr Jong (ID: 37)
  'Busan': 37, 'Daegu': 37, 'Gwangju': 37, 'Ulsan': 37, 'Yeoju': 37,
  'Chuncheon': 37, 'Wonju': 37, 'Gangneung': 37, 'Donghae': 37, 'Taebaek': 37,
  'Sokcho': 37, 'Samcheok': 37, 'Seosan': 37, 'Jeonju': 37, 'Iksan': 37,
  'Gunsan': 37, 'Jeongeup': 37, 'Namwon': 37, 'Gimje': 37, 'Mokpo': 37,
  'Yeosu': 37, 'Suncheon': 37, 'Naju': 37, 'Gwangyang': 37, 'Pohang': 37,
  'Gyeongju': 37, 'Gimcheon': 37, 'Andong': 37, 'Gumi': 37, 'Yeongju': 37,
  'Yeongcheon': 37, 'Sangju': 37, 'Mungyeong': 37, 'Changwon': 37, 'Jinju': 37,
  'Tongyeong': 37, 'Sacheon': 37, 'Gimhae': 37, 'Miryang': 37, 'Geoje': 37,
  'Yangsan': 37, 'Jeju City': 37, 'Seogwipo': 37, 'Gwangju (Gyeonggi)': 37,

  // Dr Ehsan Mirza (ID: 36)
  'Daejeon': 36, 'Sejong': 36, 'Cheongju': 36, 'Chungju': 36, 'Jecheon': 36,
  'Gyeryong': 36, 'Dangjin': 36
};

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { currency, format, convert } = useCurrency();

  const pathname = usePathname();
  const urlType = pathname?.split('/').filter(Boolean)[0] || 'domestic';
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (carItem?.id) {
      setIsFav(isFavourite(carItem.id, urlType));
      addRecentlyViewed("other", carItem, urlType);
    }
  }, [carItem, urlType]);

  const handleFavourite = (e) => {
    e.preventDefault();
    if (!carItem) return;
    const newState = toggleFavourite(carItem, urlType);
    setIsFav(newState);
  };

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

    let area = "";
    let assign_person = "";

    if (carItem?.dealer?.address) {
      for (const [englishName, koreanName] of Object.entries(areaMap)) {
        if (carItem.dealer.address.includes(koreanName)) {
          area = englishName;
          assign_person = areaToAdminMapping[englishName];
          break;
        }
      }
    }

    // Fallback if not found
    if (!area) {
      area = "Seoul";
      assign_person = 29;
    }

    const payload = {
      assign_person,
      phone: carItem?.dealer?.phone || "",
      address: carItem?.dealer?.address || "",
      area,
      vin: carItem?.vin || "",
      url: carItem?.id ? `https://fem.encar.com/cars/detail/${carItem.id}` : "",
      plate_no: carItem?.plate_no || carItem?.vehicle_no || carItem?.name || "",
      remarks: modalFormData.remarks
    };

    try {
      const res = await api.post('/encar-request', payload);
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
                <div className="share-btn" onClick={(e) => { e.preventDefault(); setIsShareModalOpen(true); }} style={{ cursor: 'pointer' }}>
                  <span>Share</span>
                  <a href="#" className="share" onClick={(e) => e.preventDefault()}>
                    <img src="/images/resource/share.svg" alt="" />
                  </a>
                </div>
                <div className="share-btn" onClick={handleFavourite} style={{ cursor: 'pointer' }}>
                  <span style={{ color: isFav ? '#405FF2' : 'inherit' }}>{isFav ? 'Favourited' : 'Favourite'}</span>
                  <a href="#" className="share" onClick={(e) => e.preventDefault()}>
                    <img src={isFav ? "/images/resource/favourite-1.svg" : "/images/resource/favourite.svg"} alt="" style={{ filter: isFav ? 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(225deg) brightness(104%) contrast(97%)' : 'none' }} width={18} height={18} />
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
                  <ShippingCalculator vehicleItem={carItem} displayPrice={displayPrice} />
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
                          Please Login First
                        </Link>
                      </div>
                    )}
                  </div>
                )}
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
        <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} vehicleData={carItem} />
      </section>
      <RelatedEncarCars carId={carItem?.id} urlType={urlType} modelName={carItem?.model_name} />

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
                        <div><span className="text-muted">Plate:</span> <strong className="text-dark">{carItem?.plate_no || carItem?.vehicle_no || carItem?.name || "-"}</strong></div>
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
    </>
  );
}
