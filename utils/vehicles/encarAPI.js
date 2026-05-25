import { api } from "../api";
import axios from 'axios';

// Encar Mappings
const colorMap = {
    "검정색": "Black", "검정투톤": "Black Two-tone", "쥐색": "Dark Gray", "은색": "Silver",
    "은회색": "Silver Gray", "은색투톤": "Silver Two-tone", "흰색": "White", "진주색": "Pearl",
    "흰색투톤": "White Two-tone", "진주투톤": "Pearl Two-tone", "은하색": "Galaxy Silver",
    "명은색": "Bright Silver", "갈대색": "Reed", "연금색": "Light Gold", "갈색": "Brown",
    "갈색투톤": "Brown Two-tone", "금색": "Gold", "금색투톤": "Gold Two-tone", "청색": "Blue",
    "하늘색": "Sky Blue", "담녹색": "Dark Green", "녹색": "Green", "연두색": "Light Green",
    "청옥색": "Turquoise", "빨간색": "Red", "주황색": "Orange", "자주색": "Purple",
    "보라색": "Violet", "분홍색": "Pink", "노란색": "Yellow"
};

const transmissionTypeMap = {
    "오토": "Automatic", "수동": "Manual", "세미오토": "Semi-Automatic", "CVT": "CVT", "기타": "Other"
};

const vehicleTypeMap = {
    "경차": "Compact Car", "소형차": "Sedan", "준중형차": "Sedan", "중형차": "Sedan",
    "대형차": "Sedan", "스포츠카": "Sports Car", "SUV": "SUV", "RV": "RV",
    "경승합차": "Mini Van", "승합차": "Van / Minibus", "화물차": "Truck", "기타": "Other"
};

const fuelTypeMap = {
    "가솔린": "Gasoline", "디젤": "Diesel", "LPG(일반인 구입)": "LPG", "가솔린+전기": "Gasoline Hybrid",
    "LPG+전기": "LPG Hybrid", "가솔린+LPG": "Gasoline + LPG", "전기": "Electric"
};

const carOptionRadioMap = {
    'ecs': ['002'], 'vehicle_navigation': ['005'], 'sunroof': ['010'],
    'driver_power_seat': ['021', '035'], 'passenger_power_seat': ['021', '035'],
    'ac': ['023'], 'rear_seat_monitor': ['054'], 'electric_trunk': ['059'],
    'driver_heated_seat': ['063'], 'passenger_heated_seat': ['063'], 'back_heated_seat': ['063'],
    'fixed_hi_pass': ['074'], 'driver_ventilation_seat': ['077'], 'passenger_ventilation_seat': ['077'],
    'driver_memory_seat': ['078'], 'passenger_memory_seat': ['078'], 'cruise_control': ['079'],
    'rear_warning_system': ['086'], 'around_view': ['087'], 'ldws': ['088'],
    'back_power_seat': ['089'], 'back_ventilation_seat': ['090'], 'hud': ['095']
};

const extraOptionsMap = {
    "001": "Anti-lock brakes (ABS)", "003": "CD player", "004": "Front seat AV monitor",
    "006": "Power door lock", "007": "Power Windows", "008": "Power steering wheel",
    "014": "Leather seats", "015": "Wireless door lock", "017": "Aluminum wheels",
    "019": "Anti-slip (TCS)", "020": "Airbag (side)", "024": "Power folding side mirrors",
    "026": "Airbag (driver's seat, passenger seat)", "029": "Headlamps (HID, LED)",
    "030": "ECM rearview mirror", "031": "steering wheel remote control",
    "033": "Tire Pressure Monitoring System (TPMS)", "049": "Parking sensors (front, rear)",
    "055": "Electronic Stability Control (ESC)", "056": "Airbag (curtain)",
    "058": "Rear camera", "062": "Roof rack", "071": "AUX terminal", "072": "USB port",
    "075": "Headlamps (HID, LED)", "080": "Ghost door closing", "081": "Rain sensor",
    "082": "Heated steering wheel", "083": "Power adjustable steering wheel",
    "084": "Paddle shift", "085": "Parking sensors (front, rear)", "091": "Massage seat",
    "092": "Curtainsblinds (rear seat, rear)", "094": "Electronic Parking Brake (EPB)",
    "096": "Bluetooth", "097": "Auto light"
};

