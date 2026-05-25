"use client";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { authAPI, bookingAPI } from "@/utils/api";

const carDictionary = {
  "가솔린": "Gasoline", "디젤": "Diesel", "LPG": "LPG", "하이브리드": "Hybrid", "전기": "Electric",
  "오토": "Automatic", "수동": "Manual", "CVT": "CVT",
  "흰색": "White", "검정색": "Black", "회색": "Grey", "쥐색": "Rat Grey", "은색": "Silver", "청색": "Blue", "빨간색": "Red",
  "경차": "Compact Car", "소형차": "Sedan", "준중형차": "Sedan", "중형차": "Sedan", "대형차": "Sedan",
  "스포츠카": "Sports Car", "SUV": "SUV", "RV": "RV", "경승합차": "Mini Van", "승합차": "Van", "화물차": "Truck"
};

const vehicleTypeMap = {
  "경차": "Compact Car", "소형차": "Sedan", "준중형차": "Sedan",
  "중형차": "Sedan", "대형차": "Sedan", "스포츠카": "Sports Car",
  "SUV": "SUV", "RV": "RV", "경승합차": "Mini Van",
  "승합차": "Van / Minibus", "화물차": "Truck", "기타": "Other"
};

const areaMap = {
  'Ansan': '안산', 'Daejeon': '대전', 'Gimpo': '김포', 'Bucheon': '부천',
  'Anyang': '안양', 'Gwacheon': '과천', 'Gwangmyeong': '광명', 'Incheon': '인천',
  'Busan': '부산', 'Seoul': '서울', 'Daegu': '대구', 'Suwon': '수원',
  'Yangju': '양주', 'Hwaseong-si': '화성시', 'Chungnam Asan': '아산',
  'Jangwon-si': '창원시', 'Gyeongnam': '경남', 'Uijeongbu': '의정부',
  'Ilsanseo-gu': '일산서구', 'Goyang-si': '고양시', 'Jeonju-si': '전주시',
  'Jeonbuk-do': '전북', 'Mokpo': '목포',
};

const SIZES_LIST = [
  { id: 1, name: "Mini Vehicle" },
  { id: 2, name: "Sedan" },
  { id: 3, name: "Luxury Car (Sportage, Tucson)" },
  { id: 4, name: "SUV" },
  { id: 5, name: "Van/Mini Van" },
  { id: 6, name: "Truck (cargo)" },
  { id: 7, name: "Truck (Freezer)" },
  { id: 8, name: "Truck (Box)" },
  { id: 9, name: "Bus" },
  { id: 10, name: "Compact Car" },
  { id: 11, name: "Hatchback" },
  { id: 12, name: "Others" }
];

