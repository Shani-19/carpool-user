/* ===== Maira Edit START: Booking Page Redesign ===== */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getVehicleBySlug, normalizeVehicle } from "@/utils/vehicles/vehicleAPI";
import {
  getEncarVehicleDetail,
  normalizeEncarDetail,
} from "@/utils/vehicles/encarAPI";
import InspectForm from "./InspectForm";

const fmtNumber = (val) => {
  const n = Number(val);
  if (Number.isNaN(n)) return "-";
  return n.toLocaleString("en-US");
};

const CARS_IMG_BASE =
  process.env.NEXT_PUBLIC_CARS_IMG_SRC_S3 ||
  "https://media.carpoolkr.com/assets/car/cars";

const buildCarpoolImageSrc = (mainImage) => {
  // ===== Maira Edit START: image-url-fix =====
  const value = String(mainImage || "").trim();

  if (!value) return "/images/resource/about-inner1-5.jpg";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const base = String(CARS_IMG_BASE || "").replace(/\/+$/, "");
  const path = value.replace(/^\/+/, "");

  return `${base}/${path}`;
  // ===== Maira Edit END =====
};

const tryCarpool = async (id) => {
  const res = await getVehicleBySlug(id);
  const raw = res?.data?.car || res?.data || res;
  if (raw && (raw.id || raw.slug || raw.name)) {
    /* ===== Maira Edit START: VehiclePortSize Debug ===== */
    const normalized = normalizeVehicle(raw);
    /* raw.port_size_id does not exist on this API; raw.port_size = 2 (integer) IS the size ID */
    normalized.port_size_id =
      raw.port_size_id ??
      (typeof raw.port_size === "number" ? raw.port_size : raw.port_size?.id) ??
      null;
    return normalized;
    /* ===== Maira Edit END ===== */
  }
  return null;
};

const tryEncar = async (id) => {
  const detail = await getEncarVehicleDetail(id);
  if (!detail) return null;
  return normalizeEncarDetail(detail);
};

