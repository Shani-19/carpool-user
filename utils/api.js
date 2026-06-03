import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const API_BASE = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'https://partners.carpoolkr.com')
  : ''; // Use relative paths on client to allow local proxy routes and Next.js rewrites to work correctly

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const api = axios.create({
  baseURL: API_BASE + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const authAPI = {
  async login(credentials) {
    await axios.get(API_BASE + '/sanctum/csrf-cookie');
    return api.post(API_BASE + '/login', credentials);
  },
  logout: () => api.post('/logout'),
  register: (userData) => api.post('/register', userData),
  user: () => api.get('/user'),

  getPortsByCountry: (data) => {
    return api.get('/bookings/ports-by-country', { params: data });
  },

  getPortCharges: (data) => {
    return api.get('/bookings/port-charges', { params: data });
  },

  bookingDetailUpdate: (updateData) => api.post('/bookings/update', updateData),
  orderDetailUpdate: (updateData) => api.post('/orders/update', updateData),
  getCountries: () => api.get('/countries'),
  submitInspectionRequest: (data) => api.post('/inspection-request', data),
  /* ===== Maira Edit START: 02-06-2026 Booking Page Redesign ===== */
  getUserDetail: () => api.get('/user-detail'),
  /* ===== Maira Edit END ===== */
};

export const bookingAPI = {
  getMyBookings: (query = '') => api.get(`/my-bookings${query}`),
  bookingDetail: (booking_num) => api.get(`/bookings/${booking_num}`),
  /* ===== Maira Edit START: 02-06-2026 Booking Page Redesign ===== */
  createBooking: (data) => api.post('/booking-create', data),
  /* ===== Maira Edit END ===== */
};

export const inspectionAPI = {
  getInspectionList: (query = '') => api.get(`/inspection-list${query}`),
};

export const orderAPI = {
  getMyOrders: (query = '') => api.get(`/my-orders${query}`),
  orderDetail: (order_num) => api.get(`/orders/${order_num}`),
  orderReceipt: (receiptData) => api.post('/orders/receipt', receiptData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getMyReserved: (query = '') => api.get(`/my-reserved${query}`),
  submitClaim: (data) => api.post('/order-claim', data),
};

export const balanceSheetAPI = {
  getBalanceSheet: (page = 1) => api.get(`/balance-sheet`, { params: { page } }),
  getAllBalanceSheet: () => api.get(`/balance-sheet`, { params: { all: true } }),
};

// ===== Maira Edit START: 02-06-2026 quotation-api-helper =====
export const quotationAPI = {
  sendQuotation: (data) => api.post("/quotation-send", data),
};
// ===== Maira Edit END =====