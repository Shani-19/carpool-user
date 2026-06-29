import Listings from "@/components/vehicleListings/common/Listings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Parts Available Stock",
  description: "Parts Available Stock Template",
};
export default function InventorySidebarRowsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Listings endpoint="parts" breadcrumbTitle="Parts for Sale" heading="Browse Parts" />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