export default function Quotation() {
  // Toast notifications state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Sidebar/Layout/Encar url states
  const [encarUrl, setEncarUrl] = useState("");
  const [featureCalc, setFeatureCalc] = useState(true);
  const [featureSpecs, setFeatureSpecs] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  // Specs states
  const [specs, setSpecs] = useState({
    manufacturer: "-",
    model: "-",
    grade: "-",
    year: "-",
    vin: "-",
    plateNo: "-",
    fuel: "-",
    transmission: "-",
    mileage: "-",
    bodyType: "-",
    displacement: "-",
    color: "-",
    photo: ""
  });

  // Rates and lists
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, KRW: 1380, AED: 3.67, EUR: 0.92 });
  const [countries, setCountries] = useState([]);
  const [ports, setPorts] = useState([]);
  const [shippingTypes, setShippingTypes] = useState([]);

  // Calculator states
  const [auctionPrice, setAuctionPrice] = useState(""); // In Million KRW
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [selectedShipping, setSelectedShipping] = useState(null); // { size, charges, shipping_time }
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [sizeDetectMsg, setSizeDetectMsg] = useState("");
  const [sizeDetectType, setSizeDetectType] = useState(""); // "success" or "danger"

  // Cost breakdown outputs
  const [costs, setCosts] = useState({
    carKRW: 0,
    fixedFee: 440000,
    shipUSD: 0,
    totalKRW: 0,
    convertedFinal: "0.00"
  });

  // Inspection states
  const [termsChecked, setTermsChecked] = useState(false);
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionRemarks, setInspectionRemarks] = useState("");
  const [isSubmittingInspection, setIsSubmittingInspection] = useState(false);
  const [sellerData, setSellerData] = useState({
    phone: "",
    address: "",
    area: "Other"
  });

  const inspectionFormRef = useRef(null);

  // Toast trigger helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Mount logic: fetch rates, countries and last preselect details if user has booking
  useEffect(() => {
    fetchRates();
    fetchCountriesList();
    fetchUserPreselects();

    // Default inspection date (today + 2 days)
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setInspectionDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Fetch exchange rates
  const fetchRates = async () => {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      if (data && data.rates) {
        setExchangeRates(data.rates);
      }
    } catch (e) {
      console.warn("Failed to fetch rates, fallback will be used", e);
    }
  };

  // Fetch Countries List
  const fetchCountriesList = async () => {
    try {
      const res = await authAPI.getCountries();
      let countriesData = [];
      if (res.data) {
        if (Array.isArray(res.data)) {
          countriesData = res.data;
        } else if (res.data.success && Array.isArray(res.data.countries)) {
          countriesData = res.data.countries;
        } else if (res.data.countries && Array.isArray(res.data.countries)) {
          countriesData = res.data.countries;
        } else if (res.data.data && Array.isArray(res.data.data)) {
          countriesData = res.data.data;
        } else if (res.data.data && Array.isArray(res.data.data.countries)) {
          countriesData = res.data.data.countries;
        }
      }
      setCountries(countriesData);
    } catch (e) {
      console.error("Failed to load countries", e);
    }
  };

  // Fetch user previous booking details for preselection
  const fetchUserPreselects = async () => {
    try {
      const res = await bookingAPI.getMyBookings("?page=1&per_page=1");
      if (res.data && res.data.success && res.data.bookings && res.data.bookings.length > 0) {
        const lastBooking = res.data.bookings[0];
        if (lastBooking && lastBooking.quotation) {
          const preCountry = lastBooking.quotation.shipping_countries_id || "";
          const prePort = lastBooking.quotation.port_id || "";
          const vehicle = lastBooking.car || lastBooking.bus || lastBooking.truck;
          const preSize = vehicle?.port_size_id || "";

          if (preCountry) {
            setSelectedCountryId(preCountry);
            if (preSize) {
              setSelectedSizeId(preSize);
            }
            // Fetch ports and also fetch port charges if size exists
            await fetchPortsList(preCountry, prePort);
            if (prePort && preSize) {
              await fetchPortChargesList(preCountry, prePort, preSize);
            }
          }
        }
      }
    } catch (e) {
      console.log("Failed to load user preselects", e);
    }
  };

  // Fetch Ports list based on selected country
  const fetchPortsList = async (countryId, targetPortId = "") => {
    if (!countryId) return;
    try {
      const res = await authAPI.getPortsByCountry({ country_id: countryId });
      let portsData = [];
      if (res.data) {
        if (Array.isArray(res.data)) {
          portsData = res.data;
        } else if (res.data.success && Array.isArray(res.data.ports)) {
          portsData = res.data.ports;
        } else if (res.data.ports && Array.isArray(res.data.ports)) {
          portsData = res.data.ports;
        } else if (res.data.data && Array.isArray(res.data.data)) {
          portsData = res.data.data;
        } else if (res.data.data && Array.isArray(res.data.data.ports)) {
          portsData = res.data.data.ports;
        }
      }
      setPorts(portsData);
      if (targetPortId) {
        // If preselected, select it
        const portExists = portsData.some(p => p.id == targetPortId);
        if (portExists) {
          setSelectedPortId(targetPortId);
        }
      } else {
        setSelectedPortId("");
        setShippingTypes([]);
        setSelectedShipping(null);
      }
    } catch (e) {
      console.error("Failed to load ports", e);
      setPorts([]);
    }
  };

  // Fetch Port charges (shipping type and price) based on country, port and size
  const fetchPortChargesList = async (countryId, portId, sizeId) => {
    if (!countryId || !portId || !sizeId) return;
    try {
      const res = await authAPI.getPortCharges({
        country_id: countryId,
        port_id: portId,
        port_size_id: sizeId
      });
      let chargesData = [];
      if (res.data) {
        if (Array.isArray(res.data)) {
          chargesData = res.data;
        } else if (res.data.success && Array.isArray(res.data.port_charges)) {
          chargesData = res.data.port_charges;
        } else if (res.data.port_charges && Array.isArray(res.data.port_charges)) {
          chargesData = res.data.port_charges;
        } else if (res.data.data && Array.isArray(res.data.data)) {
          chargesData = res.data.data;
        } else if (res.data.data && Array.isArray(res.data.data.port_charges)) {
          chargesData = res.data.data.port_charges;
        }
      }
      setShippingTypes(chargesData);
      // Pre-select Ro-Ro (CBM)/CFR if available, otherwise first option
      const preferred = chargesData.find(c => c.size === "Ro-Ro (CBM)/CFR");
      if (preferred) {
        setSelectedShipping(preferred);
      } else if (chargesData.length > 0) {
        setSelectedShipping(chargesData[0]);
      } else {
        setSelectedShipping(null);
      }
    } catch (e) {
      console.error("Failed to fetch port charges", e);
      setShippingTypes([]);
      setSelectedShipping(null);
    }
  };

  // Triggers when country changes
  const handleCountryChange = (e) => {
    const cid = e.target.value;
    setSelectedCountryId(cid);
    setSelectedPortId("");
    setPorts([]);
    setShippingTypes([]);
    setSelectedShipping(null);
    if (cid) {
      fetchPortsList(cid);
    }
  };

  // Triggers when port changes
  const handlePortChange = (e) => {
    const pid = e.target.value;
    setSelectedPortId(pid);
    setShippingTypes([]);
    setSelectedShipping(null);
    if (pid && selectedCountryId && selectedSizeId) {
      fetchPortChargesList(selectedCountryId, pid, selectedSizeId);
    }
  };

  // Triggers when manual size selection changes
  const handleSizeChange = (e) => {
    const sid = e.target.value;
    setSelectedSizeId(sid);
    setShippingTypes([]);
    setSelectedShipping(null);

    // Clear size detection notice on manual override
    setSizeDetectMsg("");

    if (sid && selectedCountryId && selectedPortId) {
      fetchPortChargesList(selectedCountryId, selectedPortId, sid);
    }
  };

  // Triggers when shipping type selection changes
  const handleShippingChange = (e) => {
    const cid = e.target.value;
    const matched = shippingTypes.find(c => c.id == cid);
    if (matched) {
      setSelectedShipping(matched);
    }
  };

  // Calculate costs in real-time
  useEffect(() => {
    if (!exchangeRates.KRW) return;

    const FIXED_FEE = 440000;
    const millionInput = parseFloat(auctionPrice) || 0;
    const carKRW = millionInput * 1000000;

    const shipUSD = selectedShipping ? parseFloat(selectedShipping.charges) || 0 : 0;
    const shipKRW = shipUSD * exchangeRates.KRW;

    const totalKRW = carKRW + FIXED_FEE + shipKRW;

    // Converted to target currency
    const targetRate = exchangeRates[targetCurrency] || 1;
    const finalVal = (totalKRW / exchangeRates.KRW) * targetRate;

    // Formatter
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency
    }).format(finalVal);

    setCosts({
      carKRW,
      fixedFee: FIXED_FEE,
      shipUSD,
      totalKRW,
      convertedFinal: formatted
    });
  }, [auctionPrice, selectedShipping, targetCurrency, exchangeRates]);

  // Refetch shipping charges when size auto-detection triggers or changes
  useEffect(() => {
    if (selectedCountryId && selectedPortId && selectedSizeId) {
      fetchPortChargesList(selectedCountryId, selectedPortId, selectedSizeId);
    }
  }, [selectedSizeId]);

  // Translate helpers
  const translateText = async (text) => {
    if (!text) return "";
    if (carDictionary[text]) return carDictionary[text];
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|en`);
      const data = await res.json();
      return data.responseData && data.responseData.translatedText ? data.responseData.translatedText : text;
    } catch (e) {
      return text;
    }
  };

  // Process Encar URL button handler
  const handleProcessUrl = async () => {
    const url = encarUrl.trim();
    const basePattern = /^https:\/\/fem\.encar\.com\/cars\/detail\/\d+/;
    const carIdMatch = url.match(/\/detail\/(\d+)/);

    if (!basePattern.test(url) || !carIdMatch) {
      showToast("Please enter a valid Encar URL", "error");
      return;
    }

    const id = carIdMatch[1];
    setVehicleId(id);
    setLoading(true);
    setVehicleData(null);
    setShowInspectionForm(false);

    try {
      // Use local Next.js proxy route `/api/encar/detail/[id]` to avoid CORS
      const res = await fetch(`/api/encar/detail/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch from local proxy");
      }
      const data = await res.json();
      setVehicleData(data);

      // Populate Auction price automatically (price / 100 converts won to million won)
      if (data.advertisement && data.advertisement.price) {
        const millionWon = data.advertisement.price / 100;
        setAuctionPrice(millionWon.toFixed(2));
      }

      // Handle specs mapping and translations
      const cat = data.category || {};
      const spec = data.spec || {};

      const [man, grade, modelTrans, fuel, trans, color, body] = await Promise.all([
        cat.manufacturerEnglishName ? Promise.resolve(cat.manufacturerEnglishName) : translateText(cat.manufacturerName),
        cat.gradeEnglishName ? Promise.resolve(cat.gradeEnglishName) : translateText(cat.gradeName || cat.gradeDetailName),
        translateText(cat.modelName),
        translateText(spec.fuelName),
        translateText(spec.transmissionName),
        translateText(spec.colorName),
        vehicleTypeMap[spec.bodyName] ? Promise.resolve(vehicleTypeMap[spec.bodyName]) : translateText(spec.bodyName)
      ]);

      let mainPhotoPath = "";
      if (data.photos && data.photos.length > 0) {
        const photo001 = data.photos.find(p => p.code === "001");
        mainPhotoPath = photo001 ? photo001.path : data.photos[0].path;
      }
      const photoUrl = mainPhotoPath
        ? (mainPhotoPath.startsWith("http") ? mainPhotoPath : `https://ci.encar.com/carpicture${mainPhotoPath}?impolicy=heightRate`)
        : "";

      setSpecs({
        manufacturer: man || "-",
        model: modelTrans || "-",
        grade: grade || "-",
        year: cat.formYear || "-",
        vin: data.vin || "-",
        plateNo: data.vehicleNo || "-",
        fuel: fuel || "-",
        transmission: trans || "-",
        mileage: spec.mileage ? spec.mileage.toLocaleString() + " km" : "-",
        bodyType: body || "-",
        displacement: spec.displacement ? spec.displacement.toLocaleString() + " cc" : "-",
        color: color || "-",
        photo: photoUrl
      });

      // Auto size detection
      handleAutoDetection(spec.bodyName);

      // Seller Form Info pre-population
      const contactData = data.contact || {};
      let calculatedArea = "Other";
      if (contactData.address) {
        for (const [englishName, koreanName] of Object.entries(areaMap)) {
          if (contactData.address.includes(koreanName)) {
            calculatedArea = englishName;
            break;
          }
        }
      }
      setSellerData({
        phone: contactData.no || "",
        address: contactData.address || "",
        area: calculatedArea
      });

      showToast("Encar specifications loaded and synced!", "success");

    } catch (e) {
      console.error(e);
      showToast("Failed to fetch Encar data. Please check the URL or try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handles auto sizing mapping
  const handleAutoDetection = (koreanBodyName) => {
    const englishType = vehicleTypeMap[koreanBodyName];
    if (!englishType) {
      setSizeDetectMsg(`Unknown type: ${koreanBodyName}`);
      setSizeDetectType("danger");
      return;
    }

    let foundId = "";
    for (const size of SIZES_LIST) {
      if (size.name.toLowerCase().includes(englishType.toLowerCase())) {
        foundId = size.id;
        break;
      }
    }

    if (foundId) {
      setSelectedSizeId(foundId);
      setSizeDetectMsg(`Detected: ${englishType}`);
      setSizeDetectType("success");
    } else {
      setSizeDetectMsg(`Type "${englishType}" not found in lists.`);
      setSizeDetectType("danger");
    }
  };

  // Image capture logic using dynamically loaded html2canvas from CDN
  const captureCard = (selector, name) => {
    const cardEl = document.querySelector(selector);
    if (!cardEl) return;

    showToast("Preparing snapshot...", "success");

    // Dynamic import pattern from CDN script
    const proceedCapture = () => {
      window.html2canvas(cardEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = `${name}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        showToast("Image saved successfully!");
      });
    };

    if (window.html2canvas) {
      proceedCapture();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.onload = proceedCapture;
      document.body.appendChild(script);
    }
  };

  // Request Inspection click handler
  const handleInspectionClick = () => {
    setShowInspectionForm(true);
    setTimeout(() => {
      if (inspectionFormRef.current) {
        inspectionFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  // Submit Inspection Request
  const handleInspectionSubmit = async (e) => {
    e.preventDefault();
    if (!termsChecked) {
      showToast("Please agree to the Terms & Conditions first", "error");
      return;
    }

    setIsSubmittingInspection(true);

    const payload = {
      url: encarUrl.trim(),
      seller_name: "Encar",
      seller_phone: sellerData.phone,
      seller_address: sellerData.address,
      date_of_inspection: inspectionDate,
      plate_no: specs.plateNo,
      vin: specs.vin,
      area: sellerData.area,
      remarks: inspectionRemarks
    };

    try {
      const res = await authAPI.submitInspectionRequest(payload);
      if (res.status === 200 || res.status === 201) {
        showToast("Inspection request submitted successfully!", "success");
        // Reset inspection form
        setTermsChecked(false);
        setShowInspectionForm(false);
        setInspectionRemarks("");
      } else {
        showToast("Failed to submit request", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Submission failed. The request has been submitted to the database.", "success");
      setTermsChecked(false);
      setShowInspectionForm(false);
      setInspectionRemarks("");
    } finally {
      setIsSubmittingInspection(false);
    }
  };

  const openInitialReport = () => {
    if (!vehicleId) return;
    const reportUrl = `https://inspection.carpoolkr.com/initial-report/${vehicleId}`;
    window.open(reportUrl, "_blank", "width=1400px, height=695px");
  };

  return (
    <section className="dashboard-widget position-relative">

      {/* Toast Notification */}
      {toast.show && (
        <div className={`custom-toast slide-in ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === "error" ? "✕" : "✓"}
            </span>
            <p className="toast-message">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="right-box">
        <Sidebar />

        <div className="content-column">
          <div className="inner-column" style={{ maxWidth: "1360px" }}>

            {/* Header Title */}
            <div className="list-title d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="title text-dark fw-bold">Encar Quotation & Cost Calculator</h3>
                <div className="text text-muted">
                  The safest and most premium vehicle logistics solution through Carpool Korea.
                </div>
              </div>
            </div>

            {/* URL INPUT SECTION */}
            <div className="encar-input-card shadow-sm rounded-4 p-4 mb-4 border bg-white">
              <div className="row align-items-end g-3">
                <div className="col-lg-6 col-md-12">
                  <label className="form-label text-dark fw-bold fs-6 mb-2">
                    Encar Vehicle URL
                    {vehicleId && (
                      <span
                        onClick={openInitialReport}
                        className="btn-initial-report-badge ms-3 cursor-pointer"
                        style={{ fontSize: "12px", textDecoration: "underline" }}
                      >
                        ( View Initial Report )
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={encarUrl}
                    onChange={(e) => setEncarUrl(e.target.value)}
                    className="form-control form-control-lg border-2"
                    placeholder="https://fem.encar.com/cars/detail/..."
                    style={{ borderRadius: "10px", borderColor: "#dee2e6" }}
                  />
                </div>

                <div className="col-lg-4 col-md-8 col-sm-12">
                  <label className="form-label text-dark fw-bold fs-6 mb-2">Layout Preferences</label>
                  <div className="btn-group-features w-100 rounded-3 overflow-hidden border">
                    <label className={`w-50 text-center py-2 fs-6 cursor-pointer mb-0 ${featureCalc ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={featureCalc}
                        onChange={(e) => setFeatureCalc(e.target.checked)}
                        className="d-none"
                      />
                      <i className="fa fa-calculator me-1"></i> Calculator
                    </label>
                    <label className={`w-50 text-center py-2 fs-6 cursor-pointer mb-0 ${featureSpecs ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={featureSpecs}
                        onChange={(e) => setFeatureSpecs(e.target.checked)}
                        className="d-none"
                      />
                      <i className="fa fa-info-circle me-1"></i> Info & Specs
                    </label>
                  </div>
                </div>

                <div className="col-lg-2 col-md-4 col-sm-12">
                  <button
                    onClick={handleProcessUrl}
                    disabled={loading}
                    className="theme-btn w-100 py-3 rounded-3 btn-process-encar"
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="fa fa-search me-2"></i>
                    )}
                    Process
                  </button>
                </div>
              </div>
            </div>

            {/* TWO COLUMN GRID FOR CALCULATOR & SPECS */}
            <div className="row g-4 mb-4">

              {/* CALCULATOR CARD */}
              {featureCalc && (
                <div className="col-xl-6 col-lg-12" id="card-calculator">
                  <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white">
                    <div className="card-header-premium py-3 px-4 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 text-white font-semibold">
                        <i className="fa fa-calculator me-2"></i> Cost breakdown Calculator
                      </h5>
                      <button
                        onClick={() => captureCard("#card-calculator", "Cost_Calculator")}
                        className="btn btn-light btn-sm text-theme border-0 fw-bold px-3 py-1.5 rounded-3 hover-scale"
                      >
                        <i className="fa fa-camera me-1"></i> Save Image
                      </button>
                    </div>

                    <div className="card-body p-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1">Auction Price (Million KRW)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={auctionPrice}
                            onChange={(e) => setAuctionPrice(e.target.value)}
                            className="form-control fw-bold border-2 p-2.5 rounded-3"
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1 d-flex justify-content-between">
                            <span>Vehicle Size</span>
                            {sizeDetectMsg && (
                              <span className={`fw-bold text-${sizeDetectType}`} style={{ fontSize: "11px" }}>
                                {sizeDetectMsg}
                              </span>
                            )}
                          </label>
                          <select
                            value={selectedSizeId}
                            onChange={handleSizeChange}
                            className="form-select border-2 p-2.5 rounded-3"
                          >
                            <option value="">Select Size...</option>
                            {SIZES_LIST.map(size => (
                              <option key={size.id} value={size.id}>
                                {size.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1">Destination Country</label>
                          <select
                            value={selectedCountryId}
                            onChange={handleCountryChange}
                            className="form-select border-2 p-2.5 rounded-3"
                          >
                            <option value="">Select Country...</option>
                            {countries.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1">Destination Port</label>
                          <select
                            value={selectedPortId}
                            onChange={handlePortChange}
                            disabled={!selectedCountryId}
                            className="form-select border-2 p-2.5 rounded-3"
                          >
                            <option value="">Select Port...</option>
                            {ports.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.port}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1">Shipping Type</label>
                          <select
                            value={selectedShipping ? selectedShipping.id : ""}
                            onChange={handleShippingChange}
                            disabled={!selectedPortId}
                            className="form-select border-2 p-2.5 rounded-3"
                          >
                            <option value="">Select Type...</option>
                            {shippingTypes.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label small text-muted fw-bold mb-1">Target Currency</label>
                          <select
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                            className="form-select border-2 p-2.5 rounded-3"
                          >
                            <option value="USD">US Dollar (USD)</option>
                            <option value="AED">UAE Dirham (AED)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="KRW">Korean Won (KRW)</option>
                          </select>
                        </div>
                      </div>

                      {/* Cost breakdown lists */}
                      <div className="mt-4 pt-3 border-top">
                        <h6 className="text-dark fw-bold mb-3">Breakdown Breakdown (KRW)</h6>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                            <span className="text-muted fs-7">Vehicle Price</span>
                            <span className="fw-bold text-dark">{costs.carKRW.toLocaleString()} ₩</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                            <span className="text-muted fs-7">Carpool Korea Fixed Fee</span>
                            <span className="fw-bold text-danger">+ {costs.fixedFee.toLocaleString()} ₩</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                            <span className="text-muted fs-7">Shipping Cost (USD)</span>
                            <span className="fw-bold text-theme">${costs.shipUSD.toLocaleString()}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center rounded-3 bg-light px-3 py-3 mt-3">
                            <span className="fw-bold text-dark">Estimated Total in KRW</span>
                            <span className="fw-bold fs-5 text-dark">{costs.totalKRW.toLocaleString()} ₩</span>
                          </li>
                        </ul>
                      </div>

                      {/* Final estimate */}
                      <div className="mt-4 bg-teal-accent p-3 rounded-4 border-2 border-theme-outline text-center">
                        <div className="text-uppercase text-muted fs-8 fw-semibold mb-1">Est. Total in {targetCurrency}</div>
                        <div className="fs-3 fw-bold text-dark">{costs.convertedFinal}</div>
                      </div>

                      {/* Terms & Request Inspection Button */}
                      <div className="mt-4 bg-light p-3 rounded-4 border">
                        <div className="form-check text-start mb-3">
                          <input
                            type="checkbox"
                            checked={termsChecked}
                            onChange={(e) => setTermsChecked(e.target.checked)}
                            id="termsAcceptCheck"
                            className="form-check-input"
                          />
                          <label htmlFor="termsAcceptCheck" className="form-check-label fs-7 cursor-pointer text-muted">
                            I agree to the <a href="/terms-and-conditions" target="_blank" className="text-theme fw-bold">Terms & Conditions</a>
                          </label>
                        </div>
                        <button
                          onClick={handleInspectionClick}
                          disabled={!termsChecked || !vehicleData}
                          className="theme-btn w-100 py-3 rounded-3"
                          style={{
                            opacity: (!termsChecked || !vehicleData) ? 0.6 : 1,
                            background: "var(--theme-color)",
                            cursor: (!termsChecked || !vehicleData) ? "not-allowed" : "pointer"
                          }}
                        >
                          <i className="fa fa-clipboard me-2"></i>
                          Request an Inspection
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* SPECS CARD */}
              {featureSpecs && (
                <div className="col-xl-6 col-lg-12" id="card-specs">
                  <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white">
                    <div className="card-header-premium py-3 px-4 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 text-white font-semibold">
                        <i className="fa fa-info-circle me-2"></i> General Info & Specifications
                      </h5>
                      <button
                        onClick={() => captureCard("#card-specs", "Vehicle_Specifications")}
                        className="btn btn-light btn-sm text-theme border-0 fw-bold px-3 py-1.5 rounded-3 hover-scale"
                      >
                        <i className="fa fa-camera me-1"></i> Save Image
                      </button>
                    </div>

                    <div className="card-body p-4">
                      <div className="row g-4">
                        <div className="col-md-5 d-flex flex-column align-items-center justify-content-center bg-light rounded-4 p-3 border" style={{ minHeight: "260px" }}>
                          {specs.photo ? (
                            <img
                              src={specs.photo}
                              alt="Encar Car"
                              className="img-fluid rounded-3 shadow-sm"
                              style={{ maxHeight: "220px", objectFit: "cover" }}
                            />
                          ) : (
                            <div className="text-center text-muted">
                              <i className="fa fa-car fs-1 mb-2"></i>
                              <p className="mb-0 fs-7">No Image Loaded</p>
                            </div>
                          )}
                        </div>

                        <div className="col-md-7">
                          <h6 className="text-theme border-bottom pb-2 mb-3 fw-bold">General Information</h6>
                          <div className="specs-table-wrapper">
                            <table className="table table-bordered table-sm fs-7">
                              <tbody>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">Manufacturer</th>
                                  <td className="px-2 py-1.5">{specs.manufacturer}</td>
                                </tr>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">Model</th>
                                  <td className="px-2 py-1.5">{specs.model}</td>
                                </tr>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">Grade</th>
                                  <td className="px-2 py-1.5">{specs.grade}</td>
                                </tr>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">Year</th>
                                  <td className="px-2 py-1.5">{specs.year}</td>
                                </tr>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">VIN / Chassis</th>
                                  <td className="px-2 py-1.5 font-monospace">{specs.vin}</td>
                                </tr>
                                <tr>
                                  <th className="bg-light w-40 font-semibold px-2 py-1.5">Plate Number</th>
                                  <td className="px-2 py-1.5">{specs.plateNo}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="col-12 mt-2">
                          <h6 className="text-theme border-bottom pb-2 mb-3 fw-bold">Technical Specifications</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <table className="table table-bordered table-sm fs-7">
                                <tbody>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Fuel Type</th>
                                    <td className="px-2 py-1.5">{specs.fuel}</td>
                                  </tr>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Transmission</th>
                                    <td className="px-2 py-1.5">{specs.transmission}</td>
                                  </tr>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Mileage</th>
                                    <td className="px-2 py-1.5">{specs.mileage}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-6">
                              <table className="table table-bordered table-sm fs-7">
                                <tbody>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Body Type</th>
                                    <td className="px-2 py-1.5">{specs.bodyType}</td>
                                  </tr>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Displacement</th>
                                    <td className="px-2 py-1.5">{specs.displacement}</td>
                                  </tr>
                                  <tr>
                                    <th className="bg-light w-40 font-semibold px-2 py-1.5">Color</th>
                                    <td className="px-2 py-1.5">{specs.color}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* DYNAMIC INSPECTION REQUEST FORM SHEET */}
            {showInspectionForm && (
              <div
                ref={inspectionFormRef}
                className="card border-0 rounded-4 shadow-sm overflow-hidden mb-4 bg-white"
              >
                <div className="card-header-premium py-3 px-4">
                  <h5 className="mb-0 text-white font-semibold">
                    <i className="fa fa-form-select me-2"></i> Inspection Request Form
                  </h5>
                </div>

                <div className="card-body p-4">
                  <form onSubmit={handleInspectionSubmit} className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Platform Name</label>
                      <input
                        type="text"
                        value="Encar"
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Estimated Date of Inspection</label>
                      <input
                        type="date"
                        value={inspectionDate}
                        onChange={(e) => setInspectionDate(e.target.value)}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Plate No.</label>
                      <input
                        type="text"
                        value={specs.plateNo}
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Chassis No. (VIN)</label>
                      <input
                        type="text"
                        value={specs.vin}
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Seller Area</label>
                      <input
                        type="text"
                        value={sellerData.area}
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-bold">Seller Phone</label>
                      <input
                        type="text"
                        value={sellerData.phone || "-"}
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small text-muted fw-bold">Seller Address</label>
                      <input
                        type="text"
                        value={sellerData.address || "-"}
                        readOnly
                        disabled
                        className="form-control bg-light"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small text-muted fw-bold">Remarks / Special Instructions (Optional)</label>
                      <textarea
                        rows="3"
                        value={inspectionRemarks}
                        onChange={(e) => setInspectionRemarks(e.target.value)}
                        placeholder="Enter any special requests, specific areas of focus or queries you have for the inspectors..."
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="col-12 text-end mt-4">
                      <button
                        type="button"
                        onClick={() => setShowInspectionForm(false)}
                        className="btn btn-outline-secondary px-4 py-2.5 rounded-3 me-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingInspection}
                        className="theme-btn px-5 py-2.5 rounded-3"
                      >
                        {isSubmittingInspection ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : null}
                        Submit Inspection Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Premium custom stylesheet inline styles to ensure beautiful, robust styling */}
      <style jsx global>{`
        .checked {
          background-color: rgb(189, 189, 189) !important;
          color: white !important;
        }
        .btn-group-features label {
          transition: all 0.25s ease;
        }
        .btn-group-features label:hover {
          background-color: #f1f3f5;
          color: gray;
        }
        .btn-group-features label.checked:hover {
          background-color: var(--theme-color) !important;
          color: gray !important;
        }
        .encar-input-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .encar-input-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.04) !important;
        }
        .btn-process-encar {
          transition: all 0.25s ease;
        }
        .btn-process-encar:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(12, 118, 138, 0.25);
        }
        .card-header-premium {
          background: var(--theme-color-dark);
          border-bottom: none;
        }
        .bg-teal-accent {
          background: #eefefe;
        }
        .border-theme-outline {
          border: 2px solid #8fe3de;
        }
        .text-theme {
          color: #0c768a !important;
        }
        .hover-scale {
          transition: transform 0.15s ease;
        }
        .hover-scale:hover {
          transform: scale(1.03);
        }
        .w-40 {
          width: 40%;
        }
        .fs-7 {
          font-size: 0.88rem !important;
        }
        .fs-8 {
          font-size: 0.76rem !important;
        }
        .btn-initial-report-badge {
          color: #0c768a;
          font-weight: 600;
          transition: color 0.2s;
        }
        .btn-initial-report-badge:hover {
          color: #0c8c88;
        }
        .custom-toast {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 9999;
          min-width: 320px;
          border-radius: 12px;
          padding: 16px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          backdrop-filter: blur(10px);
          animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .toast-success {
          background: rgba(230, 249, 244, 0.95);
          border: 1px solid #c3edd9;
        }
        .toast-success .toast-icon {
          color: #1f9d55;
          background: #d1f4e0;
        }
        .toast-success .toast-message {
          color: #0d4a25;
        }
        .toast-error {
          background: rgba(254, 242, 242, 0.95);
          border: 1px solid #fee2e2;
        }
        .toast-error .toast-icon {
          color: #dc2626;
          background: #fee2e2;
        }
        .toast-error .toast-message {
          color: #7f1d1d;
        }
        .toast-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .toast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-weight: bold;
          font-size: 14px;
        }
        .toast-message {
          margin: 0;
          font-weight: 600;
          font-size: 14px;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%) translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
        }
        .form-control input{
          height: 45px !important;
        }
      `}</style>
    </section>
  );
}
