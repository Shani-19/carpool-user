"use client";
import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../common/SearchableDropdown";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import RangeInput from "./RangeInput";
import { DEFAULT_BOUNDS } from "@/constants/filters";

export default function Sidebar({ onFilterChange, makes = [], makeIds = [], filterOptions = {}, defaults = {}, filters, hiddenFilters = [], endpoint }) {
  // Helper to sum counts
  const getSum = (arr) => (arr || []).reduce((acc, curr) => acc + (curr.count || 0), 0);

  // console.log(endpoint)
  const _models = filterOptions.models || [];
  const _makes = filterOptions.makes || makes || [];
  const _details = filterOptions.model_details || [];
  const counts = filterOptions.counts || {};

  const allMakesCount = counts.total_cars || getSum(_makes);
  const allModelsCount = counts.total_make_cars || (filters.make ? 0 : allMakesCount);
  const allDetailsCount = counts.total_model_cars || (filters.model ? 0 : allModelsCount);

  const models = [{ name: "All Models", count: filters.make ? (counts.total_make_cars || 0) : allMakesCount }, ..._models];
  const makesList = [{ name: "All Makes", count: allMakesCount }, ..._makes];
  const modelDetailsList = [{ name: "All Details", count: filters.model ? (counts.total_model_cars || 0) : (filters.make ? (counts.total_make_cars || 0) : allMakesCount) }, ..._details];

  const years = filterOptions.years || [];
  const minYearOptions = ["All Years", ...years.filter(y => !filters.max_year || y <= Number(filters.max_year))];
  const maxYearOptions = ["All Years", ...years.filter(y => !filters.min_year || y >= Number(filters.min_year))];

  // console.log("Sidebar filterOptions:", filterOptions);

  const ranges = filterOptions.ranges || {};

  // trigger update in parent
  const updateParent = (newFilters) => {
    onFilterChange(newFilters);
  };

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    // update model and model_detail on make change
    if (key === "make") {
      console.log("make changed", value, key);
      newFilters.model = "";
      newFilters.model_detail = "";
    }
    // update model_detail on model change
    if (key === "model") {
      newFilters.model_detail = "";
    }
    updateParent(newFilters);
  };

  const handleRangeUpdate = (key, value) => {
    if (value[0] > value[1]) return;
    updateParent({
      ...filters,
      [`min_${key}`]: value[0],
      [`max_${key}`]: value[1]
    });
  };

  const handleInputChange = (key, value) => {
    if (value === '') {
      updateParent({ ...filters, [key]: '' });
      return;
    }
    // Update with numeric value
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      updateParent({ ...filters, [key]: numValue });
    }
  };

  const handleInputBlur = (key, value) => {
    if (!value || value === '') {
      updateParent({ ...filters, [key]: '' });
      return;
    }

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    // the active range / working range type
    let rangeType, isMin;
    if (key.includes('price')) {
      rangeType = 'price';
      isMin = key.startsWith('min_');
    } else if (key.includes('mileage')) {
      rangeType = 'mileage';
      isMin = key.startsWith('min_');
    } else if (key.includes('engine')) {
      rangeType = 'engine_volume';
      isMin = key.startsWith('min_');
    } else {
      return;
    }

    let finalValue = numValue;

    // Ensure min <= max
    if (isMin) {
      const maxKey = `max_${rangeType}`;
      const maxVal = filters[maxKey];
      if (maxVal !== '' && maxVal !== undefined && finalValue > maxVal) {
        finalValue = maxVal;
      }
    } else {
      const minKey = `min_${rangeType}`;
      const minVal = filters[minKey];
      if (minVal !== '' && minVal !== undefined && finalValue < minVal) {
        finalValue = minVal;
      }
    }

    updateParent({ ...filters, [key]: finalValue });
  };

  const handleCheckboxUpdate = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateParent({ ...filters, [category]: updated });
  };

  // Number formatter function
  const fmtNumber = (val) => {
    const n = Number(val);
    return Number.isNaN(n) ? "0" : n.toLocaleString("en-US");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12 ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-handle" onClick={() => setIsOpen(!isOpen)}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
            fill="#050B20"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
            fill="#050B20"
          />
        </svg>
        {isOpen ? 'Hide Filter' : 'Show Filter'}
      </div>

      <div className={`inventory-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="inventroy-widget widget-location cstm-sidebar">
          <div className="row">
            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Make</label>
                <SearchableDropdown
                  options={makesList}
                  defaultValue={filters.make || "All Makes"}
                  onSelect={(val) => handleFilterUpdate("make", val === "All Makes" ? "" : val)}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Model</label>
                <SearchableDropdown
                  options={models}
                  defaultValue={filters.model || "All Models"}
                  onSelect={(val) => handleFilterUpdate("model", val === "All Models" ? "" : val)}
                  disabled={!filters.make}
                />
              </div>
            </div>

            {/* Cars: Model Detail */}
            {!hiddenFilters.includes('model_detail') && (
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Model Detail</label>
                  <SearchableDropdown
                    options={modelDetailsList}
                    defaultValue={filters.model_detail || "All Details"}
                    onSelect={(val) => handleFilterUpdate("model_detail", val === "All Details" ? "" : val)}
                    disabled={!filters.model}
                  />
                </div>
              </div>
            )}

            {/* Truck: Category */}
            {filterOptions.categories?.length > 0 && !hiddenFilters.includes('category') && (
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Category</label>
                  <SearchableDropdown
                    options={["All Categories", ...filterOptions.categories]}
                    defaultValue={filters.category || "All Categories"}
                    onSelect={(val) => handleFilterUpdate("category", val === "All Categories" ? "" : val)}
                  />
                </div>
              </div>
            )}

            {/* Truck: Loading Weight */}
            {filterOptions.loading_weights?.length > 0 && !hiddenFilters.includes('loading_weight') && (
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Loading Weight</label>
                  <SearchableDropdown
                    options={["All Weights", ...filterOptions.loading_weights]}
                    defaultValue={filters.loading_weight || "All Weights"}
                    onSelect={(val) => handleFilterUpdate("loading_weight", val === "All Weights" ? "" : val)}
                  />
                </div>
              </div>
            )}

            <div className="col-lg-6 cstm-year-clmn pe-2">
              <div className="form_boxes">
                <label>Min year</label>
                <SearchableDropdown
                  options={minYearOptions}
                  defaultValue={filters.min_year || "All Years"}
                  onSelect={(val) => handleFilterUpdate("min_year", val === "All Years" ? "" : val)}
                  searchable={false}
                />
              </div>
            </div>

            <div className="col-lg-6 cstm-year-clmn ps-2">
              <div className="form_boxes">
                <label>Max year</label>
                <SearchableDropdown
                  options={maxYearOptions}
                  defaultValue={filters.max_year || "All Years"}
                  onSelect={(val) => handleFilterUpdate("max_year", val === "All Years" ? "" : val)}
                  searchable={false}
                />
              </div>
            </div>

            {!hiddenFilters.includes('mileage') && (
            <div className="col-lg-12">
              <div className="price-box">
                <h6 className="title">Mileage</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="cstm-range-clmn col-lg-6 pe-2">
                    <div className="form_boxes pe-2">
                      <label>Min</label>
                      <RangeInput
                        placeholder={`${fmtNumber(ranges.min_mileage || 0)} km`}
                        value={filters.min_mileage}
                        onChange={(val) => handleInputChange('min_mileage', val)}
                        onBlur={(val) => handleInputBlur('min_mileage', val)}
                        suffix="km"
                      />
                    </div>
                  </div>
                  <div className="cstm-range-clmn col-lg-6 ps-2">
                    <div className="form_boxes pe-2">
                      <label>Max</label>
                      <RangeInput
                        placeholder={`${fmtNumber(ranges.max_mileage || DEFAULT_BOUNDS.max_mileage)} km`}
                        value={filters.max_mileage}
                        onChange={(val) => handleInputChange('max_mileage', val)}
                        onBlur={(val) => handleInputBlur('max_mileage', val)}
                        suffix="km"
                      />
                    </div>
                  </div>
                </form>

                <div className="widget-price cstm-slider-widget">
                  <Slider
                    range
                    max={ranges.max_mileage || DEFAULT_BOUNDS.max_mileage}
                    min={ranges.min_mileage || 0}
                    value={[
                      filters.min_mileage === '' || filters.min_mileage === undefined ? (ranges.min_mileage || 0) : filters.min_mileage,
                      filters.max_mileage === '' || filters.max_mileage === undefined ? (ranges.max_mileage || DEFAULT_BOUNDS.max_mileage) : filters.max_mileage
                    ]}
                    onChange={(value) => handleRangeUpdate("mileage", value)}
                    id="mileage_slider"
                  />
                </div>
              </div>
            </div>
            )}

            <div className="col-lg-12">
              <div className="price-box">
                <h6 className="title">Price</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="cstm-range-clmn col-lg-6 pe-2">
                    <div className="form_boxes pe-2">
                      <label>Min price</label>
                      <RangeInput
                        placeholder={`$${fmtNumber(ranges.min_price || 0)}`}
                        value={filters.min_price}
                        onChange={(val) => handleInputChange('min_price', val)}
                        onBlur={(val) => handleInputBlur('min_price', val)}
                        prefix="$"
                      />
                    </div>
                  </div>
                  <div className="cstm-range-clmn col-lg-6 ps-2">
                    <div className="form_boxes pe-2">
                      <label>Max price</label>
                      <RangeInput
                        placeholder={`$${fmtNumber(ranges.max_price || DEFAULT_BOUNDS.max_price)}`}
                        value={filters.max_price}
                        onChange={(val) => handleInputChange('max_price', val)}
                        onBlur={(val) => handleInputBlur('max_price', val)}
                        prefix="$"
                      />
                    </div>
                  </div>
                </form>

                <div className="widget-price cstm-slider-widget">
                  <Slider
                    range
                    max={ranges.max_price || DEFAULT_BOUNDS.max_price}
                    min={ranges.min_price || 0}
                    value={[
                      filters.min_price === '' || filters.min_price === undefined ? (ranges.min_price || 0) : filters.min_price,
                      filters.max_price === '' || filters.max_price === undefined ? (ranges.max_price || DEFAULT_BOUNDS.max_price) : filters.max_price
                    ]}
                    onChange={(value) => handleRangeUpdate("price", value)}
                    id="price_slider"
                  />
                </div>
              </div>
            </div>

            {(filterOptions.fuel_types?.length > 0) && !hiddenFilters.includes('fuel_type') && (
              <div className="col-lg-12">
                <div className="categories-box border-none-bottom">
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fuelType" aria-expanded="false" aria-controls="fuelType">
                    Fuel Type
                  </h6>
                  <div id="fuelType" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.fuel_types || []).map((fuel) => (
                      <label key={fuel} className="contain">
                        {fuel}
                        <input
                          type="checkbox"
                          checked={filters.fuel_types?.includes(fuel)}
                          onChange={() => handleCheckboxUpdate("fuel_types", fuel)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!hiddenFilters.includes('vehicle_type') && filterOptions.vehicle_types?.length > 0 && (
              <div className="col-lg-12">
                <div className="categories-box border-none-bottom">
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vehicleType" aria-expanded="false" aria-controls="vehicleType">
                    Vehicle Type
                  </h6>
                  <div id="vehicleType" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.vehicle_types || []).map((type) => (
                      <label key={type} className="contain">
                        {type}
                        <input
                          type="checkbox"
                          checked={filters.vehicle_type?.includes(type)}
                          onChange={() => handleCheckboxUpdate("vehicle_type", type)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(filterOptions.transmissions?.length > 0) && !hiddenFilters.includes('transmission') && (
              <div className="col-lg-12">
                <div className={`categories-box ${endpoint != 'buses' ? 'border-none-bottom' : ''}`}>
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#transmission" aria-expanded="false" aria-controls="transmission">
                    Transmission
                  </h6>
                  <div id="transmission" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.transmissions || []).map((trans) => (
                      <label key={trans} className="contain">
                        {trans}
                        <input
                          type="checkbox"
                          checked={filters.transmission?.includes(trans)}
                          onChange={() => handleCheckboxUpdate("transmission", trans)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(filterOptions.drive_types?.length > 0) && !hiddenFilters.includes('drive_type') && (
              <div className="col-lg-12">
                <div className="categories-box">
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#driveType" aria-expanded="false" aria-controls="driveType">
                    Drive Type
                  </h6>
                  <div id="driveType" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.drive_types || []).map((drive) => (
                      <label key={drive} className="contain">
                        {drive}
                        <input
                          type="checkbox"
                          checked={filters.drive_type?.includes(drive)}
                          onChange={() => handleCheckboxUpdate("drive_type", drive)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Truck: Axle Type */}
            {filterOptions.axle_types?.length > 0 && !hiddenFilters.includes('axle_type') && (
              <div className="col-lg-12">
                <div className="categories-box border-none-bottom">
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#axleType" aria-expanded="false" aria-controls="axleType">
                    Axle Type
                  </h6>
                  <div id="axleType" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.axle_types || []).map((axle) => (
                      <label key={axle} className="contain">
                        {axle}
                        <input
                          type="checkbox"
                          checked={filters.axle_type?.includes(axle)}
                          onChange={() => handleCheckboxUpdate("axle_type", axle)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Truck: Cabin Type */}
            {filterOptions.cabin_types?.length > 0 && !hiddenFilters.includes('cabin_type') && (
              <div className="col-lg-12">
                <div className="categories-box">
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cabinType" aria-expanded="false" aria-controls="cabinType">
                    Cabin Type
                  </h6>
                  <div id="cabinType" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.cabin_types || []).map((cabin) => (
                      <label key={cabin} className="contain">
                        {cabin}
                        <input
                          type="checkbox"
                          checked={filters.cabin_type?.includes(cabin)}
                          onChange={() => handleCheckboxUpdate("cabin_type", cabin)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!hiddenFilters.includes('engine_volume') && (
              <div className="col-lg-12">
                <div className="price-box">
                  <h6 className="title">Engine Volume</h6>
                  <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                    <div className="cstm-range-clmn col-lg-6 pe-2">
                      <div className="form_boxes pe-2">
                        <label>From</label>
                        <RangeInput
                          placeholder={`${fmtNumber(ranges.min_engine_volume || 0)} cc`}
                          value={filters.min_engine_volume}
                          onChange={(val) => handleInputChange('min_engine_volume', val)}
                          onBlur={(val) => handleInputBlur('min_engine_volume', val)}
                          suffix="cc"
                        />
                      </div>
                    </div>
                    <div className="cstm-range-clmn col-lg-6 ps-2">
                      <div className="form_boxes pe-2">
                        <label>To</label>
                        <RangeInput
                          placeholder={`${fmtNumber(ranges.max_engine_volume || DEFAULT_BOUNDS.max_engine_volume)} cc`}
                          value={filters.max_engine_volume}
                          onChange={(val) => handleInputChange('max_engine_volume', val)}
                          onBlur={(val) => handleInputBlur('max_engine_volume', val)}
                          suffix="cc"
                        />
                      </div>
                    </div>
                  </form>

                  <div className="widget-price cstm-slider-widget">
                    <Slider
                      range
                      max={ranges.max_engine_volume || DEFAULT_BOUNDS.max_engine_volume}
                      min={ranges.min_engine_volume || 0}
                      value={[
                        filters.min_engine_volume === '' || filters.min_engine_volume === undefined ? (ranges.min_engine_volume || 0) : filters.min_engine_volume,
                        filters.max_engine_volume === '' || filters.max_engine_volume === undefined ? (ranges.max_engine_volume || DEFAULT_BOUNDS.max_engine_volume) : filters.max_engine_volume
                      ]}
                      onChange={(value) => handleRangeUpdate("engine_volume", value)}
                      id="engVolSlider"
                    />
                  </div>
                </div>
              </div>
            )}

            {(!hiddenFilters.includes('passenger') && !hiddenFilters.includes('seats')) && (
              <div className="col-lg-12">
                <div className={`categories-box border-none-bottom `}>
                  <h6 className="title accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#passenger" aria-expanded="false" aria-controls="passenger">
                    Seats
                  </h6>
                  <div id="passenger" className="cheak-box accordion-collapse collapse">
                    {(filterOptions.passengers || []).map((p) => (
                      <label key={p} className="contain">
                        {p} Seats
                        <input
                          type="checkbox"
                          checked={filters.passenger?.includes(p)}
                          onChange={() => handleCheckboxUpdate("passenger", p)}
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(!hiddenFilters.includes('exterior_color')) && (
            <div className="col-lg-12">
              <div className="form_boxes">
                <label>Exterior Color</label>
                <SearchableDropdown
                  options={["All Colors", ...(filterOptions.exterior_colors || [])]}
                  defaultValue={filters.exterior_color || "All Colors"}
                  onSelect={(val) => handleFilterUpdate("exterior_color", val === "All Colors" ? "" : val)}
                />
              </div>
            </div>
            )}

            {(filterOptions.doors?.length > 0) && !hiddenFilters.includes('doors') && (
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Doors</label>
                  <SearchableDropdown
                    options={["All", ...(filterOptions.doors || []).map(d => d.toString())]}
                    defaultValue={filters.doors?.toString() || "All"}
                    onSelect={(val) => handleFilterUpdate("doors", val === "All" ? "" : val)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}