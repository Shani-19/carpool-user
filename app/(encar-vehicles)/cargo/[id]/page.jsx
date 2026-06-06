import React from "react";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import EncarSingle from "@/components/carSingles/EncarSingle";
import { getEncarVehicleDetail, normalizeEncarDetailAsync } from "@/utils/vehicles/encarAPI";

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
  const { id } = params;
  if (!id) return { title: "Vehicle Not Found" };

  const detailData = await getEncarVehicleDetail(id);
  const carItem = await normalizeEncarDetailAsync(detailData);
  
  if (!carItem) {
    return {
      title: "Vehicle Not Found",
    };
  }
  
  const ogTitle = `${carItem.name} - CarPool Korea`;
  const baseDesc = carItem.description || `Explore this ${carItem.make_name} ${carItem.model_name} at CarPool Korea.`;
  const ogDesc = getMetaDescription(carItem, baseDesc);
  const featuredPhoto = carItem.photos &&
    (carItem.photos.find(p => p.code === '001') || carItem.photos[0]);
  const rawImage = (featuredPhoto && featuredPhoto.path) || "/images/resource/inventory1-6.png";
  const mainImg = rawImage.startsWith('http') || rawImage.startsWith('/')
    ? rawImage
    : `https://ci.encar.com${rawImage}`;

  return {
    title: ogTitle,
    description: ogDesc,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: [
        {
          url: mainImg,
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
        carItem = await normalizeEncarDetailAsync(detailData);
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
