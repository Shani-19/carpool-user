import MyReserved from "@/components/dashboard/MyReserved";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "Reserved Vehicles || Carpool Korea",
  description: "View all vehicles you have reserved through Carpool Korea.",
};

export default function MyReservedPage() {
  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />
        <MyReserved />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
