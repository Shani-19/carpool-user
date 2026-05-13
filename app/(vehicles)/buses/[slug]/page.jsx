import React from "react";
import SingleBus from "@/components/busSingles/SingleBus";
import RelatedBuses from "@/components/busSingles/RelatedBuses";
import { getVehicleBySlug, getVehicles, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";

export const dynamic = "force-dynamic";

const getDynamicDescription = (bus, html = true) => {
  if (!bus) return "";
  const p1 = `This ${bus.year || ""} ${bus.make_name || ""} ${bus.model_name || ""} is a reliable ${bus.category || "bus"} designed for performance and safety. Featuring a ${bus.fuel_type || ""} engine with a volume of ${bus.engine_volume ? bus.engine_volume + "cc" : "N/A"}, it is built to handle professional transport needs with ease. With ${bus.odometer ? bus.odometer.toLocaleString() : "0"} km on the odometer, this vehicle has been well-maintained.`;
  const p2 = `The exterior is finished in ${bus.color || "its original color"}, and it offers a seating capacity for ${bus.passenger || "multiple"} passengers. Whether for commercial or private use, this ${bus.make_name || ""} bus provides the durability and comfort required for long-term service.`;
  return html ? `${p1}<br/><br/>${p2}` : `${p1} ${p2}`;
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const busRes = await getVehicleBySlug(slug, "buses");
  const rawBus = busRes?.data?.bus || busRes?.bus || busRes?.data || busRes;
  const bus = rawBus && (rawBus.id || rawBus.slug || rawBus.name) ? normalizeVehicle(rawBus, "buses") : null;

  if (!bus) return { title: "Bus Not Found | Carpool Korea" };

  return {
    title: `${bus.name} | Carpool Korea`,
    description: bus.description || getDynamicDescription(bus, false),
  };
}

export default async function BusDetailPage({ params }) {
  const { slug } = params;

  // 1. Fetch Bus Detail
  const busRes = await getVehicleBySlug(slug, "buses");
  const rawBus = busRes?.data?.bus || busRes?.data || busRes;
  const relatedBuses = busRes?.data?.related || [];

  const busItem = rawBus && (rawBus.id || rawBus.slug || rawBus.name) ? normalizeVehicle(rawBus, "buses") : null;

  if (busItem && !busItem.description) {
    busItem.description = getDynamicDescription(busItem);
  }

  if (!busItem) {
    return (
      <>
        <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
        <section className="inventory-section pb-0 layout-radius">
          <div className="boxcar-container">
            <div className="py-5 text-center">
              <h2>Bus not found</h2>
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
      <SingleBus busItem={busItem} relatedBuses={relatedBuses} />
      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </div>
  );
}
