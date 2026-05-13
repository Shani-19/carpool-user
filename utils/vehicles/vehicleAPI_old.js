import { DEFAULT_BOUNDS } from "@/constants/filters";
import { api } from "../api";

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
    main_image: v.main_image ?? null,
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
    model_detail: v.car_model_detail ?? null,

    _endpoint: endpoint,
  };
};

export const getCarMakes = async () => {
  try {
    const res = await api.get('cars/makes');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch car makes:", error);
    return { success: false, data: [] };
  }
};

export const getFilterOptions = async (filters = {}, endpoint = "cars") => {
  try {
    const res = await api.get(`${endpoint}/filter-options`, { params: filters });
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
export const getVehicles = async (endpoint = "cars", page = 1, perPage = 50, sortbyVal = "default", filters = {}) => {
  try {
    // query parameters
    const params = {
      page,
      per_page: perPage,
      sort_by: sortbyVal,
      ...filters
    };

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
