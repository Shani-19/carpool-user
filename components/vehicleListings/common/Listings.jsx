"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "rc-slider/assets/index.css";
import SelectCompFunctional from "../../common/SelectCompFunctional";
import Pagination from "../../common/NewPagination";
import Sidebar from "./Sidebar";

import { DEFAULT_FILTERS, DEFAULT_BOUNDS } from "@/constants/filters";

import { getCarMakes, getFilterOptions, getVehicles, SORT_OPTIONS } from "@/utils/vehicles/vehicleAPI";

/* ---------------- HELPER UTILS (From Merge) ---------------- */

// ✅ Choose correct image base by endpoint
const getImageBase = (endpoint, stockType) => {
    /* ===== Maira Edit START: Stock Switch ===== */
    if (String(stockType || "").toLowerCase() === "other") {
        return process.env.NEXT_PUBLIC_ENCAR_IMG_SRC;
    }
    /* ===== Maira Edit END: Stock Switch ===== */
    const e = String(endpoint || "").toLowerCase();
    if (e === "buses") return process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW;
    if (e === "bikes") return process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW;
    if (e === "trucks") return process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW;
    if (e === "parts") return process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW;
    return process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW; // cars + suvs fallback
};

// ✅ Normalize different API responses into one shape for UI
const normalizeVehicle = (v = {}, endpoint = "cars") => {
    // cars/suvs: price sometimes nested in "0" - logic from merge
    const nestedPriceObj = v?.[0];
    const price = v.price ?? nestedPriceObj?.price ?? null;
    const discount_price = v.discount_price ?? nestedPriceObj?.discount_price ?? null;

    return {
        id: v.id,
        name: v.name,
        slug: v.slug,
        vin: v.vin,

        price,
        discount_price,
        final_price: v.final_price || (discount_price ? (price - discount_price) : price),

        status: v.status,
        booking_status: v.booking_status,
        year: v.model_year ?? null,

        odometer: v.odometer ?? null,
        fuel_type: v.fuel_type ?? null,
        transmission: v.transmission ?? null,

        // cars/suvs
        engine_volume: v.engine_volume ?? null,
        drive_type: v.drive_type ?? null,
        vehicle_type: v.vehicle_type ?? null,

        // buses
        color: v.color ?? null,
        weight: v.weight ?? null,
        // bikes

        // trucks
        cabin_type: v.cabin_type ?? null,
        loading_weight: v.loading_weight ?? null,
        axle_type: v.axle_type ?? null,

        passenger: v.passenger ?? null,
        main_image: v.main_image ?? null,

        // parts
        make: v.make ?? null,
        make_name: v.make_name ?? null,
        model: v.model ?? null,
        model_name: v.model_name ?? null,
        category: v.category ?? null,

        _endpoint: endpoint,
    };
};

/* ---------------- FILTER NORMALIZER ---------------- */

const EMPTY_FILTERS = {};
const normalizeFilters = (rawFilters, currentDefaults = {}) => {
    const cleaned = {};

    Object.entries(rawFilters).forEach(([key, value]) => {
        // Arrays
        if (Array.isArray(value)) {
            if (value.length > 0) cleaned[key] = value;
            return;
        }

        // Strings
        if (typeof value === "string") {
            const v = value.trim();
            if (v !== "" &&
                v !== "All Makes" &&
                v !== "All Models" &&
                v !== "All Years" &&
                v !== "All Colors" &&
                v !== "All") {
                cleaned[key] = value;
            }
            return;
        }

        // Numbers
        if (typeof value === "number") {
            cleaned[key] = value;
            return;
        }
    });

    return Object.keys(cleaned).length === 0 ? EMPTY_FILTERS : cleaned;
};

const CarImage = ({ src, alt, priority }) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            alt={alt}
            src={imgSrc}
            width={260}
            height={195}
            style={{ objectFit: "fill", height: "100%" }}
            priority={priority}
            onError={() => setImgSrc("/images/resource/about-inner1-5.jpg")}
        />
    );
};


