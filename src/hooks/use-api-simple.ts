import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  userApi,
  orderApi,
  productApi,
  invoiceApi,
  jobApi,
  tourApi,
  fileApi,
  overviewApi,
} from 'src/services/api';

// User Hooks
export const useUsers = (filters?: any) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userApi.getUsers(filters),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  });
};

export const useUserAbout = (id: string) => {
  return useQuery({
    queryKey: ['user-about', id],
    queryFn: () => userApi.getUserAbout(id),
    enabled: !!id,
  });
};

export const useUserFollowers = (id: string) => {
  return useQuery({
    queryKey: ['user-followers', id],
    queryFn: () => userApi.getUserFollowers(id),
    enabled: !!id,
  });
};

export const useUserFriends = (id: string) => {
  return useQuery({
    queryKey: ['user-friends', id],
    queryFn: () => userApi.getUserFriends(id),
    enabled: !!id,
  });
};

export const useUserGallery = (id: string) => {
  return useQuery({
    queryKey: ['user-gallery', id],
    queryFn: () => userApi.getUserGallery(id),
    enabled: !!id,
  });
};

export const useUserFeeds = (id: string) => {
  return useQuery({
    queryKey: ['user-feeds', id],
    queryFn: () => userApi.getUserFeeds(id),
    enabled: !!id,
  });
};

export const useUserCards = () => {
  return useQuery({
    queryKey: ['user-cards'],
    queryFn: () => userApi.getUserCards(),
  });
};

export const useUserPayments = (id: string) => {
  return useQuery({
    queryKey: ['user-payments', id],
    queryFn: () => userApi.getUserPayments(id),
    enabled: !!id,
  });
};

export const useUserAddresses = (id: string) => {
  return useQuery({
    queryKey: ['user-addresses', id],
    queryFn: () => userApi.getUserAddresses(id),
    enabled: !!id,
  });
};

export const useUserInvoices = (id: string) => {
  return useQuery({
    queryKey: ['user-invoices', id],
    queryFn: () => userApi.getUserInvoices(id),
    enabled: !!id,
  });
};

export const useUserPlans = () => {
  return useQuery({
    queryKey: ['user-plans'],
    queryFn: () => userApi.getUserPlans(),
  });
};

export const useUserStatusOptions = () => {
  return useQuery({
    queryKey: ['user-status-options'],
    queryFn: () => userApi.getUserStatusOptions(),
  });
};

// User Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: any) => userApi.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: any }) =>
      userApi.updateUser(id, userData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Order Hooks
export const useOrders = (filters?: any) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderApi.getOrders(filters),
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  });
};

export const useOrderStatusOptions = () => {
  return useQuery({
    queryKey: ['order-status-options'],
    queryFn: () => orderApi.getOrderStatusOptions(),
  });
};

// Order Mutations
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: any) => orderApi.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, orderData }: { id: string; orderData: any }) =>
      orderApi.updateOrder(id, orderData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'completed' | 'cancelled' | 'refunded' }) =>
      orderApi.updateOrderStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => orderApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Product Hooks
export const useProducts = (filters?: any) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getProducts(filters),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: () => productApi.getProductCategories(),
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['product-search', query],
    queryFn: () => productApi.searchProducts(query),
    enabled: !!query,
  });
};

// Product Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData: any) => productApi.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, productData }: { id: string; productData: any }) =>
      productApi.updateProduct(id, productData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Invoice Hooks
export const useInvoices = (params?: any) => {
  return useQuery({
    queryKey: ['invoices', params],
    queryFn: () => invoiceApi.getInvoices(params),
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => invoiceApi.getInvoiceById(id),
    enabled: !!id,
  });
};

export const useInvoiceStatusOptions = () => {
  return useQuery({
    queryKey: ['invoice-status-options'],
    queryFn: () => invoiceApi.getInvoiceStatusOptions(),
  });
};

// Invoice Mutations
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (invoiceData: any) => invoiceApi.createInvoice(invoiceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, invoiceData }: { id: string; invoiceData: any }) =>
      invoiceApi.updateInvoice(id, invoiceData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', id] });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => invoiceApi.deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};

// Job Hooks
export const useJobs = (params?: any) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobApi.getJobs(params),
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobApi.getJobById(id),
    enabled: !!id,
  });
};

export const useSearchJobs = (query: string) => {
  return useQuery({
    queryKey: ['job-search', query],
    queryFn: () => jobApi.searchJobs(query),
    enabled: !!query,
  });
};

// Job Mutations
export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (jobData: any) => jobApi.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, jobData }: { id: string; jobData: any }) =>
      jobApi.updateJob(id, jobData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', id] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => jobApi.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

// Tour Hooks
export const useTours = (params?: any) => {
  return useQuery({
    queryKey: ['tours', params],
    queryFn: () => tourApi.getTours(params),
  });
};

export const useTour = (id: string) => {
  return useQuery({
    queryKey: ['tour', id],
    queryFn: () => tourApi.getTourById(id),
    enabled: !!id,
  });
};

export const useSearchTours = (query: string) => {
  return useQuery({
    queryKey: ['tour-search', query],
    queryFn: () => tourApi.searchTours(query),
    enabled: !!query,
  });
};

// Tour Mutations
export const useCreateTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (tourData: any) => tourApi.createTour(tourData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
};

export const useUpdateTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, tourData }: { id: string; tourData: any }) =>
      tourApi.updateTour(id, tourData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour', id] });
    },
  });
};

export const useDeleteTour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => tourApi.deleteTour(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
};

// File Hooks
export const useFiles = (params?: any) => {
  return useQuery({
    queryKey: ['files', params],
    queryFn: () => fileApi.getFiles(params),
  });
};

export const useFile = (id: string) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => fileApi.getFileById(id),
    enabled: !!id,
  });
};

// File Mutations
export const useUploadFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => fileApi.uploadFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => fileApi.deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const useToggleFileFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => fileApi.toggleFileFavorite(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      queryClient.invalidateQueries({ queryKey: ['file', id] });
    },
  });
};

// Overview Hooks
export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => overviewApi.getAnalytics(),
  });
};

export const useRevenueChart = () => {
  return useQuery({
    queryKey: ['revenue-chart'],
    queryFn: () => overviewApi.getRevenueChart(),
  });
};

export const useSalesChart = () => {
  return useQuery({
    queryKey: ['sales-chart'],
    queryFn: () => overviewApi.getSalesChart(),
  });
};

export const useOrdersChart = () => {
  return useQuery({
    queryKey: ['orders-chart'],
    queryFn: () => overviewApi.getOrdersChart(),
  });
}; 