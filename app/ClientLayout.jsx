"use client";

import FilterSidebar from "@/components/common/FilterSidebar";
import "../public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import BackToTop from "@/components/common/BackToTop";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.esm").catch(() => { });
    try {
      const { WOW } = require("wowjs");
      new WOW({ mobile: false, live: false }).init();
    } catch (e) { }
  }, [pathname]);

  return (
    <Context>
      <CurrencyProvider>
        <MobileMenu />
        <div className="boxcar-wrapper">
          <AuthProvider>{children}</AuthProvider>
        </div>
        <FilterSidebar />
        <BackToTop />
      </CurrencyProvider>
    </Context>
  );
}
