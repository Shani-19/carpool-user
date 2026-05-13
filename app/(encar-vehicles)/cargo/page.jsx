import EncarListings from "@/components/vehicleListings/EnCarListing/EncarListings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Search cargo vehicles - Carpool Korea",
  description:
    "Browse cargo vehicles. Carpool Korea is the safest & cheapest way to buy used vehicles from Korea.",
};

export default function EncarCargoPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <EncarListings category="truck" />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
