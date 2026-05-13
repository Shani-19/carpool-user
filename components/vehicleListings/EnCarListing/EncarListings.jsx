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
const normalizeEncarVehicle = (v, category = 'car') => {
    const imgBase = process.env.NEXT_PUBLIC_ENCAR_IMG_SRC;
    let mainImage = "/images/resource/about-inner1-5.jpg";

    if (v.Photos && v.Photos.length > 0) {
        mainImage = `${imgBase}${v.Photos[0].location}?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30&t=20251212092207`;
    } else if (v.Photo) {
        mainImage = `${imgBase}${v.Photo}001.jpg`;
    }

    const originalPrice = v.Price;
    const isLowPrice = typeof originalPrice === 'number' && originalPrice < 500;

    const base = {
        id: v.Id,
        title: `${(v.Year ? String(v.Year).substring(0, 4) : v.FormYear) || ''} ${v.Manufacturer || 'Manufacturer'} ${v.Model || 'Model'}`.trim(),
        price: typeof originalPrice === 'number' ? originalPrice + 44 : (originalPrice !== undefined ? originalPrice : "Price"),
        originalPrice,
        isLowPrice,
        year: v.Year ? String(v.Year).substring(0, 4) : (v.FormYear || "Year"),
        mileage: v.Mileage !== undefined ? v.Mileage : "Mileage",
        fuel: v.FuelType || "Fuel Type",
        transmission: v.Transmission || "Transmission",
        img: mainImage,
        vin: v.VIN || v.Vin || v.vin || "-",
        badge: v.Badge || "",

        engine_volume: v.EngineVolume || v.Capacity || "Engine Volume",
        drive_type: v.DriveType || v.Use || "Drive Type",
        vehicle_type: v.VehicleType || v.FormDetail || "Vehicle Type",
        seats: v.Seats || "Seats",
        sellType: v.SellType || "GENERAL",
        salesStatus: v.SalesStatus || "OPEN",
    };

    return base;
};

