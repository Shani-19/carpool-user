"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Link from "next/link";
import { getFavourites, toggleFavourite } from "@/utils/favourites";
import { api } from "@/utils/api";
import { getEncarVehiclesByIds, normalizeEncarDetail } from "@/utils/vehicles/encarAPI";
import { useCurrency } from "@/context/CurrencyContext";

export default function Favorite() {
  const [activeTab, setActiveTab] = useState("carpool");
  const [carpoolStock, setCarpoolStock] = useState([]);
  const [otherStock, setOtherStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, format, convert } = useCurrency();

  // Helper to format numbers
  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      if (activeTab === "carpool") {
        const favs = getFavourites("carpool");
        const cars = favs.filter(f => f.type === 'cars').map(f => f.slug);
        const trucks = favs.filter(f => f.type === 'trucks').map(f => f.slug);
        const buses = favs.filter(f => f.type === 'buses').map(f => f.slug);
        const bikes = favs.filter(f => f.type === 'bikes').map(f => f.slug);
        const parts = favs.filter(f => f.type === 'parts').map(f => f.slug);

        const results = [];

        // Fetch cars/trucks/buses via the shared favourite-list endpoint
        if (cars.length > 0 || trucks.length > 0 || buses.length > 0) {
          const payload = { cars, trucks, buses, page: 1, per_page: 50 };
          const res = await api.post('/favourite-list', payload);
          if (res.data?.success && res.data?.vehicles) {
            results.push(...res.data.vehicles);
          }
        }

        // Fetch bikes individually via /bikes/{slug}
        if (bikes.length > 0) {
          const bikePromises = bikes.map(slug =>
            api.get(`/bikes/${slug}`).then(res => {
              const data = res.data?.data?.bike || res.data?.bike || res.data;
              if (data && data.slug) return { ...data, _type: 'bikes' };
              return null;
            }).catch(() => null)
          );
          const bikeResults = await Promise.all(bikePromises);
          results.push(...bikeResults.filter(Boolean));
        }

        // Fetch parts individually via /parts/{slug}
        if (parts.length > 0) {
          const partPromises = parts.map(slug =>
            api.get(`/parts/${slug}`).then(res => {
              const data = res.data?.data?.part || res.data?.part || res.data;
              if (data && data.slug) return { ...data, _type: 'parts' };
              return null;
            }).catch(() => null)
          );
          const partResults = await Promise.all(partPromises);
          results.push(...partResults.filter(Boolean));
        }

        setCarpoolStock(results);
      } else {
        const favs = getFavourites("encar");
        const otherIds = favs.map(f => f.id);

        if (otherIds.length > 0) {
          const vehicles = await getEncarVehiclesByIds(otherIds);
          const normalized = vehicles.map(v => normalizeEncarDetail(v)).filter(v => v !== null);
          setOtherStock(normalized);
        } else {
          setOtherStock([]);
        }
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [activeTab]);

  const handleRemove = (item, type, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(item, type);
    // Remove locally without refetch
    if (activeTab === "carpool") {
      setCarpoolStock(prev => prev.filter(c => c.slug !== item.slug && c.id !== item.id));
    } else {
      setOtherStock(prev => prev.filter(c => String(c.id) !== String(item.id)));
    }
  };

  const renderCarpoolCard = (car, index) => {
    let routePrefix = "/cars";
    let urlType = "cars";
    let imgPath = process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/car/cars";

    if (car._type === 'bikes' || car.slug?.startsWith('BIKE') || car.vehicle_type === 'Bike') {
      routePrefix = "/bikes";
      urlType = "bikes";
      imgPath = process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/bike/thumbnail/";
    } else if (car._type === 'parts' || car.slug?.startsWith('PART') || car.vehicle_type === 'Part') {
      routePrefix = "/parts";
      urlType = "parts";
      imgPath = process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/part/thumbnail/";
    } else if (car.slug?.startsWith('TRUCK') || car.vehicle_type === 'truck') {
      routePrefix = "/trucks";
      urlType = "trucks";
      imgPath = process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/car/cars";
    } else if (car.slug?.startsWith('BUS') || car.vehicle_type === 'bus') {
      routePrefix = "/buses";
      urlType = "buses";
      imgPath = process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/car/cars";
    }

    const mainImage = car.main_image ? `${imgPath}${car.main_image}` : "/images/resource/inventory1-6.png";
    const brandName = car.make?.name || car.make_name || car.make || "Unknown";
    const modelName = car.model?.name || car.model_name || car.model || "Unknown";
    const year = car.model_year || car.year || car.color || "Unknown";

    return (
      <a
        key={`${car.id}-${index}`}
        className="mb-booking-details"
        href={`${routePrefix}/${car.slug || car.id}`}
        target="_blank"
      >
        <div className="car-card position-relative">
          <div className="mb-info-box">
            <div className="car-image">
              <Image
                src={mainImage}
                alt={modelName}
                width={180}
                height={120}
                className="rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="car-info">
              <h4 className="car-title">
                {car.name}
              </h4>
              <p className="vin">{urlType === 'parts' ? 'Part No.' : 'Chassis No.'} {car.vin}</p>
              <p className="mb-details">
                {brandName}
                {' | ' + modelName}
                {car.transmission ? ' | ' + car.transmission : ''}
                {car.fuel_type ? ' | ' + car.fuel_type : ''}
                {car.drive_type ? ' | ' + car.drive_type : ''}
                {car.vehicle_type ? ' | ' + car.vehicle_type : ''}
                {car.passenger ? ` | ${car.passenger} Seats` : ''}
                {car.ca ? ` | ${car.ca.name}` : ''}
                {car.color ? ` | ${car.color}` : ''}
              </p>
              <p className="mb-details mt-2">
                {car.engine_volume && <span className="badge bg-light text-danger me-1 fw-normal">{car.engine_volume} CC</span>}
                {car.odometer && <span className="badge bg-light text-danger me-1 fw-normal">{fmtNumber(car.odometer)} Km</span>}
              </p>
            </div>
          </div>
          <div className="mb-card-right-box d-flex flex-column justify-content-center align-items-end pe-3">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => handleRemove(car, urlType, e)}
            >
              <i className="fa fa-trash me-1"></i> Remove
            </button>
          </div>
        </div>
      </a>
    );
  };

  const renderOtherCard = (car, index) => {

    return (
      <a
        key={`${car.id}-${index}`}
        className="mb-booking-details"
        href={`/domestic/${car.id}`}
        target="_blank"
      >
        <div className="car-card position-relative">
          <div className="mb-info-box">
            <div className="car-image">
              <Image
                src={car.main_image || "/images/resource/inventory1-6.png"}
                alt={car.name || "Vehicle"}
                width={180}
                height={120}
                className="rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="car-info">
              <h4 className="car-title">
                {car.year || ""}, {car.make_name || ""}, {car.model_name || ""}
              </h4>
              <p className="vin">Chassis No. {car.vin || "Unknown"}</p>
              <p className="mb-details">
                {car.transmission ? car.transmission : ''}
                {car.fuel_type ? ' | ' + car.fuel_type : ''}
                {car.drive_type ? ' | ' + car.drive_type : ''}
                {car.vehicle_type ? ' | ' + car.vehicle_type : ''}
                {car.passenger ? ` | ${car.passenger} Seats` : ''}
              </p>
              <p className="mb-details mt-2">
                {car.engine_volume > 0 && <span className="badge bg-light text-danger me-1 fw-normal">{car.engine_volume} CC</span>}
                {car.odometer > 0 && <span className="badge bg-light text-danger me-1 fw-normal">{fmtNumber(car.odometer)} Km</span>}
              </p>
            </div>
          </div>
          <div className="mb-card-right-box d-flex flex-column justify-content-center align-items-end pe-3">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => handleRemove(car, "domestic", e)}
            >
              <i className="fa fa-trash me-1"></i> Remove
            </button>
          </div>
        </div>
      </a>
    );
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">My Favorites</h3>
              <div className="text">Manage your saved vehicles here.</div>
            </div>

            <div className="my-listing-table wrap-listing myBookingSec">
              <div className="cart-table">
                <div className="nav-scroll-x">
                  <ul className="nav nav-tabs mb-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('carpool')}
                        className={`nav-link ${activeTab === 'carpool' ? 'active' : ''}`}
                        type="button"
                      >
                        Carpool Stock
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('other')}
                        className={`nav-link ${activeTab === 'other' ? 'active' : ''}`}
                        type="button"
                      >
                        Other Stock
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="car-list">
                      {loading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status"></div>
                        </div>
                      ) : (
                        <>
                          {activeTab === 'carpool' && carpoolStock.length === 0 && (
                            <div className="text-center py-5 text-muted">
                              <h5>No Carpool Stock favourited yet</h5>
                            </div>
                          )}
                          {activeTab === 'other' && otherStock.length === 0 && (
                            <div className="text-center py-5 text-muted">
                              <h5>No Other Stock favourited yet</h5>
                            </div>
                          )}

                          {activeTab === 'carpool' && carpoolStock.map((car, index) => renderCarpoolCard(car, index))}
                          {activeTab === 'other' && otherStock.map((car, index) => renderOtherCard(car, index))}
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