export default function Listings({
    endpoint = "cars",
    breadcrumbTitle = "Vehicles",
    heading = "Browse Vehicles",
}) {
    const router = useRouter();
    // Pagination & Sorting States
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [sortbyOpt, setSortbyOpt] = useState('Sort by');
    const [sortbyVal, setSortbyVal] = useState('default');

    // Data States
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter Data (Makes/Index options)
    const [makes, setMakes] = useState([]);
    const [makeIds, setMakeIds] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        years: [],
        fuel_types: [],
        vehicle_types: [],
        transmissions: [],
        drive_types: [],
        passengers: [],
        exterior_colors: [],
        doors: [],
        models: [],
        makes: [],
        ranges: {}
    });

    // Raw filters
    const [rawFilters, setRawFilters] = useState(DEFAULT_FILTERS);

    // Default sliders (min/max)
    const [defaults, setDefaults] = useState(DEFAULT_BOUNDS);

    const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);

    // Filter storage key
    const filterKey = useMemo(() => `listing_filters_${endpoint}`, [endpoint]);

    // Load perPage and rawFilters from local storage
    useEffect(() => {
        // Load perPage
        const savedPerPage = localStorage.getItem("per_page_vehicles");
        if (savedPerPage) {
            setPerPage(Number(savedPerPage));
        }

        // Load filters
        try {
            const savedFilters = localStorage.getItem(filterKey);
            if (savedFilters) {
                const parsed = JSON.parse(savedFilters);
                setRawFilters({ ...DEFAULT_FILTERS, ...parsed, stockType: "carpool" });
            } else {
                setRawFilters({ ...DEFAULT_FILTERS, stockType: "carpool" });
            }
        } catch (e) {
            console.error("Failed to load filters from localStorage", e);
            setRawFilters({ ...DEFAULT_FILTERS, stockType: "carpool" });
        }
    }, [filterKey]);

    // Save filters to local storage when they change
    useEffect(() => {
        if (isFiltersLoaded) {
            localStorage.setItem(filterKey, JSON.stringify(rawFilters));
        }
    }, [rawFilters, filterKey, isFiltersLoaded]);

    // Active Filters
    const activeFilters = useMemo(
        () => normalizeFilters(rawFilters, defaults),
        [rawFilters, defaults]
    );

    // Number formatter function
    const fmtNumber = (val) => {
        const n = Number(val);
        if (Number.isNaN(n)) return "0";
        return n.toLocaleString("en-US");
    };

    // Get status
    const getStatusBadge = (v) => {
        const booking = String(v?.booking_status || "").trim().toLowerCase();
        const status = String(v?.status || "").trim().toLowerCase();

        if (status !== "sale") {
            return { text: "Sold", color: "#dc3545" };
        }

        if (booking !== "sale") {
            return { text: "Reserved", color: "#dc3545" };
        }

        return { text: "Sale", color: "#198754" };
    };

    // ✅ Build “chips” list depending on vehicle type/fields (From Merge)
    const buildChips = (v) => {
        const e = String(endpoint || "").toLowerCase();

        if (e === "trucks") {
            return [
                v.loading_weight ? `${v.loading_weight} Ton` : null,
                v.axle_type || null,
                v.cabin_type || null,
                v.color || null,
            ].filter(Boolean);
        }

        if (e === "buses") {
            return [
                v.engine_volume != null ? `${fmtNumber(v.engine_volume)} CC` : null,
                v.color || null,
                v.weight != null ? `${v.weight} Ton` : null,
                v.passenger != null ? `${Number(v.passenger)} Seats` : null,
            ].filter(Boolean);
        }

        if (e === "bikes") {
            return [
                v.engine_volume != null ? `${fmtNumber(v.engine_volume)} CC` : null,
                v.color || null,
                v.odometer != null ? `${v.odometer} Km` : null,
                v.fuel_type || null,
            ].filter(Boolean);
        }

        // cars/suvs
        return [
            v.engine_volume != null ? `${fmtNumber(v.engine_volume)} CC` : null,
            v.drive_type || null,
            v.vehicle_type || null,
            v.passenger != null ? `${Number(v.passenger)} Seats` : null,
        ].filter(Boolean);
    };

    const isCarsOrSuvs = endpoint === 'cars' || endpoint === 'suvs';
    const showSidebar = true;

    // Define hidden filters based on endpoint
    const hiddenFilters = useMemo(() => {
        if (endpoint === 'suvs') return ['vehicle_type'];
        if (endpoint === 'buses') return ['model_detail', 'doors', 'drive_type', 'vehicle_type', 'axle_type', 'cabin_type', 'loading_weight', 'category'];
        if (endpoint === 'bikes') return ['model_detail', 'doors', 'fuel_type', 'vehicle_type', 'engine_volume', 'passenger'];
        if (endpoint === 'trucks') return ['model_detail', 'doors', 'drive_type', 'vehicle_type', 'engine_volume', 'passenger'];
        if (endpoint === 'parts') return ['model_detail', 'doors', 'drive_type', 'vehicle_type', 'axle_type', 'cabin_type', 'loading_weight', 'engine_volume', 'passenger', 'fuel_type', 'transmission', 'mileage', 'exterior_color'];
        return [];
    }, [endpoint]);

    // Fetch car makes and filter options
    useEffect(() => {
        const initData = async () => {
            try {
                // Fetch makes only for cars/suvs if needed, or rely on filterOptions
                /* ===== Maira Edit START: Stock Switch ===== */
                const promises = [getFilterOptions({}, endpoint, rawFilters.stockType)];
                if (isCarsOrSuvs) {
                    promises.push(getCarMakes(rawFilters.stockType));
                }
                /* ===== Maira Edit END: Stock Switch ===== */

                const results = await Promise.all(promises);
                const optionsRes = results[0];
                const makesRes = isCarsOrSuvs ? results[1] : null;

                if (makesRes?.data) {
                    const make = makesRes.data.map(item => item.name);
                    const makeId = makesRes.data.map(item => item.id);
                    setMakes(make);
                    setMakeIds(makeId);
                }

                if (optionsRes?.success && optionsRes?.data) {
                    setFilterOptions(optionsRes.data);

                    // slider defaults
                    if (optionsRes.data.ranges) {
                        const r = optionsRes.data.ranges;
                        setDefaults({
                            min_price: r.min_price ?? 0,
                            max_price: r.max_price ?? 0,
                            min_mileage: r.min_mileage ?? 0,
                            max_mileage: r.max_mileage ?? 0,
                            min_engine_volume: r.min_engine_volume ?? 0,
                            max_engine_volume: r.max_engine_volume ?? 0,
                            min_year: r.min_year ?? 0,
                            max_year: r.max_year ?? 0,
                        });
                    }
                }

            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setIsFiltersLoaded(true);
            }
        };
        initData();
    }, [endpoint, isCarsOrSuvs, /* Maira Edit: Stock Switch */ rawFilters.stockType]);

    // Clear all filters
    const clearAllFilters = () => {
        /* ===== Maira Edit START: Stock Switch ===== */
        // Preserve current stockType so "Clear All" doesn't silently flip the active tab
        setRawFilters({ ...DEFAULT_FILTERS, stockType: rawFilters.stockType });
        /* ===== Maira Edit END: Stock Switch ===== */
        localStorage.removeItem(filterKey);
        setPage(1);
    };

    // Active filters count
    const activeFilterCount = Object.keys(activeFilters).length;

    // update filter options based on current selections
    const updateFilterOptions = useCallback(async (filters) => {
        try {
            /* ===== Maira Edit START: Stock Switch ===== */
            const res = await getFilterOptions(filters, endpoint, filters.stockType);
            /* ===== Maira Edit END: Stock Switch ===== */
            if (res?.success && res?.data) {
                setFilterOptions(res.data);
            }
        } catch (error) {
            console.error("Failed to update filter options:", error);
        }
    }, [endpoint]);

    // fetch vehicles
    const fetchVehiclesData = useCallback(
        async (pageNo, filters) => {
            setLoading(true);

            try {
                /* ===== Maira Edit START: Stock Switch ===== */
                const res = await getVehicles(
                    endpoint,
                    pageNo,
                    perPage,
                    sortbyVal,
                    filters,
                    filters.stockType
                );
                /* ===== Maira Edit END: Stock Switch ===== */

                const normalized = (res?.data || []).map((v) => normalizeVehicle(v, endpoint));
                setVehicles(normalized);
                setPagination(res?.pagination || null);
            } catch (err) {
                console.error(`Failed to fetch ${endpoint}:`, err);
                setVehicles([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, perPage, sortbyVal]
    );

    // Fetch cars when page / filters / sort changes
    useEffect(() => {
        if (!isFiltersLoaded) return;

        const timer = setTimeout(() => {
            fetchVehiclesData(page, activeFilters);
            updateFilterOptions(activeFilters);
        }, 300);
        return () => clearTimeout(timer);
    }, [page, activeFilters, fetchVehiclesData, updateFilterOptions, isFiltersLoaded]);

    /* ---------------- HANDLERS ---------------- */

    const handleSidebarFilterChange = useCallback((filters) => {
        setRawFilters(filters);
        setPage(1);
    }, []);

    const handleSortChange = (option, value) => {
        setSortbyOpt(option);
        setSortbyVal(value);
        setPage(1);
    };

    const handlePerPageChange = (value) => {
        const val = Number(value);
        setPerPage(val);
        setPage(1);
        localStorage.setItem("per_page_vehicles", val);
    };

    const handlePageChange = (pageNo) => {
        if (pageNo >= 1 && pageNo <= pagination?.last_page) {
            setPage(pageNo);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const canPrev = !!pagination && pagination.current_page > 1;
    const canNext = !!pagination && pagination.current_page < pagination.last_page;

    /* ===== Maira Edit START: Stock Switch ===== */
    const imageBase = useMemo(() => getImageBase(endpoint, rawFilters.stockType), [endpoint, rawFilters.stockType]);
    /* ===== Maira Edit END: Stock Switch ===== */

    return (
        <section className="cars-section-thirteen layout-radius">
            <div className="boxcar-container">
                <div className="boxcar-title-three wow fadeInUp">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <span>{breadcrumbTitle}</span>
                        </li>
                    </ul>
                    <h2>{heading} Available Stock</h2>
                </div>

                <div className="row">
                    <Sidebar
                        onFilterChange={handleSidebarFilterChange}
                        makes={makes}
                        makeIds={makeIds}
                        filterOptions={filterOptions}
                        defaults={defaults}
                        filters={rawFilters}
                        hiddenFilters={hiddenFilters}
                        endpoint={endpoint}
                    />

                    {/* Listing */}
                    <div className="col-xl-9 col-md-12 col-sm-12">
                        <div className="right-box">

                            {/* Filter Status Bar */}
                            {activeFilterCount > 0 && (
                                <div className="filter-summary mb-3 p-3 bg-light rounded d-flex flex-column flex-md-row align-items-md-start justify-content-between gap-3">
                                    <div className="d-flex flex-wrap gap-2">
                                        {/* Render Range Tags */}
                                        {[
                                            { key: 'price', label: 'Price', unit: '$', isCurrency: true },
                                            { key: 'mileage', label: 'Mileage', unit: ' km', isCurrency: false },
                                            { key: 'year', label: 'Year', unit: '', isCurrency: false },
                                            { key: 'engine_volume', label: 'Engine', unit: ' CC', isCurrency: false },
                                        ].map(range => {
                                            const minKey = `min_${range.key}`;
                                            const maxKey = `max_${range.key}`;
                                            const isMinActive = activeFilters[minKey] !== undefined;
                                            const isMaxActive = activeFilters[maxKey] !== undefined;

                                            if (!isMinActive && !isMaxActive) return null;

                                            const minVal = isMinActive ? (range.key !== 'year' ? fmtNumber(rawFilters[minKey]) : rawFilters[minKey]) : null;
                                            const maxVal = isMaxActive ? (range.key !== 'year' ? fmtNumber(rawFilters[maxKey]) : rawFilters[maxKey]) : null;

                                            let text;
                                            if (isMinActive && isMaxActive) {
                                                // Both set - show range
                                                text = range.isCurrency
                                                    ? `${range.unit}${minVal} - ${range.unit}${maxVal}`
                                                    : `${minVal} - ${maxVal}${range.unit}`;
                                            } else if (isMinActive) {
                                                // Only min set
                                                text = range.isCurrency
                                                    ? `${range.unit}${minVal}+`
                                                    : `${minVal}+${range.unit}`;
                                            } else {
                                                // Only max set
                                                text = range.isCurrency
                                                    ? `Up to ${range.unit}${maxVal}`
                                                    : `Up to ${maxVal}${range.unit}`;
                                            }

                                            return (
                                                <div key={range.key} className="cstm-filter-chip badge bg-white text-dark border p-2 rounded-pill d-flex align-items-center gap-2">
                                                    <span className="fw-normal">{text}</span>
                                                    <span
                                                        className="ms-1 cursor-pointer"
                                                        style={{ fontSize: '18px', lineHeight: '14px', cursor: 'pointer', opacity: 0.6 }}
                                                        onClick={() => {
                                                            // Clear range filter
                                                            setRawFilters(prev => ({
                                                                ...prev,
                                                                [minKey]: '',
                                                                [maxKey]: ''
                                                            }));
                                                            setPage(1);
                                                        }}
                                                    >×</span>
                                                </div>
                                            );
                                        })}

                                        {/* Render Other Tags */}
                                        {Object.entries(activeFilters).map(([key, value]) => {
                                            // Skip if it's a range key (already handled above)
                                            if (key.startsWith('min_') || key.startsWith('max_')) return null;

                                            // Arrays (Fuel, Body etc)
                                            if (Array.isArray(value)) {
                                                return value.map(item => {
                                                    let label = item;
                                                    if (key === 'current_doors' || key === 'doors') label = `${item} Doors`;
                                                    if (key === 'passenger' || key === 'seats') label = `${item} Seats`;
                                                    if (key === 'axle_type') label = `Axle: ${item}`;
                                                    if (key === 'cabin_type') label = `Cabin: ${item}`;

                                                    return (
                                                        <div key={`${key}-${item}`} className="cstm-filter-chip badge bg-white text-dark border p-2 rounded-pill d-flex align-items-center gap-2">
                                                            <span className="fw-normal">{label}</span>
                                                            <span
                                                                className="ms-1 cursor-pointer"
                                                                style={{ fontSize: '18px', lineHeight: '14px', cursor: 'pointer', opacity: 0.6 }}
                                                                onClick={() => {
                                                                    const newVal = rawFilters[key].filter(x => x !== item);
                                                                    setRawFilters(prev => ({ ...prev, [key]: newVal }));
                                                                    setPage(1);
                                                                }}>×</span>
                                                        </div>
                                                    );
                                                });
                                            }

                                            // Strings (Make, Model)
                                            let label = value;
                                            if (key === 'current_doors' || key === 'doors') label = `${value} Doors`;
                                            if (key === 'passenger' || key === 'seats') label = `${value} Seats`;
                                            if (key === 'category') label = `Category: ${value}`;
                                            if (key === 'loading_weight') label = `Weight: ${value} Ton`;

                                            return (
                                                <div key={key} className="cstm-filter-chip badge bg-white text-dark border p-2 rounded-pill d-flex align-items-center gap-2">
                                                    <span className="fw-normal">{label}</span>
                                                    <span
                                                        className="ms-1 cursor-pointer"
                                                        style={{ fontSize: '18px', lineHeight: '14px', cursor: 'pointer', opacity: 0.6 }}
                                                        onClick={() => {
                                                            const updates = { [key]: "" };
                                                            if (key === "make") {
                                                                updates.model = "";
                                                                updates.model_detail = "";
                                                            }
                                                            if (key === "model") {
                                                                updates.model_detail = "";
                                                            }
                                                            setRawFilters(prev => ({ ...prev, ...updates }));
                                                            setPage(1);
                                                        }}>×</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={clearAllFilters}
                                        className="btn btn-link text-nowrap border rounded-pill text-danger text-decoration-none px-3 py-1"
                                        style={{ fontSize: '14px', fontWeight: 500 }}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}

                            {/* Listing Header */}
                            <div className="text-box mb-4 d-flex flex-column-reverse flex-md-row align-items-md-center justify-content-between gap-3">
                                <div className="cstm-numOfVeh-row text d-flex justify-content-center justify-content-md-start align-items-center w-100 w-lg-75 gap-2">
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : !loading && vehicles.length === 0 ? (
                                        <span>No vehicles found.</span>
                                    ) : (
                                        <>
                                            <span>
                                                Showing {pagination?.from} to {pagination?.to} of {pagination?.total} vehicles
                                            </span>
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    disabled={!canPrev}
                                                    onClick={() => setPage(pagination.current_page - 1)}
                                                >
                                                    ←
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    disabled={!canNext}
                                                    onClick={() => setPage(pagination.current_page + 1)}
                                                >
                                                    →
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex align-items-center flex-wrap gap-2 w-100 w-md-auto justify-content-center justify-content-md-end">
                                    <div className="form_boxes v3">
                                        <SelectCompFunctional
                                            options={SORT_OPTIONS.map(opt => opt.label)}
                                            values={SORT_OPTIONS.map(opt => opt.value)}
                                            selectedValue={sortbyOpt}
                                            onChange={handleSortChange}
                                        />
                                    </div>
                                    <div className="form_boxes v3 ms-3">
                                        <small className="me-2 text-dark">Per Page</small>
                                        <SelectCompFunctional
                                            options={["20", "30", "50", "80", "100"]}
                                            values={["20", "30", "50", "80", "100"]}
                                            selectedValue={perPage.toString()}
                                            onChange={(opt, val) => handlePerPageChange(val)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Loading */}
                            {loading && (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {/* No vehicles */}
                            {!loading && vehicles.length === 0 && (
                                <div className="py-5 text-center bg-light rounded">
                                    <h4>No vehicles found</h4>
                                    <button className="btn btn-primary mt-3" onClick={clearAllFilters}>
                                        Clear All Filters
                                    </button>
                                </div>
                            )}

                            {/* Vehicles */}
                            {!loading && vehicles.length > 0 && (
                                <>
                                    <div className="cars-container">
                                        {vehicles.map((elm, index) => {
                                            const chips = buildChips(elm);
                                            const badge = getStatusBadge(elm);

                                            const handleCardClick = (e) => {
                                                // If click is on a link or button, let that handler take over
                                                if (e.target.closest('a') || e.target.closest('button')) {
                                                    return;
                                                }
                                                // ===== Edited by Maira START =====
                                                window.open(`/${endpoint}/${elm.slug}`, '_blank');
                                                // ===== Edited by Maira END =====
                                            };

                                            return (
                                                <div key={elm?.id ?? index} className="service-block-thirteen cl-row-block">
                                                    <div
                                                        className="inner-box"
                                                        onClick={handleCardClick}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <div className="image-box cl-leftBox">
                                                            <figure className="image" style={{ height: "100%" }}>
                                                                <Link href={`/${endpoint}/${elm.slug}`} target="_blank">
                                                                    <CarImage
                                                                        src={`${imageBase}/${elm.main_image}`}
                                                                        alt={elm.name}
                                                                        priority={index <= 2}
                                                                    />
                                                                </Link>
                                                            </figure>
                                                        </div>

                                                        <div className="right-box cl-rightBox">
                                                            <div className="content-box">
                                                                <h4 className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    <Link href={`/${endpoint}/${elm.slug}`} title={elm.name} target="_blank">
                                                                        {elm.name}
                                                                    </Link>
                                                                </h4>

                                                                <div className="text mb-1">{endpoint === 'parts' ? 'Part No.' : 'VIN No.'} {elm.vin || "-"}</div>

                                                                <div className="inspection-sec mb-1">
                                                                    <div className="inspection-box gap-0 text-nowrap">
                                                                        <span className="icon"></span>
                                                                        <div className="info">
                                                                            <span>{endpoint === 'parts' ? 'Maker' : 'Mileage'}</span>
                                                                            <small>{endpoint === 'parts' ? (elm.make_name || elm.make || "-") : (elm.odometer ? `${fmtNumber(elm.odometer)} Km` : "-")}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="inspection-box gap-0 text-nowrap">
                                                                        <span className="icon"></span>
                                                                        <div className="info">
                                                                            <span>{endpoint === 'parts' ? 'Model' : 'Fuel Type'}</span>
                                                                            <small>{endpoint === 'parts' ? (elm.model_name || elm.model || "-") : (elm.fuel_type || "-")}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="inspection-box gap-0 text-nowrap">
                                                                        <span className="icon"></span>
                                                                        <div className="info">
                                                                            <span>{endpoint === 'parts' ? 'Category' : 'Transmission'}</span>
                                                                            <small>{endpoint === 'parts' ? (elm.category || "-") : (elm.transmission || "-")}</small>
                                                                        </div>
                                                                    </div>

                                                                    <div className="inspection-box gap-0 text-nowrap">
                                                                        <span className="icon"></span>
                                                                        <div className="info">
                                                                            <span>{endpoint === 'parts' ? 'Color' : 'Year'}</span>
                                                                            <small>{endpoint === 'parts' ? (elm.color || "-") : (elm.year ?? "-")}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Dynamic Chips */}
                                                                {!!chips.length && (
                                                                    <ul className="ul-cotent">
                                                                        {chips.map((t, idx) => (
                                                                            <li key={idx} className="text-nowrap">
                                                                                <a href="#">{t}</a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>

                                                            <div className="content-box-two cl-contentBoxTwo d-flex flex-column justify-content-between mb-3">
                                                                {elm.status?.toLowerCase() === 'sale' && elm.booking_status?.toLowerCase() === 'sale' ? (
                                                                    <>
                                                                        {elm.discount_price > 0 ? (
                                                                            <div className="price-wrapper d-flex flex-column">
                                                                                <span className="old-price text-muted text-decoration-line-through" style={{ fontSize: '0.85rem' }}>
                                                                                    ${fmtNumber(elm.price)}
                                                                                </span>
                                                                                <h4 className="title">${fmtNumber(elm.final_price)}</h4>
                                                                            </div>
                                                                        ) : (
                                                                            <h4 className="title">${fmtNumber(elm.price)}</h4>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <h4 className="title" style={{ fontSize: '20px', color: badge.color }}>
                                                                        {badge.text}
                                                                    </h4>
                                                                )}

                                                                {/* ===== Edited by Maira START ===== */}
                                                                <Link href={`/${endpoint}/${elm.slug}`} className="button" target="_blank">
                                                                    View Detail
                                                                    {/* ===== Edited by Maira END ===== */}
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                        <g clipPath="url(#clip0_989_6940)">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#405FF2" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_989_6940">
                                                                                <rect width={14} height={14} fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && pagination.last_page > 1 && (
                                        <div className="pagination-sec mt-4">
                                            <Pagination
                                                currentPage={pagination.current_page}
                                                totalPages={pagination.last_page}
                                                onPageChange={handlePageChange}
                                            />
                                            <div className="text mt-3">
                                                Showing {pagination.from} to {pagination.to} of {pagination.total} vehicles
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div >
                </div >
            </div >
        </section >
    );
}
