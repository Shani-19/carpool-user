import Header from "@/components/headers/Header";
import Footer1 from "@/components/footers/Footer1";
import AllMakers from "@/components/otherPages/AllMakers";

export const metadata = {
  title: "Brands | Carpool Korea",
  description: "Browse all premium car brands available on Carpool Korea. Buy directly from South Korea.",
};

export default function BrandsPage() {
  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <AllMakers />
      <Footer1 />
    </>
  );
}
