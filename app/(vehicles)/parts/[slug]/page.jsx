import React from "react";
import SinglePart from "@/components/partSingles/SinglePart";
import RelatedParts from "@/components/partSingles/RelatedParts";
import { getVehicleBySlug, getVehicles, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const dynamic = "force-dynamic";

const getDynamicDescription = (part, html = true) => {
  if (!part) return "";
  const p1 = `This ${part.year || ""} ${part.make_name || ""} ${part.model_name || ""} is a reliable ${part.category || "part"} designed for performance and safety.`;
  const p2 = `The exterior is finished in ${part.color || "its original color"}. Whether for commercial or private use, this ${part.make_name || ""} part provides the durability required for long-term service.`;
  return html ? `${p1}<br/><br/>${p2}` : `${p1} ${p2}`;
};

const getMetaDescription = (car, baseDesc) => {
  if (!car) return "";
  const specs = [];
  if (car.vin) specs.push(`VIN: ${car.vin}`);
  const vehicleNo = car.plate_no || car.vehicle_no;
  if (vehicleNo) specs.push(`Part No: ${vehicleNo}`);
  if (car.vehicle_type || car.category) specs.push(`Type: ${car.vehicle_type || car.category}`);
  if (car.color) specs.push(`Color: ${car.color}`);

  const tags = [];
  const status = car.status === 'sale' ? 'Used' : (car.status || 'Used');
  tags.push(status);

  const specStr = specs.join(', ');
  const tagStr = tags.length > 0 ? `(${tags.join(', ')})` : '';

  return [tagStr, specStr, baseDesc].filter(Boolean).join(' | ');
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const partRes = await getVehicleBySlug(slug, "parts");
  const rawPart = partRes?.data?.part || partRes?.part || partRes?.data || partRes;
  const part = rawPart && (rawPart.id || rawPart.slug || rawPart.name) ? normalizeVehicle(rawPart, "parts") : null;

  if (!part) return { title: "Part Not Found | Carpool Korea" };

  const baseDesc = part.description || getDynamicDescription(part, false);
  const description = getMetaDescription(part, baseDesc);
  const rawImage = part.main_image || (part.images && part.images[0]) || "/images/resource/inventory1-6.png";
  const imageUrl = rawImage.startsWith('http') || rawImage.startsWith('/')
    ? rawImage
    : `${process.env.NEXT_PUBLIC_PARTS_IMG_SRC_S3 || 'https://media.carpoolkr.com/assets/part/parts'}${rawImage}`;

  return {
    title: `${part.name} | Carpool Korea`,
    description,
    openGraph: {
      title: `${part.name} | Carpool Korea`,
      description,
      images: [
        {
          url: imageUrl,
          alt: part.name,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${part.name} | Carpool Korea`,
      description,
      images: [imageUrl],
    }
  };
}

export default async function PartDetailPage({ params }) {
  const { slug } = params;

  // 1. Fetch Part Detail
  const partRes = await getVehicleBySlug(slug, "parts");
  const rawPart = partRes?.data?.part || partRes?.data || partRes;
  const relatedParts = partRes?.data?.related || [];

  const partItem = rawPart && (rawPart.id || rawPart.slug || rawPart.name) ? normalizeVehicle(rawPart, "parts") : null;

  if (partItem && !partItem.description) {
    partItem.description = getDynamicDescription(partItem);
  }

  if (!partItem) {
    return (
      <>
        <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
        <section className="inventory-section pb-0 layout-radius">
          <div className="boxcar-container">
            <div className="py-5 text-center">
              <h2>Part not found</h2>
              <p>The part you are looking for does not exist or has been sold.</p>
            </div>
          </div>
        </section>
        <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
      </>
    );
  }

  return (
    <div className="main-wrapper">
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <SinglePart PartItem={partItem} relatedParts={relatedParts} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </div>
  );
}
