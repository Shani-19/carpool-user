import Cta from "@/components/common/Cta";
import Footer4 from "@/components/footers/Footer4";
import Header3 from "@/components/headers/Header3";
import Header7 from "@/components/headers/Header7";
import Brands from "@/components/homes/home-1/Brands";
import Facts from "@/components/homes/home-1/Facts";
import Banner from "@/components/homes/home-10/Banner";
import Cars from "@/components/homes/home-10/Cars";
import Cars2 from "@/components/homes/home-10/Cars2";
import CarsCategories from "@/components/homes/home-10/CarsCategories";
import Features from "@/components/homes/home-10/Features";
import Hero from "@/components/homes/home-10/Hero";
import Blogs from "@/components/homes/home-3/Blogs";
import Testimonials from "@/components/homes/home-10/Testimonials";
import Banner2 from "@/components/homes/home-9/Banner2";
import React from "react";

export const metadata = {
  title: "Home 10 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function HomePage10() {
  return (
    <>
      <Header7 />
      <Hero />
      <CarsCategories />
      <Features />
      <Cars />
      <Cta />
      <Cars2 />
      <Banner />
      <Facts />
      <Cars2 />
      <Testimonials />
      <Blogs />
      <Brands />
      <Banner2 />
      <Footer4 />
    </>
  );
}
