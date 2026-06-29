export const getRecentlyViewed = () => {
  if (typeof window === "undefined") return { carpool: [], other: [] };
  try {
    const data = localStorage.getItem("recently_viewed");
    return data ? JSON.parse(data) : { carpool: [], other: [] };
  } catch (e) {
    return { carpool: [], other: [] };
  }
};

export const addRecentlyViewed = (type, vehicle, urlType) => {
  if (typeof window === "undefined" || !vehicle) return;
  const history = getRecentlyViewed();
  
  // Create spec string
  const specs = [];
  if (vehicle.year && vehicle.year !== "-") specs.push(vehicle.year);
  if (vehicle.fuel_type && vehicle.fuel_type !== "-") specs.push(vehicle.fuel_type);
  if (vehicle.transmission && vehicle.transmission !== "-") specs.push(vehicle.transmission);
  
  // Format the item we want to save
  const itemToSave = {
    id: vehicle.id || vehicle.slug || vehicle.vin,
    name: vehicle.name || "Unknown Vehicle",
    spec: specs.join(", ") || "No specifications",
    image: vehicle.main_image || (vehicle.images && vehicle.images[0]) || "/images/resource/inventory1-6.png",
    price: vehicle.final_price || vehicle.price,
    isLowPrice: vehicle.isLowPrice || false,
    url: type === "carpool" ? `/${urlType || "cars"}/${vehicle.slug}` : `/${urlType || "domestic"}/${vehicle.id}`
  };

  if (!itemToSave.id) return;

  // Remove if exists
  history[type] = history[type].filter(item => item.id !== itemToSave.id);
  
  // Add to front
  history[type].unshift(itemToSave);
  
  // Keep only up to 20 items per type
  history[type] = history[type].slice(0, 20);
  
  try {
    localStorage.setItem("recently_viewed", JSON.stringify(history));
    // Dispatch custom event to update floating button
    window.dispatchEvent(new Event("recently_viewed_updated"));
  } catch (e) {
    console.error("Failed to save recently viewed:", e);
  }
};
