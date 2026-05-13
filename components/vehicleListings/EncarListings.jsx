"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../common/NewPagination";
import SelectCompFunctional from "../../common/SelectCompFunctional";
import EncarSidebar from "./EncarSidebar";
import { getEncarVehicles, getEncarFilterOptions } from "@/utils/vehicles/encarAPI";
import { useCurrency } from "@/context/CurrencyContext";

// Encar Data Normalizer
const normalizeEncarVehicle = (v) => {
    const imgBase = process.env.NEXT_PUBLIC_ENCAR_IMG_SRC;
    let mainImage = "/images/resource/about-inner1-5.jpg";

    if (v.Photos && v.Photos.length > 0) {
        mainImage = `${imgBase}${v.Photos[0].location}?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30&t=20251212092207`;
    } else if (v.Photo) {
        mainImage = `${imgBase}${v.Photo}001.jpg`;
    }

    return {
        id: v.Id,
        title: `${v.FormYear || ''} ${v.Manufacturer || 'Manufacturer'} ${v.Model || 'Model'}`.trim(),
        price: v.Price !== undefined ? v.Price : "Price",
        year: v.FormYear || v.Year || "Year",
        mileage: v.Mileage !== undefined ? v.Mileage : "Mileage",
        fuel: v.FuelType || "Fuel Type",
        transmission: v.Transmission || "Transmission",
        img: mainImage,
        vin: v.VIN || v.Vin || v.vin || "-",
        badge: v.Badge || "",

        engine_volume: v.EngineVolume || "Engine Volume",
        drive_type: v.DriveType || "Drive Type",
        vehicle_type: v.VehicleType || "Vehicle Type",
        seats: v.Seats || "Seats",
    };
};

