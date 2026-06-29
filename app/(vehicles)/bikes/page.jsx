import Listings from "@/components/vehicleListings/common/Listings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Bikes Available Stock",
  description: "Bikes Available Stock Bus Template",
};
export default function InventorySidebarRowsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings endpoint="bikes" breadcrumbTitle="Bikes for Sale" heading="Browse Bikes" />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
