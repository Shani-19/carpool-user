"use client"
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import BookingPagination from "../common/BookingPagination";
import { useAuth } from "@/context/AuthContext";
import { orderAPI } from '@/utils/api';

const ITEMS_PER_PAGE = 15;

export default function MyReserved() {
    const { user, loading: authLoading } = useAuth();
    const [allVehicles, setAllVehicles] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ year: "", brand: "", model: "" });

    useEffect(() => {
        if (user && !authLoading) {
            fetchReserved();
        }
    }, [user, authLoading]);

    const fetchReserved = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await orderAPI.getMyReserved();
            if (response.data.success) {
                const transformed = response.data.vehicles.map(v => {
                    const vType = v.vehicle_type || 'car';
                    const imgBase = vType === 'bus'
                        ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW
                        : vType === 'truck'
                            ? process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW
                            : vType === 'bike'
                                ? process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW
                                : vType === 'part'
                                    ? process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW
                                    : process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW;

                    let endpoint = 'cars';
                    if (vType === 'bus') endpoint = 'buses';
                    else if (vType === 'truck') endpoint = 'trucks';
                    else if (vType === 'bike') endpoint = 'bikes';
                    else if (vType === 'part') endpoint = 'parts';

                    const detailUrl = v.slug ? `/${endpoint}/${v.slug}` : '#';
                    return {
                        id: v.id,
                        vehicleType: vType,
                        slug: v.slug,
                        detailUrl,
                        productImage: v.main_image ? imgBase + v.main_image : '/images/resource/add-car1.jpg',
                        brand: v.make?.name || 'Unknown',
                        model: v.model?.name || 'Unknown',
                        year: v.model_year || 'Unknown',
                        vin: v.vin || 'Unknown',
                        transmission: v.transmission || '',
                        driveType: v.drive_type || '',
                        bodyType: v.type?.name || '-',
                        fuelType: v.fuel?.name || '',
                        seats: v.passenger ? `${v.passenger} Seats` : '',
                        engine: v.engine_volume ? `${v.engine_volume} CC` : '',
                        mileage: v.odometer ? `${v.odometer} Km` : '',
                    };
                });
                setAllVehicles(transformed);
            }
        } catch (err) {
            console.error('Error fetching reserved vehicles:', err);
            setError('Failed to load reserved vehicles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── Derived filters ──────────────────────────────────────────────────────
    const uniqueYears = [...new Set(allVehicles.map(v => v.year))].filter(Boolean).sort((a, b) => b - a);
    const uniqueBrands = [...new Set(allVehicles.map(v => v.brand))].filter(Boolean).sort();
    const uniqueModels = [...new Set(allVehicles.map(v => v.model))].filter(Boolean).sort();

    const carCount = allVehicles.filter(v => v.vehicleType === 'car').length;
    const busCount = allVehicles.filter(v => v.vehicleType === 'bus').length;
    const truckCount = allVehicles.filter(v => v.vehicleType === 'truck').length;
    const bikeCount = allVehicles.filter(v => v.vehicleType === 'bike').length;
    const partCount = allVehicles.filter(v => v.vehicleType === 'part').length;

    const { paginatedVehicles, totalFiltered, totalPages } = useMemo(() => {
        let result = allVehicles.filter(v => {
            const searchMatch = search === "" ||
                v.brand?.toLowerCase().includes(search.toLowerCase()) ||
                v.model?.toLowerCase().includes(search.toLowerCase()) ||
                v.vin?.toLowerCase().includes(search.toLowerCase());

            const yearMatch = !filters.year || v.year == filters.year;
            const brandMatch = !filters.brand || v.brand === filters.brand;
            const modelMatch = !filters.model || v.model === filters.model;

            const tabMatch =
                activeTab === 'all' ? true :
                    activeTab === 'cars' ? v.vehicleType === 'car' :
                        activeTab === 'buses' ? v.vehicleType === 'bus' :
                            activeTab === 'bikes' ? v.vehicleType === 'bike' :
                                activeTab === 'parts' ? v.vehicleType === 'part' :
                                    activeTab === 'trucks' ? v.vehicleType === 'truck' : true;

            return searchMatch && yearMatch && brandMatch && modelMatch && tabMatch;
        });

        if (sortBy === "newest") result.sort((a, b) => b.id - a.id);
        else result.sort((a, b) => a.id - b.id);

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return {
            paginatedVehicles: result.slice(start, start + ITEMS_PER_PAGE),
            totalFiltered: result.length,
            totalPages: Math.ceil(result.length / ITEMS_PER_PAGE),
        };
    }, [allVehicles, search, sortBy, filters, activeTab, currentPage]);

    useEffect(() => { setCurrentPage(1); }, [search, sortBy, filters, activeTab]);

    const clearFilters = () => {
        setSearch("");
        setFilters({ year: "", brand: "", model: "" });
    };

    // ── Loading ──────────────────────────────────────────────────────────────
    if (authLoading || (loading && allVehicles.length === 0)) {
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
                                <p className="mt-2">Loading reserved vehicles...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ── Error ────────────────────────────────────────────────────────────────
    if (error) {
        return (
            <section className="dashboard-widget">
                <div className="right-box">
                    <Sidebar />
                    <div className="content-column">
                        <div className="inner-column">
                            <div className="alert alert-danger" role="alert">
                                {error}
                                <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchReserved}>
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ── Main render ──────────────────────────────────────────────────────────
    return (
        <section className="dashboard-widget">
            <div className="right-box">
                <Sidebar />
                <div className="content-column">
                    <div className="inner-column">
                        <div className="list-title">
                            <h3 className="title">Reserved Vehicles</h3>
                            <div className="text">
                                Vehicles you have reserved through Carpool Korea.
                            </div>
                        </div>

                        <div className="my-listing-table wrap-listing myOrderSec">
                            <div className="cart-table">

                                {/* ── Search + Sort bar ── */}
                                <div className="mb-title-listing">
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                                        {/* Search */}
                                        <div className="box-ip-search mb-sbox flex-grow-1 me-md-3">
                                            <span className="icon">
                                                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.29301 0.287598C2.9872 0.287598 0.294312 2.98048 0.294312 6.28631C0.294312 9.59211 2.9872 12.2902 6.29301 12.2902C7.70502 12.2902 9.00364 11.7954 10.03 10.9738L12.5287 13.4712C12.6548 13.5921 12.8232 13.6588 12.9979 13.657C13.1725 13.6552 13.3395 13.5851 13.4631 13.4617C13.5867 13.3382 13.6571 13.1713 13.6591 12.9967C13.6611 12.822 13.5947 12.6535 13.474 12.5272L10.9753 10.0285C11.7976 9.00061 12.293 7.69995 12.293 6.28631C12.293 2.98048 9.59882 0.287598 6.29301 0.287598ZM6.29301 1.62095C8.87824 1.62095 10.9584 3.70108 10.9584 6.28631C10.9584 8.87153 8.87824 10.9569 6.29301 10.9569C3.70778 10.9569 1.62764 8.87153 1.62764 6.28631C1.62764 3.70108 3.70778 1.62095 6.29301 1.62095Z" fill="#050B20" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search by brand, model, or chassis..."
                                                value={search}
                                                className="w-100"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>

                                        {/* Filter + Sort */}
                                        <div className="mb-fs-row d-flex align-items-center gap-2 w-md-auto">
                                            <button
                                                className="btn btn-outline-white btn-sm text-dark mb-filtBtn"
                                                onClick={() => setShowFilters(!showFilters)}
                                                type="button"
                                            >
                                                <i className="fa fa-filter me-1"></i>
                                                Filters
                                                {(filters.year || filters.brand || filters.model) && (
                                                    <span className="badge bg-primary ms-1">
                                                        {[filters.year, filters.brand, filters.model].filter(Boolean).length}
                                                    </span>
                                                )}
                                            </button>

                                            <div className="form_boxes v3">
                                                <small>Sort by</small>
                                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                                    <option value="newest">Newest</option>
                                                    <option value="oldest">Oldest</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Collapsible filters */}
                                    {showFilters && (
                                        <div className="filter-section mt-3 p-3 border rounded bg-light">
                                            <div className="row g-3 align-items-end">
                                                <div className="col-md-4">
                                                    <div className="form_boxes v3">
                                                        <small>Year</small>
                                                        <select value={filters.year} onChange={(e) => setFilters(p => ({ ...p, year: e.target.value }))} className="form-select">
                                                            <option value="">All Years</option>
                                                            {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form_boxes v3">
                                                        <small>Brand</small>
                                                        <select value={filters.brand} onChange={(e) => setFilters(p => ({ ...p, brand: e.target.value, model: "" }))} className="form-select">
                                                            <option value="">All Brands</option>
                                                            {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form_boxes v3">
                                                        <small>Model</small>
                                                        <select value={filters.model} onChange={(e) => setFilters(p => ({ ...p, model: e.target.value }))} disabled={!filters.brand} className="form-select">
                                                            <option value="">All Models</option>
                                                            {uniqueModels
                                                                .filter(m => allVehicles.some(v => v.brand === filters.brand && v.model === m))
                                                                .map(m => <option key={m} value={m}>{m}</option>)}
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
                                                                <button className="btn btn-sm btn-outline-danger" onClick={clearFilters}>Clear Filters</button>
                                                            )}
                                                            <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setShowFilters(false)}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* ── Tabs ── */}
                                <div className="nav-scroll-x">
                                    <ul className="nav nav-tabs mb-tabs" id="reservedTab" role="tablist">
                                        {[
                                            { key: 'all', label: 'All', count: allVehicles.length },
                                            { key: 'cars', label: 'Cars', count: carCount },
                                            { key: 'buses', label: 'Buses', count: busCount },
                                            { key: 'trucks', label: 'Trucks', count: truckCount },
                                            { key: 'bikes', label: 'Bikes', count: bikeCount },
                                            { key: 'parts', label: 'Parts', count: partCount },
                                        ].map(tab => (
                                            <li key={tab.key} className="nav-item" role="presentation">
                                                <button
                                                    onClick={() => setActiveTab(tab.key)}
                                                    className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                                                    type="button"
                                                >
                                                    {tab.label} ({tab.count})
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Results count */}
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Showing {paginatedVehicles.length} of {totalFiltered} reserved vehicles
                                        {totalFiltered !== allVehicles.length && ` (from ${allVehicles.length} total)`}
                                    </small>
                                </div>

                                {/* ── Cards ── */}
                                <div className="tab-content" id="reservedTabContent">
                                    <div className="tab-pane fade show active">
                                        <div className="car-list">
                                            {paginatedVehicles.map((item, index) => (
                                                <a
                                                    key={`${item.id}-${index}`}
                                                    className="mb-booking-details"
                                                    href={item.detailUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
                                                                    priority={index <= 2}
                                                                />
                                                            </div>
                                                            <div className="car-info">
                                                                <h4 className="car-title">
                                                                    {item.year}, {item.brand}, {item.model}
                                                                </h4>
                                                                <p className="vin">Chassis No. {item.vin}</p>
                                                                <p className="mb-details">
                                                                    {item.transmission ? item.transmission : ''} {item.fuelType ? ' | ' + item.fuelType : ''} {item.driveType ? ' | ' + item.driveType : ''} {item.bodyType ? ' | ' + item.bodyType : ''} {item.seats ? ' | ' + item.seats : ''}
                                                                </p>
                                                                <p className="mb-details">
                                                                    <span className="badge bg-light text-danger me-1 fw-normal">{item.engine}</span>
                                                                    <span className="badge bg-light text-danger me-1 fw-normal">{item.mileage}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="mb-card-right-box d-flex flex-column justify-content-end">
                                                            <p className="d-flex gap-2 align-items-center justify-content-end mb-0">
                                                                <strong className="small mb-mobile-hidden">Status: </strong>
                                                                <span className="badge bg-light text-warning">Reserved</span>
                                                            </p>
                                                            <div className="booking-info mb-mobile-hidden">
                                                                <p><strong>Slug: </strong>#{item.slug}</p>
                                                                <p><strong>Type: </strong>{item.vehicleType.charAt(0).toUpperCase() + item.vehicleType.slice(1)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}

                                            {paginatedVehicles.length === 0 && (
                                                <div className="text-center py-5">
                                                    <i className="fa fa-bookmark fa-3x text-muted mb-3 d-block"></i>
                                                    <h5>No reserved vehicles found</h5>
                                                    <p className="text-muted">Try adjusting your search or filters</p>
                                                    {(search || filters.year || filters.brand || filters.model) && (
                                                        <button className="btn btn-primary" onClick={clearFilters}>
                                                            Clear All Filters
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ── Pagination ── */}
                                {totalPages > 1 && (
                                    <div className="pagination-sec">
                                        <nav aria-label="Reserved vehicles pagination">
                                            <ul className="pagination">
                                                <BookingPagination
                                                    currentPage={currentPage}
                                                    totalPages={totalPages}
                                                    onPageChange={setCurrentPage}
                                                />
                                            </ul>
                                            <div className="text">
                                                Showing {paginatedVehicles.length} vehicles on page {currentPage} of {totalPages} ({totalFiltered} filtered)
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
