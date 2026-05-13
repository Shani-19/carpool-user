import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/home-2/Banner";
import Brands from "@/components/homes/home-2/Brands";
import Brands2 from "@/components/homes/home-2/Brands2";
import Cars from "@/components/homes/home-2/Cars";
import Cars2 from "@/components/homes/home-2/Cars2";
import Cta from "@/components/homes/home-2/Cta";
import Features from "@/components/homes/home-2/Features";
import Hero from "@/components/homes/home-2/Hero";
import Inspiration from "@/components/homes/home-2/Inspiration";
import Service from "@/components/homes/home-2/Service";
import Team from "@/components/homes/home-2/Team";
import Testimonials from "@/components/homes/home-2/Testimonials";
import React from "react";

export const metadata = {
  title: "Home 2 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function HomePage2() {
  return (
    <>
      <Header1 headerClass="header-style-v1 style-two" />
      <Hero />
      <Brands />
      <Cars />
      <Cta />
      <Features />
      <Cars2 />
      <Testimonials />
      <Team />
      <Inspiration />
      <Service />
      <Brands2 />
      <Banner />
      <Footer1 parentClass="boxcar-footer footer-style-two" />
    </>
  );
}
