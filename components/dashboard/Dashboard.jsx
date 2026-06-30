"use client";
import React, { useEffect, useState } from "react";
import LineChart from "./Charts";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Link from "next/link";
import SelectComponent from "../common/SelectComponent";
import { dashboardAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { getFavourites } from "@/utils/favourites";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();

  const [data, setData] = useState({
    inspections: 0,
    orders: 0,
    reserved: 0,
    graph: {}
  });
  const [period, setPeriod] = useState(3);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    if (user && !authLoading) {
      fetchDashboardData(period);
    }

    // Fetch favorites count from local storage
    const carpoolFavs = getFavourites('carpool').length;
    const encarFavs = getFavourites('encar').length;
    setFavoriteCount(carpoolFavs + encarFavs);
  }, [user, authLoading, period]);

  const fetchDashboardData = async (selectedPeriod) => {
    try {
      const res = await dashboardAPI.getDashboardData(selectedPeriod);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  const listingItems = [
    {
      label: "My Inspection",
      value: data.inspections.toLocaleString(),
      imgSrc: "/images/icons/cart2.svg",
      imgWidth: 34,
      imgHeight: 34,
      iconClass: "",
      link: "/inspection",
    },
    {
      label: "My Orders",
      value: data.orders.toLocaleString(),
      imgSrc: "/images/icons/cart1.svg",
      imgWidth: 28,
      imgHeight: 28,
      iconClass: "v2",
      link: "/my-orders",
    },
    {
      label: "Reserved Vehicles",
      value: data.reserved.toLocaleString(),
      imgSrc: "/images/icons/cart3.svg",
      imgWidth: 30,
      imgHeight: 30,
      iconClass: "v3",
      link: "/my-reserved",
    },
    {
      label: "Favorites Vehicles",
      value: favoriteCount.toLocaleString(),
      imgSrc: "/images/icons/cart4.svg",
      imgWidth: 24,
      imgHeight: 24,
      iconClass: "v4",
      link: "/favorite",
    },
  ];

  const handlePeriodChange = (option) => {
    if (option === "3 Months") setPeriod(3);
    else if (option === "6 Months") setPeriod(6);
    else if (option === "12 Months") setPeriod(12);
    else if (option === "All") setPeriod("all");
  };

  const graphLabels = Object.keys(data.graph || {});
  const graphValues = Object.values(data.graph || {});
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
                  <Link href={item.link} className="uii-item p-4" style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
                  </Link>
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
                        onChange={handlePeriodChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="widget-content">
                  <LineChart labels={graphLabels} dataValues={graphValues} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