export const getEncarVehicles = async (page = 1, perPage = 20, sort = '', filters = {}) => {
    try {
        const start = (page - 1) * perPage;
        const { car_type = 'Y', category = 'car', lang = 'en', ...restFilters } = filters;

        const params = {
            draw: page,
            start: start,
            length: perPage,
            sort: sort,
            car_type,
            category,
            lang,
            ...restFilters
        };

        const res = await api.get('/encar/live', { params });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        return {
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
        };
    }
};

export const getEncarFilterOptions = async (params = {}) => {
    try {
        const { category = 'car', ...rest } = params;
        const res = await api.get('/encar/filter-options', { params: { category, ...rest } });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch filter options:", error);
        return {
            manufacturers: [],
            modelGroups: [],
            models: [],
            badgeGroups: [],
            badges: [],
            badgeDetails: []
        };
    }
};

const ENCAR_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
};

export const getEncarVehicleDetail = async (carId) => {
    try {
        // Call Encar API directly (the partners backend doesn't have this route)
        const res = await axios.get(`https://api.encar.com/v1/readside/vehicle/${carId}/`, {
            headers: {
                ...ENCAR_HEADERS,
                'Origin': 'https://fem.encar.com',
                'Referer': `https://fem.encar.com/cars/detail/${carId}`
            }
        });
        return res.data;
    } catch (error) {
        console.error(`Failed to fetch vehicle detail for ${carId}:`, error.message);
        return null;
    }
};

export const getEncarRecommendations = async (carId) => {
    try {
        const res = await api.get(`/encar/recommend/${carId}`);
        // Based on API check: { carIds: [ ... ] }
        const data = res.data;
        if (data && Array.isArray(data.recommendation)) return data.recommendation;
        if (data && Array.isArray(data.carIds)) return data.carIds;
        if (data && Array.isArray(data.result)) return data.result;
        if (Array.isArray(data)) return data;
        return [];
    } catch (error) {
        console.error(`Failed to fetch recommendations for ${carId}:`, error);
        return [];
    }
};

export const getEncarVehiclesByIds = async (ids) => {
    if (!ids || ids.length === 0) return [];
    try {
        const idString = ids.join(',');
        const res = await api.get(`/encar/vehicles`, {
            params: { vehicleIds: idString, include: 'SPEC,PHOTOS,CATEGORY,ADVERTISEMENT' }
        });
        
        const data = res.data;
        if (data && Array.isArray(data.vehicles)) return data.vehicles;
        if (Array.isArray(data)) return data;
        return [];
    } catch (error) {
        console.error(`Failed to fetch vehicles by IDs:`, error);
        return [];
    }
};

export const getRelatedEncarVehicles = async (carId) => {
    const recommendations = await getEncarRecommendations(carId);
    if (!recommendations || recommendations.length === 0) return [];
    
    // Extract IDs. Sometimes recommendation objects have 'id' or 'vehicleId'
    const ids = recommendations.map(r => r.id || r.vehicleId || r).filter(id => !!id).slice(0, 8);
    const vehiclesData = await getEncarVehiclesByIds(ids);
    
    return vehiclesData.map(v => normalizeEncarSimple(v)).filter(v => v !== null);
};

