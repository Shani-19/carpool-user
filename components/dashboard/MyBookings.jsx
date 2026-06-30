"use client"
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import BookingPagination from "../common/BookingPagination";
import { useAuth } from "@/context/AuthContext";
import { bookingAPI } from '@/utils/api';

const ITEMS_PER_PAGE = 15;

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const [allBookings, setAllBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    brand: "",
    model: ""
  });
  // Number formatter function
  const fmtNumber = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return "0";
    return n.toLocaleString("en-US");
  };
  // Load all bookings initially
  useEffect(() => {
    if (user && !authLoading) {
      fetchAllBookings();
    }
  }, [user, authLoading]);

  const fetchAllBookings = async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError('');

      // const response = await bookingAPI.getMyBookings(`?page=${page}&per_page=50`);
      const response = await bookingAPI.getMyBookings(`?page=${page}&per_page=${ITEMS_PER_PAGE}`);
      // console.log(response)
      if (response.data.success) {
        const transformedBookings = response.data.bookings.map(booking => {
          const vehicle = booking.car || booking.bus || booking.truck || booking.bike || booking.part;

          const vehicleType = booking.car ? 'car' :
            booking.bus ? 'bus' :
              booking.truck ? 'truck' :
                booking.bike ? 'bike' : 'part';

          const imgPath = booking.car ? process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW :
            booking.bus ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW :
              booking.truck ? process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW :
                booking.bike ? process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW :
                  process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW;

          return {
            id: booking.id,
            productImage: vehicle?.main_image ? imgPath + vehicle.main_image : "/images/resource/add-car1.jpg",
            brand: vehicle?.make?.name || null,
            model: vehicle?.model?.name || null,
            modeld: vehicle?.modeld?.name || null,
            year: vehicle?.model_year || null,
            vin: vehicle?.vin || null,
            name: vehicle?.name || null,
            color: vehicle?.color || null,
            driveType: vehicle?.drive_type || null,
            bodyType: vehicle?.type?.name || vehicle?.ca?.name || null,
            transmission: vehicle?.transmission || null,
            seats: vehicle?.passenger ? `${vehicle.passenger} Seats` : null,
            fuelType: vehicle?.fuel?.name || null,
            engine: vehicle?.engine_volume ? `${fmtNumber(vehicle.engine_volume)} CC` : null,
            mileage: vehicle?.odometer ? `${fmtNumber(vehicle.odometer)} Km` : null,
            bookingDate: booking.created_at ? new Date(booking.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }) : null,
            bookingNo: booking.booking_num || null,
            status: booking.status == 'Complete' ? 'Completed' : booking.status || null,
            vehicleType: vehicleType
          };
        });

        // Remove duplicates
        const uniqueBookings = transformedBookings.filter((booking, index, self) =>
          index === self.findIndex(b => b.id === booking.id)
        );

        if (append) {
          setAllBookings(prev => {
            const existingIds = new Set(prev.map(b => b.id));
            const newBookings = uniqueBookings.filter(booking => !existingIds.has(booking.id));
            return [...prev, ...newBookings];
          });
        } else {
          setAllBookings(uniqueBookings);
        }

        // Load more pages automatically if there are more and we have less than 200 bookings
        if (response.data.pagination.has_more && allBookings.length < 200) {
          fetchAllBookings(page + 1, true);
        }
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Client-side filtering, sorting and pagination
  const { filteredBookings, paginatedBookings, totalFiltered, totalPages } = useMemo(() => {
    // Apply all filters
    let result = allBookings.filter(booking => {
      // Text search across multiple fields
      const searchMatch = search === "" ||
        booking.brand?.toLowerCase().includes(search.toLowerCase()) ||
        booking.model?.toLowerCase().includes(search.toLowerCase()) ||
        booking.modeld?.toLowerCase().includes(search.toLowerCase()) ||
        booking.vin?.toLowerCase().includes(search.toLowerCase());

      // Filter by year
      const yearMatch = !filters.year || booking.year == filters.year;

      // Filter by brand  
      const brandMatch = !filters.brand || booking.brand === filters.brand;

      // Filter by model
      const modelMatch = !filters.model || booking.model === filters.model;
      const modeldMatch = !filters.modeld || booking.modeld === filters.modeld;

      // Filter by active tab
      const tabMatch = activeTab === 'all' || booking.status === activeTab;

      return searchMatch && yearMatch && brandMatch && modelMatch && modeldMatch && tabMatch;
    });

    // Sort results
    if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    // Paginate results
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = result.slice(startIndex, endIndex);

    return {
      filteredBookings: result,
      paginatedBookings: paginated,
      totalFiltered: result.length,
      totalPages: Math.ceil(result.length / ITEMS_PER_PAGE)
    };
  }, [allBookings, search, sortBy, filters, activeTab, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, filters, activeTab]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const loadMore = () => {
  //   // For client-side pagination, we don't need loadMore since we have all data
  //   // But you can keep it to load additional pages from server if needed
  // };

  const clearFilters = () => {
    setSearch("");
    setFilters({ year: "", brand: "", model: "" });
  };

  // Get unique values for dropdowns from ALL loaded bookings
  const uniqueYears = [...new Set(allBookings.map(b => b.year))].filter(Boolean).sort((a, b) => b - a);
  const uniqueBrands = [...new Set(allBookings.map(b => b.brand))].filter(Boolean).sort();
  const uniqueModels = [...new Set(allBookings.map(b => b.model))].filter(Boolean).sort();

  // Calculate counts for tabs from ALL loaded bookings
  const allCount = allBookings.length;
  const pendingCount = allBookings.filter(b => b.status.toLowerCase() === 'pending').length;
  const waitingCount = allBookings.filter(b => b.status.toLowerCase() === 'waiting').length;
  const completedCount = allBookings.filter(b => b.status.toLowerCase() === 'completed').length;
  const canceledCount = allBookings.filter(b => b.status.toLowerCase() === 'canceled').length;

  // Show loading state for initial load
  if (authLoading || (loading && allBookings.length === 0)) {
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
                <p className="mt-2">Loading your bookings...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
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
                  onClick={() => fetchAllBookings(1)}
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
              <h3 className="title">My Bookings</h3>
              <div className="text">
                View and manage all your vehicle bookings, track their status, and stay updated throughout the booking process.
              </div>
            </div>
            <div className="my-listing-table wrap-listing myBookingSec">
              <div className="cart-table">
                <div className="mb-title-listing">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                    {/* Search Box */}
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
                        placeholder="Search by manufacturers, models, model details or chassis..."
                        value={search}
                        className="w-100"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>

                    {/* Filter Button and Sort Dropdown */}
                    <div className="mb-fs-row d-flex align-items-center gap-2 w-md-auto">
                      <button
                        className="btn btn-outline-white btn-sm text-dark mb-filtBtn"
                        onClick={() => setShowFilters(!showFilters)}
                        type="button"
                      >
                        <i className={`fa fa-filter me-1`}></i>
                        Filters
                        {(filters.year || filters.brand || filters.model) && (
                          <span className="badge bg-primary ms-1">
                            {[filters.year, filters.brand, filters.model].filter(Boolean).length}
                          </span>
                        )}
                      </button>

                      <div className="form_boxes v3">
                        <small>Sort by</small>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                        </select>
                        {/* <SelectComponent options={["Newest", "Oldest"]} /> */}
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Filter Section */}
                  {showFilters && (
                    <div className="filter-section mt-3 p-3 border rounded bg-light">
                      <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                          <div className="form_boxes v3">
                            <small>Year</small>
                            <select
                              value={filters.year}
                              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                              className="form-select"
                            >
                              <option value="">All Years</option>
                              {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form_boxes v3">
                            <small>Brand</small>
                            <select
                              value={filters.brand}
                              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value, model: "" }))}
                              className="form-select"
                            >
                              <option value="">All Brands</option>
                              {uniqueBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form_boxes v3">
                            <small>Model</small>
                            <select
                              value={filters.model}
                              onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                              disabled={!filters.brand}
                              className="form-select"
                            >
                              <option value="">All Models</option>
                              {uniqueModels
                                .filter(model => allBookings.some(b => b.brand === filters.brand && b.model === model))
                                .map(model => (
                                  <option key={model} value={model}>{model}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {(filters.year || filters.brand || filters.model) && (
                                <small className="text-muted">
                                  Active filters:
                                  {filters.year && <span className="badge bg-secondary ms-1">Year: {filters.year}</span>}
                                  {filters.brand && <span className="badge bg-secondary ms-1">Brand: {filters.brand}</span>}
                                  {filters.model && <span className="badge bg-secondary ms-1">Model: {filters.model}</span>}
                                </small>
                              )}
                            </div>
                            <div>
                              {(filters.year || filters.brand || filters.model) && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={clearFilters}
                                >
                                  Clear Filters
                                </button>
                              )}
                              <button
                                className="btn btn-sm btn-outline-secondary ms-2"
                                onClick={() => setShowFilters(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="nav-scroll-x">
                  <ul className="nav nav-tabs mb-tabs" id="bookingTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('all')}
                        className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                        type="button"
                      >
                        All ({allCount})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('Pending')}
                        className={`nav-link ${activeTab === 'Pending' ? 'active' : ''}`}
                        type="button"
                      >
                        Pending Confirmation ({pendingCount})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('Waiting')}
                        className={`nav-link ${activeTab === 'Waiting' ? 'active' : ''}`}
                        type="button"
                      >
                        In Process ({waitingCount})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('Completed')}
                        className={`nav-link ${activeTab === 'Completed' ? 'active' : ''}`}
                        type="button"
                      >
                        Completed ({completedCount})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab('Canceled')}
                        className={`nav-link ${activeTab === 'Canceled' ? 'active' : ''}`}
                        type="button"
                      >
                        Cancelled ({canceledCount})
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Results Count */}
                <div className="mb-3">
                  <small className="text-muted">
                    Showing {paginatedBookings.length} of {totalFiltered} filtered bookings
                    {totalFiltered !== allBookings.length && ` (from ${allBookings.length} total)`}
                    {loadingMore && " - loading more..."}
                  </small>
                </div>

                <div className="tab-content" id="bookingTabContent">
                  <div className="tab-pane fade show active">
                    <div className="car-list">
                      {paginatedBookings.map((item, index) => (
                        // <a key={`${item.id}-${index}`} className={"mb-booking-details"} href="/my-bookings">
                        <a
                          key={`${item.id}-${index}`}
                          className={"mb-booking-details"}
                          href={`/my-bookings/${item.bookingNo}`}
                          target="_blank"
                        >
                          <div className="car-card">
                            <div className="mb-info-box">
                              <div className="car-image">
                                <Image
                                  src={item.productImage}
                                  alt={item.brand}
                                  width={180}
                                  height={120}
                                  className="rounded"
                                  // loading="lazy"
                                  priority={index <= 2}
                                />
                              </div>
                              <div className="car-info">
                                <h4 className="car-title">
                                  {item.vehicleType == 'part' ? `${item.name}` : `${item.year}, ${item.brand}, ${item.modeld || item.model}`}
                                </h4>
                                <p className="vin">{item.vehicleType == 'part' ? `Part No: ` : `Chassis No. `} {item.vin}</p>
                                <p className="mb-details">

                                  {item.vehicleType == 'part' ? `${item.year} | ${item.model} | ${item.brand}` : ``}
                                  {item.transmission ? item.transmission : ''} {item.fuelType ? ' | ' + item.fuelType : ''} {item.driveType ? ' | ' + item.driveType : ''} {item.bodyType ? ' | ' + item.bodyType : ''}  {item.seats ? ' | ' + item.seats : ''} {item.color ? ' | ' + item.color : ''}
                                </p>
                                <p className="mb-details">
                                  <span className="badge bg-light text-danger me-1 fw-normal">{item.engine}</span>
                                  <span className="badge bg-light text-danger me-1 fw-normal">{item.mileage}</span>
                                </p>
                              </div>
                            </div>
                            <div className="mb-card-right-box d-flex flex-column justify-content-end">
                              <p className="d-flex gap-2 align-items-center mb-1">
                                <strong className="small mb-mobile-hidden">Status: </strong>
                                <span className={`badge ${item.status === 'Completed' ? 'bg-light text-success' : item.status === 'Canceled' ? 'bg-light text-danger' : 'bg-light text-warning'}`}>{item.status}</span>
                              </p>
                              <div className="booking-info mb-mobile-hidden">
                                <p><strong>Booking Date: </strong>{item.bookingDate}</p>
                                <p><strong>Booking ID: </strong>{item.bookingNo}</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}

                      {/* No results message */}
                      {paginatedBookings.length === 0 && !loadingMore && (
                        <div className="text-center py-5">
                          <h5>No bookings found</h5>
                          <p>Try adjusting your search or filters</p>
                          <button
                            className="btn btn-primary"
                            onClick={clearFilters}
                          >
                            Clear All Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

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
                      Showing {paginatedBookings.length} bookings on page {currentPage} of {totalPages} ({totalFiltered} filtered bookings)
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}