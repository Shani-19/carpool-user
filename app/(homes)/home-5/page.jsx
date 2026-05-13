import Cta from "@/components/common/Cta";
import Header1 from "@/components/headers/Header1";
import Features from "@/components/homes/home-5/Features";
import Brands from "@/components/homes/home-5/Brands";
import Cars from "@/components/homes/home-5/Cars";
import Hero from "@/components/homes/home-5/Hero";
import React from "react";
import Cars2 from "@/components/homes/home-5/Cars2";
import Inspiration from "@/components/homes/home-2/Inspiration";
import Testimonials from "@/components/homes/home-5/Testimonials";
import Team from "@/components/homes/home-5/Team";
import Blogs from "@/components/homes/home-4/Blogs";
import Brands2 from "@/components/homes/home-5/Brands2";
import Footer3 from "@/components/footers/Footer3";

export const metadata = {
  title: "Home 5 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function HomePage5() {
  return (
    <>
      <Header1 headerClass="boxcar-header hheader-style-v4 five" white />
      <Hero />
      <Brands />
      <Cta />
      <Cars />
      <Features />
      <Cars2 />
      <Inspiration />
      <Testimonials />
      <Team />
      <Blogs />
      <Brands2 />
      <Footer3 />
    </>
  );
}
