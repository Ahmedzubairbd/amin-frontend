import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  // New API endpoints for backend services
  users: {
    list: '/api/users',
    details: (id: string) => `/api/users/${id}`,
    about: (id: string) => `/api/users/${id}/about`,
    followers: (id: string) => `/api/users/${id}/followers`,
    friends: (id: string) => `/api/users/${id}/friends`,
    gallery: (id: string) => `/api/users/${id}/gallery`,
    feeds: (id: string) => `/api/users/${id}/feeds`,
    cards: '/api/users/cards',
    payments: (id: string) => `/api/users/${id}/payments`,
    addresses: (id: string) => `/api/users/${id}/addresses`,
    invoices: (id: string) => `/api/users/${id}/invoices`,
    plans: '/api/users/plans',
    statusOptions: '/api/users/status-options',
  },
  orders: {
    list: '/api/orders',
    details: (id: string) => `/api/orders/${id}`,
    status: (id: string) => `/api/orders/${id}/status`,
    statusOptions: '/api/orders/status-options',
  },
  products: {
    list: '/api/products',
    details: (id: string) => `/api/products/${id}`,
    search: '/api/products/search',
    categories: '/api/products/categories',
  },
  invoices: {
    list: '/api/invoices',
    details: (id: string) => `/api/invoices/${id}`,
    statusOptions: '/api/invoices/status-options',
  },
  jobs: {
    list: '/api/jobs',
    details: (id: string) => `/api/jobs/${id}`,
    search: '/api/jobs/search',
  },
  tours: {
    list: '/api/tours',
    details: (id: string) => `/api/tours/${id}`,
    search: '/api/tours/search',
  },
  files: {
    list: '/api/files',
    details: (id: string) => `/api/files/${id}`,
    upload: '/api/files/upload',
    favorite: (id: string) => `/api/files/${id}/favorite`,
  },
  overview: {
    analytics: '/api/overview/analytics',
    revenueChart: '/api/overview/revenue-chart',
    salesChart: '/api/overview/sales-chart',
    ordersChart: '/api/overview/orders-chart',
  },
};
