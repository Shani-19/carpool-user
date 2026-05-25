import Quotation from "@/components/dashboard/Quotation";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "Encar Quotation | Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};

export default function QuotationPage() {
  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />
        <Quotation />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
