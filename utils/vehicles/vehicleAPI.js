import { DEFAULT_BOUNDS } from "@/constants/filters";
import { api } from "../api";

/* ===== Maira Edit START: Stock Switch ===== */
const isOtherStock = (stockType) =>
  String(stockType || "").toLowerCase() === "other";

const adaptEncarMakes = (manufacturers = []) =>
  manufacturers.map((m) => ({
    id: m.value || m.name,
    name: m.name,
    count: m.count ?? 0,
  }));

const adaptEncarFilterOptions = (encar = {}) => ({
  makes: (encar.manufacturers || []).map((m) => ({
    name: m.name,
    count: m.count ?? 0,
    value: m.name,
  })),
  models: (encar.modelGroups || []).map((m) => ({
    name: m.name,
    count: m.count ?? 0,
    value: m.name,
  })),
  model_details: (encar.models || []).map((m) => ({
    name: m.name,
    count: m.count ?? 0,
    value: m.name,
  })),
  fuel_types: [],
  vehicle_types: [],
  transmissions: [],
  drive_types: [],
  passengers: [],
  exterior_colors: [],
  doors: [],
  years: [],
  ranges: {},
  counts: {},
});

const adaptEncarVehicle = (v = {}) => {
  const photoFromArr =
    v.Photos && v.Photos.length ? v.Photos[0].location : null;
  const photoFromPrefix = v.Photo ? `${v.Photo}001.jpg` : null;
  return {
    id: v.Id,
    name: [v.Manufacturer, v.Model, v.Badge].filter(Boolean).join(" "),
    slug: v.Id,
    vin: null,
    price: v.Price ?? null,
    discount_price: null,
    final_price: v.Price ?? null,
    status: "sale",
    booking_status: "sale",
    year: v.FormYear ? Number(v.FormYear) : null,
    odometer: v.Mileage ?? null,
    fuel_type: v.FuelType ?? null,
    transmission: null,
    engine_volume: null,
    drive_type: null,
    vehicle_type: null,
    color: null,
    weight: null,
    cabin_type: null,
    loading_weight: null,
    axle_type: null,
    passenger: null,
    main_image: photoFromArr || photoFromPrefix,
  };
};

// ✅ Normalize different API responses into one shape for UI
export const normalizeVehicle = (v = {}, endpoint = "cars") => {
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
    fuel_type: v.fuel_type ?? v.fuel ?? null,
    transmission: v.transmission ?? null,

    // cars/suvs
    engine_volume: v.engine_volume ?? null,
    drive_type: v.drive_type ?? null,
    vehicle_type: v.vehicle_type ?? null,

    // buses
    color: v.external_color || v.color || null,
    weight: v.weight ?? null,

    // trucks
    cabin_type: v.cabin_type ?? null,
    loading_weight: v.loading_weight ?? null,
    axle_type: v.axle_type ?? v.axle ?? null,
    wheelbase: v.wheelbase ?? null,
    deck_height: v.deck_height ?? null,
    box_type: v.box_type ?? null,
    trailer_type: v.trailer_type ?? null,
    tank_type: v.tank_type ?? null,
    tank_capacity: v.tank_capacity ?? null,
    crane_make: v.crane_make ?? null,
    crane_boom_type: v.crane_boom_type ?? null,
    boom_height: v.boom_height ?? null,
    crane_model_name: v.crane_model_name ?? null,
    engine_type: v.engine_type ?? null,
    gears: v.gears ?? null,
    no_of_cylinder: v.no_of_cylinder ?? null,
    engine_no: v.engine_no ?? null,
    engine_power: v.engine_power ?? null,
    port_size: v.port_size ?? null,

    passenger: v.passenger ?? null,
    doors: v.door ?? v.doors ?? null,
    steering: v.streering || v.steering || "LHD",
    make_name: v.car_make || v.make_name || v.make || null,
    model_name: v.car_model || v.model_name || v.model || null,
    // ===== Maira Edit START: image-source-fallback =====
    main_image:
      v.main_image ??
      (typeof v.images?.[0] === "string" ? v.images[0] : null) ??
      null,
    // ===== Maira Edit END =====
    images: v.images || [],
    description: v.comment || v.description || null,
    options: v.options || [],
    embed_code: v.embed_code || null,
    view: v.view || 0,
    registration_date: v.registration_date || null,

    // Additional Specs
    height: v.overall_h ?? null,
    length: v.overall_l ?? null,
    width: v.overall_w ?? null,
    damaged: v.damaged ?? null,
    is_taxi: v.texi ?? null,
    is_rental: v.rental ?? null,
    is_theft: v.theft ?? null,
    vcr: v.vcr ?? null,
    class: v.class ?? null,
    category: v.category ?? null,
    size_name: v.size_name ?? null,
    model_detail: v.car_model_detail ?? null,

    _endpoint: endpoint,
  };
};

