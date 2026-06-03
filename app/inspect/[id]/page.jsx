import InspectClient from "@/components/inspect/InspectClient";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const metadata = {
  title: "Inspect Vehicle || Carpool Korea",
  description: "Inspect vehicle details and book now",
};

export default function InspectPage({ params, searchParams }) {
  const { id } = params;
  const stock = searchParams?.stock;

  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <InspectClient carId={id} stock={stock} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
