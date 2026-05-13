import React from "react";
import Image from "next/image";
import Link from "next/link";
const galleryItems = [
  {
    id: 1,
    type: "text",
    title: "11+", // Maira Edit
    subtitle: "Years in\nBusiness",
    className: "item1",
  },
  {
    id: 2,
    type: "image",
    src: "/images/resource/about-inner1-2.jpg", // Professional car salesman
    alt: "Professional car dealer in showroom",
    className: "item2",
  },
  {
    id: 3,
    type: "image",
    src: "/images/resource/about-inner1-3.jpg", // Modern car showroom
    alt: "Modern car showroom interior",
    className: "item3",
  },
  {
    id: 4,
    type: "image",
    src: "/images/resource/about-inner1-1.jpg", // Car keys exchange
    alt: "Car keys being exchanged",
    className: "item4",
  },
  {
    id: 5,
    type: "image",
    src: "/images/resource/about-inner1-4.jpg", // Car dealership service
    alt: "Car dealership service area",
    className: "item5",
  },
  {
    id: 6,
    type: "image",
    src: "/images/resource/about-inner1-5.jpg", // Business handshake
    alt: "Business handshake over car deal",
    className: "item6",
  },
];

export default function About() {
  return (
    <>
      <div className="upper-box">
        <div className="boxcar-container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="boxcar-title">
                <ul className="breadcrumb">
                  <li>
                    <Link href={`/`}>Home</Link>
                  </li>
                  <li>
                    {/* ===== Maira Edit START ===== */}
                    <span>About Us</span>
                    {/* ===== Maira Edit END ===== */}
                  </li>
                </ul>
                <h2>About Us</h2>
                <div className="text">
                  We Value Our Clients And Want Them To Have A Nice Experience
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="content-box">
                {/* ===== Maira Edit START ===== */}
                <div className="text">
                  Carpool Korea is a vehicle export platform connecting international buyers with pre-owned vehicles sourced directly from South Korea through verified dealers. We focus on giving buyers clear, reliable information so they can make decisions with confidence.
                </div>
                <div className="text">
                  We handle the parts buyers cannot see — dealer verification, vehicle inspection review, documentation, and export coordination. Each step is managed carefully so buyers understand exactly what they are purchasing before shipment.
                </div>
                <div className="text">
                  Operating since 2014, we have built a system based on controlled processes, clear communication, and traceable transactions. Our goal is to reduce uncertainty for international buyers and ensure every vehicle meets expected standards before export.
                </div>
                {/* ===== Maira Edit END ===== */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gallery-sec */}
      <div className="galler-section">
        <div className="boxcar-container">
          <div className="galleryGrid galler-section">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`exp-block  galleryItem ${item.className} ${
                  item.type === "image" ? "hasOverlay" : ""
                }`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {item.type === "text" ? (
                  <div className="inner-box">
                    <div className="exp-box">
                      <h2 className="title">{item.title}</h2>
                      {/* ===== Maira Edit START ===== */}
                    <div className="text">Years Active</div>
                    {/* ===== Maira Edit END ===== */}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="galleryImage"
                    priority={index < 3}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