// /encar/live: only `manufacturer` is verified to filter; model / fuel_type are
// param-recognized but value formats are unverified. year/price/mileage are
// intentionally omitted — the API ignored them in probing, so the corresponding
// Sidebar groups are hidden for Other Stock (handled in Sidebar.jsx).
const buildEncarListingParams = (page, perPage, filters = {}) => {
  const params = {
    draw: page,
    start: (page - 1) * perPage,
    length: perPage,
    car_type: "Y",
    category: "car",
    lang: "en",
  };
  if (filters.make) params.manufacturer = filters.make;
  // Cascade compression: Hero's "Model" tier (filters.model) → Encar's `model_group`;
  // Hero's "Detail" tier (filters.model_detail) → Encar's `model`. Probe-confirmed param names.
  if (filters.model) params.model_group = filters.model;
  if (filters.model_detail) params.model = filters.model_detail;
  if (Array.isArray(filters.fuel_types) && filters.fuel_types.length) {
    params.fuel_type = filters.fuel_types[0];
  }
  return params;
};
/* ===== Maira Edit END: Stock Switch ===== */

/* ===== Maira Edit START ===== */
export const ENCAR_DOMESTIC_STORAGE_KEY = "encar_filters_domestic";

// Reuses the same key mapping as buildEncarListingParams so the carpool→encar
// translation stays in one place. Empty/missing values are omitted; callers
// rebuild from scratch (no merge) to prevent stale values lingering on /encar.
export const toEncarStorageFilters = (carsFilters = {}) => {
  const out = {};
  if (carsFilters.make) out.manufacturer = carsFilters.make;
  if (carsFilters.model) out.model_group = carsFilters.model;
  if (carsFilters.model_detail) out.model = carsFilters.model_detail;
  if (Array.isArray(carsFilters.vehicle_type) && carsFilters.vehicle_type.length) {
    out.vehicle_type = carsFilters.vehicle_type[0];
  }
  if (Array.isArray(carsFilters.fuel_types) && carsFilters.fuel_types.length) {
    out.fuel_type = carsFilters.fuel_types[0];
  }

  // /encar's filter-chip resolves a value via:
  //   1) live lookup in filterOptions (opt.value === val)
  //   2) filters.activeLabels[lang][val]   ← fallback
  // For some Encar lists (manufacturers, models) the API's option.value is
  // not the display name, so step (1) fails and the chip shows "...".
  // We write value = name from Hero/Nav, so populating activeLabels with
  // { [name]: name } makes step (2) succeed without inventing any mapping.
  // Same map under en/ko/ar: the helper is browser-agnostic and the
  // user-picked name is identical regardless of /encar's UI language.
  // Rebuilt from scratch every call — no merge with existing storage.
  const labelMap = {};
  Object.values(out).forEach((v) => {
    if (v && typeof v === "string") labelMap[v] = v;
  });
  if (Object.keys(labelMap).length) {
    out.activeLabels = { en: labelMap, ko: labelMap, ar: labelMap };
  }

  return out;
};

// Fetches Encar's raw vocabulary for vehicle_types + fuel_types so callers
// (Hero buttons) can do dynamic name → value lookup without inventing values.
// Bypasses adaptEncarFilterOptions on purpose — that adapter zeros these out.
// lang=en so option.name is the English label we match Hero button labels against.
export const getEncarVehicleTaxonomy = async () => {
  try {
    const res = await api.get("encar/filter-options", {
      params: { category: "car", lang: "en" },
    });
    const d = res?.data || {};
    return {
      vehicle_types: Array.isArray(d.vehicle_types) ? d.vehicle_types : [],
      fuel_types: Array.isArray(d.fuel_types) ? d.fuel_types : [],
    };
  } catch (e) {
    console.error("Failed to fetch Encar taxonomy:", e);
    return { vehicle_types: [], fuel_types: [] };
  }
};
/* ===== Maira Edit END ===== */