export const normalizeEncarSimple = (v) => {
    if (!v) return null;
    
    const detail = v.category || v.Category || {};
    const spec = v.spec || v.Spec || {};
    const adver = v.advertisement || v.Advertisement || {};
    
    const imgBase = "https://ci.encar.com";
    const imgParams = "?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30";
    
    let mainImage = "/images/resource/about-inner1-5.jpg";
    
    const photos = v.photos || v.Photos || [];
    if (photos.length > 0) {
        const p = photos[0];
        let loc = p.path || p.location || p.Path || p.Location || "";
        if (loc) {
            // Force 001.jpg if it looks like an Encar image path
            if (loc.match(/\/\d{3}\.jpg$/)) {
                loc = loc.replace(/\/\d{3}\.jpg$/, "/001.jpg");
            } else if (loc.match(/_\d{3}\.jpg$/)) {
                 loc = loc.replace(/_\d{3}\.jpg$/, "_001.jpg");
            }
            mainImage = loc.startsWith('http') ? loc : `${imgBase}${loc}${imgParams}`;
        }
    } else if (v.photo || v.Photo) {
        let loc = v.photo || v.Photo;
        if (typeof loc === 'string') {
            // Remove any existing .jpg or code and force 001.jpg
            const cleanLoc = loc.replace(/\.jpg$/, "").replace(/_\d{3}$/, "").replace(/\/\d{3}$/, "");
            mainImage = `${imgBase}${cleanLoc}001.jpg${imgParams}`;
        }
    }

    const originalPrice = adver.price || v.Price || adver.Price || 0;
    const isLowPrice = typeof originalPrice === 'number' && originalPrice < 500;
    const finalPrice = typeof originalPrice === 'number' ? originalPrice + 44 : originalPrice;

    return {
        id: v.vehicleId || v.VehicleId || v.Id || v.id,
        slug: v.vehicleId || v.VehicleId || v.Id || v.id,
        name: `${detail.formYear || ''} ${detail.manufacturerEnglishName || detail.manufacturerName || ''} ${detail.modelGroupEnglishName || detail.modelGroupName || ''}`.trim(),
        price: finalPrice,
        isLowPrice,
        mileage: spec.mileage || spec.Mileage || 0,
        fuel_type: fuelTypeMap[spec.fuelName || spec.FuelName] || spec.fuelName || spec.FuelName || "-",
        transmission_type: transmissionTypeMap[spec.transmissionName || spec.TransmissionName] || spec.transmissionName || spec.TransmissionName || "-",
        main_image: mainImage
    };
};

