/* ===== Maira Edit START: Booking Page Redesign ===== */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authAPI, bookingAPI, api, quotationAPI } from "@/utils/api";

/* ── Shipping type options (Ro-Ro / Container sizes used across the platform) ── */
const SHIPPING_TYPES = [
  { label: "Ro-Ro (CBM)", value: "cbm" },
  { label: "Container (20ft)", value: "20ft" },
  { label: "Container (40ft)", value: "40ft" },
  { label: "Container (40HQ)", value: "40hq" },
  { label: "Consolidation", value: "consolidation" },
];

/* ===== Maira Edit START: Booking Fix — teal border matching screenshot ===== */
/* ── Shared micro-styles ── */
const inputStyle = {
  width: "100%",
  border: "1px solid #b2dfdb",
  borderRadius: 4,
  padding: "8px 10px",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
  color: "#333",
  transition: "border-color 0.15s",
};
const selectStyle = { ...inputStyle, cursor: "pointer" };
/* ===== Maira Edit END ===== */
const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
  display: "block",
  color: "#333",
};
const errorStyle = { color: "#e74c3c", fontSize: 11, marginTop: 3 };
const fieldWrap = { marginBottom: 14 };

/* ===== Maira Edit START: Booking Fix — handle more API response shapes ===== */
/* ── Helpers ── */
const extractList = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.countries)) return raw.countries;
  if (Array.isArray(raw?.ports)) return raw.ports;
  if (Array.isArray(raw?.data?.data)) return raw.data.data;
  return [];
};
/* ===== Maira Edit END ===== */