export default function EncarListings({ carType = "Y", category = "car" }) {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortbyOpt, setSortbyOpt] = useState('Sort By');
    const [sortbyVal, setSortbyVal] = useState('default');
    const { currency, changeCurrency, convert, format } = useCurrency();
    const [isReady, setIsReady] = useState(false);

    const detailPath = category === 'truck' ? '/cargo' : (carType === 'N' ? '/import' : '/domestic');

    const fetchIdRef = React.useRef(0);

    const storageKey_filters = category === 'truck'
        ? 'encar_filters_cargo'
        : (carType === 'N' ? 'encar_filters_import' : 'encar_filters_domestic');

    // Initial Load
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
        lang: 'en',

        year_min: '',
        year_max: '',
        mileage_min: '',
        mileage_max: '',
        price_min: '',
        price_max: '',

        fuel_type: '',
        vehicle_type: '',
        transmission: '',
        seats: '',
        varaxis: '',
        color: '',
        interior_color: '',
        options: [],
        activeLabels: {} // language scoped
    });
    const [filterOptions, setFilterOptions] = useState({
        manufacturers: [],
        modelGroups: [],
        models: [],
        badgeGroups: [],
        badges: [],
        badgeDetails: [],

        fuel_types: [],
        transmissions: [],
        vehicle_types: [],
        passengers: [],
        varaxis: [],
        exterior_colors: [],
        interior_colors: [],
        options: [],
        price_max: 20000,
        mileage_max: 300000
    });

    // Initial Load: Sync preferences post hydration
    useEffect(() => {
        const savedPerPage = localStorage.getItem("per_page_vehicles");
        if (savedPerPage) setPerPage(Number(savedPerPage));

        const savedLang = localStorage.getItem("preferred_lang") || 'en';
        const savedFilters = localStorage.getItem(storageKey_filters);

        let initialFilters = { lang: savedLang, activeLabels: {} };
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
    }, [carType, category, storageKey_filters]);

    // Save filters to localStorage on change
    useEffect(() => {
        if (!isReady) return;
        const { lang, ...rest } = filters;
        localStorage.setItem(storageKey_filters, JSON.stringify(rest));
    }, [filters, isReady, carType, category, storageKey_filters]);

    // Fetch filter options
    useEffect(() => {
        if (!isReady) return;

        getEncarFilterOptions({
            category,
            car_type: carType,
            manufacturer: filters.manufacturer,
            model_group: filters.model_group,
            model: filters.model,
            badge_group: filters.badge_group,
            badge: filters.badge,
            fuel_type: filters.fuel_type,
            transmission: filters.transmission,
            vehicle_type: filters.vehicle_type,
            seats: filters.seats,
            varaxis: filters.varaxis,
            color: filters.color,
            interior_color: filters.interior_color,
            options: filters.options,
            lang: filters.lang,
            year_min: filters.year_min,
            year_max: filters.year_max,
            mileage_min: filters.mileage_min,
            mileage_max: filters.mileage_max,
            price_min: filters.price_min,
            price_max: filters.price_max,
            badge_detail: filters.badge_detail,
        }).then(opts => {
            setFilterOptions(opts);

            // Sync Active Labels for the current language
            setFilters(prev => {
                const lang = prev.lang || 'en';
                const currentLabels = prev.activeLabels?.[lang] || {};
                const newLabels = { ...currentLabels };
                let changed = false;

                const collections = [
                    { key: 'manufacturer', list: opts.manufacturers },
                    { key: 'model_group', list: opts.modelGroups },
                    { key: 'model', list: opts.models },
                    { key: 'badge_group', list: opts.badgeGroups },
                    { key: 'badge', list: opts.badges },
                    { key: 'badge_detail', list: opts.badgeDetails },
                    { key: 'fuel_type', list: opts.fuel_types },
                    { key: 'transmission', list: opts.transmissions },
                    { key: 'vehicle_type', list: opts.vehicle_types },
                    { key: 'seats', list: opts.passengers },
                    { key: 'varaxis', list: opts.varaxis },
                    { key: 'color', list: opts.exterior_colors },
                    { key: 'interior_color', list: opts.interior_colors }
                ];

                collections.forEach(m => {
                    const val = prev[m.key];
                    if (val && m.list) {
                        const found = m.list.find(opt => String(opt.value) === String(val));
                        if (found && newLabels[val] !== found.name) {
                            newLabels[val] = found.name;
                            changed = true;
                        }
                    }
                });

                if (changed) {
                    return {
                        ...prev,
                        activeLabels: {
                            ...prev.activeLabels,
                            [lang]: newLabels
                        }
                    };
                }
                return prev;
            });
        });
    }, [isReady, filters.manufacturer, filters.model_group, filters.model, filters.badge_group, filters.badge,
        filters.fuel_type, filters.transmission, filters.vehicle_type, filters.seats, filters.varaxis, filters.color, filters.interior_color, filters.options,
        filters.year_min, filters.year_max, filters.mileage_min, filters.mileage_max,
        filters.price_min, filters.price_max, filters.lang, filters.badge_detail, carType, category]);



    const fetchData = useCallback(async () => {
        if (!isReady) return;

        const fetchId = ++fetchIdRef.current;
        setLoading(true);

        try {
            const data = await getEncarVehicles(page, perPage, sortbyVal, { ...filters, car_type: carType, category });

            if (fetchId !== fetchIdRef.current) return;

            if (data && data.data) {
                const norm = data.data.map(v => normalizeEncarVehicle(v, category));
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
    }, [isReady, page, perPage, sortbyVal, filters, carType, category]);

    useEffect(() => {
        if (!isReady) return;
        fetchData();
    }, [isReady, fetchData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const handleFilterChange = (newFilters, labelsMap = null) => {
        setFilters(prev => {
            let updated = { ...prev, ...newFilters };

            // Reset hierarchy children on parental change
            if (newFilters.manufacturer !== undefined) {
                updated.model_group = ''; updated.model = ''; updated.badge_group = ''; updated.badge = ''; updated.badge_detail = '';
            } else if (newFilters.model_group !== undefined) {
                updated.model = ''; updated.badge_group = ''; updated.badge = ''; updated.badge_detail = '';
            } else if (newFilters.model !== undefined) {
                updated.badge_group = ''; updated.badge = ''; updated.badge_detail = '';
            } else if (newFilters.badge_group !== undefined) {
                updated.badge = ''; updated.badge_detail = '';
            } else if (newFilters.badge !== undefined) {
                updated.badge_detail = '';
            }

            if (labelsMap) {
                const lang = prev.lang || 'en';
                const currentLabels = prev.activeLabels?.[lang] || {};
                updated.activeLabels = {
                    ...prev.activeLabels,
                    [lang]: { ...currentLabels, ...labelsMap }
                };
            }

            return updated;
        });
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
            lang: filters.lang,

            year_min: '',
            year_max: '',
            mileage_min: '',
            mileage_max: '',
            price_min: '',
            price_max: '',

            fuel_type: '',
            vehicle_type: '',
            transmission: '',
            seats: '',
            varaxis: '',
            color: '',
            interior_color: '',
            options: []
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
            { key: 'badge_detail', list: filterOptions.badgeDetails },

            { key: 'fuel_type', list: filterOptions.fuel_types },
            { key: 'transmission', list: filterOptions.transmissions },
            { key: 'vehicle_type', list: filterOptions.vehicle_types },
            { key: 'seats', list: filterOptions.passengers },
            { key: 'varaxis', list: filterOptions.varaxis },
            { key: 'color', list: filterOptions.exterior_colors },
            { key: 'interior_color', list: filterOptions.interior_colors },
            { key: 'options', list: filterOptions.options, isArray: true }
        ];

        mapping.forEach(m => {
            if (m.isArray) {
                const values = filters[m.key] || [];
                values.forEach(val => {
                    const found = m.list && m.list.length > 0 ? m.list.find(opt => String(opt.value) === String(val)) : null;
                    const persistentName = filters.activeLabels?.[filters.lang]?.[val];
                    let labelText = val;
                    if (found) labelText = found.name;
                    else if (persistentName) labelText = persistentName;
                    else labelText = "...";
                    labels.push({ key: m.key, label: labelText, value: val });
                });
                return;
            }

            const val = filters[m.key];
            if (!val) return;

            // display name
            const found = m.list && m.list.length > 0 ? m.list.find(opt => String(opt.value) === String(val)) : null;

            let labelText = val;
            const persistentName = filters.activeLabels?.[filters.lang]?.[val];

            if (found) {
                labelText = found.name;
            } else if (persistentName) {
                labelText = persistentName;
            } else {
                labelText = "...";
            }

            labels.push({ key: m.key, label: labelText });
        });

        // Range labels
        if (filters.year_min || filters.year_max) {
            let yearLabel = "";
            if (filters.year_min && filters.year_max) {
                yearLabel = `${filters.year_min} - ${filters.year_max}`;
            } else if (filters.year_min) {
                yearLabel = `${filters.year_min} +`;
            } else {
                yearLabel = `Up to ${filters.year_max}`;
            }
            labels.push({ key: 'year', label: `Year: ${yearLabel}` });
        }
        if (filters.mileage_min || filters.mileage_max) {
            const fmt = (num) => Number(num).toLocaleString('en-US');
            const minStr = filters.mileage_min ? fmt(filters.mileage_min) : '0';
            const rawMax = filterOptions.mileage_max ? fmt(filterOptions.mileage_max) : "1,000,000";
            const maxStr = filters.mileage_max ? fmt(filters.mileage_max) : `${rawMax}+`;
            labels.push({ key: 'mileage', label: `Mileage: ${minStr} - ${maxStr} km` });
        }
        if (filters.price_min || filters.price_max) {
            const rawMax = filterOptions.price_max || 10000;
            if (currency === 'KRW') {
                const min = filters.price_min ? Math.round((Number(filters.price_min) + 44) / 100) : '0';
                const max = filters.price_max ? Math.round((Number(filters.price_max) + 44) / 100) : `${Math.round((rawMax + 44) / 100)}+`;
                labels.push({ key: 'price', label: `Price: ${min} - ${max} Million Won` });
            } else {
                const min = filters.price_min ? format(Math.round(convert((Number(filters.price_min) + 44) * 10000, "KRW"))) : '0';
                const max = filters.price_max ? format(Math.round(convert((Number(filters.price_max) + 44) * 10000, "KRW"))) : `${format(Math.round(convert((Number(rawMax) + 44) * 10000, "KRW")))}+`;
                labels.push({ key: 'price', label: `Price: ${min} - ${max}` });
            }
        }

        return labels;
    }, [filters, filterOptions, currency, convert, format]);

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

    const displayTitle = category === 'truck' ? "Cargo" : (carType === "N" ? "Imported Vehicles" : "Domestic Vehicles");
    const displayTagline = category === 'truck' ? "Browse Cargo Inventory" : (carType === "N" ? "Browse Imported Inventory" : "Browse Domestic Inventory");

    const canPrev = !!totalRecords && page > 1;
    const canNext = !!totalRecords && page < totalPages;

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
                        category={category}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        options={filterOptions}
                        activeLabels={filters.activeLabels?.[filters.lang] || {}}
                    />

                    {/* Listing */}
                    <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12">
                        <div className="right-box">

                            {/* Filter Status Bar */}
                            {activeFilterLabels.length > 0 && (
                                <div className="filter-summary mb-3 p-3 bg-light rounded d-flex flex-column flex-md-row align-items-md-start justify-content-between gap-3">
                                    <div className="d-flex flex-wrap gap-2">
                                        {activeFilterLabels.map(item => (
                                            <div key={item.key + (item.value ? '-' + item.value : '')} className="cstm-filter-chip badge bg-white text-dark border p-2 rounded-pill d-flex align-items-center gap-2">
                                                <span className="fw-normal">{item.label}</span>
                                                <span
                                                    className="ms-1 cursor-pointer"
                                                    style={{ fontSize: '18px', lineHeight: '14px', cursor: 'pointer', opacity: 0.6 }}
                                                    onClick={() => {
                                                        if (item.key === 'year') {
                                                            handleFilterChange({ year_min: '', year_max: '' });
                                                        } else if (item.key === 'mileage') {
                                                            handleFilterChange({ mileage_min: '', mileage_max: '' });
                                                        } else if (item.key === 'price') {
                                                            handleFilterChange({ price_min: '', price_max: '' });
                                                        } else if (item.key === 'options') {
                                                            const newOptions = (filters.options || []).filter(o => o !== item.value);
                                                            handleFilterChange({ options: newOptions });
                                                        } else {
                                                            handleFilterChange({ [item.key]: '' });
                                                        }
                                                    }}
                                                >×</span>
                                            </div>
                                        ))}
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
                            <div className="text-box mb-4 d-flex flex-column-reverse flex-xl-row align-items-xl-center justify-content-between gap-3">
                                <div className="text d-flex align-items-center flex-column flex-sm-row gap-2">
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : !loading && vehicles.length === 0 ? (
                                        <span>No vehicles found.</span>
                                    ) : (
                                        <>
                                            <span>
                                                Showing {totalRecords > 0 ? from : 0} to {to} of {totalRecords} vehicles
                                            </span>
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    disabled={!canPrev}
                                                    onClick={() => setPage(page - 1)}
                                                >
                                                    ←
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    disabled={!canNext}
                                                    onClick={() => setPage(page + 1)}
                                                >
                                                    →
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex align-items-center flex-wrap gap-3">
                                    <div className="d-flex flex-wrap gap-2 w-100 w-md-auto justify-content-center justify-content-md-end">
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
                                                    if (["CONTRACT", "Contracted"].includes(elm.salesStatus)) return;
                                                    // Handle card click to open in new tab
                                                    if (e.target.closest('a') || e.target.closest('button')) return;
                                                    window.open(`${detailPath}/${elm.id}`, '_blank');
                                                }}
                                                style={{ cursor: !["CONTRACT", "Contracted"].includes(elm.salesStatus) ? 'pointer' : 'default' }}
                                            >
                                                <div className="inner-box">
                                                    <div className="image-box cl-leftBox">
                                                        <figure className="image" style={{ height: "100%", position: 'relative' }}>
                                                            {["CONTRACT", "Contracted"].includes(elm.salesStatus) ? (
                                                                <span style={{ cursor: 'default', display: 'block' }}>
                                                                    <Image
                                                                        src={elm.img}
                                                                        alt={elm.title}
                                                                        width={260}
                                                                        height={195}
                                                                        style={{ objectFit: "fill", height: "192px" }}
                                                                        priority={index <= 2}
                                                                        onError={(e) => {
                                                                            e.target.srcset = "/images/resource/about-inner1-5.jpg";
                                                                        }}
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <Link href={`${detailPath}/${elm.id}`} target="_blank">
                                                                    <Image
                                                                        src={elm.img}
                                                                        alt={elm.title}
                                                                        width={260}
                                                                        height={195}
                                                                        style={{ objectFit: "fill", height: "192px" }}
                                                                        priority={index <= 2}
                                                                        onError={(e) => {
                                                                            e.target.srcset = "/images/resource/about-inner1-5.jpg";
                                                                        }}
                                                                    />
                                                                </Link>
                                                            )}
                                                            {["CONTRACT", "Contracted", "Reserved", "계약"].includes(elm.salesStatus) && (
                                                                <div className="cl-reserved-overlay">
                                                                    <span>Reserved</span>
                                                                </div>
                                                            )}
                                                        </figure>
                                                    </div>

                                                    <div className="right-box cl-rightBox">
                                                        <div className="content-box">
                                                            <h4 className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {["CONTRACT", "Contracted"].includes(elm.salesStatus) ? (
                                                                    <span title={elm.title} style={{ cursor: 'default', color: 'inherit' }}>{elm.title}</span>
                                                                ) : (
                                                                    <Link href={`${detailPath}/${elm.id}`} title={elm.title} target="_blank">
                                                                        {elm.title}
                                                                    </Link>
                                                                )}
                                                            </h4>

                                                            {/* <div className="text mb-1">VIN No. {elm.vin}</div> */}
                                                            <div className="text mb-0">VIN No. DUMMY-VIN-NUM-123</div>

                                                            <div className="inspection-sec mb-3 mb-lg-1 d-flex flex-nowrap gap-4 overflow-x-auto">
                                                                <div className="inspection-box gap-0 text-nowrap">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Mileage</span>
                                                                        <small>{fmt(elm.mileage, " km")}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0 text-nowrap">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Fuel Type</span>
                                                                        <small>{elm.fuel}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0 text-nowrap">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Transmission</span>
                                                                        <small>{elm.transmission}</small>
                                                                    </div>
                                                                </div>

                                                                <div className="inspection-box gap-0 text-nowrap">
                                                                    <span className="icon"></span>
                                                                    <div className="info">
                                                                        <span>Year</span>
                                                                        <small>{elm.year}</small>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Dynamic Chips */}
                                                            <ul className="ul-cotent d-flex flex-nowrap gap-2 overflow-x-auto">
                                                                {chips.map((t, idx) => (
                                                                    <li key={idx} className="text-nowrap">
                                                                        <a href="#">{t}</a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="content-box-two cl-contentBoxTwo d-flex flex-column justify-content-between mb-3">
                                                            <h4 className="title">
                                                                {["CONTRACT", "Contracted"].includes(elm.salesStatus) ? (
                                                                    <span className="badge bg-white text-danger border border-0 px-3 py-2" style={{ fontSize: '0.8em' }}>Reserved</span>
                                                                ) : ["RENTAL", "LEASE"].includes(elm.sellType) ? (
                                                                    <a className="badge bg-white text-warning border border-0 px-3 py-2" style={{ fontSize: '0.8em' }}>Ask Price
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ms-2" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#FFC107" />
                                                                        </svg>
                                                                    </a>
                                                                ) : (
                                                                    typeof elm.price === 'number'
                                                                        ? (currency === 'KRW'
                                                                            ? (
                                                                                <>
                                                                                    ₩{((elm.price * 10000 + (elm.isLowPrice ? convert(300, "USD") : 0)) / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                    <small style={{ fontSize: '0.6em', fontWeight: 'normal' }}> Million</small>
                                                                                </>
                                                                            )
                                                                            : format(convert(elm.price * 10000, "KRW") + (elm.isLowPrice ? convert(300, "USD") : 0)))
                                                                        : elm.price
                                                                )}
                                                            </h4>

                                                            {["CONTRACT", "Contracted"].includes(elm.salesStatus) ? (
                                                                <>
                                                                    <span className="button" style={{ opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' }}>
                                                                        View Details
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#405FF2" />
                                                                        </svg>
                                                                    </span>
                                                                    <span className="cl-report-btn text text-danger mb-0" style={{ opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' }}>Condition Report
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ms-2" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#dc3545" />
                                                                        </svg>
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Link href={`${detailPath}/${elm.id}`} className="button">
                                                                        View Details
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#405FF2" />
                                                                        </svg>
                                                                    </Link>
                                                                    <Link href={`https://inspection.carpoolkr.com/initial-report/${elm.id}`} target="_blank" className="cl-report-btn text text-danger mb-0">Condition Report
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="ms-2" width={14} height={14} viewBox="0 0 14 14" fill="none">
                                                                            <path d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z" fill="#dc3545" />
                                                                        </svg>
                                                                    </Link>
                                                                </>
                                                            )}
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