export const getCarMakes = async (stockType) => {
  try {
    /* ===== Maira Edit START: Stock Switch ===== */
    if (isOtherStock(stockType)) {
      const res = await api.get("encar/filter-options", {
        params: { category: "car" },
      });
      return {
        success: true,
        data: adaptEncarMakes(res?.data?.manufacturers || []),
      };
    }
    /* ===== Maira Edit END: Stock Switch ===== */
    const res = await api.get('cars/makes');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch car makes:", error);
    return { success: false, data: [] };
  }
};

export const getFilterOptions = async (filters = {}, endpoint = "cars", stockType) => {
  try {
    /* ===== Maira Edit START: Stock Switch ===== */
    if (isOtherStock(stockType)) {
      const params = { category: "car" };
      if (filters.make) params.manufacturer = filters.make;
      // Encar API expects snake_case `model_group` (camelCase `modelGroup` is silently ignored)
      if (filters.model) params.model_group = filters.model;
      if (filters.model_detail) params.model = filters.model_detail;
      const res = await api.get("encar/filter-options", { params });
      return { success: true, data: adaptEncarFilterOptions(res?.data || {}) };
    }
    // strip stockType so the cars endpoint never receives it
    const { stockType: _stripStock, ...carsFilters } = filters;
    const res = await api.get(`${endpoint}/filter-options`, { params: carsFilters });
    /* ===== Maira Edit END: Stock Switch ===== */
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch filter options for ${endpoint}:`, error);
    return { success: false, data: {} };
  }
};


/**
 * Main function to get vehicles with filters
 * @param {string} endpoint - API endpoint (cars, suvs, buses, trucks)
 * @param {number} page - Page number
 * @param {number} perPage - Items per page
 * @param {string} sortbyVal - Sort value
 * @param {object} filters - Filter object
 */
export const getVehicles = async (endpoint = "cars", page = 1, perPage = 50, sortbyVal = "default", filters = {}, stockType) => {
  try {
    /* ===== Maira Edit START: Stock Switch ===== */
    if (isOtherStock(stockType)) {
      const encarParams = buildEncarListingParams(page, perPage, filters);
      const res = await api.get("/encar/live", { params: encarParams });
      const records = res?.data || {};
      const items = Array.isArray(records.data) ? records.data : [];
      const total = records.recordsFiltered ?? 0;
      const last_page = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
      const from = total === 0 ? 0 : (page - 1) * perPage + 1;
      const to = Math.min(page * perPage, total);
      return {
        success: true,
        data: items.map(adaptEncarVehicle),
        pagination: { current_page: page, last_page, from, to, total, per_page: perPage },
      };
    }
    /* ===== Maira Edit END: Stock Switch ===== */

    // query parameters
    const params = {
      page,
      per_page: perPage,
      sort_by: sortbyVal,
      ...filters
    };

    /* ===== Maira Edit START: Stock Switch ===== */
    // strip stockType so the cars endpoint never receives it
    delete params.stockType;
    /* ===== Maira Edit END: Stock Switch ===== */

    // Clean up the params
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key] === '') {
        delete params[key];
      }

      if (Array.isArray(params[key]) && params[key].length === 0) {
        delete params[key];
      }

      // Remove default values for ranges (if match with DEFAULT_BOUNDS)
      if (key.includes('min_') || key.includes('max_')) {
        if (params[key] === DEFAULT_BOUNDS[key]) {
          delete params[key];
        }
      }
    });

    // console.log(`API Call Params [${endpoint}]:`, params);

    const res = await api.get(`/${endpoint}`, { params });
    return res.data;

  } catch (error) {
    console.error(`Failed to load ${endpoint}:`, error);

    return {
      success: false,
      message: error.message,
      data: [],
      pagination: null
    };
  }
};


export const getVehicleBySlug = async (slug, endpoint = "cars") => {
  try {
    const res = await api.get(`/${endpoint}/${slug}`);
    console.log(`API Response for ${slug} [${endpoint}]:`, res.data);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint} by slug ${slug}:`, error);
    return { success: false, data: null };
  }
};

export const SORT_OPTIONS = [
  { value: "default", label: "Sort by" },
  { value: "recent", label: "Recent Date" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "mileage_low_high", label: "Mileage: Low to High" },
  { value: "mileage_high_low", label: "Mileage: High to Low" },
  { value: "year_new_old", label: "Year: New to Old" },
  { value: "year_old_new", label: "Year: Old to New" },
];