/* ===== Maira Edit START: Payload Fix — accept numeric vehicleId for car_id ===== */
/* ===== Maira Edit START: PortSize Fix ===== */
export default function InspectForm({ carId, vehicleId, stock, vehiclePrice, vehiclePortSizeId, onShippingChange }) {
/* ===== Maira Edit END ===== */
/* ===== Maira Edit END ===== */
  const { user, loading: authLoading } = useAuth();

  /* Countries list (used in all country dropdowns) */
  const [countries, setCountries] = useState([]);

  /* ── Left column: Quotation ── */
  const [selCountry, setSelCountry] = useState(null);   // { id, name }
  const [ports, setPorts] = useState([]);
  const [selPort, setSelPort] = useState(null);          // { id, name }
  const [loadingPorts, setLoadingPorts] = useState(false);
  const [shippingType, setShippingType] = useState("");
  const [shippingCost, setShippingCost] = useState(null);
  const [portSizeId, setPortSizeId] = useState("");
  /* ===== Maira Edit START: PortSize Fix ===== */
  const [portCharges, setPortCharges] = useState([]);
  const [loadingCharges, setLoadingCharges] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  /* ===== Maira Edit END ===== */
  const [quotationEmail, setQuotationEmail] = useState("");
  /* ===== Maira Edit START: Booking Fix — removed fake quotation email states ===== */
  /* quotationSent and sendingQuotation removed: no real API exists yet for this feature */
  /* ===== Maira Edit END ===== */
  // ===== Maira Edit START: quotation-state =====
  const [isQuotationLoading, setIsQuotationLoading] = useState(false);
  const [quotationMessage, setQuotationMessage] = useState("");
  // ===== Maira Edit END =====

  /* ── Right column: Consignee ── */
  /* ===== Maira Edit START: Payload Fix — countryId stores integer for backend submission ===== */
  const [consignee, setConsignee] = useState({
    name: "",
    email: "",
    businessNo: "",
    address: "",
    postalCode: "",
    country: "",
    countryId: "",
    tel: "",
  });
  /* ===== Maira Edit END ===== */

  /* ── Right column: Document delivery address ── */
  /* ===== Maira Edit START: Payload Fix — countryId stores integer for backend submission ===== */
  const [docAddr, setDocAddr] = useState({
    name: "",
    address: "",
    postalCode: "",
    country: "",
    countryId: "",
    tel: "",
    additionalRequest: "",
  });
  /* ===== Maira Edit END ===== */

  /* ===== Maira Edit START: Booking Fix — track country names for post-load matching ===== */
  const [pendingConsigneeCountry, setPendingConsigneeCountry] = useState("");
  const [pendingDocCountry, setPendingDocCountry] = useState("");
  /* ===== Maira Edit END ===== */

  /* ── Submission state ── */
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [guestPrompt, setGuestPrompt] = useState(false);

  // ===== Maira Edit START: resolved-port-size-id =====
  const resolvedPortSizeId = vehiclePortSizeId
    ? Number(vehiclePortSizeId)
    : null;
  // ===== Maira Edit END =====

  /* ===== Maira Edit START: Country+Auth Fix ===== */
  /* ── Fetch countries on mount — response nested at data.data.countries ── */
  useEffect(() => {
    authAPI
      .getCountries()
      .then((res) => {
        const list =
          res?.data?.data?.countries ||
          res?.data?.countries ||
          [];
        setCountries(list);
      })
      .catch((err) => {
        console.error("[Booking] /countries API failed:", err?.response?.status, err?.message);
      });
  }, []);
  /* ===== Maira Edit END ===== */

  /* ===== Maira Edit START: Country+Auth Fix ===== */
  /* ── Pre-fill consignee/document — response nested at data.data like /countries ── */
  useEffect(() => {
    if (!user) return;
    api
      .get("/user-detail")
      .then((res) => {
        /* API returns { success, data: { consignee, document } } — unwrap one level */
        const d = res?.data?.data ?? res?.data ?? {};
        const c = d.consignee ?? {};
        const doc = d.document ?? {};
        const consigneeCountry = c.shipping?.name || "";
        /* ===== Maira Edit START: Payload Fix — extract country IDs for integer fields ===== */
        const consigneeCountryId = c.shipping_country_id || c.shipping?.id || "";
        const docCountry = doc.shipping?.name || "";
        const docCountryId = doc.shipping_country_id || doc.shipping?.id || "";
        setConsignee({
          name: c.name || user.name || "",
          email: c.email || user.email || "",
          /* rnc is the business registration number — do not substitute mobile here */
          businessNo: c.rnc || "",
          address: c.address || "",
          postalCode: c.zip_code || "",
          country: consigneeCountry,
          countryId: consigneeCountryId ? String(consigneeCountryId) : "",
          tel: c.mobile || user.mobile || user.wa_no || "",
        });
        setDocAddr({
          name: doc.d_name || "",
          address: doc.d_address || "",
          postalCode: doc.d_zip_code || "",
          country: docCountry,
          countryId: docCountryId ? String(docCountryId) : "",
          tel: doc.d_mobile || "",
          additionalRequest: doc.comment || "",
        });
        /* ===== Maira Edit END ===== */
        /* Store raw country names for post-load matching when countries list is async */
        setPendingConsigneeCountry(consigneeCountry);
        setPendingDocCountry(docCountry);
        setQuotationEmail((prev) => prev || user.email || "");
      })
      .catch(() => {
        /* Fallback: use basic user context data */
        setConsignee((prev) => ({
          ...prev,
          name: prev.name || user.name || "",
          email: prev.email || user.email || "",
          tel: prev.tel || user.mobile || user.wa_no || "",
        }));
        setQuotationEmail((prev) => prev || user.email || "");
      });
  }, [user]);

  /* Re-match consignee/doc country names after countries list finishes loading */
  useEffect(() => {
    if (!countries.length || !pendingConsigneeCountry) return;
    const match = countries.find(
      (c) =>
        c.name === pendingConsigneeCountry ||
        c.name.toLowerCase() === pendingConsigneeCountry.toLowerCase()
    );
    /* ===== Maira Edit START: Payload Fix — also set countryId from matched entry ===== */
    if (match) setConsignee((prev) => ({ ...prev, country: match.name, countryId: String(match.id) }));
    /* ===== Maira Edit END ===== */
  }, [countries, pendingConsigneeCountry]);

  useEffect(() => {
    if (!countries.length || !pendingDocCountry) return;
    const match = countries.find(
      (c) =>
        c.name === pendingDocCountry ||
        c.name.toLowerCase() === pendingDocCountry.toLowerCase()
    );
    /* ===== Maira Edit START: Payload Fix — also set countryId from matched entry ===== */
    if (match) setDocAddr((prev) => ({ ...prev, country: match.name, countryId: String(match.id) }));
    /* ===== Maira Edit END ===== */
  }, [countries, pendingDocCountry]);
  /* ===== Maira Edit END ===== */

  /* ── Fetch ports when quotation country changes ── */
  useEffect(() => {
    if (!selCountry?.id) {
      setPorts([]);
      setSelPort(null);
      setShippingCost(null);
      setPortSizeId("");
      /* ===== Maira Edit START: PortSize Fix ===== */
      setPortCharges([]);
      setSelectedCharge(null);
      setShippingType("");
      /* ===== Maira Edit END ===== */
      return;
    }
    setLoadingPorts(true);
    setPorts([]);
    setSelPort(null);
    /* ===== Maira Edit START: Booking Fix — debug port loading ===== */
    authAPI
      .getPortsByCountry({ country_id: selCountry.id })
      .then((res) => {
        const list = extractList(res.data);
        if (list.length === 0) {
          console.error("[Booking] /ports-by-country returned empty for country_id:", selCountry.id,
            "Raw shape:", { isArray: Array.isArray(res.data), keys: res.data && typeof res.data === "object" ? Object.keys(res.data) : typeof res.data });
        }
        setPorts(list);
      })
      .catch((err) => {
        console.error("[Booking] /ports-by-country error:", err?.response?.status, err?.message);
        setPorts([]);
      })
      .finally(() => setLoadingPorts(false));
    /* ===== Maira Edit END ===== */
  }, [selCountry?.id]);

  /* ===== Maira Edit START: PortSize Fix ===== */
  /* ── Fetch available port-charge options when country + port + vehiclePortSizeId are ready ──
   *  DetailCard.jsx (lines 172-185) confirms: port-charges expects
   *  { country_id, port_id, port_size_id } where port_size_id is the VEHICLE's own size ID,
   *  and returns response.data.port_charges = [{ id, size, charges, shipping_time }].
   *  The user selects one; that charge's id becomes port_size_id in the booking payload.
   */
  useEffect(() => {
    if (!selCountry?.id || !selPort?.id || !vehiclePortSizeId) {
      setPortCharges([]);
      setSelectedCharge(null);
      setShippingCost(null);
      setPortSizeId("");
      setShippingType("");
      return;
    }
    setLoadingCharges(true);
    setPortCharges([]);
    setSelectedCharge(null);
    setShippingCost(null);
    setPortSizeId("");
    setShippingType("");
    authAPI
      .getPortCharges({
        country_id: selCountry.id,
        port_id: selPort.id,
        port_size_id: vehiclePortSizeId,
      })
      .then((res) => {
        const d = res.data ?? {};
        const list = Array.isArray(d.port_charges)
          ? d.port_charges
          : Array.isArray(d.charges)
          ? d.charges
          : Array.isArray(d.data)
          ? d.data
          : [];
        setPortCharges(list);
      })
      .catch((err) => {
        console.error("[Booking] /port-charges error:", err?.response?.status, err?.message);
        setPortCharges([]);
      })
      .finally(() => setLoadingCharges(false));
  }, [selCountry?.id, selPort?.id, vehiclePortSizeId]);
  /* ===== Maira Edit END ===== */

  // ===== Maira Edit START: shipping-change-callback =====
  useEffect(() => {
    if (typeof onShippingChange === "function") {
      onShippingChange({
        shippingCost: Number(String(shippingCost || 0).replace(/[^0-9.-]/g, "")),
        countryName: selCountry?.name ?? "",
        // ===== Maira Edit START: shipping-port-name-fix =====
        portName:
          selPort?.name ??
          selPort?.port_name ??
          selPort?.port ??
          selPort?.label ??
          "",
        // ===== Maira Edit END =====
        tradeCondition: selectedCharge?.size ?? shippingType ?? "",
      });
    }
  }, [shippingCost, selCountry, selPort, selectedCharge, shippingType, onShippingChange]);
  // ===== Maira Edit END =====

  const totalPrice =
    shippingCost !== null && vehiclePrice !== null
      ? Number(vehiclePrice) + Number(shippingCost)
      : null;

  /* ── Field handlers ── */
  const handleConsignee = (e) => {
    const { name, value } = e.target;
    setConsignee((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name])
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ===== Maira Edit START: Booking Fix — align doc error keys with validation keys ===== */
  const handleDoc = (e) => {
    const { name, value } = e.target;
    setDocAddr((prev) => ({ ...prev, [name]: value }));
    /* Validation uses d_name, d_address, d_country, d_tel */
    const errKeyMap = { name: "d_name", address: "d_address", country: "d_country", tel: "d_tel" };
    const errKey = errKeyMap[name] || `d_${name}`;
    if (fieldErrors[errKey])
      setFieldErrors((prev) => ({ ...prev, [errKey]: "" }));
  };
  /* ===== Maira Edit END ===== */

  // ===== Maira Edit START: send-quotation-handler =====
  const handleSendQuotation = async () => {
    if (isQuotationLoading) return;

    if (!quotationEmail || !vehicleId || !selCountry?.id ||
        !selPort?.id || !resolvedPortSizeId || !shippingType) {
      setQuotationMessage(
        "Please select country, port, and shipping type first."
      );
      return;
    }

    setIsQuotationLoading(true);
    setQuotationMessage("");

    try {
      const res = await quotationAPI.sendQuotation({
        email: quotationEmail,
        vehicle_type: "Car",
        vehicle_id: vehicleId,
        country_id: Number(selCountry.id),
        port_id: Number(selPort.id),
        port_size_id: resolvedPortSizeId,
        container_size: selectedCharge?.size ?? shippingType,
      });

      if (res.data?.success) {
        setQuotationMessage("Quotation email sent successfully.");
      } else {
        setQuotationMessage(res.data?.message || "Failed to send quotation.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      setQuotationMessage(msg || "Failed to send quotation. Please try again.");
    } finally {
      setIsQuotationLoading(false);
    }
  };
  // ===== Maira Edit END =====

  /* ── Booking submission ── */
  const handleBookingRequest = async () => {
    if (!user) {
      setGuestPrompt(true);
      return;
    }
    setError("");
    setFieldErrors({});
    setSuccess(false);

    /* ===== Maira Edit START: Booking Fix — complete required field validation ===== */
    const errs = {};
    /* ===== Maira Edit START: Payload Fix 2 ===== */
    if (!selCountry) errs.quotCountry = "Please select a quotation country";
    if (!selPort) errs.quotPort = "Please select a port";
    /* ===== Maira Edit START: PortSize Fix ===== */
    if (!selectedCharge) errs.quotSize = "Please select a shipping type";
    /* ===== Maira Edit END ===== */
    /* ===== Maira Edit END ===== */
    if (!consignee.name.trim()) errs.name = "Name is required";
    if (!consignee.email.trim()) errs.email = "Email is required";
    if (!consignee.businessNo.trim()) errs.businessNo = "Business No is required";
    if (!consignee.address.trim()) errs.address = "Address is required";
    /* ===== Maira Edit START: Payload Fix — validate countryId (integer) not country name ===== */
    if (!consignee.countryId) errs.country = "Country is required";
    if (!consignee.tel.trim()) errs.tel = "Tel/Mobile is required";
    if (!docAddr.name.trim()) errs.d_name = "Name is required";
    if (!docAddr.address.trim()) errs.d_address = "Address is required";
    if (!docAddr.countryId) errs.d_country = "Country is required";
    /* ===== Maira Edit END ===== */
    if (!docAddr.tel.trim()) errs.d_tel = "Tel/Mobile is required";
    if (Object.keys(errs).length) {
    /* ===== Maira Edit END ===== */
      setFieldErrors(errs);
      document.getElementById("booking-form-top")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      // ===== Maira Edit START: booking-debug-log-price-fix =====
      console.log("[Booking Payload Debug]", {
        car_id: vehicleId,
        country_id: selCountry?.id ? Number(selCountry.id) : null,
        d_country: Number(consignee?.countryId) || null,
        port_id: selPort?.id ? Number(selPort.id) : null,
        port_size_id: resolvedPortSizeId,
        size: selectedCharge?.size ?? shippingType ?? "",
        selectedCharge,
        itemPrice: Number(String(vehiclePrice || 0).replace(/[^0-9.-]/g, "")),
        shippingCost: Number(String(shippingCost || 0).replace(/[^0-9.-]/g, "")),
        totalPrice:
          Number(String(vehiclePrice || 0).replace(/[^0-9.-]/g, "")) +
          Number(String(shippingCost || 0).replace(/[^0-9.-]/g, "")),
      });
      // ===== Maira Edit END =====
      /* ===== Maira Edit START: Payload Fix — car_id is integer; country/d_country are integer IDs ===== */
      await bookingAPI.createBooking({
        car_id: vehicleId,
        name: consignee.name,
        email: consignee.email,
        country: Number(consignee.countryId),
        address: consignee.address,
        mobile: consignee.tel,
        d_name: docAddr.name,
        d_country: Number(docAddr.countryId),
        d_tel: docAddr.tel,
        d_address: docAddr.address,
        /* ===== Maira Edit START: Payload Fix 2 ===== */
        country_id: selCountry?.id ? Number(selCountry.id) : null,
        port_id: selPort?.id ? Number(selPort.id) : null,
        /* ===== Maira Edit END ===== */
        /* ===== Maira Edit START: Final PortSize Payload Fix ===== */
        /* port_size_id = vehicle's own port size (raw.port_size = 2), NOT the charge row ID */
        port_size_id: vehiclePortSizeId ? Number(vehiclePortSizeId) : null,
        size: selectedCharge?.size ?? shippingType ?? "",
        /* ===== Maira Edit END ===== */
      });
      /* ===== Maira Edit END ===== */
      setSuccess(true);
    /* ===== Maira Edit START: Booking Fix — sanitize raw SQL/DB errors from display ===== */
    } catch (err) {
      const status = err?.response?.status;
      const data = err?.response?.data ?? {};
      // ===== Maira Edit START: booking-error-debug =====
      console.error("[Booking] createBooking error:", {
        message: err?.message,
        status: err?.response?.status,
        statusText: err?.response?.statusText,
        data: err?.response?.data,
        errors: err?.response?.data?.errors,
      });
      // ===== Maira Edit END =====
      if (status === 422 && data.errors) {
        const formatted = {};
        Object.keys(data.errors).forEach((k) => {
          formatted[k] = Array.isArray(data.errors[k])
            ? data.errors[k][0]
            : String(data.errors[k]);
        });
        setFieldErrors(formatted);
        setError(data.message || "Please fix the errors below.");
      } else if (status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        // ===== Maira Edit START: booking-error-message =====
        const backendMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          (err?.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(" ")
            : "") ||
          err?.message ||
          "Something went wrong. Please try again.";
        const isSensitive = /SQL|SQLSTATE|table|column|syntax|database|carpurbr/i.test(backendMessage);
        setError(
          isSensitive
            ? "Booking failed. Please check vehicle details or contact support."
            : backendMessage
        );
        // ===== Maira Edit END =====
      }
    } finally {
    /* ===== Maira Edit END ===== */
      setSubmitting(false);
    }
  };

  /* Redirect param for guest login */
  const callbackUrl = stock
    ? `/book/${carId}?stock=${encodeURIComponent(stock)}`
    : `/book/${carId}`;

  // ===== Maira Edit START: quotation-ready-state =====
  const isQuotationReady =
    !!user &&
    !!quotationEmail &&
    !!vehicleId &&
    !!selCountry?.id &&
    !!selPort?.id &&
    !!resolvedPortSizeId &&
    !!shippingType;
  // ===== Maira Edit END =====

  /* ── Loading auth ── */
  if (authLoading) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  /* ── Success screen ── */
  if (success) {
    return (
      <div
        style={{
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: 8,
          padding: "40px 32px",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h4 style={{ color: "#155724", marginBottom: 8 }}>
          Booking Request Submitted!
        </h4>
        <p style={{ color: "#155724", marginBottom: 0 }}>
          Our team will contact you shortly to confirm your booking.
        </p>
      </div>
    );
  }

  /* ===== Maira Edit START: Booking Fix — inject teal focus ring CSS ===== */
  return (
    <div id="booking-form-top">
      <style>{`
        .inspect-input:focus,
        .inspect-select:focus,
        .inspect-textarea:focus {
          border-color: #00897b !important;
          box-shadow: 0 0 0 2px rgba(0,137,123,0.12);
          outline: none;
        }
      `}</style>
      {/* ===== Maira Edit END ===== */}
      {/* Global error */}
      {error && (
        <div
          style={{
            background: "#f8d7da",
            border: "1px solid #f5c6cb",
            color: "#721c24",
            padding: "10px 14px",
            borderRadius: 4,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {/* Guest login prompt (shown after clicking Booking Request / Send Quotation) */}
      {guestPrompt && !user && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            padding: "12px 16px",
            borderRadius: 4,
            marginBottom: 16,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Please log in to submit your booking.{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(callbackUrl)}`}
            style={{
              color: "#c0392b",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Login to Continue
          </Link>
        </div>
      )}

      {/* ═══════════ TWO-COLUMN LAYOUT ═══════════ */}
      <div className="row g-4">

        {/* ── LEFT COLUMN — Check the Quotation ── */}
        <div className="col-lg-6 col-md-12">
          <h5 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
            Check the quotation
          </h5>

          {/* Country */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Country</label>
            <select
              className="inspect-select"
              style={selectStyle}
              value={selCountry?.id || ""}
              onChange={(e) => {
                const found = countries.find(
                  (c) => String(c.id) === e.target.value
                );
                setSelCountry(found || null);
                /* ===== Maira Edit START: Payload Fix 2 ===== */
                if (fieldErrors.quotCountry)
                  setFieldErrors((prev) => ({ ...prev, quotCountry: "" }));
                /* ===== Maira Edit END ===== */
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* ===== Maira Edit START: Payload Fix 2 ===== */}
            {fieldErrors.quotCountry && (
              <div style={errorStyle}>{fieldErrors.quotCountry}</div>
            )}
            {/* ===== Maira Edit END ===== */}
          </div>

          {/* Port */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Port</label>
            <select
              className="inspect-select"
              style={selectStyle}
              value={selPort?.id || ""}
              onChange={(e) => {
                const found = ports.find(
                  (p) => String(p.id) === e.target.value
                );
                setSelPort(found || null);
                /* ===== Maira Edit START: Payload Fix 2 ===== */
                if (fieldErrors.quotPort)
                  setFieldErrors((prev) => ({ ...prev, quotPort: "" }));
                /* ===== Maira Edit END ===== */
              }}
              disabled={!selCountry || loadingPorts}
            >
              <option value="">
                {loadingPorts ? "Loading..." : "Port"}
              </option>
              {ports.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name || p.port}
                </option>
              ))}
            </select>
            {/* ===== Maira Edit START: Payload Fix 2 ===== */}
            {fieldErrors.quotPort && (
              <div style={errorStyle}>{fieldErrors.quotPort}</div>
            )}
            {/* ===== Maira Edit END ===== */}
          </div>

          {/* ===== Maira Edit START: PortSize Fix ===== */}
          {/* Shipping Type — populated from port-charges API (value = charge.id = port_size_id for payload) */}
          <div style={fieldWrap}>
            <label style={labelStyle}>Shipping type / Trade Condition</label>
            <select
              className="inspect-select"
              style={selectStyle}
              value={selectedCharge?.id ?? ""}
              onChange={(e) => {
                const found = portCharges.find((c) => String(c.id) === e.target.value);
                setSelectedCharge(found || null);
                setShippingCost(found?.charges ?? null);
                /* ===== Maira Edit START: Final PortSize Payload Fix ===== */
                /* portSizeId is no longer sent as port_size_id; vehiclePortSizeId is used instead */
                setPortSizeId("");
                /* ===== Maira Edit END ===== */
                setShippingType(found?.size ?? "");
                if (fieldErrors.quotSize)
                  setFieldErrors((prev) => ({ ...prev, quotSize: "" }));
              }}
              disabled={!selPort || loadingCharges}
            >
              <option value="">
                {loadingCharges ? "Loading..." : "Type & Size"}
              </option>
              {portCharges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.size}
                </option>
              ))}
            </select>
            {fieldErrors.quotSize && (
              <div style={errorStyle}>{fieldErrors.quotSize}</div>
            )}
          </div>
          {/* ===== Maira Edit END ===== */}

          {/* Price rows */}
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: 14,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontSize: 14,
              }}
            >
              <span style={{ color: "#555" }}>Item Price</span>
              <span style={{ fontWeight: 600 }}>
                {vehiclePrice !== null
                  ? `USD ${Number(vehiclePrice).toLocaleString("en-US")}`
                  : "—"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontSize: 14,
              }}
            >
              <span style={{ color: "#555" }}>Shipping Cost</span>
              <span style={{ fontWeight: 600 }}>
                {shippingCost !== null
                  ? `USD ${Number(shippingCost).toLocaleString("en-US")}`
                  : "—"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
              }}
            >
              <span style={{ fontWeight: 600 }}>Total Price</span>
              <span
                style={{
                  fontWeight: 700,
                  color: "#c0392b",
                  fontSize: 20,
                }}
              >
                {totalPrice !== null
                  ? `USD ${Number(totalPrice).toLocaleString("en-US")}`
                  : "ASK"}
              </span>
            </div>
          </div>

          <p style={{ fontSize: 11, color: "#999", marginBottom: 16 }}>
            Final quotation can be changed at the time of purchase Ro-Ro
            (CBM)/CFR
          </p>

          {/* ===== Maira Edit START: Booking Fix — heading added; button disabled; no fake success ===== */}
          {/* Quotation email section */}
          <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
            Would you like to get a quotation via email?
          </p>
          <input
            type="email"
            value={quotationEmail}
            onChange={(e) => setQuotationEmail(e.target.value)}
            placeholder={user?.email || "Enter email for quotation"}
            style={{ ...inputStyle, marginBottom: 8 }}
            className="inspect-input"
          />
          {/* ===== Maira Edit START: quotation-button-state ===== */}
          <button
            onClick={handleSendQuotation}
            disabled={!isQuotationReady || isQuotationLoading}
            style={{
              width: "100%",
              padding: "10px",
              background: "#8a9baa",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              opacity: (!isQuotationReady || isQuotationLoading) ? 0.5 : 1,
              cursor: (!isQuotationReady || isQuotationLoading)
                ? "not-allowed"
                : "pointer",
            }}
          >
            {isQuotationLoading ? "Sending..." : "Send this Quotation"}
          </button>
          {/* ===== Maira Edit END ===== */}
          {/* ===== Maira Edit START: quotation-message ===== */}
          {quotationMessage && (
            <p style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
              {quotationMessage}
            </p>
          )}
          {/* ===== Maira Edit END ===== */}
        </div>

        {/* ── RIGHT COLUMN — Consignee + Document ── */}
        <div className="col-lg-6 col-md-12">

          {/* ── Consignee Information ── */}
          <h5 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
            Fill in your consignee information
          </h5>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Name <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={consignee.name}
              onChange={handleConsignee}
              placeholder="Enter your name"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.name && (
              <div style={errorStyle}>{fieldErrors.name}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Email <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={consignee.email}
              onChange={handleConsignee}
              placeholder="Enter email"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.email && (
              <div style={errorStyle}>{fieldErrors.email}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Business No <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <input
              type="text"
              name="businessNo"
              value={consignee.businessNo}
              onChange={handleConsignee}
              placeholder="RNC or Passport no"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.businessNo && (
              <div style={errorStyle}>{fieldErrors.businessNo}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Address <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <textarea
              name="address"
              value={consignee.address}
              onChange={handleConsignee}
              placeholder="Enter the detailed address including the city name"
              rows={3}
              className="inspect-textarea"
              style={{ ...inputStyle, resize: "vertical" }}
            />
            {fieldErrors.address && (
              <div style={errorStyle}>{fieldErrors.address}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Postal Code (ZIP)</label>
            <input
              type="text"
              name="postalCode"
              value={consignee.postalCode}
              onChange={handleConsignee}
              placeholder="(Optional)"
              className="inspect-input"
              style={inputStyle}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Country <span style={{ color: "#c0392b" }}>*</span>
            </label>
            {/* ===== Maira Edit START: Payload Fix — option value is c.id (integer) not c.name ===== */}
            <select
              className="inspect-select"
              style={selectStyle}
              value={consignee.countryId}
              onChange={(e) => {
                const found = countries.find((c) => String(c.id) === e.target.value);
                setConsignee((prev) => ({
                  ...prev,
                  country: found?.name || "",
                  countryId: e.target.value,
                }));
                if (fieldErrors.country)
                  setFieldErrors((prev) => ({ ...prev, country: "" }));
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* ===== Maira Edit END ===== */}
            {fieldErrors.country && (
              <div style={errorStyle}>{fieldErrors.country}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Tel/Mobile <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <input
              type="text"
              name="tel"
              value={consignee.tel}
              onChange={handleConsignee}
              placeholder="Country code and Tel number"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.tel && (
              <div style={errorStyle}>{fieldErrors.tel}</div>
            )}
          </div>

          {/* ── Document Delivery Address ── */}
          <h5
            style={{ fontWeight: 700, fontSize: 15, marginTop: 28, marginBottom: 16 }}
          >
            Fill in your document delivery address
          </h5>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Name <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={docAddr.name}
              onChange={handleDoc}
              placeholder="Enter your name"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.d_name && (
              <div style={errorStyle}>{fieldErrors.d_name}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Address <span style={{ color: "#c0392b" }}>*</span>
            </label>
            <textarea
              name="address"
              value={docAddr.address}
              onChange={handleDoc}
              placeholder="Enter the detailed address including the city name"
              rows={3}
              className="inspect-textarea"
              style={{ ...inputStyle, resize: "vertical" }}
            />
            {fieldErrors.d_address && (
              <div style={errorStyle}>{fieldErrors.d_address}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Postal Code (ZIP)</label>
            <input
              type="text"
              name="postalCode"
              value={docAddr.postalCode}
              onChange={handleDoc}
              placeholder="(Optional)"
              className="inspect-input"
              style={inputStyle}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>
              Country <span style={{ color: "#c0392b" }}>*</span>
            </label>
            {/* ===== Maira Edit START: Payload Fix — option value is c.id (integer) not c.name ===== */}
            <select
              className="inspect-select"
              style={selectStyle}
              value={docAddr.countryId}
              onChange={(e) => {
                const found = countries.find((c) => String(c.id) === e.target.value);
                setDocAddr((prev) => ({
                  ...prev,
                  country: found?.name || "",
                  countryId: e.target.value,
                }));
                if (fieldErrors.d_country)
                  setFieldErrors((prev) => ({ ...prev, d_country: "" }));
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* ===== Maira Edit END ===== */}
            {fieldErrors.d_country && (
              <div style={errorStyle}>{fieldErrors.d_country}</div>
            )}
          </div>

          <div style={fieldWrap}>
            {/* ===== Maira Edit START: Booking Fix — doc Tel marked required ===== */}
            <label style={labelStyle}>
              Tel/Mobile <span style={{ color: "#c0392b" }}>*</span>
            </label>
            {/* ===== Maira Edit END ===== */}
            <input
              type="text"
              name="tel"
              value={docAddr.tel}
              onChange={handleDoc}
              placeholder="Country code and Tel number"
              className="inspect-input"
              style={inputStyle}
            />
            {fieldErrors.d_tel && (
              <div style={errorStyle}>{fieldErrors.d_tel}</div>
            )}
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Write an additional request</label>
            <textarea
              name="additionalRequest"
              value={docAddr.additionalRequest}
              onChange={handleDoc}
              placeholder="If you have a specific request, write here and we will give you a feedback."
              rows={4}
              className="inspect-textarea"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════ BOOKING REQUEST BUTTON ═══════════ */}
      <div
        id="booking-submit-btn"
        style={{ textAlign: "center", marginTop: 36, paddingBottom: 8 }}
      >
        <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 14 }}>
          Would you like to book this vehicle?
        </p>
        <button
          onClick={handleBookingRequest}
          disabled={submitting}
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "14px",
            background: submitting ? "#e57373" : "#c0392b",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: submitting ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: 700,
            transition: "background 0.2s",
          }}
        >
          {submitting ? "Submitting..." : "Booking Request"}
        </button>
      </div>
    </div>
  );
}
/* ===== Maira Edit END ===== */
