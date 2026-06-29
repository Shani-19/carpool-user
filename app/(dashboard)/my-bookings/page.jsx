import MyBookings from "@/components/dashboard/MyBookings";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "Manage Your Bookings",
  description: "View and manage all your vehicle bookings, track their status, and stay updated throughout the booking process.",
};

export default function MyBookingsPage() {
  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <MyBookings />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