export default function EncarListings({ carType = "Y" }) {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortbyOpt, setSortbyOpt] = useState('Sort By');
    const [sortbyVal, setSortbyVal] = useState('default');
    const { currency, changeCurrency, convert, format } = useCurrency();
    const [isReady, setIsReady] = useState(false);

    const fetchIdRef = React.useRef(0);

    // const storageKey_perPage = `encar_per_page_${carType}`;
    // const storageKey_lang = `encar_lang_${carType}`;
    const storageKey_filters = `encar_filters_${carType}`;

    // Initial Load: Sync preferences synchronously 
    const [perPage, setPerPage] = useState(30);
    const [langOpt, setLangOpt] = useState('Language: English');

    // Filters State
    const [filters, setFilters] = useState({
        manufacturer: '',
        model_group: '',
        model: '',
        badge_group: '',
        badge: '',
        badge_detail: '',
        lang: 'en'
    });
    const [filterOptions, setFilterOptions] = useState({
        manufacturers: [],
        modelGroups: [],
        models: [],
        badgeGroups: [],
        badges: [],
        badgeDetails: []
    });

    // Initial Load: Sync preferences after hydration
    useEffect(() => {
        const savedPerPage = localStorage.getItem("per_page_vehicles");
        if (savedPerPage) setPerPage(Number(savedPerPage));

        const savedLang = localStorage.getItem("preferred_lang") || 'en';
        const savedFilters = localStorage.getItem(storageKey_filters);

        let initialFilters = { lang: savedLang };
        if (savedFilters) {
            try {
                const parsed = JSON.parse(savedFilters);
                initialFilters = { ...initialFilters, ...parsed };
            } catch (e) {
                console.error("Failed to parse saved filters", e);
            }
        }

        setFilters(prev => ({ ...prev, ...initialFilters }));

        let label = 'Language: English';
        if (savedLang === 'ko') label = 'Language: Korean';
        else if (savedLang === 'ar') label = 'Language: Arabic';
        setLangOpt(label);

        setIsReady(true);
    }, [carType]);

    // Save filters to localStorage whenever they change
    useEffect(() => {
        if (!isReady) return;
        const { lang, ...rest } = filters;
        localStorage.setItem(storageKey_filters, JSON.stringify(rest));
    }, [filters, isReady, carType]);

    // Fetch filter options
    useEffect(() => {
        if (!isReady) return;

        getEncarFilterOptions({
            car_type: carType,
            manufacturer: filters.manufacturer,
            model_group: filters.model_group,
            model: filters.model,
            badge_group: filters.badge_group,
            badge: filters.badge,
            lang: filters.lang
        }).then(opts => {
            setFilterOptions(opts);
        });
    }, [isReady, filters.manufacturer, filters.model_group, filters.model, filters.badge_group, filters.badge, filters.lang, carType]);

    const fetchData = useCallback(async () => {
        if (!isReady) return;

        const fetchId = ++fetchIdRef.current;
        setLoading(true);

        try {
            const data = await getEncarVehicles(page, perPage, sortbyVal, { ...filters, car_type: carType });

            if (fetchId !== fetchIdRef.current) return;

            if (data && data.data) {
                const norm = data.data.map(normalizeEncarVehicle);
                setVehicles(norm);
                setTotalRecords(data.recordsTotal || 0);
            } else {
                setVehicles([]);
                setTotalRecords(0);
            }
        } catch (error) {
            if (fetchId === fetchIdRef.current) {
                setVehicles([]);
                setTotalRecords(0);
            }
        } finally {
            if (fetchId === fetchIdRef.current) {
                setLoading(false);
            }
        }
    }, [isReady, page, perPage, sortbyVal, filters, carType]);

    useEffect(() => {
        if (!isReady) return;

        fetchData();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isReady, fetchData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePerPageChange = (value) => {
        const val = Number(value);
        setPerPage(val);
        setPage(1);
        localStorage.setItem("per_page_vehicles", val);
    };

    const handleSortChange = (option, value) => {
        setSortbyOpt(option);
        setSortbyVal(value);
        setPage(1);
    };

    const handleFilterChange = (newFilters) => {
        // Reset children when a parent changes
        const updatedFilters = { ...filters, ...newFilters };

        if (newFilters.manufacturer !== undefined) {
            updatedFilters.model_group = '';
            updatedFilters.model = '';
            updatedFilters.badge_group = '';
            updatedFilters.badge = '';
            updatedFilters.badge_detail = '';
        } else if (newFilters.model_group !== undefined) {
            updatedFilters.model = '';
            updatedFilters.badge_group = '';
            updatedFilters.badge = '';
            updatedFilters.badge_detail = '';
        } else if (newFilters.model !== undefined) {
            updatedFilters.badge_group = '';
            updatedFilters.badge = '';
            updatedFilters.badge_detail = '';
        } else if (newFilters.badge_group !== undefined) {
            updatedFilters.badge = '';
            updatedFilters.badge_detail = '';
        } else if (newFilters.badge !== undefined) {
            updatedFilters.badge_detail = '';
        }

        setFilters(updatedFilters);
        setPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            manufacturer: '',
            model_group: '',
            model: '',
            badge_group: '',
            badge: '',
            badge_detail: '',
            lang: filters.lang // Preserve language
        });
        localStorage.removeItem(storageKey_filters);
        setPage(1);
    };

    const activeFilterLabels = React.useMemo(() => {
        const labels = [];
        const mapping = [
            { key: 'manufacturer', list: filterOptions.manufacturers },
            { key: 'model_group', list: filterOptions.modelGroups },
            { key: 'model', list: filterOptions.models },
            { key: 'badge_group', list: filterOptions.badgeGroups },
            { key: 'badge', list: filterOptions.badges },
            { key: 'badge_detail', list: filterOptions.badgeDetails }
        ];

        mapping.forEach(m => {
            const val = filters[m.key];
            if (val && m.list) {
                const found = m.list.find(opt => opt.value === val);
                if (found) {
                    labels.push({ key: m.key, label: found.name });
                }
            }
        });
        return labels;
    }, [filters, filterOptions]);

    const totalPages = Math.ceil(totalRecords / perPage);
    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, totalRecords);

    // Helper to format data
    const fmt = (val, suffix = "") => {
        if (val === undefined || val === null) return "-";
        if (typeof val === 'string' && ["Price", "Mileage", "Year", "Fuel Type", "Transmission", "Manufacturer", "Model", "Engine Volume", "Drive Type", "Vehicle Type", "Seats"].includes(val)) return val;
        // Format numbers
        if (typeof val === 'number') return val.toLocaleString("en-US") + suffix;
        return val;
    };

    const buildChips = (elm) => {
        return [
            fmt(elm.engine_volume, " CC"),
            fmt(elm.drive_type),
            fmt(elm.vehicle_type),
            fmt(elm.seats, " Seats"),
        ];
    };

    const displayTitle = carType === "N" ? "Encar Imported Vehicles" : "Encar Domestic Vehicles";
    const displayTagline = carType === "N" ? "Browse Encar Imported Inventory" : "Browse Encar Domestic Inventory";

    return (
        <section className="cars-section-thirteen layout-radius">
            <div className="boxcar-container">
                <div className="boxcar-title-three wow fadeInUp">
                    <ul className="breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <span>{displayTitle}</span>
                        </li>
                    </ul>
                    <h2>{displayTagline}</h2>
                </div>

                <div className="row">
                    <EncarSidebar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        options={filterOptions}
                    />

                    {/* Listing */}
                    <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                        <div className="right-box">

                            {/* Filter Status Bar */}
                            {activeFilterLabels.length > 0 && (
                                <div className="filter-summary mb-3 p-3 bg-light rounded d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <div className="d-flex flex-wrap gap-2">
                                        {activeFilterLabels.map(item => (
                                            <div key={item.key} className="badge bg-white text-dark border p-2 rounded-pill d-flex align-items-center gap-2">
                                                <span className="fw-normal">{item.label}</span>
                                                <span
                                                    className="ms-1 cursor-pointer"
                                                    style={{ fontSize: '18px', lineHeight: '14px', cursor: 'pointer', opacity: 0.6 }}
                                                    onClick={() => handleFilterChange({ [item.key]: '' })}
                                                >×</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={clearAllFilters}
                                        className="btn btn-link text-danger text-decoration-none p-0"
                                        style={{ fontSize: '14px', fontWeight: 500 }}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}

                            {/* Listing Header */}
                            <div className="text-box mb-4">
                                <div className="text d-flex align-items-center gap-2">
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <span>
                                            Showing {totalRecords > 0 ? from : 0} to {to} of {totalRecords} vehicles
                                        </span>
                                    )}
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                                        <div className="form_boxes v3 me-3">
                                            <SelectCompFunctional
                                                options={[
                                                    "Language: English",
                                                    "Language: Korean",
                                                    "Language: Arabic",
                                                ]}
                                                selectedValue={langOpt}
                                                onChange={(val) => {
                                                    setLangOpt(val);
                                                    let newLang = 'en';
                                                    if (val.includes("Korean")) newLang = 'ko';
                                                    else if (val.includes("Arabic")) newLang = 'ar';

                                                    localStorage.setItem("preferred_lang", newLang);
                                                    setFilters(prev => ({ ...prev, lang: newLang }));
                                                    setPage(1);
                                                }}
                                            />
                                        </div>
                                        <div className="form_boxes v3 me-3">
                                            <SelectCompFunctional
                                                options={[
                                                    "Currency: USD",
                                                    "Currency: KRW",
                                                    "Currency: AED",
                                                    "Currency: EUR",
                                                    "Currency: GBP"
                                                ]}
                                                values={["USD", "KRW", "AED", "EUR", "GBP"]}
                                                selectedValue={`Currency: ${currency}`}
                                                onChange={(opt, val) => changeCurrency(val)}
                                            />
                                        </div>
                                        <div className="form_boxes v3 me-3">
                                            <SelectCompFunctional
                                                options={[
                                                    "Sort By",
                                                    "Price: Low to High",
                                                    "Price: High to Low",
                                                    "Mileage: Low to High",
                                                    "Mileage: High to Low",
                                                    "Year: New to Old"
                                                ]}
                                                values={[
                                                    "default",
                                                    "priceasc",
                                                    "pricedesc",
                                                    "mileageasc",
                                                    "mileagedesc",
                                                    "year"
                                                ]}
                                                selectedValue={sortbyOpt}
                                                onChange={handleSortChange}
                                            />
                                        </div>

                                        <div className="form_boxes v3 ms-3">
                                            <small className="me-2">Per Page</small>
                                            <SelectCompFunctional
                                                options={["20", "30", "50", "80", "100"]}
                                                values={["20", "30", "50", "80", "100"]}
                                                selectedValue={perPage.toString()}
                                                onChange={(opt, val) => handlePerPageChange(val)}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Vehicles */}
                            {loading && (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {!loading && vehicles.length === 0 && (
                                <div className="py-5 text-center bg-light rounded">
                                    <h4>No vehicles found</h4>
                                </div>
                            )}

                            {!loading && vehicles.length > 0 && (
                                <div className="cars-container">
                                    {vehicles.map((elm, index) => {
                                        const chips = buildChips(elm);
                                        return (
                                            <div 
                                                key={elm.id ?? index} 
                                                className="service-block-thirteen cl-row-block"
                                                onClick={(e) => {
                                                    // Handle card click to open in new tab
                                                    if (e.target.closest('a') || e.target.closest('button')) return;
                                                    window.open(`/domestic/${elm.id}`, '_blank');
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="inner-box">
                                                    <div className="image-box cl-leftBox">
                                                        <figure className="image" style={{ height: "100%" }}>
                                                            <Link href={`/domestic/${elm.id}`} target="_blank">
                                                                <Image
                                                                    src={elm.img}
                                                                    alt={elm.title}
                                                                    width={260}
                                                                    height={195}
                                                                    style={{ objectFit: "fill", height: "100%" }}
                                                                    priority={index <= 2}
                                                                    onError={(e) => {
                                                                        e.target.srcset = "/images/resource/about-inner1-5.jpg";
                                                                    }}
                                                                />
                                                            </Link>
                                                        </figure>
                                                    </div>

                                                    <div className="right-box cl-rightBox">
                                                        <div className="content-box">
                                                            <h4 className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                <Link href={`/domestic/${elm.id}`} title={elm.title} target="_blank">
                                                                    {elm.title}
                                                                </Link>
                                                            </h4>

                                                            <div className="text mb-1">VIN No. {elm.vin}</div>

                                                            <div className="inspection-sec mb-1">
                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Mileage</span>
                                                                        <small>{fmt(elm.mileage, " km")}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Fuel Type</span>
                                                                        <small>{elm.fuel}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Transmission</span>
                                                                        <small>{elm.transmission}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Year</span>
                                                                        <small>{elm.year}</small>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Dynamic Chips */}
                                                            <ul className="ul-cotent">
                                                                {chips.map((t, idx) => (
                                                                    <li key={idx}>
                                                                        <a href="#">{t}</a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="content-box-two cl-contentBoxTwo d-flex flex-column justify-content-between mb-3">
                                                            <h4 className="title">
                                                                {typeof elm.price === 'number'
                                                                    ? (currency === 'KRW'
                                                                        ? <>₩{(elm.price / 100).toLocaleString()} <small style={{ fontSize: '0.6em', fontWeight: 'normal' }}>Million Won</small></>
                                                                        : format(convert(elm.price * 10000, "KRW")))
                                                                    : elm.price}
                                                            </h4>

                                                            <Link href={`/domestic/${elm.id}`} className="button" target="_blank">
                                                                View Details
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                    <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#405FF2" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalRecords > 0 && totalPages > 1 && (
                                <div className="pagination-sec mt-4">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                    <div className="text mt-3">
                                        Showing {from} to {to} of {totalRecords} vehicles
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