export default function InspectClient({ carId, stock }) {
  const router = useRouter();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolvedFrom, setResolvedFrom] = useState(null);
  const [imgSrc, setImgSrc] = useState("/images/resource/about-inner1-5.jpg");
  // ===== Maira Edit START: shipping-info-state =====
  const [shippingInfo, setShippingInfo] = useState({
    shippingCost: 0,
    countryName: "",
    portName: "",
    tradeCondition: "",
  });
  // ===== Maira Edit END =====

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      let resolved = null;
      let source = null;
      try {
        if (stock === "encar") {
          resolved = await tryEncar(carId);
          if (resolved) source = "encar";
        } else {
          resolved = await tryCarpool(carId);
          if (resolved) source = "carpool";
        }
      } catch (e) {
        console.error("Inspect fetch failed:", e);
      }
      if (!alive) return;
      setVehicle(resolved);
      setResolvedFrom(source);
      if (resolved?.main_image) {
        const src =
          source === "encar"
            ? resolved.main_image
            : buildCarpoolImageSrc(resolved.main_image);
        setImgSrc(src);
      } else {
        setImgSrc("/images/resource/about-inner1-5.jpg");
      }
      // ===== Maira Edit START: image-debug-log =====
      console.log("[Vehicle Image Debug]", {
        main_image: resolved?.main_image,
        imgSrc: resolved?.main_image
          ? buildCarpoolImageSrc(resolved.main_image)
          : "FALLBACK",
      });
      // ===== Maira Edit END =====
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [carId, stock]);

  const price = vehicle?.price ?? null;
  const discount = vehicle?.discount_price ?? null;
  const finalPrice =
    vehicle?.final_price ??
    (discount ? Number(price || 0) - Number(discount || 0) : price);

  // ===== Maira Edit START: dynamic-price-derived =====
  const numericVehiclePrice = Number(
    String(finalPrice ?? price ?? 0).replace(/[^0-9.-]/g, "")
  );

  const cleanTradeCondition = shippingInfo.tradeCondition?.includes("/")
    ? shippingInfo.tradeCondition.split("/").pop()
    : shippingInfo.tradeCondition;

  const displayPrice = shippingInfo.shippingCost > 0
    ? numericVehiclePrice + shippingInfo.shippingCost
    : numericVehiclePrice;

  // ===== Maira Edit START: complete-shipping-label =====
  const hasCompleteShippingLabel =
    shippingInfo.shippingCost > 0 &&
    cleanTradeCondition &&
    shippingInfo.portName &&
    shippingInfo.countryName;

  const displayLabel = hasCompleteShippingLabel
    ? `${cleanTradeCondition}, ${shippingInfo.portName}, ${shippingInfo.countryName}`.toUpperCase()
    : "FOB, INCHEON, KOREA";
  // ===== Maira Edit END =====

  const specTags = [
    vehicle?.sku
      ? `#${vehicle.sku}`
      : vehicle?.car_num
      ? `#${vehicle.car_num}`
      : null,
    vehicle?.vehicle_type || null,
    vehicle?.fuel_type || null,
    vehicle?.transmission || null,
    vehicle?.odometer ? `${fmtNumber(vehicle.odometer)} KM` : null,
    vehicle?.passenger ? `${Number(vehicle.passenger)} seats` : null,
  ].filter(Boolean);

  /* ===== Maira Edit START: Spacing Fix ===== */
  /*
   * .cus-style-1 adds padding-bottom: 80px (100px on ≤1199px) to the header,
   * creating an empty teal gap. Other pages cancel it via layout-radius (margin-top: -80px).
   * We do the same here with a local class + inline style — no global CSS touched.
   */
  /* ===== Maira Edit END ===== */
  return (
    <>
      {/* ===== Maira Edit START: Spacing Fix ===== */}
      <style>{`
        .inspect-booking-section {
          margin-top: -80px;
        }
        @media (max-width: 1199px) {
          .inspect-booking-section {
            margin-top: -100px !important;
          }
        }
      `}</style>
      {/* ===== Maira Edit END ===== */}
      <section className="inventory-section inspect-booking-section" style={{ background: "#fff" }}>
      <div
        style={{ maxWidth: 980, margin: "0 auto", padding: "0 20px 48px" }}
      >
        {/* TOP BAR */}
        {/* ===== Maira Edit START: Payload Fix 2 ===== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 0 18px",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
        {/* ===== Maira Edit END ===== */}
          <button
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "1px solid #aaa",
              borderRadius: 4,
              padding: "7px 16px",
              cursor: "pointer",
              fontSize: 13,
              color: "#444",
            }}
          >
            ← Back to detail page
          </button>
          <button
            onClick={() =>
              document
                .getElementById("booking-submit-btn")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "none",
              border: "1px solid #c0392b",
              borderRadius: 4,
              padding: "7px 16px",
              cursor: "pointer",
              fontSize: 13,
              color: "#c0392b",
            }}
          >
            Booking Request →
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* CAR NOT FOUND */}
        {!loading && !vehicle && (
          <div
            style={{
              padding: "24px",
              background: "#f9f9f9",
              borderRadius: 8,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <h4 style={{ marginBottom: 8 }}>Car details could not be loaded</h4>
            <p style={{ color: "#777", marginBottom: 0 }}>
              We couldn&apos;t fetch this vehicle right now. You can still
              submit a booking request below.
            </p>
          </div>
        )}

        {/* CAR INFO ROW */}
        {!loading && vehicle && (
          <>
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: 110,
                  height: 74,
                  position: "relative",
                  flexShrink: 0,
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#f0f0f0",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Image
                  src={imgSrc}
                  alt={vehicle?.name || "vehicle"}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={() =>
                    setImgSrc("/images/resource/about-inner1-5.jpg")
                  }
                  unoptimized
                />
              </div>

              {/* Car name + specs */}
              <div style={{ flex: 1, minWidth: 180 }}>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {vehicle?.name}
                </h3>
                {specTags.length > 0 && (
                  <p style={{ fontSize: 12, color: "#666", marginBottom: 0 }}>
                    {specTags.map((tag, i) => (
                      <span key={i}>
                        {i > 0 && (
                          <span style={{ margin: "0 5px", color: "#aaa" }}>
                            •
                          </span>
                        )}
                        {tag}
                      </span>
                    ))}
                  </p>
                )}
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {/* ===== Maira Edit START: Payload Fix — guard null price so it shows "—" not "0" ===== */}
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#c0392b",
                    lineHeight: 1,
                  }}
                >
                  {(finalPrice ?? price) != null ? (
                    <>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>USD </span>
                      {/* ===== Maira Edit START: dynamic-price-header ===== */}
                      {displayPrice.toLocaleString()}
                      {/* ===== Maira Edit END ===== */}
                    </>
                  ) : (
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#999" }}>
                      Price on request
                    </span>
                  )}
                </div>
                {/* ===== Maira Edit END ===== */}
                {/* ===== Maira Edit START: dynamic-label-header ===== */}
                <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                  {displayLabel}
                </div>
                {/* ===== Maira Edit END ===== */}
              </div>
            </div>

            {/* GREETING (logged-in only) */}
            {user && (
              <div style={{ marginBottom: 16 }}>
                <h5 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                  Hello, {user.name}
                </h5>
                <p style={{ color: "#555", fontSize: 13, marginBottom: 0 }}>
                  Thank you for your interest in this item!
                  <br />
                  Please fill in your consignee information and document
                  delivery address after checking the quotation below.
                </p>
              </div>
            )}

            <hr style={{ margin: "0 0 24px", borderColor: "#e0e0e0" }} />
          </>
        )}

        {/* ===== Maira Edit START: Payload Fix 2 ===== */}
        {/* BOOKING FORM or GUEST LOGIN WALL */}
        {!user ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "32px 0 40px" }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: "40px 32px",
                textAlign: "center",
                maxWidth: 420,
                width: "100%",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              }}
            >
              <h4 style={{ fontWeight: 700, marginBottom: 12, color: "#222" }}>Login Required</h4>
              <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>
                Please log in to view and submit your booking request.
              </p>
              <Link
                href={`/login?redirect=${encodeURIComponent(
                  stock ? `/inspect/${carId}?stock=${stock}` : `/inspect/${carId}`
                )}`}
                style={{
                  display: "block",
                  background: "#c0392b",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Login to Continue
              </Link>
            </div>
          </div>
        ) : (
          /* ===== Maira Edit START: shipping-callback-prop ===== */
          <InspectForm
            carId={carId}
            vehicleId={vehicle?.id ?? null}
            stock={resolvedFrom || stock || ""}
            vehiclePrice={finalPrice ?? price ?? null}
            vehiclePortSizeId={vehicle?.port_size_id ?? null}
            onShippingChange={setShippingInfo}
          />
          /* ===== Maira Edit END ===== */
        )}
        {/* ===== Maira Edit END ===== */}
      </div>
    </section>
    </>
  );
}
/* ===== Maira Edit END ===== */
