import axiosInstance from 'src/utils/axios';
import {
  ApiResponse,
  PaginatedResponse,
  User,
  UserAbout,
  UserFollower,
  UserFriend,
  UserGallery,
  UserFeed,
  UserCard,
  UserPayment,
  UserAddress,
  UserInvoice,
  UserPlan,
  Order,
  Product,
  Invoice,
  Job,
  Tour,
  FileItem,
  OverviewAnalytics,
  OverviewChart,
  UserFilters,
  OrderFilters,
  ProductFilters,
  StatusOption,
  PaginationParams,
} from 'src/types/api';

// Base API Service Class
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  protected async get<T>(endpoint: string, params?: any): Promise<T> {
    const response = await axiosInstance.get(`${this.baseURL}${endpoint}`, { params });
    return response.data;
  }

  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.post(`${this.baseURL}${endpoint}`, data);
    return response.data;
  }

  protected async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.put(`${this.baseURL}${endpoint}`, data);
    return response.data;
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const response = await axiosInstance.delete(`${this.baseURL}${endpoint}`);
    return response.data;
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axiosInstance.patch(`${this.baseURL}${endpoint}`, data);
    return response.data;
  }
}

// User API Service
export class UserApiService extends ApiService {
  constructor() {
    super('/api/users');
  }

  // Get users list with pagination and filters
  async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
    return this.get<PaginatedResponse<User>>('', filters);
  }

  // Get user by ID
  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(`/${id}`);
  }

  // Create new user
  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.post<ApiResponse<User>>('', userData);
  }

  // Update user
  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<ApiResponse<User>>(`/${id}`, userData);
  }

  // Delete user
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Get user about information
  async getUserAbout(id: string): Promise<ApiResponse<UserAbout>> {
    return this.get<ApiResponse<UserAbout>>(`/${id}/about`);
  }

  // Get user followers
  async getUserFollowers(id: string): Promise<ApiResponse<UserFollower[]>> {
    return this.get<ApiResponse<UserFollower[]>>(`/${id}/followers`);
  }

  // Get user friends
  async getUserFriends(id: string): Promise<ApiResponse<UserFriend[]>> {
    return this.get<ApiResponse<UserFriend[]>>(`/${id}/friends`);
  }

  // Get user gallery
  async getUserGallery(id: string): Promise<ApiResponse<UserGallery[]>> {
    return this.get<ApiResponse<UserGallery[]>>(`/${id}/gallery`);
  }

  // Get user feeds
  async getUserFeeds(id: string): Promise<ApiResponse<UserFeed[]>> {
    return this.get<ApiResponse<UserFeed[]>>(`/${id}/feeds`);
  }

  // Get user cards
  async getUserCards(): Promise<ApiResponse<UserCard[]>> {
    return this.get<ApiResponse<UserCard[]>>('/cards');
  }

  // Get user payments
  async getUserPayments(id: string): Promise<ApiResponse<UserPayment[]>> {
    return this.get<ApiResponse<UserPayment[]>>(`/${id}/payments`);
  }

  // Get user addresses
  async getUserAddresses(id: string): Promise<ApiResponse<UserAddress[]>> {
    return this.get<ApiResponse<UserAddress[]>>(`/${id}/addresses`);
  }

  // Get user invoices
  async getUserInvoices(id: string): Promise<ApiResponse<UserInvoice[]>> {
    return this.get<ApiResponse<UserInvoice[]>>(`/${id}/invoices`);
  }

  // Get user plans
  async getUserPlans(): Promise<ApiResponse<UserPlan[]>> {
    return this.get<ApiResponse<UserPlan[]>>('/plans');
  }

  // Get user status options
  async getUserStatusOptions(): Promise<ApiResponse<StatusOption[]>> {
    return this.get<ApiResponse<StatusOption[]>>('/status-options');
  }
}

// Order API Service
export class OrderApiService extends ApiService {
  constructor() {
    super('/api/orders');
  }

  // Get orders list with pagination and filters
  async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    return this.get<PaginatedResponse<Order>>('', filters);
  }

  // Get order by ID
  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.get<ApiResponse<Order>>(`/${id}`);
  }

  // Create new order
  async createOrder(orderData: Partial<Order>): Promise<ApiResponse<Order>> {
    return this.post<ApiResponse<Order>>('', orderData);
  }

  // Update order
  async updateOrder(id: string, orderData: Partial<Order>): Promise<ApiResponse<Order>> {
    return this.put<ApiResponse<Order>>(`/${id}`, orderData);
  }

  // Delete order
  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Update order status
  async updateOrderStatus(id: string, status: Order['status']): Promise<ApiResponse<Order>> {
    return this.patch<ApiResponse<Order>>(`/${id}/status`, { status });
  }

  // Get order status options
  async getOrderStatusOptions(): Promise<ApiResponse<StatusOption[]>> {
    return this.get<ApiResponse<StatusOption[]>>('/status-options');
  }
}

// Product API Service
export class ProductApiService extends ApiService {
  constructor() {
    super('/api/products');
  }

  // Get products list with pagination and filters
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    return this.get<PaginatedResponse<Product>>('', filters);
  }

  // Get product by ID
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(`/${id}`);
  }

  // Create new product
  async createProduct(productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.post<ApiResponse<Product>>('', productData);
  }

  // Update product
  async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.put<ApiResponse<Product>>(`/${id}`, productData);
  }

  // Delete product
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Search products
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.get<ApiResponse<Product[]>>('/search', { q: query });
  }

  // Get product categories
  async getProductCategories(): Promise<ApiResponse<string[]>> {
    return this.get<ApiResponse<string[]>>('/categories');
  }
}

