import SingleNew from "@/components/carSingles/SingleNew";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import { getVehicleBySlug, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import React from "react";

const getDynamicDescription = (car, html = true) => {
  if (!car) return "";
  const p1 = `This ${car.year || ""} ${car.make_name || ""} ${car.model_name || ""} is a premium ${car.vehicle_type || "vehicle"} that perfectly blends style, performance, and reliability. Featuring a ${car.fuel_type || ""} engine with a displacement of ${car.engine_volume ? car.engine_volume + "cc" : "N/A"}, it delivers a smooth yet powerful driving experience through its ${car.transmission || ""} transmission. With ${car.odometer ? car.odometer.toLocaleString() : "0"} km on the odometer, this vehicle has been carefully maintained and represents an excellent choice for those seeking quality and value in a pre-owned car from Korea.`;

  const p2 = `The exterior is finished in a sleek ${car.color || "finish"}, complemented by a ${car.drive_type || ""} system that ensures stability and confidence on various terrains. Designed to accommodate ${car.passenger || ""} passengers comfortably, the interior offers a spacious cabin with modern amenities. Whether you're navigating city streets or embarking on a long-distance journey, this ${car.make_name || ""} ${car.model_name || ""} provides the comfort and safety you expect from a top-tier vehicle, making it a standout option in its category.`;

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
  const res = await getVehicleBySlug(slug, "cars");
  const rawCar = res?.data?.car || res?.car || res?.data || res;
  const car = rawCar && (rawCar.id || rawCar.slug || rawCar.name) ? normalizeVehicle(rawCar, "cars") : null;

  if (!car) {
    return {
      title: "Car Not Found | Carpool Korea",
    };
  }

  const baseDesc = car.comment || getDynamicDescription(car, false);
  const description = getMetaDescription(car, baseDesc);
  const rawImage = car.main_image || (car.images && car.images[0]) || "/images/resource/inventory1-6.png";
  const imageUrl = rawImage.startsWith('http') || rawImage.startsWith('/')
    ? rawImage
    : `${process.env.NEXT_PUBLIC_CARS_IMG_SRC_S3 || 'https://media.carpoolkr.com/assets/car/cars'}${rawImage}`;

  return {
    title: `${car.name} | Carpool Korea`,
    description,
    openGraph: {
      title: `${car.name} | Carpool Korea`,
      description,
      images: [
        {
          url: imageUrl,
          alt: car.name,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.name} | Carpool Korea`,
      description,
      images: [imageUrl],
    }
  };
}

export default async function CarDetailPage({ params }) {
  const { slug } = params;
  console.log(`Fetching car for slug: ${slug}`);
  const res = await getVehicleBySlug(slug, "cars");
  const rawCar = res?.data?.car || res?.car || res?.data || res;
  const car = rawCar && (rawCar.id || rawCar.slug || rawCar.name) ? normalizeVehicle(rawCar, "cars") : null;
  const relatedCars = res?.data?.related || [];

  if (car && !car.description) {
    car.description = getDynamicDescription(car);
  }

  if (!car) {
    return (
      <>
        <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
        <section className="inventory-section pb-0 layout-radius">
          <div className="boxcar-container">
            <div className="py-5 text-center">
              <h2>Car not found</h2>
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
      <SingleNew carItem={car} relatedCars={relatedCars} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
