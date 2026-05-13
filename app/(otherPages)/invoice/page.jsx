import Invoice from "@/components/otherPages/Invoice";
import React from "react";

export const metadata = {
  title: "Invoice || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function InvoicePage() {
  return (
    <div className="wrapper-invoice">
      <Invoice />
    </div>
  );
}
