import Listings from "@/components/vehicleListings/common/Listings";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Search used cars from Korea",
  description:
    "Korean used cars for sale. Carpool Korea is the safest & cheapest way to buy used cars from Korea.",

  alternates: {
    canonical: "/cars",
  },

  openGraph: {
    title: "Search used cars from Korea",
    description:
      "Korean used cars for sale. Carpool Korea is the safest & cheapest way to buy used cars from Korea.",
    url: "/cars",
    type: "website",
    images: [
      {
        url: "/assets/picture/home_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Carpool Korea - Korean used cars",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Search used cars from Korea",
    description:
      "Korean used cars for sale. Carpool Korea is the safest & cheapest way to buy used cars from Korea.",
    images: ["/assets/picture/home_banner.jpg"],
  },
};

export default function InventorySidebarRowsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Listings endpoint="cars" breadcrumbTitle="Cars for Sale" heading="Browse Cars" />
      </React.Suspense>
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
