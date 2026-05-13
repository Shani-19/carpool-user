import EncarListings from "@/components/vehicleListings/EnCarListing/EncarListings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Search domestic vehicles - Carpool Korea",
  description:
    "Browse domestic vehicles. Carpool Korea is the safest & cheapest way to buy used cars from Korea.",
};

export default function OtherListingsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <EncarListings />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
