import BalanceSheet from "@/components/dashboard/BalanceSheet";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "Balance Sheet || Carpool Korea",
  description: "Carpool - Carpool Korea",
};

export default function BalanceSheetPage() {
  return (
    <>
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <BalanceSheet />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
