import InspectClient from "@/components/inspect/InspectClient";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const metadata = {
  title: "Book Vehicle || Carpool Korea",
  description: "Book a vehicle or request an inspection",
};

export default function BookPage({ params, searchParams }) {
  const { slug } = params;
  const stock = searchParams?.stock;

  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <InspectClient carId={slug} stock={stock} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
