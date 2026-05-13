"use client";
/* Edited by Maira — SelectComponent removed: Models + Model Detail dropdowns now use SearchableDropdown */
import { carTypes } from "@/data/categories";
/* Edited by Maira — reuse /cars filter data source + same dropdown component as sidebar */
import SearchableDropdown from "@/components/common/SearchableDropdown";
/* ===== Maira Edit START ===== */
import { DEFAULT_FILTERS, getStockRoute } from "@/constants/filters";
import {
  getFilterOptions,
  toEncarStorageFilters,
  ENCAR_DOMESTIC_STORAGE_KEY,
  getEncarVehicleTaxonomy,
} from "@/utils/vehicles/vehicleAPI";
/* ===== Maira Edit END ===== */
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
/* ===== Maira Edit START: Stock Switch ===== */
const categories = ["Carpool Stock", "Other Stock"];
/* ===== Maira Edit END: Stock Switch ===== */
export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /* ===== Maira Edit START: Stock Switch ===== */
  const stockType = selectedCategory === "Other Stock" ? "other" : "carpool";
  /* ===== Maira Edit END: Stock Switch ===== */

  /* Edited by Maira — load makes (with counts) from same endpoint as /cars sidebar */
  const router = useRouter();
  const [makesData, setMakesData] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  // store full selection object so we keep name + value (slug) separately
  const [selectedMake, setSelectedMake] = useState({ name: "All Makes", value: "" });
  /* Edited by Maira — Model + Model Detail cascading state (filled from API) */
  const [modelsData, setModelsData] = useState([]);
  const [modelDetailsData, setModelDetailsData] = useState([]);
  const [selectedModel, setSelectedModel] = useState({ name: "Any Models", value: "" });
  const [selectedModelDetail, setSelectedModelDetail] = useState({ name: "Any Details", value: "" });

  useEffect(() => {
    let cancelled = false;
    /* ===== Maira Edit START: Stock Switch ===== */
    // On stock change: reset make/model/detail and clear cascading data before reload
    setSelectedMake({ name: "All Makes", value: "" });
    setSelectedModel({ name: "Any Models", value: "" });
    setSelectedModelDetail({ name: "Any Details", value: "" });
    setMakesData([]);
    setModelsData([]);
    setModelDetailsData([]);
    setTotalCars(0);
    /* ===== Maira Edit END: Stock Switch ===== */
    (async () => {
      try {
        const res = await getFilterOptions({}, "cars", stockType /* Maira Edit: Stock Switch */);
        if (cancelled) return;
        if (res?.success && res?.data) {
          const apiMakes = res.data.makes || [];
          setMakesData(apiMakes);
          setTotalCars(
            res.data.counts?.total_cars ??
              apiMakes.reduce((s, m) => s + (m.count || 0), 0)
          );
        }
      } catch (e) {
        console.error("Failed to load makes for hero search:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stockType /* Maira Edit: Stock Switch — was [] */]);

  /* ===== Maira Edit START ===== */
  // Encar vocabulary cache used by Hero's vehicle-type buttons to map a Hero
  // label (e.g. "SUV") to the canonical Encar option {value, name} via case-
  // insensitive name match. Fetched only when Other Stock is active; cleared
  // on switch back to Carpool. Race-condition behavior: if the user clicks a
  // vehicle-type button before this resolves, the lookup returns null and
  // the click navigates without applying a filter (acceptable per spec).
  const [encarTaxonomy, setEncarTaxonomy] = useState({
    vehicle_types: [],
    fuel_types: [],
  });

  useEffect(() => {
    if (stockType !== "other") {
      setEncarTaxonomy({ vehicle_types: [], fuel_types: [] });
      return;
    }
    let cancelled = false;
    (async () => {
      const tax = await getEncarVehicleTaxonomy();
      if (!cancelled) setEncarTaxonomy(tax);
    })();
    return () => {
      cancelled = true;
    };
  }, [stockType]);

  // Pure lookup helpers — read encarTaxonomy state and return the matching
  // Encar option (so Hero can write the canonical Encar `value` while still
  // displaying the user-facing `name` via activeLabels). All matching is
  // case-insensitive so "SUV"/"Suv"/"suv" all resolve identically.
  const lookupEncarVehicleType = (label) => {
    const target = String(label || "").toLowerCase();
    if (!target) return null;
    const found = (encarTaxonomy.vehicle_types || []).find(
      (o) => typeof o?.name === "string" && o.name.toLowerCase() === target
    );
    return found ? { value: found.value, name: found.name } : null;
  };

  // Hybrid is special-cased onto fuel_types: name.includes("hybrid") (case-
  // insensitive). 0 matches → null/no-match. >1 matches → null/ambiguous so
  // the caller can skip the filter and report rather than pick blindly.
  const lookupEncarHybridFuel = () => {
    const matches = (encarTaxonomy.fuel_types || []).filter(
      (o) => typeof o?.name === "string" && o.name.toLowerCase().includes("hybrid")
    );
    if (matches.length === 0) return { result: null, reason: "no-match" };
    if (matches.length > 1)
      return { result: null, reason: "ambiguous", matches };
    return { result: { value: matches[0].value, name: matches[0].name } };
  };
  /* ===== Maira Edit END ===== */

  /* Edited by Maira — when Make changes, fetch Models for that Make.
     "All Makes" / empty value clears Models + Model Details. */
  useEffect(() => {
    let cancelled = false;
    if (!selectedMake?.name || selectedMake.name === "All Makes" || !selectedMake?.value) {
      setModelsData([]);
      setModelDetailsData([]);
      return;
    }
    (async () => {
      try {
        const res = await getFilterOptions({ make: selectedMake.name }, "cars", stockType /* Maira Edit: Stock Switch */);
        if (cancelled) return;
        if (res?.success && res?.data) {
          setModelsData(res.data.models || []);
        }
      } catch (e) {
        console.error("Failed to load models for hero search:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedMake, stockType /* Maira Edit: Stock Switch */]);

  /* Edited by Maira — when Model changes, fetch Model Details for Make+Model. */
  useEffect(() => {
    let cancelled = false;
    if (
      !selectedMake?.value ||
      !selectedModel?.name ||
      selectedModel.name === "Any Models" ||
      !selectedModel?.value
    ) {
      setModelDetailsData([]);
      return;
    }
    (async () => {
      try {
        const res = await getFilterOptions(
          { make: selectedMake.name, model: selectedModel.name },
          "cars",
          stockType /* Maira Edit: Stock Switch */
        );
        if (cancelled) return;
        if (res?.success && res?.data) {
          setModelDetailsData(res.data.model_details || []);
        }
      } catch (e) {
        console.error("Failed to load model details for hero search:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedMake, selectedModel, stockType /* Maira Edit: Stock Switch */]);

  /* Edited by Maira — object options { name, count, value }.
     Prefer API-provided slug fields so makes like "Mercedes-Benz",
     "Chevrolet (GM Daewoo)", "Land Rover", "KG_Mobility_Ssangyong"
     use whatever value the backend ships; only fall back to a lowercased
     name when no proper value/slug is present. */
  const makeOptions = useMemo(() => {
    const all = { name: "All Makes", count: totalCars, value: "" };
    return [
      all,
      ...makesData.map((m) => ({
        name: m.name,
        count: m.count ?? 0,
        value:
          m.value ||
          m.slug ||
          m.make ||
          String(m.name || "").toLowerCase(),
      })),
    ];
  }, [makesData, totalCars]);

  /* Edited by Maira — Model + Model Detail option lists, same { name, count, value } shape */
  const modelOptions = useMemo(() => {
    const all = { name: "Any Models", count: 0, value: "" };
    return [
      all,
      ...modelsData.map((m) => ({
        name: m.name,
        count: m.count ?? 0,
        value: m.value || m.slug || String(m.name || "").toLowerCase(),
      })),
    ];
  }, [modelsData]);

  const modelDetailOptions = useMemo(() => {
    const all = { name: "Any Details", count: 0, value: "" };
    return [
      all,
      ...modelDetailsData.map((m) => ({
        name: m.name,
        count: m.count ?? 0,
        value:
          m.value ||
          m.slug ||
          String(m.name || "").toLowerCase().trim().replace(/\s+/g, "-"),
      })),
    ];
  }, [modelDetailsData]);

  /* Edited by Maira — Search button count reflects the most-specific selection.
     Falls through Detail → Model → Make → totalCars. */
  const searchCount = useMemo(() => {
    if (selectedModelDetail?.value) return selectedModelDetail.count ?? 0;
    if (selectedModel?.value) return selectedModel.count ?? 0;
    if (selectedMake?.value) return selectedMake.count ?? 0;
    return totalCars;
  }, [selectedMake, selectedModel, selectedModelDetail, totalCars]);

  /* Edited by Maira — Make change updates state only (no navigation).
     Resets Model + Model Detail per cascade rules. */
  const handleMakeChange = (label) => {
    const match =
      makeOptions.find((m) => m.name === label) || {
        name: "All Makes",
        count: totalCars,
        value: "",
      };
    setSelectedMake(match);
    setSelectedModel({ name: "Any Models", value: "" });
    setSelectedModelDetail({ name: "Any Details", value: "" });
  };

  /* Edited by Maira — Model change updates state only, resets Model Detail. */
  const handleModelChange = (label) => {
    const match =
      modelOptions.find((m) => m.name === label) || {
        name: "Any Models",
        value: "",
      };
    setSelectedModel(match);
    setSelectedModelDetail({ name: "Any Details", value: "" });
  };

  /* Edited by Maira — Model Detail change updates state only. */
  const handleModelDetailChange = (label) => {
    const match =
      modelDetailOptions.find((m) => m.name === label) || {
        name: "Any Details",
        value: "",
      };
    setSelectedModelDetail(match);
  };

  /* ===== Maira Edit START ===== */
  // Single place that persists filters + routes. Used by Search and by the
  // vehicle-type buttons. Routing is dynamic via getStockRoute(stockType).
  // For Other Stock we ALSO rebuild encar_filters_domestic from scratch (no
  // merge) so cleared selections don't leave stale values behind on /encar.
  //
  // encarOverrides (optional, Other Stock only): { vehicle_type?: {value,name},
  // fuel_type?: {value,name} }. Lets callers inject canonical Encar values
  // (often Korean) that have no equivalent in carpool's filter shape, while
  // keeping listing_filters_cars clean of those values. Each override also
  // contributes to encar_filters_domestic.activeLabels so /encar's chip
  // displays the human `name` instead of the Korean `value`.
  const persistFiltersAndNavigate = (extraPartial = {}, encarOverrides = null) => {
    const makeName =
      selectedMake?.name && selectedMake.name !== "All Makes" && selectedMake?.value
        ? selectedMake.name
        : "";
    const modelName =
      makeName && selectedModel?.name && selectedModel.name !== "Any Models" && selectedModel?.value
        ? selectedModel.name
        : "";
    const modelDetailName =
      modelName &&
      selectedModelDetail?.name &&
      selectedModelDetail.name !== "Any Details" &&
      selectedModelDetail?.value
        ? selectedModelDetail.name
        : "";

    try {
      const key = "listing_filters_cars";
      const existing = JSON.parse(localStorage.getItem(key) || "null") || {};
      const nextFilters = {
        ...DEFAULT_FILTERS,
        ...existing,
        stockType,
        make: makeName,
        model: modelName,
        model_detail: modelDetailName,
        ...extraPartial,
      };
      localStorage.setItem(key, JSON.stringify(nextFilters));

      if (stockType === "other") {
        // Strip carpool-shape vehicle_type / fuel_types BEFORE translating —
        // their string values are carpool's English vocab (e.g. "Sedan") and
        // would silently produce 0 results on Encar. Encar values come only
        // via encarOverrides below, sourced from the live Encar taxonomy.
        const { vehicle_type: _stripVT, fuel_types: _stripFT, ...nextFiltersForEncar } = nextFilters;

        // Rebuild encar storage from scratch (do NOT merge with existing) so
        // a cleared field in Hero clears the corresponding /encar field too.
        const encarFilters = toEncarStorageFilters(nextFiltersForEncar);

        if (encarOverrides) {
          const extraLabels = {};
          if (encarOverrides.vehicle_type) {
            encarFilters.vehicle_type = encarOverrides.vehicle_type.value;
            extraLabels[encarOverrides.vehicle_type.value] =
              encarOverrides.vehicle_type.name;
          }
          if (encarOverrides.fuel_type) {
            encarFilters.fuel_type = encarOverrides.fuel_type.value;
            extraLabels[encarOverrides.fuel_type.value] =
              encarOverrides.fuel_type.name;
          }
          if (Object.keys(extraLabels).length) {
            const baseLabels = encarFilters.activeLabels?.en || {};
            const merged = { ...baseLabels, ...extraLabels };
            encarFilters.activeLabels = { en: merged, ko: merged, ar: merged };
          }
        }

        localStorage.setItem(
          ENCAR_DOMESTIC_STORAGE_KEY,
          JSON.stringify(encarFilters)
        );
      }
    } catch {
      /* ignore localStorage write errors */
    }

    router.push(getStockRoute(stockType));
  };

  const handleSearch = (e) => {
    if (e?.preventDefault) e.preventDefault();
    persistFiltersAndNavigate({});
  };

  // Vehicle-type buttons.
  //   Carpool: write [label] (Sidebar uses .includes on display strings).
  //   Other:   dynamic name → value lookup against Encar's live taxonomy.
  //            Hybrid is special-cased onto fuel_types (it's a powertrain).
  //            No-match or ambiguous-Hybrid → navigate without filter.
  const handleVehicleTypeClick = (label) => {
    if (stockType === "carpool") {
      persistFiltersAndNavigate({ vehicle_type: [label] });
      return;
    }

    if (String(label || "").toLowerCase() === "hybrid") {
      const { result, reason, matches } = lookupEncarHybridFuel();
      if (!result) {
        if (reason === "ambiguous") {
          console.warn(
            `[Hero] "Hybrid" maps to multiple Encar fuel_types — skipping filter:`,
            (matches || []).map((m) => m.name)
          );
        }
        persistFiltersAndNavigate({});
        return;
      }
      persistFiltersAndNavigate({}, { fuel_type: result });
      return;
    }

    const found = lookupEncarVehicleType(label);
    if (!found) {
      persistFiltersAndNavigate({});
      return;
    }
    persistFiltersAndNavigate({}, { vehicle_type: found });
  };
  /* ===== Maira Edit END ===== */

  return (
    <section className="boxcar-banner-section-v1">
      <div className="container">
        <div className="banner-content">
          <span className="wow fadeInUp">
            Find cars for sale and for rent near you
          </span>
          <h2 className="wow fadeInUp" data-wow-delay="100ms">
            Find Your Perfect Car
          </h2>
          <div className="form-tabs">
            <ul className="form-tabs-list wow fadeInUp" data-wow-delay="200ms">
              {categories.map((category, index) => (
                <li
                  className={selectedCategory == category ? "current" : ""}
                  onClick={() => setSelectedCategory(category)}
                  key={index}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="form-tab-content">
              <div
                className="form-tab-content wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="form-tab-pane current" id="tab-1">
                  {/* Edited by Maira */}
                  <form onSubmit={handleSearch}>
                    <div className="form_boxes line-r">
                      {/* Edited by Maira — same dropdown component as /cars sidebar:
                          object options { name, count, value }, name on left,
                          count badge on right, selected label shows name only */}
                      <SearchableDropdown
                        options={makeOptions}
                        defaultValue={selectedMake?.name || "All Makes"}
                        placeholder="Search makes..."
                        onSelect={handleMakeChange}
                      />
                    </div>
                    {/* Edited by Maira — Model dropdown cascades from Make */}
                    <div className="form_boxes line-r">
                      <SearchableDropdown
                        options={modelOptions}
                        defaultValue={selectedModel?.name || "Any Models"}
                        placeholder="Search models..."
                        onSelect={handleModelChange}
                        disabled={!selectedMake?.value}
                      />
                    </div>
                    {/* Edited by Maira — replaces "Any Price" with cascading Model Detail */}
                    <div className="form_boxes">
                      <SearchableDropdown
                        options={modelDetailOptions}
                        defaultValue={selectedModelDetail?.name || "Any Details"}
                        placeholder="Search details..."
                        onSelect={handleModelDetailChange}
                        disabled={!selectedModel?.value}
                      />
                    </div>
                    {/* Edited by Maira — Search is the only place that persists + navigates */}
                    <div className="form-submit">
                      {/* Edited by Maira — count reflects current Make/Model/Detail selection */}
                      <button type="submit" className="theme-btn">
                        <i className="flaticon-search" />
                        Search {searchCount ? `${searchCount} ` : ""}Cars
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <span className="wow fadeInUp" data-wow-delay="400ms">
                Or Browse Featured Model
              </span>
              <ul className="model-links">
                {carTypes.map((car, index) => (
                  <li key={index}>
                    {/* ===== Maira Edit START ===== */}
                    <a
                      href="#"
                      title=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleVehicleTypeClick(car.label);
                      }}
                    >
                      <i className={car.iconClass} />
                      {car.label}
                    </a>
                    {/* ===== Maira Edit END ===== */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
