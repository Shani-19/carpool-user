import Image from "next/image";
import React from "react";
const vehicleDetails = [
  {
    icon: "/images/resource/insep1-1.svg",
    label: "Body",
    value: "SUV",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-2.svg",
    label: "Mileage",
    value: "28,000 miles",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-3.svg",
    label: "Fuel Type",
    value: "Petrol",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-4.svg",
    label: "Year",
    value: "2023",
    width: 16,
    height: 16,
  },
  {
    icon: "/images/resource/insep1-5.svg",
    label: "Transmission",
    value: "Automatics",
    width: 16,
    height: 16,
  },
  {
    icon: "/images/resource/insep1-6.svg",
    label: "Drive Type",
    value: "Front Wheel Drive",
    width: 18,
    height: 18,
  },
];

const vehicleAdditionalDetails = [
  {
    icon: "/images/resource/insep1-7.svg",
    label: "Condition",
    value: "Used",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-8.svg",
    label: "Engine Size",
    value: "4.8L",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-9.svg",
    label: "Doors",
    value: "5-door",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-10.svg",
    label: "Cylinders",
    value: "6",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-11.svg",
    label: "Color",
    value: "Blue",
    width: 18,
    height: 18,
  },
  {
    icon: "/images/resource/insep1-12.svg",
    label: "VIN",
    value: "ZN682AVA2P7429564",
    width: 18,
    height: 18,
  },
];

export default function Overview() {
  return (
    <>
      <h4 className="title">Car Overview</h4>
      <div className="row">
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <Image
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleAdditionalDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <Image
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
