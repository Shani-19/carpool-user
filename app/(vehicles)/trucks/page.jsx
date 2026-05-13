import Listings from "@/components/vehicleListings/common/Listings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Truck Available Stock",
  description: "Truck Available Stock Truck Template",
};
export default function InventorySidebarRowsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings endpoint="trucks" breadcrumbTitle="Trucks for Sale" heading="Browse Trucks" />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
