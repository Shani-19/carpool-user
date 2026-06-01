import SingleTruck from "@/components/truckSingles/SingleTruck";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import { getVehicleBySlug, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import React from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getDynamicDescription = (truck, html = true) => {
  if (!truck) return "";
  const p1 = `This ${truck.year || ""} ${truck.make_name || ""} ${truck.model_name || ""} is a heavy-duty ${truck.vehicle_type || "truck"} built for performance and durability. Featuring a ${truck.fuel_type || ""} engine and ${truck.transmission || ""} transmission, it is designed to handle demanding tasks with ease. With ${truck.odometer ? truck.odometer.toLocaleString() : "0"} km on the odometer, this truck has been well-maintained and offers excellent value for industrial or commercial use.`;

  const p2 = `The exterior is finished in ${truck.color || "its original color"}, and it comes equipped with ${truck.axle_type || "standard"} axles and a ${truck.cabin_type || "spacious"} cabin. Whether you're transporting heavy loads or operating in tough conditions, this ${truck.make_name || ""} ${truck.model_name || ""} provides the reliability and power you need. It represents a top-tier choice in the Korean commercial vehicle market.`;

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
  const res = await getVehicleBySlug(slug, "trucks");
  const rawTruck = res?.data?.truck || res?.truck || res?.data || res;
  const truck = rawTruck && (rawTruck.id || rawTruck.slug || rawTruck.name) ? normalizeVehicle(rawTruck, "trucks") : null;

  if (!truck) {
    return {
      title: "Truck Not Found | Carpool Korea",
    };
  }

  const baseDesc = truck.comment || getDynamicDescription(truck, false);
  const description = getMetaDescription(truck, baseDesc);
  const rawImage = truck.main_image || (truck.images && truck.images[0]) || "/images/resource/inventory1-6.png";
  const imageUrl = rawImage.startsWith('http') || rawImage.startsWith('/')
    ? rawImage
    : `${process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_S3 || 'https://media.carpoolkr.com/assets/car/cars'}${rawImage}`;

  return {
    title: `${truck.name} | Carpool Korea`,
    description,
    openGraph: {
      title: `${truck.name} | Carpool Korea`,
      description,
      images: [
        {
          url: imageUrl,
          alt: truck.name,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${truck.name} | Carpool Korea`,
      description,
      images: [imageUrl],
    }
  };
}

export default async function TruckDetailPage({ params }) {
  const { slug } = params;
  console.log(`Fetching truck for slug: ${slug}`);
  const res = await getVehicleBySlug(slug, "trucks");
  const rawTruck = res?.data?.truck || res?.truck || res?.data || res;
  const truck = rawTruck && (rawTruck.id || rawTruck.slug || rawTruck.name) ? normalizeVehicle(rawTruck, "trucks") : null;
  const relatedTrucks = res?.data?.related || [];

  if (truck && !truck.description) {
    truck.description = getDynamicDescription(truck);
  }

  if (!truck) {
    return (
      <>
        <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
        <section className="inventory-section pb-0 layout-radius">
          <div className="boxcar-container">
            <div className="py-5 text-center">
              <h2>Truck not found</h2>
              <p>The vehicle you are looking for does not exist or has been sold.</p>
            </div>
          </div>
        </section>
        <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
      </>
    );
  }

  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <SingleTruck truckItem={truck} relatedTrucks={relatedTrucks} />
      <Footer parentClass="boxcar-footer footer-style-one v1_cus-st-1" />
    </>
  );
}
