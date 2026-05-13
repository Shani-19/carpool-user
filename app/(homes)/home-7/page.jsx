import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Facts from "@/components/homes/home-1/Facts";
import Blogs from "@/components/homes/home-4/Blogs";
import Brands from "@/components/homes/home-7/Brands";
import Calculator from "@/components/homes/home-7/Calculator";
import Cars from "@/components/homes/home-7/Cars";
import CarTypes from "@/components/homes/home-7/CarTypes";
import Features from "@/components/homes/home-7/Features";
import Features2 from "@/components/homes/home-7/Features2";
import Hero from "@/components/homes/home-7/Hero";
import HomeFilter from "@/components/homes/home-7/HomeFilter";
import Services from "@/components/homes/home-7/Services";
import Testimonials from "@/components/homes/home-7/Testimonials";
import React from "react";

export const metadata = {
  title: "Home 7 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function HomePage7() {
  return (
    <>
      <Header4 />
      <Hero />
      <HomeFilter />
      <CarTypes />
      <Features />
      <Cars />
      <Features2 />
      <Facts />
      <Testimonials />
      <Calculator />
      <Services />
      <Brands />
      <Blogs />
      <Footer1 parentClass="boxcar-footer footer-style-one cus-footer" />
    </>
  );
}
