"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getRecentlyViewed } from "@/utils/recentlyViewed";
import { useCurrency } from "@/context/CurrencyContext";

const RecentlyViewed = () => {
  const [history, setHistory] = useState({ carpool: [], other: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("carpool"); // "carpool" or "other"
  const modalRef = useRef(null);
  const { currency, format, convert } = useCurrency();

  const loadHistory = () => {
    setHistory(getRecentlyViewed());
  };

  useEffect(() => {
    loadHistory();
    window.addEventListener("recently_viewed_updated", loadHistory);
    return () => {
      window.removeEventListener("recently_viewed_updated", loadHistory);
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-switch tab if one is empty and the other is not
  useEffect(() => {
    if (history.carpool.length === 0 && history.other.length > 0) {
      setActiveTab("other");
    } else if (history.other.length === 0 && history.carpool.length > 0) {
      setActiveTab("carpool");
    }
  }, [history]);

  const hasHistory = history.carpool.length > 0 || history.other.length > 0;

  if (!hasHistory) {
    return null; // Don't render anything if no history
  }

  const displayItems = history[activeTab];

  const formatPrice = (price, isLowPrice) => {
    if (!price || isNaN(Number(price))) return price || "Ask Price";
    if (currency === "KRW") {
      return `₩${((Number(price) * 10000 + (isLowPrice ? convert(300, "USD") : 0)) / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Million`;
    }
    return format(convert(Number(price) * 10000, "KRW") + (isLowPrice ? convert(300, "USD") : 0));
  };

  return (
    <div style={{ position: "fixed", bottom: "100px", right: "33px", zIndex: 9999 }}>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          backgroundColor: "var(--theme-color-dark)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 14px rgba(64, 95, 242, 0.4)",
          cursor: "pointer",
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
        }}
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark" style={{ fontSize: "18px" }}></i>
        ) : (
          <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: "18px" }}></i>
        )}
      </div>

      {/* Modal */}
      {
        isOpen && (
          <div
            ref={modalRef}
            style={{
              position: "absolute",
              bottom: "80px",
              right: "0",
              width: "360px",
              height: "500px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "slideUpFade 0.3s ease forwards",
              transformOrigin: "bottom right",
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px 20px 15px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <h5 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#050B20" }}>Recently Viewed</h5>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", padding: "0 10px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <button
                onClick={() => setActiveTab("carpool")}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "carpool" ? "2px solid #405FF2" : "2px solid transparent",
                  color: activeTab === "carpool" ? "#405FF2" : "#64748b",
                  fontWeight: activeTab === "carpool" ? "600" : "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Carpool Vehicles ({history.carpool.length})
              </button>
              <button
                onClick={() => setActiveTab("other")}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "other" ? "2px solid #405FF2" : "2px solid transparent",
                  color: activeTab === "other" ? "#405FF2" : "#64748b",
                  fontWeight: activeTab === "other" ? "600" : "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Other Vehicles ({history.other.length})
              </button>
            </div>

            {/* List Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px", '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '10px' } }}>
              {displayItems.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#94a3b8" }}>
                  <i className="fa-regular fa-folder-open" style={{ fontSize: "36px", marginBottom: "10px", opacity: 0.5 }}></i>
                  <p style={{ margin: 0, fontSize: "14px" }}>No history found</p>
                </div>
              ) : (
                displayItems.map((item, index) => (
                  <Link href={item.url} key={`${item.id}-${index}`} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(248, 249, 251, 0.7)",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(248, 249, 251, 0.7)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "60px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          flexShrink: 0,
                          backgroundColor: "#f1f5f9",
                          marginRight: "15px"
                        }}
                      >
                        <img
                          src={item.image.startsWith("http") ? item.image : (activeTab === 'carpool' ? `${process.env.NEXT_PUBLIC_CARS_IMG_SRC_S3 || 'https://media.carpoolkr.com/assets/car/cars'}${item.image}` : `https://ci.encar.com${item.image}`)}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => { e.target.src = "/images/resource/inventory1-6.png" }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h6 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </h6>
                        <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.spec}
                        </p>
                        <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#405FF2" }}>
                          {formatPrice(item.price, item.isLowPrice)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )
      }
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}} />
    </div >
  );
};

export default RecentlyViewed;
