// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  success: boolean;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  coverUrl?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  company?: string;
  isVerified: boolean;
  status: 'active' | 'pending' | 'banned' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface UserAbout {
  id: string;
  role: string;
  email: string;
  country: string;
  school?: string;
  company?: string;
  coverUrl?: string;
  totalFollowers: number;
  totalFollowing: number;
  quote?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface UserFollower {
  id: string;
  name: string;
  country: string;
  avatarUrl?: string;
}

export interface UserFriend {
  id: string;
  role: string;
  name: string;
  avatarUrl?: string;
}

export interface UserGallery {
  id: string;
  postedAt: string;
  title: string;
  imageUrl?: string;
}

export interface UserFeed {
  id: string;
  createdAt: string;
  media?: string;
  message: string;
  personLikes: Array<{
    name: string;
    avatarUrl?: string;
  }>;
  comments: Array<{
    id: string;
    author: {
      id: string;
      avatarUrl?: string;
      name: string;
    };
    createdAt: string;
    message: string;
  }>;
}

export interface UserCard {
  id: string;
  role: string;
  name: string;
  coverUrl?: string;
  avatarUrl?: string;
  totalFollowers: number;
  totalPosts: number;
  totalFollowing: number;
}

export interface UserPayment {
  id: string;
  cardNumber: string;
  cardType: 'mastercard' | 'visa' | 'amex';
  primary: boolean;
}

export interface UserAddress {
  id: string;
  primary: boolean;
  name: string;
  phoneNumber: string;
  fullAddress: string;
  addressType: 'Home' | 'Office';
}

export interface UserInvoice {
  id: string;
  invoiceNumber: string;
  createdAt: string;
  price: number;
}

export interface UserPlan {
  subscription: 'basic' | 'starter' | 'premium';
  price: number;
  primary: boolean;
}

// Order Types
export interface OrderItem {
  id: string;
  sku: string;
  quantity: number;
  name: string;
  coverUrl?: string;
  price: number;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  ipAddress: string;
}

export interface OrderDelivery {
  shipBy: string;
  speedy: string;
  trackingNumber: string;
}

export interface OrderHistory {
  orderTime: string;
  paymentTime: string;
  deliveryTime: string;
  completionTime: string;
  timeline: Array<{
    title: string;
    time: string;
  }>;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  taxes: number;
  items: OrderItem[];
  history: OrderHistory;
  subTotal: number;
  shipping: number;
  discount: number;
  customer: OrderCustomer;
  delivery: OrderDelivery;
  totalAmount: number;
  totalQuantity: number;
  shippingAddress: {
    fullAddress: string;
    phoneNumber: string;
  };
  payment: {
    cardType: string;
    cardNumber: string;
  };
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  coverUrl?: string;
  price: number;
  priceSale?: number;
  colors: string[];
  status: 'sale' | 'new' | '';
  inventoryType: 'in_stock' | 'low_stock' | 'out_of_stock';
  totalRating: number;
  totalReview: number;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Invoice Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  sent: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  totalAmount: number;
  balance: number;
  dueDate: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{
    id: string;
    title: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  salary: string;
  experience: string;
  employmentType: 'Full time' | 'Part time' | 'On demand' | 'N/A';
  role: string;
  skills: string[];
  benefits: string[];
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Tour Types
export interface Tour {
  id: string;
  name: string;
  coverUrl?: string;
  price: number;
  priceSale?: number;
  totalViews: number;
  tags: string[];
  duration: string;
  ratingNumber: number;
  totalReviews: number;
  description: string;
  services: string[];
  tourGuide: {
    name: string;
    avatarUrl?: string;
    phoneNumber: string;
    email: string;
  };
  gallery: Array<{
    title: string;
    coverUrl: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// File Types
export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
  modifiedAt: string;
  createdAt: string;
  isFavorited: boolean;
}

// Overview Types
export interface OverviewAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalSales: number;
  totalProfit: number;
  totalGrowth: number;
  totalGrowthPercent: number;
}

export interface OverviewChart {
  label: string;
  value: number;
  color?: string;
}

// Common Types
export interface StatusOption {
  value: string;
  label: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

// API Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilters extends PaginationParams {
  status?: string;
  role?: string;
  country?: string;
}

export interface OrderFilters extends PaginationParams {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProductFilters extends PaginationParams {
  category?: string;
  status?: string;
  priceRange?: [number, number];
} 