export const normalizeEncarDetail = (data) => {
    if (!data) return null;

    const detail = data.category || data.Category || {};
    const spec = data.spec || data.Spec || {};
    const adver = data.advertisement || data.Advertisement || {};

    const imgBase = "https://ci.encar.com";
    const imgParams = "?impolicy=heightRate&rh=768&cw=1280&ch=768&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png";

    // Deep search for photos
    let rawPhotos = [];
    const findPhotos = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        const possibleKeys = ['photos', 'Photos', 'images', 'Images', 'photo', 'Photo'];
        for (const key of possibleKeys) {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
                rawPhotos = obj[key];
                return true;
            }
        }
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                if (findPhotos(obj[key])) return true;
            }
        }
        return false;
    };

    findPhotos(data);

    // Sort rawPhotos: Primary by code, Secondary by OUTER type
    const sortedPhotos = [...rawPhotos].sort((a, b) => {
        const codeA = parseInt(a.code || a.Code || "999");
        const codeB = parseInt(b.code || b.Code || "999");
        if (codeA !== codeB) return codeA - codeB;

        const typeA = (a.type || a.Type || "").toUpperCase();
        const typeB = (b.type || b.Type || "").toUpperCase();
        if (typeA === "OUTER" && typeB !== "OUTER") return -1;
        if (typeA !== "OUTER" && typeB === "OUTER") return 1;
        return 0;
    });

    let images = sortedPhotos.map(p => {
        const loc = p.path || p.Path || p.location || p.Location || (typeof p === 'string' ? p : null);
        if (!loc) return null;
        const fullLoc = loc.startsWith('http') ? loc : `${imgBase}${loc}`;
        return `${fullLoc}${imgParams}`;
    }).filter(url => url !== null);

    if (images.length === 0) {
        images = ["/images/resource/inventory1-6.png"];
    }

    const originalPrice = adver.price || adver.Price || data.price || data.Price || 0;
    const isLowPrice = typeof originalPrice === 'number' && originalPrice < 500;
    const finalPrice = typeof originalPrice === 'number' ? originalPrice + 44 : originalPrice;

    const carItem = {
        id: data.vehicleId || data.VehicleId || "",
        name: `${detail.formYear || ''} ${detail.manufacturerEnglishName || detail.manufacturerName || ''} ${detail.modelGroupEnglishName || detail.modelGroupName || ''} ${detail.gradeEnglishName || detail.gradeName || ''}`.trim(),
        registration_date: detail.yearMonth || detail.YearMonth || "",
        year: detail.formYear || detail.FormYear || "",
        fuel_type: fuelTypeMap[spec.fuelName || spec.FuelName] || spec.fuelName || spec.FuelName || "",
        engine_volume: spec.displacement || spec.Displacement || 0,
        drive_type: "Other",
        transmission: transmissionTypeMap[spec.transmissionName || spec.TransmissionName] || spec.transmissionName || spec.TransmissionName || "",
        passenger: spec.seatCount || spec.SeatCount || 0,
        price: finalPrice,
        isLowPrice,
        images: images,
        main_image: images[0] || "/images/resource/inventory1-6.png",
        odometer: spec.mileage || spec.Mileage || 0,
        vehicle_type: vehicleTypeMap[spec.bodyName || spec.BodyName] || spec.bodyName || spec.BodyName || "",
        description: adver.description || adver.Description || "",
        color: colorMap[spec.colorName || spec.ColorName] || spec.colorName || spec.ColorName || "",
        make_name: detail.manufacturerEnglishName || detail.manufacturerName || "",
        model_name: detail.modelGroupEnglishName || detail.modelGroupName || "",
        vin: data.vin || data.Vin || data.VIN || "",
        vehicle_no: data.vehicleNo || data.VehicleNo || "",
        engine_power: spec.horsePower || spec.HorsePower || "",
        view_count: data.manage?.viewCount || data.Manage?.ViewCount || 0,
        dealer: {
            name: data.partnership?.dealer?.name || data.Partnership?.Dealer?.Name || "",
            company: data.partnership?.dealer?.firm?.name || data.Partnership?.Dealer?.Firm?.Name || "",
            address: data.contact?.address || data.Contact?.Address || "",
            phone: data.contact?.no || data.Contact?.No || ""
        },
        options: []
    };

    const gradeEnglishName = detail.gradeEnglishName || detail.GradeEnglishName || '';
    const driveList = ["2WD", "Front 2WD", "Rear 2WD", "4WD", "AWD"];
    for (const drive of driveList) {
        if (gradeEnglishName.includes(drive)) {
            carItem.drive_type = drive;
            break;
        }
    }

    const optionCodes = (data.options?.standard || data.Options?.Standard || []);
    const groupedOptions = {
        "Main Features": [],
        "Safety": [],
        "Convenience": [],
        "Multimedia": []
    };

    const addedCodes = new Set();
    Object.entries(carOptionRadioMap).forEach(([key, codes]) => {
        if (codes.some(c => optionCodes.includes(c))) {
            groupedOptions["Main Features"].push(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            codes.forEach(c => addedCodes.add(c));
        }
    });

    optionCodes.forEach(code => {
        if (!addedCodes.has(code) && extraOptionsMap[code]) {
            groupedOptions["Convenience"].push(extraOptionsMap[code]);
        }
    });

    carItem.options = Object.entries(groupedOptions)
        .filter(([_, names]) => names.length > 0)
        .map(([title, names]) => ({ title, names }));

    return carItem;
};
