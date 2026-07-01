"use client"
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import BookingPagination from "../common/BookingPagination";
import { useAuth } from "@/context/AuthContext";
import { orderAPI } from '@/utils/api';

const ITEMS_PER_PAGE = 15;

export default function MyOrders() {
    const { user, loading: authLoading } = useAuth();
    const [allOrders, setAllOrders] = useState([]);
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

    // Load all orders initially
    useEffect(() => {
        if (user && !authLoading) {
            fetchAllOrders();
        }
    }, [user, authLoading]);

    const fetchAllOrders = async (page = 1, append = false) => {
        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError('');

            // const response = await orderAPI.getMyOrders(`?page=${page}&per_page=50`);
            const response = await orderAPI.getMyOrders(`?page=${page}&per_page=${ITEMS_PER_PAGE}`);
            // console.log(response)
            if (response.data.success) {
                const transformedOrders = response.data.orders.map(order => {

                    let vehicle;
                    let vehicleType;
                    let imgPath;

                    if (order.booking_id) {
                        vehicle = order.booking.car || order.booking.bus || order.booking.truck || order.booking.bike || order.booking.part;
                        vehicleType = order.booking.car ? 'car' : order.booking.bus ? 'bus' : order.booking.truck ? 'truck' : order.booking.bike ? 'bike' : 'part';
                        imgPath = order.booking.car ? process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW : order.booking.bus ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW : order.booking.truck ? process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW : order.booking.bike ? process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW : process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW;
                    } else {
                        vehicle = order.order_mul.booking.car || order.order_mul.booking.bus || order.order_mul.booking.truck || order.order_mul.booking.bike || order.order_mul.booking.part;
                        vehicleType = order.order_mul.booking.car ? 'car' : order.order_mul.booking.bus ? 'bus' : order.order_mul.booking.truck ? 'truck' : order.order_mul.booking.bike ? 'bike' : 'part';
                        imgPath = order.order_mul.booking.car ? process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW : order.order_mul.booking.bus ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW : order.order_mul.booking.truck ? process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW : order.order_mul.booking.bike ? process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW : process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW;
                    }


                    return {
                        id: order.id,
                        productImage: vehicle?.main_image ? imgPath + vehicle.main_image : "/images/resource/add-car1.jpg",
                        brand: vehicle?.make?.name || null,
                        model: vehicle?.model?.name || null,
                        modeld: vehicle?.modeld?.name || null,
                        year: vehicle?.model_year || null,
                        vin: vehicle?.vin || null,
                        name: vehicle?.name || null,
                        driveType: vehicle?.drive_type || '',
                        bodyType: vehicle?.type?.name || vehicle?.ca?.name || '-',
                        transmission: vehicle?.transmission || null,
                        seats: vehicle?.passenger ? `${vehicle.passenger} Seats` : null,
                        fuelType: vehicle?.fuel?.name || null,
                        engine: vehicle?.engine_volume ? `${fmtNumber(vehicle.engine_volume)} CC` : null,
                        mileage: vehicle?.odometer ? `${fmtNumber(vehicle.odometer)} Km` : null,
                        orderDate: order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        }) : null,
                        orderNo: order.order_tracking_no || null,
                        status: order.order_status || null,
                        ccode: order.c_code || null,
                        vehicleType: vehicleType,
                        category: vehicle?.ca?.name || null,
                        color: vehicle?.color || null,
                        bookingImages: order.booking_images || []
                    };
                });

                // Remove duplicates
                const uniqueOrders = transformedOrders.filter((order, index, self) =>
                    index === self.findIndex(b => b.id === order.id)
                );

                if (append) {
                    setAllOrders(prev => {
                        const existingIds = new Set(prev.map(b => b.id));
                        const newOrders = uniqueOrders.filter(order => !existingIds.has(order.id));
                        return [...prev, ...newOrders];
                    });
                } else {
                    setAllOrders(uniqueOrders);
                }

                // Load more pages automatically if there are more and we have less than 200 orders
                if (response.data.pagination.has_more && allOrders.length < 200) {
                    fetchAllOrders(page + 1, true);
                }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Client-side filtering, sorting and pagination
    const { filteredOrders, paginatedOrders, totalFiltered, totalPages } = useMemo(() => {
        // Apply all filters
        let result = allOrders.filter(order => {
            // Text search across multiple fields
            const searchMatch = search === "" ||
                order.brand?.toLowerCase().includes(search.toLowerCase()) ||
                order.model?.toLowerCase().includes(search.toLowerCase()) ||
                order.modeld?.toLowerCase().includes(search.toLowerCase()) ||
                order.vin?.toLowerCase().includes(search.toLowerCase());

            // Filter by year
            const yearMatch = !filters.year || order.year == filters.year;

            // Filter by brand  
            const brandMatch = !filters.brand || order.brand === filters.brand;

            // Filter by model
            const modelMatch = !filters.model || order.model === filters.model;
            const modeldMatch = !filters.modeld || order.modeld === filters.modeld;

            // Filter by active tab
            const tabMatch = activeTab === 'all' || order.status === activeTab;

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
            filteredOrders: result,
            paginatedOrders: paginated,
            totalFiltered: result.length,
            totalPages: Math.ceil(result.length / ITEMS_PER_PAGE)
        };
    }, [allOrders, search, sortBy, filters, activeTab, currentPage]);

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

    // Get unique values for dropdowns from ALL loaded orders
    const uniqueYears = [...new Set(allOrders.map(b => b.year))].filter(Boolean).sort((a, b) => b - a);
    const uniqueBrands = [...new Set(allOrders.map(b => b.brand))].filter(Boolean).sort();
    const uniqueModels = [...new Set(allOrders.map(b => b.model))].filter(Boolean).sort();

    // Calculate counts for tabs from ALL loaded orders
    const allCount = allOrders.length;
    const processingCount = allOrders.filter(b => b.status.toLowerCase() === 'processing').length;
    const completedCount = allOrders.filter(b => b.status.toLowerCase() === 'completed').length;
    const canceledCount = allOrders.filter(b => b.status.toLowerCase() === 'canceled').length;

    // Show loading state for initial load
    if (authLoading || (loading && allOrders.length === 0)) {
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
                                <p className="mt-2">Loading your orders...</p>
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
                                    onClick={() => fetchAllOrders(1)}
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
                            <h3 className="title">My Orders</h3>
                            <div className="text">
                                View and track all your vehicle orders, monitor their status, and stay updated throughout the purchasing process.
                            </div>
                        </div>
                        <div className="my-listing-table wrap-listing myOrderSec">
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
                                                placeholder="Search by manufacturer, model, model detail or chassis..."
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
                                                                .filter(model => allOrders.some(b => b.brand === filters.brand && b.model === model))
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
                                                onClick={() => setActiveTab('Processing')}
                                                className={`nav-link ${activeTab === 'Processing' ? 'active' : ''}`}
                                                type="button"
                                            >
                                                Processing ({processingCount})
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
                                        Showing {paginatedOrders.length} of {totalFiltered} filtered orders
                                        {totalFiltered !== allOrders.length && ` (from ${allOrders.length} total)`}
                                        {loadingMore && " - loading more..."}
                                    </small>
                                </div>

                                <div className="tab-content" id="bookingTabContent">
                                    <div className="tab-pane fade show active">
                                        <div className="car-list">
                                            {paginatedOrders.map((item, index) => (
                                                // <a key={`${item.id}-${index}`} className={"mb-order-details"} href="/my-orders">
                                                <a
                                                    key={`${item.id}-${index}`}
                                                    className={"mb-booking-details"}
                                                    href={`/my-orders/${item.orderNo}`}
                                                    target="_blank"
                                                >
                                                    <div className="car-card">
                                                        <div className="mb-info-box d-flex align-items-stretch">
                                                            <div className="car-image">
                                                                <Image
                                                                    src={item.productImage}
                                                                    alt={item.brand}
                                                                    width={120}
                                                                    height={90}
                                                                    className="rounded object-fit-cover"
                                                                    style={{ height: '120px', width: '160px' }}
                                                                    priority={index <= 2}
                                                                />
                                                            </div>
                                                            {item.bookingImages && item.bookingImages.length > 0 && (
                                                                <div className="d-flex align-items-start">
                                                                    {/* Group images into chunks of 3 for vertical columns */}
                                                                    {(() => {
                                                                        const chunks = [];
                                                                        for (let i = 0; i < item.bookingImages.length; i += 3) {
                                                                            chunks.push(item.bookingImages.slice(i, i + 3));
                                                                        }
                                                                        return chunks.map((chunk, chunkIdx) => (
                                                                            <div key={chunkIdx} className="d-flex flex-column" style={{ height: '120px' }}>
                                                                                {chunk.map((img, imgIdx) => (
                                                                                    <Image
                                                                                        key={imgIdx}
                                                                                        src={img}
                                                                                        alt={`${item.brand} extra ${chunkIdx * 3 + imgIdx}`}
                                                                                        width={45}
                                                                                        height={30}
                                                                                        className="rounded object-fit-cover border"
                                                                                        style={{ height: '40px', width: '60px' }}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        ));
                                                                    })()}
                                                                </div>
                                                            )}
                                                            <div className="car-info">
                                                                <h4 className="car-title">
                                                                    {item.vehicleType == 'part' ? `${item.name}` : `${item.year}, ${item.brand}, ${item.modeld || item.model}`}
                                                                </h4>
                                                                <p className="vin">Chassis No. {item.vin}</p>
                                                                <p className="mb-details">
                                                                    {item.vehicleType == 'part' ? `${item.year} | ${item.brand} | ${item.model}` : ''}
                                                                    {item.transmission ? item.transmission : ''} {item.fuelType ? ' | ' + item.fuelType : ''} {item.driveType ? ' | ' + item.driveType : ''} {item.bodyType ? ' | ' + item.bodyType : ''}  {item.seats ? ' | ' + item.seats : ''}
                                                                </p>
                                                                <p className="mb-details">
                                                                    <span className="badge bg-light text-danger me-1 fw-normal">{item.engine}</span>
                                                                    <span className="badge bg-light text-danger me-1 fw-normal">{item.mileage}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="mb-card-right-box d-flex flex-column justify-content-end">
                                                            <p className="d-flex gap-2 align-items-center mb-0">
                                                                <strong className="small mb-mobile-hidden">Status: </strong>
                                                                <span className={`badge ${item.status === 'Completed' ? 'bg-light text-success' : item.status === 'Canceled' ? 'bg-light text-danger' : 'bg-light text-warning'}`}>{item.status}</span>
                                                            </p>
                                                            <div className="booking-info mb-mobile-hidden">
                                                                <p><strong>Order Date: </strong>{item.orderDate}</p>
                                                                <p><strong>Order ID: </strong>{item.orderNo}</p>
                                                                <p><strong>Customer Code: </strong>{item.ccode}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}

                                            {/* No results message */}
                                            {paginatedOrders.length === 0 && !loadingMore && (
                                                <div className="text-center py-5">
                                                    <h5>No orders found</h5>
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
                                            Showing {paginatedOrders.length} orders on page {currentPage} of {totalPages} ({totalFiltered} filtered orders)
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