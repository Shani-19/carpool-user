import BookingDetailPage from "@/components/dashboard/bookingDetails/BookingDetailPage";
import MyBookings from "@/components/dashboard/MyBookings";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "My Booking List || Carpool Korea",
  description: "Carpool - Carpool Korea",
};

export default function MyBookingsPage() {
  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <BookingDetailPage />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
