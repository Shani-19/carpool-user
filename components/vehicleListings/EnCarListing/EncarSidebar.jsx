"use client";
import React from "react";
import SearchableDropdown from "./EncarSearchableDropdown";
import RangeInput from "../common/RangeInput";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCurrency } from "@/context/CurrencyContext";

export default function EncarSidebar({ filters, onFilterChange, options, activeLabels = {}, category = 'car' }) {
    const labels = React.useMemo(() => {
        const mapping = {
            manufacturer: options.manufacturers,
            model_group: options.modelGroups,
            model: options.models,
            badge_group: options.badgeGroups,
            badge: options.badges,
            badge_detail: options.badgeDetails,
            fuel_type: options.fuel_types,
            transmission: options.transmissions,
            vehicle_type: options.vehicle_types,
            seats: options.passengers,
            varaxis: options.varaxis,
            color: options.exterior_colors,
            interior_color: options.interior_colors
        };

        const result = {};
        Object.entries(mapping).forEach(([key, list]) => {
            const currentVal = filters[key];
            if (!currentVal) {
                result[key] = '';
            } else {
                const found = list && list.length > 0 ? list.find(opt => String(opt.value) === String(currentVal)) : null;

                // Live List / Persistent Active Labels / Raw Value/Placeholder
                if (found) {
                    result[key] = found.name;
                } else if (activeLabels[currentVal]) {
                    result[key] = activeLabels[currentVal];
                } else {
                    result[key] = "...";
                }
            }
        });
        return result;
    }, [filters, options, activeLabels]);


    const { currency, convert, format, rates } = useCurrency();

    // Handler to update a specific filter
    const handleFilterUpdate = (key, value, opt) => {
        const labelsMap = (opt && typeof opt === 'object' && opt.name) ? { [value]: opt.name } : null;
        onFilterChange({ [key]: value }, labelsMap);
    };

    // Toggle for multi-select options
    const handleOptionToggle = (val) => {
        const current = filters.options || [];
        const updated = current.includes(val)
            ? current.filter(o => o !== val)
            : [...current, val];
        onFilterChange({ options: updated });
    };



    // Price conversion helpers
    const toDisplayPrice = (manWon) => {
        if (manWon === "" || manWon === undefined || manWon === null) return "";
        const withOffset = Number(manWon) + 44;
        if (currency === 'KRW') {
            // Return in (Million Won)
            return Math.round(withOffset / 100);
        }
        // currency conversion
        return Math.round(convert(withOffset * 10000, "KRW"));
    };

    const fromDisplayPrice = (displayVal) => {
        if (displayVal === "" || displayVal === undefined || displayVal === null) return "";
        let manWon;
        if (currency === 'KRW') {
            manWon = (displayVal * 100) - 44;
        } else {
            // Target -> Won -> (Man-won + 44)
            if (!rates || !rates[currency] || !rates["KRW"]) return displayVal;
            const won = (displayVal / rates[currency]) * rates["KRW"];
            manWon = (won / 10000) - 44;
        }
        return Math.max(0, Math.round(manWon));
    };



    // Helper to prepend "All" option
    const withAll = (list, label, valueKey = "value") => {
        if (!list || list.length === 0) return [];
        return [{ name: label, [valueKey]: "" }, ...list];
    };

    // Years range 
    const availableMinYears = React.useMemo(() => {
        if (!options.years || options.years.length === 0) return [];
        let list = [...options.years];
        if (filters.year_max) {
            list = list.filter(y => y.value <= Number(filters.year_max));
        }
        return list.sort((a, b) => b.value - a.value);
    }, [options.years, filters.year_max]);

    const availableMaxYears = React.useMemo(() => {
        if (!options.years || options.years.length === 0) return [];
        let list = [...options.years];
        if (filters.year_min) {
            list = list.filter(y => y.value >= Number(filters.year_min));
        }
        return list.sort((a, b) => b.value - a.value);
    }, [options.years, filters.year_min]);

    const isKRW = currency === 'KRW';
    const priceDisplayMin = toDisplayPrice(filters.price_min);
    const priceDisplayMax = toDisplayPrice(filters.price_max);

    // Dynamic max bounds from options
    const rawMileageMax = options.mileage_max || 1000000;
    const rawPriceMax = options.price_max || 10000;

    // Slider bounds in target currency (converted from API max + 44 offset)
    const sliderMax = isKRW ? Math.round((rawPriceMax + 44) / 100) : Math.round(toDisplayPrice(rawPriceMax));
    const sliderStep = isKRW ? 1 : Math.round(sliderMax / 100) || 1;

    const [localMileage, setLocalMileage] = React.useState([0, rawMileageMax]);
    const [localPrice, setLocalPrice] = React.useState([0, sliderMax]);

    React.useEffect(() => {
        setLocalMileage([
            filters.mileage_min ? Number(filters.mileage_min) : 0,
            filters.mileage_max ? Number(filters.mileage_max) : rawMileageMax
        ]);
    }, [filters.mileage_min, filters.mileage_max, rawMileageMax]);

    React.useEffect(() => {
        setLocalPrice([
            filters.price_min ? Math.max(0, toDisplayPrice(filters.price_min)) : 0,
            filters.price_max ? Math.max(0, toDisplayPrice(filters.price_max)) : sliderMax
        ]);
    }, [filters.price_min, filters.price_max, sliderMax, currency]);


    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`wrap-sidebar-dk side-bar col-xl-3 col-lg-12 col-md-12 col-sm-12 ${isOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-handle" onClick={() => setIsOpen(!isOpen)}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z" fill="#050B20" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z" fill="#050B20" />
                </svg>
                {isOpen ? 'Hide Filter' : 'Show Filter'}
            </div>

            <div className={`inventory-sidebar ${isOpen ? 'active' : ''}`}>
                <div className="inventroy-widget widget-location cstm-sidebar">
                    <div className="row">
                        {/* Manufacturer */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Manufacturer</label>
                                <SearchableDropdown
                                    options={withAll(options.manufacturers, "All Manufacturers")}
                                    defaultValue={filters.manufacturer || ""}
                                    placeholder="All Manufacturers"
                                    onSelect={(val, opt) => handleFilterUpdate("manufacturer", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    selectedLabel={labels.manufacturer}
                                />
                            </div>
                        </div>

                        {/* Model Group - Only for Cars */}
                        {category !== 'truck' && (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Model Group</label>
                                    <SearchableDropdown
                                        options={withAll(options.modelGroups, "All Model Groups")}
                                        defaultValue={filters.model_group || ""}
                                        placeholder="All Model Groups"
                                        onSelect={(val, opt) => handleFilterUpdate("model_group", val, opt)}
                                        displayKey="name"
                                        valueKey="value"
                                        disabled={!filters.manufacturer}
                                        selectedLabel={labels.model_group}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Model */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Model</label>
                                <SearchableDropdown
                                    options={withAll(options.models, "All Models")}
                                    defaultValue={filters.model || ""}
                                    placeholder="All Models"
                                    onSelect={(val, opt) => handleFilterUpdate("model", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    disabled={category === 'truck' ? !filters.manufacturer : !filters.model_group}
                                    selectedLabel={labels.model}
                                    subLabelKey="year_range"
                                />
                            </div>
                        </div>

                        {/* Badge Group - Only for Cars */}
                        {category !== 'truck' && (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Badge Group</label>
                                    <SearchableDropdown
                                        options={withAll(options.badgeGroups, "All Badge Groups")}
                                        defaultValue={filters.badge_group || ""}
                                        placeholder="All Badge Groups"
                                        onSelect={(val, opt) => handleFilterUpdate("badge_group", val, opt)}
                                        displayKey="name"
                                        valueKey="value"
                                        disabled={!filters.model}
                                        selectedLabel={labels.badge_group}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Badge */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Badge</label>
                                <SearchableDropdown
                                    options={withAll(options.badges, "All Badges")}
                                    defaultValue={filters.badge || ""}
                                    placeholder="All Badges"
                                    onSelect={(val, opt) => handleFilterUpdate("badge", val, opt)}
                                    displayKey="name"
                                    valueKey="value"
                                    disabled={!filters.model}
                                    selectedLabel={labels.badge}
                                />
                            </div>
                        </div>

                        {/* Badge Detail - Only for Cars */}
                        {category !== 'truck' && (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Badge Detail</label>
                                    <SearchableDropdown
                                        options={withAll(options.badgeDetails, "All Badge Details")}
                                        defaultValue={filters.badge_detail || ""}
                                        placeholder="All Badge Details"
                                        onSelect={(val, opt) => handleFilterUpdate("badge_detail", val, opt)}
                                        displayKey="name"
                                        valueKey="value"
                                        disabled={!filters.badge}
                                        selectedLabel={labels.badge_detail}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Year Range */}
                        <div className="col-lg-6 cstm-year-clmn pe-2">
                            <div className="form_boxes">
                                <label>Min Year</label>
                                <SearchableDropdown
                                    options={withAll(availableMinYears, "All")}
                                    defaultValue={filters.year_min || ""}
                                    placeholder="All"
                                    onSelect={(val) => onFilterChange({ year_min: val })}
                                    searchable={false}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 cstm-year-clmn ps-2">
                            <div className="form_boxes">
                                <label>Max Year</label>
                                <SearchableDropdown
                                    options={withAll(availableMaxYears, "All")}
                                    defaultValue={filters.year_max || ""}
                                    placeholder="All"
                                    onSelect={(val) => onFilterChange({ year_max: val })}
                                    searchable={false}
                                />
                            </div>
                        </div>

                        {/* Mileage Range */}
                        <div className="col-lg-12">
                            <div className="price-box mb-4">
                                <h6 className="title">Mileage (km)</h6>
                                <div className="row g-0">
                                    <div className="col-lg-6 cstm-range-clmn pe-2">
                                        <div className="form_boxes">
                                            <label>Min</label>
                                            <RangeInput
                                                placeholder="Min"
                                                value={localMileage[0]}
                                                suffix="km"
                                                onChange={(val) => {
                                                    const min = val !== "" ? Math.max(0, Number(val)) : "";
                                                    const max = filters.mileage_max === "" ? "" : Number(filters.mileage_max);
                                                    if (min !== "" && max !== "" && min > max) {
                                                        onFilterChange({ mileage_min: max, mileage_max: min });
                                                    } else {
                                                        onFilterChange({ mileage_min: min });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 cstm-range-clmn ps-2">
                                        <div className="form_boxes">
                                            <label>Max</label>
                                            <RangeInput
                                                placeholder="Max"
                                                value={localMileage[1] >= rawMileageMax && !filters.mileage_max ? `${rawMileageMax}+` : localMileage[1]}
                                                suffix="km"
                                                onChange={(val) => {
                                                    let max = val !== "" ? Math.max(0, Number(val)) : "";
                                                    if (max !== "" && max >= rawMileageMax) max = "";
                                                    const min = filters.mileage_min === "" ? "" : Number(filters.mileage_min);
                                                    if (min !== "" && max !== "" && min > max) {
                                                        onFilterChange({ mileage_min: max, mileage_max: min });
                                                    } else {
                                                        onFilterChange({ mileage_max: max });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-price cstm-slider-widget">
                                    <Slider
                                        range
                                        min={0}
                                        max={rawMileageMax}
                                        step={5000}
                                        value={localMileage}
                                        onChange={(val) => setLocalMileage(val)}
                                        onChangeComplete={(val) => {
                                            const maxApiVal = val[1] >= rawMileageMax ? "" : val[1];
                                            onFilterChange({ mileage_min: val[0], mileage_max: maxApiVal });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="col-lg-12">
                            <div className="price-box mb-4">
                                <h6 className="title">Price {isKRW ? "(Million Won)" : ""}</h6>
                                <div className="row g-0">
                                    <div className="col-lg-6 cstm-range-clmn pe-2">
                                        <div className="form_boxes">
                                            <label>Min</label>
                                            <RangeInput
                                                placeholder="Min"
                                                value={localPrice[0]}
                                                prefix={isKRW ? "₩" : (currency === 'USD' ? "$" : (currency + " "))}
                                                suffix={isKRW ? "Million" : ""}
                                                onChange={(val) => {
                                                    const apiVal = fromDisplayPrice(val);
                                                    const min = apiVal !== "" ? Math.max(0, Number(apiVal)) : "";
                                                    const max = filters.price_max === "" ? "" : Number(filters.price_max);
                                                    if (min !== "" && max !== "" && min > max) {
                                                        onFilterChange({ price_min: max, price_max: min });
                                                    } else {
                                                        onFilterChange({ price_min: min });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 cstm-range-clmn ps-2">
                                        <div className="form_boxes">
                                            <label>Max</label>
                                            <RangeInput
                                                placeholder="Max"
                                                value={localPrice[1] >= sliderMax && !filters.price_max ? `${sliderMax}+` : localPrice[1]}
                                                prefix={isKRW ? "₩" : (currency === 'USD' ? "$" : (currency + " "))}
                                                suffix={isKRW ? "Million" : ""}
                                                onChange={(val) => {
                                                    let maxDisplay = val !== "" ? Math.max(0, Number(val)) : "";
                                                    if (maxDisplay !== "" && maxDisplay >= sliderMax) {
                                                        onFilterChange({ price_max: "" });
                                                        return;
                                                    }
                                                    const apiVal = fromDisplayPrice(maxDisplay);
                                                    const max = apiVal !== "" ? Math.max(0, Number(apiVal)) : "";
                                                    const min = filters.price_min === "" ? "" : Number(filters.price_min);
                                                    if (min !== "" && max !== "" && min > max) {
                                                        onFilterChange({ price_min: max, price_max: min });
                                                    } else {
                                                        onFilterChange({ price_max: max });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-price cstm-slider-widget">
                                    <Slider
                                        range
                                        min={0}
                                        max={sliderMax}
                                        step={sliderStep}
                                        value={localPrice}
                                        onChange={(val) => setLocalPrice(val)}
                                        onChangeComplete={(val) => {
                                            const apiMin = fromDisplayPrice(val[0]);
                                            const apiMax = val[1] >= sliderMax ? "" : fromDisplayPrice(val[1]);
                                            onFilterChange({ price_min: apiMin, price_max: apiMax });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Categorical Filters */}
                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Fuel Type</label>
                                <SearchableDropdown
                                    options={withAll(options.fuel_types, "All")}
                                    defaultValue={filters.fuel_type || ""}
                                    onSelect={(val, opt) => handleFilterUpdate("fuel_type", val, opt)}
                                    selectedLabel={labels.fuel_type}
                                    showCount={true}
                                    valueKey="value"
                                    displayKey="name"
                                />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Transmission</label>
                                <SearchableDropdown
                                    options={withAll(options.transmissions, "All")}
                                    defaultValue={filters.transmission || ""}
                                    onSelect={(val, opt) => handleFilterUpdate("transmission", val, opt)}
                                    selectedLabel={labels.transmission}
                                    showCount={true}
                                    valueKey="value"
                                    displayKey="name"
                                />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Vehicle Type</label>
                                <SearchableDropdown
                                    options={withAll(options.vehicle_types, "All")}
                                    defaultValue={filters.vehicle_type || ""}
                                    onSelect={(val, opt) => handleFilterUpdate("vehicle_type", val, opt)}
                                    selectedLabel={labels.vehicle_type}
                                    showCount={true}
                                    valueKey="value"
                                    displayKey="name"
                                />
                            </div>
                        </div>

                        {/* Seats for cars / Variable Axis for Trucks */}
                        {category === 'truck' ? (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Variable Axis</label>
                                    <SearchableDropdown
                                        options={withAll(options.varaxis, "All")}
                                        defaultValue={filters.varaxis || ""}
                                        onSelect={(val, opt) => handleFilterUpdate("varaxis", val, opt)}
                                        selectedLabel={labels.varaxis}
                                        showCount={true}
                                        valueKey="value"
                                        displayKey="name"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Seats</label>
                                    <SearchableDropdown
                                        options={withAll(options.passengers, "All")}
                                        defaultValue={filters.seats || ""}
                                        onSelect={(val, opt) => handleFilterUpdate("seats", val, opt)}
                                        selectedLabel={labels.seats}
                                        showCount={true}
                                        valueKey="value"
                                        displayKey="name"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="col-lg-12">
                            <div className="form_boxes">
                                <label>Exterior Color</label>
                                <SearchableDropdown
                                    options={withAll(options.exterior_colors, "All")}
                                    defaultValue={filters.color || ""}
                                    onSelect={(val, opt) => handleFilterUpdate("color", val, opt)}
                                    selectedLabel={labels.color}
                                    showCount={true}
                                    valueKey="value"
                                    displayKey="name"
                                />
                            </div>
                        </div>

                        {/* Interior Color - For Domestic/Import */}
                        {category !== 'truck' && (
                            <div className="col-lg-12">
                                <div className="form_boxes">
                                    <label>Interior Color</label>
                                    <SearchableDropdown
                                        options={withAll(options.interior_colors, "All")}
                                        defaultValue={filters.interior_color || ""}
                                        onSelect={(val, opt) => handleFilterUpdate("interior_color", val, opt)}
                                        selectedLabel={labels.interior_color}
                                        showCount={true}
                                        valueKey="value"
                                        displayKey="name"
                                    />
                                </div>
                            </div>
                        )}
                        {/* Vehicle Options */}
                        {options.options && options.options.length > 0 && (
                            <div className="col-lg-12">
                                <div className="categories-box border-none-bottom pb-0 mb-0">
                                    <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vehicleOptions" aria-expanded="false" aria-controls="vehicleOptions">
                                        Vehicle Options
                                    </h6>
                                    <div id="vehicleOptions" className="accordion-collapse collapse">
                                        <div className="cheak-box mt-2 pr-2" style={{ maxHeight: '250px', overflowY: 'auto', overflowX: 'hidden' }}>
                                            {options.options.map((opt) => (
                                                <label key={opt.value} className="contain mb-2 d-flex justify-content-between align-items-center" style={{ width: '100%', paddingLeft: '30px' }}>
                                                    <span title={opt.name} style={{ fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', paddingRight: '20px' }}>{opt.name}</span>
                                                    <span className="count text-muted" style={{ fontSize: '12px', marginRight: '5px' }}>({opt.count})</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={(filters.options || []).includes(opt.value)}
                                                        onChange={() => handleOptionToggle(opt.value)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
