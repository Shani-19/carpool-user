import React from "react";
import Image from "next/image";
import Link from "next/link";
const galleryItems = [
  {
    id: 1,
    type: "text",
    // title: "45",
    title: "11+", // 22/4/26 Maira Edit
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
                  {/* ===== 22/4/26 Maira Edit START ===== */}
                  <li>
                    <span>About Us</span>
                  </li>
                  {/* <li>
                    <span>Cars for Sale</span>
                  </li> */}
                  {/* ===== 22/4/26 Maira Edit END ===== */}

                </ul>
                <h2>About Us</h2>
                <div className="text">
                  We Value Our Clients And Want Them To Have A Nice Experience
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="content-box">
                {/* ===== 22/4/26 Maira Edit START ===== */}
                <div className="text">
                  Carpool Korea is a vehicle export platform connecting international buyers with pre-owned vehicles sourced directly from South Korea through verified dealers. We focus on giving buyers clear, reliable information so they can make decisions with confidence.
                </div>
                <div className="text">
                  We handle the parts buyers cannot see — dealer verification, vehicle inspection review, documentation, and export coordination. Each step is managed carefully so buyers understand exactly what they are purchasing before shipment.
                </div>
                <div className="text">
                  Operating since 2014, we have built a system based on controlled processes, clear communication, and traceable transactions. Our goal is to reduce uncertainty for international buyers and ensure every vehicle meets expected standards before export.
                </div>
                {/* ===== 22/4/26 Maira Edit END ===== */}
                {/* <div className="text">
                  Lorem ipsum dolor sit amet consectetur. Convallis integer enim
                  eget sit urna. Eu duis lectus amet vestibulum varius. Nibh
                  tellus sit sit at lorem facilisis. Nunc vulputate ac interdum
                  aliquet vestibulum in tellus.
                </div>
                <div className="text">
                  Sit convallis rhoncus dolor purus amet orci urna. Lobortis
                  vulputate vestibulum consectetur donec ipsum egestas velit
                  laoreet justo. Eu dignissim egestas egestas ipsum. Sit est
                  nunc pellentesque at a aliquam ultrices consequat. Velit duis
                  velit nec amet eget eu morbi. Libero non diam sit viverra
                  dignissim. Aliquam tincidunt in cursus euismod enim.
                </div>
                <div className="text">
                  Magna odio sed ornare ultrices. Id lectus mi amet sit at sit
                  arcu mi nisl. Mauris egestas arcu mauris.
                </div> */}
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
                className={`exp-block  galleryItem ${item.className} ${item.type === "image" ? "hasOverlay" : ""
                  }`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {item.type === "text" ? (
                  <div className="inner-box">
                    <div className="exp-box">
                      <h2 className="title">{item.title}</h2>
                      {/* ===== 22/4/26 Maira Edit START ===== */}
                      <div className="text">Years Active</div>
                      {/* ===== 22/4/26 Maira Edit END ===== */}
                      {/* <div className="text">Years in Business</div> */}
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
