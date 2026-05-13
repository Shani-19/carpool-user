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

  return {
    title: `${truck.name} | Carpool Korea`,
    description: truck.comment || getDynamicDescription(truck, false),
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
