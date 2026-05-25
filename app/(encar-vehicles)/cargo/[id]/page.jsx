import React from "react";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import EncarSingle from "@/components/carSingles/EncarSingle";
import { getEncarVehicleDetail, normalizeEncarDetail } from "@/utils/vehicles/encarAPI";

export async function generateMetadata({ params }) {
  const { id } = params;
  if (!id) return { title: "Vehicle Not Found" };

  const detailData = await getEncarVehicleDetail(id);
  const carItem = normalizeEncarDetail(detailData);
  
  if (!carItem) {
    return {
      title: "Vehicle Not Found",
    };
  }
  
  const ogTitle = `${carItem.name} - CarPool Korea`;
  const ogDesc = carItem.description || `Explore this ${carItem.make_name} ${carItem.model_name} at CarPool Korea.`;
  const mainImg = carItem.main_image || "/images/resource/inventory1-6.png";

  return {
    title: ogTitle,
    description: ogDesc,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: [
        {
          url: mainImg,
          width: 800,
          height: 600,
          alt: carItem.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [mainImg],
    },
  };
}

export default async function EncarDetailPage({ params }) {
  const { id } = params;
  let carItem = null;

  if (id) {
    try {
      const detailData = await getEncarVehicleDetail(id);
      if (detailData) {
        carItem = normalizeEncarDetail(detailData);
      }
    } catch (error) {
      console.error("Error fetching Encar detail:", error);
    }
  }

  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />

      {carItem ? (
        <EncarSingle carItem={carItem} />
      ) : (
        <div className="container text-center py-5" style={{ minHeight: "60vh" }}>
          <h3 className="mt-5 pt-5">Vehicle Not Found</h3>
          <p>We couldn't find this vehicle you're looking for.</p>
        </div>
      )}

      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
