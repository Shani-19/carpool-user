"use client"
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import BookingPagination from "../common/BookingPagination";
import { useAuth } from "@/context/AuthContext";
import { inspectionAPI } from '@/utils/api';

const ITEMS_PER_PAGE = 15;

export default function InspectionList() {
  const { user, loading: authLoading } = useAuth();

  const [requests, setRequests] = useState([]);
  const [reportsReq, setReportsReq] = useState([]);
  const [reportsInv, setReportsInv] = useState([]);

  const [activeTab, setActiveTab] = useState('requests');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user && !authLoading) {
      fetchInspectionData();
    }
  }, [user, authLoading]);

  const fetchInspectionData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await inspectionAPI.getInspectionList();
      if (response.data.success) {
        setRequests(response.data.data.requests || []);
        setReportsReq(response.data.data.reportsReq || []);
        setReportsInv(response.data.data.reportsInv || []);
      }
    } catch (error) {
      console.error('Error fetching inspection list:', error);
      setError('Failed to load inspection list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentDataArray = useMemo(() => {
    if (activeTab === 'requests') return requests;
    if (activeTab === 'reportsReq') return reportsReq;
    if (activeTab === 'reportsInv') return reportsInv;
    return [];
  }, [activeTab, requests, reportsReq, reportsInv]);

  const { filteredData, paginatedData, totalFiltered, totalPages } = useMemo(() => {
    let result = currentDataArray.filter(item => {
      const searchStr = search.toLowerCase();
      if (!searchStr) return true;

      const vin = item.vin || item.seller_info?.vin || '';
      const model = item.model || '';
      const company = item.manufacturing_company || '';
      const plate = item.seller_info?.plate_no || '';
      const reqNo = item.inspection_request_no?.toString() || '';

      return (
        vin.toLowerCase().includes(searchStr) ||
        model.toLowerCase().includes(searchStr) ||
        company.toLowerCase().includes(searchStr) ||
        plate.toLowerCase().includes(searchStr) ||
        reqNo.toLowerCase().includes(searchStr)
      );
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = result.slice(startIndex, endIndex);

    return {
      filteredData: result,
      paginatedData: paginated,
      totalFiltered: result.length,
      totalPages: Math.ceil(result.length / ITEMS_PER_PAGE)
    };
  }, [currentDataArray, search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  const handlePageChange = (page) => setCurrentPage(page);

  if (authLoading || (loading && requests.length === 0 && reportsReq.length === 0 && reportsInv.length === 0)) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column vh-100">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading inspection list...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column">
              <div className="alert alert-danger" role="alert">
                {error}
                <button
                  className="btn btn-sm btn-outline-danger ms-3"
                  onClick={() => fetchInspectionData()}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Inspection</h3>
              <div className="text">
                Manage your inspection requests and reports.
              </div>
            </div>
            <div className="my-listing-table wrap-listing myBookingSec">
              <div className="cart-table">
                <div className="mb-title-listing">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                    <div className="box-ip-search mb-sbox flex-grow-1 me-md-3">
                      <span className="icon">
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.29301 0.287598C2.9872 0.287598 0.294312 2.98048 0.294312 6.28631C0.294312 9.59211 2.9872 12.2902 6.29301 12.2902C7.70502 12.2902 9.00364 11.7954 10.03 10.9738L12.5287 13.4712C12.6548 13.5921 12.8232 13.6588 12.9979 13.657C13.1725 13.6552 13.3395 13.5851 13.4631 13.4617C13.5867 13.3382 13.6571 13.1713 13.6591 12.9967C13.6611 12.822 13.5947 12.6535 13.474 12.5272L10.9753 10.0285C11.7976 9.00061 12.293 7.69995 12.293 6.28631C12.293 2.98048 9.59882 0.287598 6.29301 0.287598ZM6.29301 1.62095C8.87824 1.62095 10.9584 3.70108 10.9584 6.28631C10.9584 8.87153 8.87824 10.9569 6.29301 10.9569C3.70778 10.9569 1.62764 8.87153 1.62764 6.28631C1.62764 3.70108 3.70778 1.62095 6.29301 1.62095Z"
                            fill="#050B20"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Search by VIN, Model, etc..."
                        value={search}
                        className="w-100"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="nav-scroll-x">
                  <ul className="nav nav-tabs mb-tabs" id="inspectionTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('requests')}
                        className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
                        type="button"
                      >
                        Request ({requests.length})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('reportsReq')}
                        className={`nav-link ${activeTab === 'reportsReq' ? 'active' : ''}`}
                        type="button"
                      >
                        Requested Report ({reportsReq.length})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('reportsInv')}
                        className={`nav-link ${activeTab === 'reportsInv' ? 'active' : ''}`}
                        type="button"
                      >
                        Invoice Report ({reportsInv.length})
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="mb-3">
                  <small className="text-muted">
                    Showing {paginatedData.length} of {totalFiltered} filtered items
                  </small>
                </div>

                <div className="tab-content" id="inspectionTabContent">
                  <div className="tab-pane fade show active">
                    <div className="car-list">
                      {paginatedData.map((item, index) => {
                        const isRequest = activeTab === 'requests';

                        // Extracting display fields based on item type
                        const title = isRequest
                          ? `Request No: ${item.inspection_request_no}`
                          : `${item.year || ''} ${item.manufacturing_company || ''} ${item.model || ''}`;
                        const vin = isRequest ? item.seller_info?.vin : item.vin;
                        const date = isRequest ? new Date(item.created_at).toLocaleDateString() : '';
                        const status = item.status || 'Available';
                        const qrCode = isRequest ? null : item.qr_code;
                        const imagePath = !isRequest && item.header_image
                          ? process.env.NEXT_PUBLIC_REPORT_IMG_SRC_MEDIA + item.header_image
                          : "/images/resource/add-car1.jpg";

                        return (
                          <div key={`${item.id}-${index}`} className="mb-booking-details">
                            <div className="car-card">
                              <div className="mb-info-box">
                                {!isRequest && (
                                  <div className="car-image">
                                    <Image
                                      src={imagePath}
                                      alt={title}
                                      width={180}
                                      height={120}
                                      className="rounded"
                                      priority={index <= 2}
                                    />
                                  </div>
                                )}
                                <div className="car-info">
                                  <h4 className="car-title">{title}</h4>
                                  {vin && <p className="vin">VIN: {vin}</p>}
                                  {isRequest && item.seller_info?.plate_no && (
                                    <p className="mb-details">Plate No: {item.seller_info.plate_no}</p>
                                  )}
                                  {isRequest && item.seller_info?.area && (
                                    <p className="mb-details">Area: {item.seller_info.area}</p>
                                  )}
                                  {!isRequest && (
                                    <>
                                      <p className="mb-details">
                                        {item.transmission_type ? item.transmission_type : ''} {item.fuel_type ? ' | ' + item.fuel_type : ''} {item.drive_type ? ' | ' + item.drive_type : ''} {item.vehicle_type ? ' | ' + item.vehicle_type : ''}
                                      </p>
                                      <p className="mb-details">
                                        <span className="badge bg-light text-danger me-1 fw-normal">{item.engine_volume ? item.engine_volume + ' CC' : ''}</span>
                                        <span className="badge bg-light text-danger me-1 fw-normal">{item.mileage ? item.mileage + ' Km' : ''}</span>
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="mb-card-right-box d-flex flex-column justify-content-end">
                                <p className="d-flex gap-2 align-items-center justify-content-end mb-0">
                                  <strong className="small mb-mobile-hidden">Status: </strong>
                                  <span className={`badge bg-light text-primary`}>{status}</span>
                                </p>
                                {qrCode && (
                                  <p className="d-flex gap-2 align-items-center justify-content-end mb-0">
                                    <strong className="small mb-mobile-hidden">Request No: </strong>
                                    <span className={`badge bg-light text-primary`}>{qrCode}</span>
                                  </p>
                                )}
                                {date && (
                                  <div className="booking-info mb-mobile-hidden">
                                    <p><strong>Created: </strong>{date}</p>
                                  </div>
                                )}
                                {!isRequest && qrCode && (
                                  <div className="mt-2 d-flex justify-content-end">
                                    <button
                                      className="btn btn-sm btn-primary"
                                      onClick={() => {
                                        const url = `https://inspection.carpoolkr.com/inspection-report-show-qr/${qrCode}`;
                                        const w = window.screen.width * 0.85;
                                        const h = window.screen.height * 0.85;
                                        const left = (window.screen.width - w) / 2;
                                        const top = (window.screen.height - h) / 2;
                                        window.open(
                                          url,
                                          '_blank',
                                          `width=${Math.round(w)},height=${Math.round(h)},left=${Math.round(left)},top=${Math.round(top)},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no`
                                        );
                                      }}
                                    >
                                      View Report
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {paginatedData.length === 0 && !loading && (
                        <div className="text-center py-5">
                          <h5>No items found</h5>
                          <p>Try adjusting your search</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => setSearch('')}
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="pagination-sec">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <BookingPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </ul>
                      <div className="text">
                        Showing {paginatedData.length} items on page {currentPage} of {totalPages} ({totalFiltered} total)
                      </div>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
