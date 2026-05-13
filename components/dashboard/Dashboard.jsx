import React from "react";
import LineChart from "./Charts";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
const listingItems = [
  {
    label: "My Listings",
    value: "43,279",
    imgSrc: "/images/icons/cart1.svg",
    imgWidth: 34,
    imgHeight: 34,
    iconClass: "",
  },
  {
    label: "Total Saved Search",
    value: "19",
    imgSrc: "/images/icons/cart2.svg",
    imgWidth: 28,
    imgHeight: 28,
    iconClass: "v2",
  },
  {
    label: "Messages",
    value: "15",
    imgSrc: "/images/icons/cart3.svg",
    imgWidth: 30,
    imgHeight: 30,
    iconClass: "v3",
  },
  {
    label: "My Favorites",
    value: "22,786",
    imgSrc: "/images/icons/cart4.svg",
    imgWidth: 24,
    imgHeight: 24,
    iconClass: "v4",
  },
];
export default function Dashboard() {
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Dashboard</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="row">
              {listingItems.map((item, index) => (
                <div className="col-xl-3 col-lg-12" key={index}>
                  <div className="uii-item">
                    <span>{item.label}</span>
                    <h3>{item.value}</h3>
                    <div className={`ui-icon ${item.iconClass}`}>
                      <Image
                        alt={item.label}
                        width={item.imgWidth}
                        height={item.imgHeight}
                        src={item.imgSrc}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="graph-content">
              <div className="row">
                <div className="col-xl-8">
                  <div className="widget-graph">
                    <div className="graph-head">
                      <h3>Car Page Views</h3>
                      <div className="text-box">
                        <div className="form_boxes v3">
                          <small>Select Cars</small>

                          <SelectComponent
                            options={["Audi A3", "Audi A3", "Audi A3"]}
                          />
                        </div>
                        <div className="form_boxes v3">
                          <small>Date</small>

                          <SelectComponent
                            options={["15 days", "15 days", "15 days"]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="widget-content">
                      <LineChart />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="notification-widget ls-widget">
                    <div className="widget-title">
                      <h4>Notifications</h4>
                    </div>
                    <div className="widget-content">
                      <ul className="notification-list">
                        <li>
                          <span className="icon">
                            <Image
                              alt=""
                              width={20}
                              height={20}
                              src="/images/icons/lob1.svg"
                            />
                          </span>
                          <strong>Wade Warren</strong> applied for a job
                          <span className="colored">Web Developer</span>
                        </li>
                        <li>
                          <span className="icon">
                            <Image
                              alt=""
                              width={18}
                              height={18}
                              src="/images/icons/lob2.svg"
                            />
                          </span>
                          <strong>Henry Wilson</strong> applied for a job
                          <span className="colored">
                            Senior Product Designer
                          </span>
                        </li>
                        <li className="success">
                          <span className="icon">
                            <Image
                              alt=""
                              width={16}
                              height={16}
                              src="/images/icons/lob3.svg"
                            />
                          </span>
                          <strong>Raul Costa</strong> applied for a job
                          <span className="colored">Product Manager, Risk</span>
                        </li>
                        <li>
                          <span className="icon">
                            <Image
                              alt=""
                              width={20}
                              height={20}
                              src="/images/icons/lob1.svg"
                            />
                          </span>
                          <strong>Jack Milk</strong> applied for a job
                          <span className="colored">Technical Architect</span>
                        </li>
                        <li className="success">
                          <span className="icon">
                            <Image
                              alt=""
                              width={18}
                              height={18}
                              src="/images/icons/lob2.svg"
                            />
                          </span>
                          <strong>Michel Arian</strong> applied for a job
                          <span className="colored">Software Engineer</span>
                        </li>
                        <li>
                          <span className="icon">
                            <Image
                              alt=""
                              width={16}
                              height={16}
                              src="/images/icons/lob3.svg"
                            />
                          </span>
                          <strong>Ali Tufan</strong> applied for a job
                          <span className="colored">UI Designer</span>
                        </li>
                      </ul>
                    </div>
                    <div className="dash-btn-box">
                      <a href="#" className="dash-btn">
                        View More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_634_2156)">
                            <path
                              d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_634_2156">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
