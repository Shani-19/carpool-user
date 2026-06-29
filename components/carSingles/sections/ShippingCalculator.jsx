"use client";
import React, { useState, useEffect } from "react";
import { authAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function ShippingCalculator({ vehicleItem, displayPrice }) {
  const { user } = useAuth();
  const { currency, format, convert } = useCurrency();

  const [countries, setCountries] = useState([]);
  const [ports, setPorts] = useState([]);
  const [shippingTypes, setShippingTypes] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [selectedShippingId, setSelectedShippingId] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingPorts, setLoadingPorts] = useState(false);
  const [loadingCharges, setLoadingCharges] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCountriesList();
    }
  }, [user]);

  const fetchCountriesList = async () => {
    try {
      setLoadingCountries(true);
      const res = await authAPI.getCountries();
      let countriesData = [];
      if (res.data) {
        if (Array.isArray(res.data)) countriesData = res.data;
        else if (res.data.success && Array.isArray(res.data.countries)) countriesData = res.data.countries;
        else if (res.data.countries && Array.isArray(res.data.countries)) countriesData = res.data.countries;
        else if (res.data.data && Array.isArray(res.data.data)) countriesData = res.data.data;
        else if (res.data.data && Array.isArray(res.data.data.countries)) countriesData = res.data.data.countries;
      }
      setCountries(countriesData);
    } catch (e) {
      console.error("Failed to load countries", e);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchPortsList = async (countryId) => {
    if (!countryId) return;
    try {
      setLoadingPorts(true);
      const res = await authAPI.getPortsByCountry({ country_id: countryId });
      let portsData = [];
      if (res.data) {
        if (Array.isArray(res.data)) portsData = res.data;
        else if (res.data.success && Array.isArray(res.data.ports)) portsData = res.data.ports;
        else if (res.data.ports && Array.isArray(res.data.ports)) portsData = res.data.ports;
        else if (res.data.data && Array.isArray(res.data.data)) portsData = res.data.data;
        else if (res.data.data && Array.isArray(res.data.data.ports)) portsData = res.data.data.ports;
      }
      setPorts(portsData);
    } catch (e) {
      console.error("Failed to load ports", e);
      setPorts([]);
    } finally {
      setLoadingPorts(false);
    }
  };

  const vType = vehicleItem?.vehicle_type || vehicleItem?.spec?.bodyName || vehicleItem?.spec?.BodyName || "";
  const fetchPortChargesList = async (countryId, portId) => {
    if (!countryId || !portId) return;
    try {
      setLoadingCharges(true);

      let sizeId = 12; // Default to 'Others'

      // Fallback to raw spec.bodyName if vehicle_type isn't properly normalized

      if (vehicleItem?.port_size) {
        sizeId = vehicleItem.port_size;
      } else {
        if (vType === "Compact Car" || vType === "경차") sizeId = 10;
        else if (vType === "Sedan" || vType === "Sports Car" || ["소형차", "준중형차", "중형차", "대형차", "스포츠카"].includes(vType)) sizeId = 2;
        else if (vType === "SUV" || vType === "RV" || ["SUV", "RV"].includes(vType)) sizeId = 4;
        else if (vType === "Mini Van" || vType === "Van / Minibus" || ["경승합차", "승합차"].includes(vType)) sizeId = 5;
        else if (vType === "Truck" || vType === "화물차") sizeId = 6;
      }

      const res = await authAPI.getPortCharges({
        country_id: countryId,
        port_id: portId,
        port_size_id: sizeId
      });
      let chargesData = [];
      if (res.data) {
        if (Array.isArray(res.data)) chargesData = res.data;
        else if (res.data.success && Array.isArray(res.data.port_charges)) chargesData = res.data.port_charges;
        else if (res.data.port_charges && Array.isArray(res.data.port_charges)) chargesData = res.data.port_charges;
        else if (res.data.data && Array.isArray(res.data.data)) chargesData = res.data.data;
        else if (res.data.data && Array.isArray(res.data.data.port_charges)) chargesData = res.data.data.port_charges;
      }
      setShippingTypes(chargesData);
    } catch (e) {
      console.error("Failed to fetch port charges", e);
      setShippingTypes([]);
    } finally {
      setLoadingCharges(false);
    }
  };

  const handleCountryChange = (e) => {
    const cid = e.target.value;
    setSelectedCountryId(cid);
    setSelectedPortId("");
    setSelectedShippingId("");
    setShippingCost(0);
    setPorts([]);
    setShippingTypes([]);
    if (cid) {
      fetchPortsList(cid);
    }
  };

  const handlePortChange = (e) => {
    const pid = e.target.value;
    setSelectedPortId(pid);
    setSelectedShippingId("");
    setShippingCost(0);
    setShippingTypes([]);
    if (pid && selectedCountryId) {
      fetchPortChargesList(selectedCountryId, pid);
    }
  };

  const handleShippingChange = (e) => {
    const sid = e.target.value;
    setSelectedShippingId(sid);
    const matched = shippingTypes.find(c => c.id == sid);
    if (matched) {
      setShippingCost(matched.charges || 0);
    } else {
      setShippingCost(0);
    }
  };

  let vehiclePriceVal, shippingCostVal, totalCostVal;
  if (vehicleItem?.port_size) {

    vehiclePriceVal = vehicleItem?.price;
    shippingCostVal = convert(shippingCost, "USD");
    totalCostVal = vehiclePriceVal + shippingCostVal;

  } else {
    // Compute final values dynamically based on current selected currency
    vehiclePriceVal = vehicleItem?.price ? (convert(vehicleItem.price * 10000, "KRW") + (vehicleItem.isLowPrice ? convert(300, "USD") : 0)) : 0;
    shippingCostVal = convert(shippingCost, "USD");
    totalCostVal = vehiclePriceVal + shippingCostVal;

  }

  const handleBookNow = () => {
    const countryName = countries.find(c => c.id == selectedCountryId)?.name || "";
    const portName = ports.find(p => p.id == selectedPortId)?.port || "";
    const chargeName = shippingTypes.find(c => c.id == selectedShippingId)?.size || "";

    const vName = vehicleItem?.name || "Vehicle Name";
    const vin = vehicleItem?.vin || "-";
    const vNo = vehicleItem?.vehicle_no || "-";
    const vId = vehicleItem?.id || "-";

    const msg = `Hello, I want to book this vehicle:
      *Vehicle Name*: ${vName}
      *VIN*: ${vin}
      *Vehicle No*: ${vNo}
      *Vehicle Type*: ${vType}
      *Country*: ${countryName}
      *Port*: ${portName}
      *Shipping Type*: ${chargeName}
      *Vehicle Price*: ${format(vehiclePriceVal)}
      *Shipping Cost*: ${chargeName ? format(shippingCostVal) : "-"}
      *Estimated Total*: ${chargeName ? format(totalCostVal) : "-"}
      *Vehicle ID*: ${vId}
      *URL*: ${window.location.href}`;

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/971529265632?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="financing-calculator-box p-4 mt-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
      <div className="d-flex align-items-center mb-3">
        <div className="icon-box d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}>
          <i className="fa-solid fa-ship fs-5" style={{ color: '#405FF2' }}></i>
        </div>
        <h5 className="title mb-0" style={{ fontSize: '18px', fontWeight: '700' }}>Shipping Calculator</h5>
      </div>

      {!user ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm border mt-3">
          <i className="fa-solid fa-lock text-muted fs-3 mb-2"></i>
          <p className="mb-2 fw-medium text-dark" style={{ fontSize: '16px' }}>Please login to view shipping options</p>
          <p className="small text-muted mb-0">Members get access to real-time shipping costs and port selection.</p>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="mt-4">
          <div className="row g-3">
            <div className="col-12">
              <label className="mb-1 fw-medium" style={{ fontSize: '13px', color: '#475569' }}>Destination Country</label>
              <select
                value={selectedCountryId}
                onChange={handleCountryChange}
                className="form-control"
                style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', appearance: 'auto', backgroundColor: '#fff' }}
                disabled={loadingCountries}
              >
                <option value="">Select Country</option>
                {countries.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="mb-1 fw-medium" style={{ fontSize: '13px', color: '#475569' }}>Destination Port</label>
              <select
                value={selectedPortId}
                onChange={handlePortChange}
                className="form-control"
                style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', appearance: 'auto', backgroundColor: '#fff' }}
                disabled={loadingPorts || !selectedCountryId}
              >
                <option value="">Select Port</option>
                {ports.map(p => (
                  <option key={p.id} value={p.id}>{p.port}</option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="mb-1 fw-medium" style={{ fontSize: '13px', color: '#475569' }}>Shipping Type</label>
              <select
                value={selectedShippingId}
                onChange={handleShippingChange}
                className="form-control"
                style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '100%', appearance: 'auto', backgroundColor: '#fff' }}
                disabled={loadingCharges || !selectedPortId}
              >
                <option value="">Select Shipping Type</option>
                {shippingTypes.map(c => (
                  <option key={c.id} value={c.id}>{c.size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-3 border" style={{ borderColor: '#e2e8f0' }}>
            <ul className="mb-0" style={{ padding: 0, listStyle: 'none' }}>
              <li className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '14px' }}>
                <span className="text-secondary">Vehicle Price</span>
                <strong className="text-dark fs-6">{format(displayPrice)}</strong>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3" style={{ fontSize: '14px' }}>
                <span className="text-secondary">Shipping Cost</span>
                <strong className="text-dark fs-6">{shippingCost > 0 ? format(shippingCostVal) : '-'}</strong>
              </li>
              <li className="d-flex justify-content-between align-items-center pt-3" style={{ fontSize: '15px', borderTop: '1px dashed #cbd5e1' }}>
                <span className="text-dark fw-bold">Estimated Total</span>
                <strong className="fw-bold fs-5" style={{ color: '#405FF2' }}>{shippingCost > 0 ? format(totalCostVal) : '-'}</strong>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleBookNow}
              className="btn w-100 d-flex justify-content-center align-items-center hover-scale"
              style={{ background: '#25D366', color: '#fff', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: '600', fontSize: '15px', transition: 'all 0.3s ease' }}
            >
              <i className="fa-brands fa-whatsapp fs-5 me-2"></i> Discuss Booking
            </button>
            <p className="text-center mt-2 mb-0 text-muted" style={{ fontSize: '11px' }}>
              <i className="fa-solid fa-circle-info me-1"></i> Opens WhatsApp with your selection
            </p>
            {vehicleItem?.slug && (
              <a
                href={`/book/${vehicleItem.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-100 d-flex justify-content-center align-items-center mt-3"
                style={{ background: '#405FF2', color: '#fff', padding: '14px', borderRadius: '10px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', transition: 'all 0.3s ease' }}
              >
                <i className="fa-solid fa-calendar-check me-2"></i> Book Now
              </a>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
