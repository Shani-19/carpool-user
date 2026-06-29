import React from "react";
import LineChart from "./Charts";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
const listingItems = [
  {
    label: "My Inspection",
    value: "43,279",
    imgSrc: "/images/icons/cart2.svg",
    imgWidth: 34,
    imgHeight: 34,
    iconClass: "",
  },
  {
    label: "My Orders",
    value: "19",
    imgSrc: "/images/icons/cart1.svg",
    imgWidth: 28,
    imgHeight: 28,
    iconClass: "v2",
  },
  {
    label: "Reserved Vehicles",
    value: "15",
    imgSrc: "/images/icons/cart3.svg",
    imgWidth: 30,
    imgHeight: 30,
    iconClass: "v3",
  },
  {
    label: "Favorites Vehicles",
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
                Manage your inspections, bookings, orders, favorites, and track your vehicle purchases all in one place.
              </div>
            </div>
            <div className="row">
              {listingItems.map((item, index) => (
                <div className="col-xl-3 col-lg-12" key={index}>
                  <div className="uii-item">
                    <span>{item.label}</span>
                    <h3>{item.value}</h3>
                    <div className={`ui-icon`}>
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
              <div className="widget-graph">
                <div className="graph-head">
                  <h3>Orders Overview</h3>
                  <div className="text-box">
                    {/* <div className="form_boxes v3">
                      <small>Select Cars</small>

                      <SelectComponent
                        options={["Audi A3", "Audi A3", "Audi A3"]}
                      />
                    </div>*/}
                    <div className="form_boxes v3">
                      <small>Months</small>

                      <SelectComponent
                        options={["3 Months", "6 Months", "12 Months", "All"]}
                      />
                    </div>
                  </div>
                </div>
                <div className="widget-content">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
