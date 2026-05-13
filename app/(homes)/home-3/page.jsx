import Header2 from "@/components/headers/Header2";
import Cta from "@/components/common/Cta";
import Cars from "@/components/homes/home-3/Cars";
import Hero from "@/components/homes/home-3/Hero";
import React from "react";
import Features from "@/components/homes/home-3/Features";
import Cars2 from "@/components/homes/home-3/Cars2";
import Testimonials from "@/components/homes/home-3/Testimonials";
import Brands from "@/components/homes/home-3/Brands";
import Features2 from "@/components/homes/home-3/Features2";
import Facts from "@/components/homes/home-1/Facts";
import Blogs from "@/components/homes/home-3/Blogs";
import FooterBanner from "@/components/homes/home-3/FooterBanner";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: "Home 3 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function HomePage3() {
  return (
    <>
      <Header2 />
      <div id="nav-mobile"></div>
      <Hero />
      <Cars />
      <Cta />
      <Features />
      <Cars2 />
      <Testimonials />
      <Brands />
      <Features2 />
      <Facts />
      <Blogs />
      <FooterBanner />
      <Footer1 parentClass="boxcar-footer footer-style-one" />
    </>
  );
}
