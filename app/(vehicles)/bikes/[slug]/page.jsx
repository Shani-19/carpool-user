import React from "react";
import SingleBike from "@/components/bikeSingles/SingleBike";
import RelatedBikes from "@/components/bikeSingles/RelatedBikes";
import { getVehicleBySlug, getVehicles, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const dynamic = "force-dynamic";

const getDynamicDescription = (bike, html = true) => {
  if (!bike) return "";
  const p1 = `This ${bike.year || ""} ${bike.make_name || ""} ${bike.model_name || ""} is a reliable ${bike.category || "bike"} designed for performance and safety. Featuring a ${bike.fuel_type || ""} engine with a volume of ${bike.engine_volume ? bike.engine_volume + "cc" : "N/A"}, it is built to handle professional transport needs with ease. With ${bike.odometer ? bike.odometer.toLocaleString() : "0"} km on the odometer, this vehicle has been well-maintained.`;
  const p2 = `The exterior is finished in ${bike.color || "its original color"}, and it offers a seating capacity for ${bike.passenger || "multiple"} passengers. Whether for commercial or private use, this ${bike.make_name || ""} bike provides the durability and comfort required for long-term service.`;
  return html ? `${p1}<br/><br/>${p2}` : `${p1} ${p2}`;
};

const getMetaDescription = (car, baseDesc) => {
  if (!car) return "";
  const specs = [];
  if (car.vin) specs.push(`VIN: ${car.vin}`);
  const vehicleNo = car.plate_no || car.vehicle_no;
  if (vehicleNo) specs.push(`Vehicle No: ${vehicleNo}`);
  if (car.vehicle_type || car.category) specs.push(`Type: ${car.vehicle_type || car.category}`);
  if (car.engine_volume) specs.push(`Engine: ${car.engine_volume}${typeof car.engine_volume === 'number' || !car.engine_volume.toString().toLowerCase().includes('cc') ? 'cc' : ''}`);
  if (car.transmission || car.transmission_type) specs.push(`Transmission: ${car.transmission || car.transmission_type}`);
  if (car.odometer || car.mileage) {
    const miles = car.odometer || car.mileage;
    specs.push(`Mileage: ${typeof miles === 'number' ? miles.toLocaleString() : miles} km`);
  }
  if (car.color) specs.push(`Color: ${car.color}`);
  if (car.drive_type) specs.push(`Drive: ${car.drive_type}`);

  const tags = [];
  const status = car.status === 'sale' ? 'Used' : (car.status || 'Used');
  tags.push(status);
  if (car.steering) tags.push(car.steering);
  if (car.fuel_type) tags.push(car.fuel_type);
  if (car.passenger) tags.push(`${car.passenger} Passengers`);

  const specStr = specs.join(', ');
  const tagStr = tags.length > 0 ? `(${tags.join(', ')})` : '';

  return [tagStr, specStr, baseDesc].filter(Boolean).join(' | ');
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const bikeRes = await getVehicleBySlug(slug, "bikes");
  const rawBike = bikeRes?.data?.bike || bikeRes?.bike || bikeRes?.data || bikeRes;
  const bike = rawBike && (rawBike.id || rawBike.slug || rawBike.name) ? normalizeVehicle(rawBike, "bikes") : null;

  if (!bike) return { title: "Bike Not Found | Carpool Korea" };

  const baseDesc = bike.description || getDynamicDescription(bike, false);
  const description = getMetaDescription(bike, baseDesc);
  const rawImage = bike.main_image || (bike.images && bike.images[0]) || "/images/resource/inventory1-6.png";
  const imageUrl = rawImage.startsWith('http') || rawImage.startsWith('/')
    ? rawImage
    : `${process.env.NEXT_PUBLIC_BIKES_IMG_SRC_S3 || 'https://media.carpoolkr.com/assets/car/cars'}${rawImage}`;

  return {
    title: `${bike.name} | Carpool Korea`,
    description,
    openGraph: {
      title: `${bike.name} | Carpool Korea`,
      description,
      images: [
        {
          url: imageUrl,
          alt: bike.name,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${bike.name} | Carpool Korea`,
      description,
      images: [imageUrl],
    }
  };
}

export default async function BikeDetailPage({ params }) {
  const { slug } = params;

  // 1. Fetch Bike Detail
  const bikeRes = await getVehicleBySlug(slug, "bikes");
  const rawBike = bikeRes?.data?.bike || bikeRes?.data || bikeRes;
  const relatedBikes = bikeRes?.data?.related || [];

  const bikeItem = rawBike && (rawBike.id || rawBike.slug || rawBike.name) ? normalizeVehicle(rawBike, "bikes") : null;

  if (bikeItem && !bikeItem.description) {
    bikeItem.description = getDynamicDescription(bikeItem);
  }

  if (!bikeItem) {
    return (
      <>
        <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
        <section className="inventory-section pb-0 layout-radius">
          <div className="boxcar-container">
            <div className="py-5 text-center">
              <h2>Bike not found</h2>
              <p>The vehicle you are looking for does not exist or has been sold.</p>
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
      <SingleBike BikeItem={bikeItem} relatedBikes={relatedBikes} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </div>
  );
}
