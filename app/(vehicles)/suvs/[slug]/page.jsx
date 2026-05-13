import SingleNew from "@/components/carSingles/SingleNew";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import { getVehicleBySlug, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import React from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const getDynamicDescription = (car, html = true) => {
  if (!car) return "";
  const p1 = `This ${car.year || ""} ${car.make_name || ""} ${car.model_name || ""} is an excellent choice for anyone looking for a reliable ${car.vehicle_type || "SUV"}. Equipped with a ${car.fuel_type || ""} engine and ${car.transmission || ""} transmission, it offers a smooth driving experience. This vehicle has been driven ${car.odometer ? car.odometer.toLocaleString() : "0"} km and is in great condition.`;

  const p2 = `The interior is well-maintained, featuring ${car.steering || "LHD"} steering and a comfortable cabin with ${car.passenger ? `${car.passenger} seats` : "ample seating"}. Whether you're commuting in the city or going on a long trip, this ${car.make_name || ""} ${car.model_name || ""} is designed to provide safety and comfort. Don't miss out on this quality Korean used car.`;

  return html ? `${p1}<br/><br/>${p2}` : `${p1} ${p2}`;
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const res = await getVehicleBySlug(slug, "suvs");
  const rawCar = res?.data?.car || res?.car || res?.data || res;
  const car = rawCar && (rawCar.id || rawCar.slug || rawCar.name) ? normalizeVehicle(rawCar, "suvs") : null;

  if (!car) {
    return {
      title: "SUV Not Found | Carpool Korea",
    };
  }

  return {
    title: `${car.name} | Carpool Korea`,
    description: car.comment || getDynamicDescription(car, false),
  };
}

export default async function SUVDetailPage({ params }) {
  const { slug } = params;
  console.log(`Fetching SUV for slug: ${slug}`);
  const res = await getVehicleBySlug(slug, "suvs");
  const rawCar = res?.data?.car || res?.car || res?.data || res;
  const car = rawCar && (rawCar.id || rawCar.slug || rawCar.name) ? normalizeVehicle(rawCar, "suvs") : null;
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
              <h2>SUV not found</h2>
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
