"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/headers/Header";
import Footer from "@/components/footers/Footer";
import EncarSingle from "@/components/carSingles/EncarSingle";
import { getEncarVehicleDetail, normalizeEncarDetail } from "@/utils/vehicles/encarAPI";

export default function EncarDetailPage() {
  const params = useParams();
  const id = params.id;
  const [carItem, setCarItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const detailData = await getEncarVehicleDetail(id);

        if (detailData) {
          const normalized = normalizeEncarDetail(detailData);
          setCarItem(normalized);
        }
      } catch (error) {
        console.error("Error fetching Encar detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : carItem ? (
        <EncarSingle carItem={carItem} />
      ) : (
        <div className="container text-center py-5">
          <h3>Vehicle Not Found</h3>
          <p>We couldn't find this vehicle you're looking for.</p>
        </div>
      )}

      <Footer parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
