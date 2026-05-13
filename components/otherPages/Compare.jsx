import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Compare() {
  return (
    <section className="compare-section layout-radius">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="boxcar-title-three wow fadeInUp">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>Compare Vehicle</h2>
          </div>
        </div>
        <div className="compare-products">
          <table>
            <thead>
              <tr>
                <th className="box-empty" />
                <th>
                  <div className="compare-product-img">
                    <Image
                      alt=""
                      width={329}
                      height={230}
                      src="/images/resource/compare1.jpg"
                    />
                    <a href="#" title="" className="remove-pro">
                      <Image
                        alt=""
                        width={18}
                        height={18}
                        src="/images/icons/remove.svg"
                      />
                    </a>
                  </div>
                </th>
                <th>
                  <div className="compare-product-img">
                    <Image
                      alt=""
                      width={329}
                      height={230}
                      src="/images/resource/compare2.jpg"
                    />
                    <a href="#" title="" className="remove-pro">
                      <Image
                        alt=""
                        width={18}
                        height={18}
                        src="/images/icons/remove.svg"
                      />
                    </a>
                  </div>
                </th>
                <th>
                  <div className="compare-product-img">
                    <Image
                      alt=""
                      width={329}
                      height={230}
                      src="/images/resource/compare3.jpg"
                    />
                    <a href="#" title="" className="remove-pro">
                      <Image
                        alt=""
                        width={18}
                        height={18}
                        src="/images/icons/remove.svg"
                      />
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="wrap-body-compare">
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv1.svg"
                  />
                  Body
                </th>
                <td>SUV</td>
                <td>SUV</td>
                <td>SUV</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv2.svg"
                  />
                  Mileage
                </th>
                <td>28.000 miles</td>
                <td>28.000 miles</td>
                <td>28.000 miles</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv3.svg"
                  />
                  Fuel Type
                </th>
                <td>Petrol</td>
                <td>Petrol</td>
                <td>Petrol</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={16}
                    height={16}
                    src="/images/icons/cv4.svg"
                  />
                  Year
                </th>
                <td>2023</td>
                <td>2023</td>
                <td>2023</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={16}
                    height={16}
                    src="/images/icons/cv5.svg"
                  />
                  Transmission
                </th>
                <td>Automatics</td>
                <td>Automatics</td>
                <td>Automatics</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv6.svg"
                  />
                  Drive Type
                </th>
                <td>Front Wheel Drive</td>
                <td>Front Wheel Drive</td>
                <td>Front Wheel Drive</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv7.svg"
                  />
                  Condition
                </th>
                <td>Used</td>
                <td>Used</td>
                <td>Used</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv8.svg"
                  />
                  Engine Size
                </th>
                <td>4.8L</td>
                <td>4.8L</td>
                <td>4.8L</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv9.svg"
                  />
                  Doors
                </th>
                <td>5-door</td>
                <td>5-door</td>
                <td>5-door</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv10.svg"
                  />
                  Cylinders
                </th>
                <td>5-door</td>
                <td>5-door</td>
                <td>5-door</td>
              </tr>
              <tr>
                <th>
                  <Image
                    alt=""
                    width={18}
                    height={18}
                    src="/images/icons/cv11.svg"
                  />
                  Color
                </th>
                <td>Blue</td>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/*compare-products end*/}
      </div>
    </section>
  );
}
