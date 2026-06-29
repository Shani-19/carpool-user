export const CARPOOL_FAV_KEY = 'carpool_favourites';
export const ENCAR_FAV_KEY = 'encar_favourites';

// Get current favourites from localStorage
export const getFavourites = (stockType = 'carpool') => {
  if (typeof window === 'undefined') return [];
  const key = stockType === 'carpool' ? CARPOOL_FAV_KEY : ENCAR_FAV_KEY;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const getStockType = (urlType) => {
  const type = String(urlType || '').toLowerCase();
  if (['cars', 'trucks', 'buses', 'suvs', 'bikes', 'parts'].includes(type)) return 'carpool';
  return 'encar';
};

// Check if an item is favourited
export const isFavourite = (identifier, urlType) => {
  const stockType = getStockType(urlType);
  const favs = getFavourites(stockType);
  if (stockType === 'carpool') {
    return favs.some((fav) => fav.slug === identifier);
  } else {
    return favs.some((fav) => String(fav.id) === String(identifier));
  }
};

// Toggle favourite status
export const toggleFavourite = (vehicle, urlType) => {
  if (typeof window === 'undefined') return false;

  const stockType = getStockType(urlType);
  const key = stockType === 'carpool' ? CARPOOL_FAV_KEY : ENCAR_FAV_KEY;
  let favs = getFavourites(stockType);
  let isFav = false;

  if (stockType === 'carpool') {
    const existingIndex = favs.findIndex((f) => f.slug === vehicle.slug);
    if (existingIndex >= 0) {
      favs.splice(existingIndex, 1);
    } else {
      favs.push({ slug: vehicle.slug, type: urlType });
      isFav = true;
    }
  } else {
    const existingIndex = favs.findIndex((f) => String(f.id) === String(vehicle.id));
    if (existingIndex >= 0) {
      favs.splice(existingIndex, 1);
    } else {
      favs.push({ id: vehicle.id, type: urlType });
      isFav = true;
    }
  }

  localStorage.setItem(key, JSON.stringify(favs));
  return isFav;
};
