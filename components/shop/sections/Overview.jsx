import Image from "next/image";
import React from "react";

export default function Overview() {
  return (
    <>
      <h4 className="title">Car Overview</h4>
      <div className="row">
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-1.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Body
                </span>
                SUV
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-2.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Mileage
                </span>
                28.000 miles
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-3.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Fuel Type
                </span>
                Petrol
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-4.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                  Year
                </span>
                2023
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-5.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                  Transmission
                </span>
                Automatics
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-6.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Drive Type
                </span>
                Front Wheel Drive
              </li>
            </ul>
          </div>
        </div>
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-7.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Condition
                </span>
                Used
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-8.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Engine Size
                </span>
                4.8L
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-9.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Doors
                </span>
                5-door
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-10.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Cylinders
                </span>
                6
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-11.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Color
                </span>
                Blue
              </li>
              <li>
                <span>
                  <Image
                    src="/images/resource/insep1-12.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  VIN
                </span>
                ZN682AVA2P7429564
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