// Invoice API Service
export class InvoiceApiService extends ApiService {
  constructor() {
    super('/api/invoices');
  }

  // Get invoices list with pagination
  async getInvoices(params?: PaginationParams): Promise<PaginatedResponse<Invoice>> {
    return this.get<PaginatedResponse<Invoice>>('', params);
  }

  // Get invoice by ID
  async getInvoiceById(id: string): Promise<ApiResponse<Invoice>> {
    return this.get<ApiResponse<Invoice>>(`/${id}`);
  }

  // Create new invoice
  async createInvoice(invoiceData: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.post<ApiResponse<Invoice>>('', invoiceData);
  }

  // Update invoice
  async updateInvoice(id: string, invoiceData: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    return this.put<ApiResponse<Invoice>>(`/${id}`, invoiceData);
  }

  // Delete invoice
  async deleteInvoice(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Get invoice status options
  async getInvoiceStatusOptions(): Promise<ApiResponse<StatusOption[]>> {
    return this.get<ApiResponse<StatusOption[]>>('/status-options');
  }
}

// Job API Service
export class JobApiService extends ApiService {
  constructor() {
    super('/api/jobs');
  }

  // Get jobs list with pagination
  async getJobs(params?: PaginationParams): Promise<PaginatedResponse<Job>> {
    return this.get<PaginatedResponse<Job>>('', params);
  }

  // Get job by ID
  async getJobById(id: string): Promise<ApiResponse<Job>> {
    return this.get<ApiResponse<Job>>(`/${id}`);
  }

  // Create new job
  async createJob(jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.post<ApiResponse<Job>>('', jobData);
  }

  // Update job
  async updateJob(id: string, jobData: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.put<ApiResponse<Job>>(`/${id}`, jobData);
  }

  // Delete job
  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Search jobs
  async searchJobs(query: string): Promise<ApiResponse<Job[]>> {
    return this.get<ApiResponse<Job[]>>('/search', { q: query });
  }
}

// Tour API Service
export class TourApiService extends ApiService {
  constructor() {
    super('/api/tours');
  }

  // Get tours list with pagination
  async getTours(params?: PaginationParams): Promise<PaginatedResponse<Tour>> {
    return this.get<PaginatedResponse<Tour>>('', params);
  }

  // Get tour by ID
  async getTourById(id: string): Promise<ApiResponse<Tour>> {
    return this.get<ApiResponse<Tour>>(`/${id}`);
  }

  // Create new tour
  async createTour(tourData: Partial<Tour>): Promise<ApiResponse<Tour>> {
    return this.post<ApiResponse<Tour>>('', tourData);
  }

  // Update tour
  async updateTour(id: string, tourData: Partial<Tour>): Promise<ApiResponse<Tour>> {
    return this.put<ApiResponse<Tour>>(`/${id}`, tourData);
  }

  // Delete tour
  async deleteTour(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Search tours
  async searchTours(query: string): Promise<ApiResponse<Tour[]>> {
    return this.get<ApiResponse<Tour[]>>('/search', { q: query });
  }
}

// File API Service
export class FileApiService extends ApiService {
  constructor() {
    super('/api/files');
  }

  // Get files list with pagination
  async getFiles(params?: PaginationParams): Promise<PaginatedResponse<FileItem>> {
    return this.get<PaginatedResponse<FileItem>>('', params);
  }

  // Get file by ID
  async getFileById(id: string): Promise<ApiResponse<FileItem>> {
    return this.get<ApiResponse<FileItem>>(`/${id}`);
  }

  // Upload file
  async uploadFile(file: File): Promise<ApiResponse<FileItem>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.post<ApiResponse<FileItem>>('/upload', formData);
  }

  // Delete file
  async deleteFile(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`/${id}`);
  }

  // Toggle file favorite
  async toggleFileFavorite(id: string): Promise<ApiResponse<FileItem>> {
    return this.patch<ApiResponse<FileItem>>(`/${id}/favorite`);
  }
}

// Overview API Service
export class OverviewApiService extends ApiService {
  constructor() {
    super('/api/overview');
  }

  // Get analytics data
  async getAnalytics(): Promise<ApiResponse<OverviewAnalytics>> {
    return this.get<ApiResponse<OverviewAnalytics>>('/analytics');
  }

  // Get revenue chart data
  async getRevenueChart(): Promise<ApiResponse<OverviewChart[]>> {
    return this.get<ApiResponse<OverviewChart[]>>('/revenue-chart');
  }

  // Get sales chart data
  async getSalesChart(): Promise<ApiResponse<OverviewChart[]>> {
    return this.get<ApiResponse<OverviewChart[]>>('/sales-chart');
  }

  // Get orders chart data
  async getOrdersChart(): Promise<ApiResponse<OverviewChart[]>> {
    return this.get<ApiResponse<OverviewChart[]>>('/orders-chart');
  }
}

// Export all API service instances
export const userApi = new UserApiService();
export const orderApi = new OrderApiService();
export const productApi = new ProductApiService();
export const invoiceApi = new InvoiceApiService();
export const jobApi = new JobApiService();
export const tourApi = new TourApiService();
export const fileApi = new FileApiService();
export const overviewApi = new OverviewApiService(); 