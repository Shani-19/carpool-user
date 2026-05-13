import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const API_BASE = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'https://partners.carpoolkr.com')
  : '/api/proxy'; // Use our custom proxy on the client to handle cookie domain stripping

// Configure global axios defaults
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const api = axios.create({
  baseURL: API_BASE + '/api',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const authAPI = {
  async login(credentials) {
    // 1. Get CSRF cookie first
    // We use a separate axios call without the /api prefix since /sanctum is not under /api
    await axios.get(API_BASE + '/sanctum/csrf-cookie', {
      withCredentials: true
    });
    
    // 2. Perform login
    // Note: If your login route is actually /login (not /api/login), 
    // you might need to use axios.post(API_BASE + '/login', ...) instead of api.post
    return api.post('/login', credentials);
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
};

export const bookingAPI = {
  getMyBookings: (query = '') => api.get(`/my-bookings${query}`),
  bookingDetail: (booking_num) => api.get(`/bookings/${booking_num}`),
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
};




