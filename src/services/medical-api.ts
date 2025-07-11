import axios from '../utils/axios';
import {
  User,
  Doctor,
  Patient,
  Appointment,
  MedicalTest,
  TestReport,
  Department,
  Notification,
  Payment,
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
} from '../types/medical';

// Auth Services
export const authAPI = {
  // Phone OTP Authentication
  sendOTP: (phone: string) => 
    axios.post<ApiResponse<{ message: string }>>('/auth/send-otp', { phone }),
  
  verifyOTP: (phone: string, otp: string) => 
    axios.post<ApiResponse<{ token: string; user: User }>>('/auth/verify-otp', { phone, otp }),
  
  logout: () => 
    axios.post<ApiResponse<{ message: string }>>('/auth/logout'),
  
  refreshToken: () => 
    axios.post<ApiResponse<{ token: string }>>('/auth/refresh'),
};

// User Services
export const userAPI = {
  getProfile: () => 
    axios.get<ApiResponse<User>>('/user/profile'),
  
  updateProfile: (data: Partial<User>) => 
    axios.put<ApiResponse<User>>('/user/profile', data),
  
  changePassword: (oldPassword: string, newPassword: string) => 
    axios.put<ApiResponse<{ message: string }>>('/user/change-password', { oldPassword, newPassword }),
};

// Doctor Services
export const doctorAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; specialization?: string }) => 
    axios.get<PaginatedResponse<Doctor>>('/doctors', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<Doctor>>(`/doctors/${id}`),
  
  create: (data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<Doctor>>('/doctors', data),
  
  update: (id: string, data: Partial<Doctor>) => 
    axios.put<ApiResponse<Doctor>>(`/doctors/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/doctors/${id}`),
  
  getBySpecialization: (specialization: string) => 
    axios.get<ApiResponse<Doctor[]>>(`/doctors/specialization/${specialization}`),
  
  getAvailableSlots: (doctorId: string, date: string) => 
    axios.get<ApiResponse<string[]>>(`/doctors/${doctorId}/available-slots`, { params: { date } }),
};

// Patient Services
export const patientAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) => 
    axios.get<PaginatedResponse<Patient>>('/patients', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<Patient>>(`/patients/${id}`),
  
  create: (data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<Patient>>('/patients', data),
  
  update: (id: string, data: Partial<Patient>) => 
    axios.put<ApiResponse<Patient>>(`/patients/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/patients/${id}`),
  
  getMedicalHistory: (patientId: string) => 
    axios.get<ApiResponse<{ appointments: Appointment[]; testReports: TestReport[] }>>(`/patients/${patientId}/medical-history`),
};

// Appointment Services
export const appointmentAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string; date?: string }) => 
    axios.get<PaginatedResponse<Appointment>>('/appointments', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<Appointment>>(`/appointments/${id}`),
  
  create: (data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<Appointment>>('/appointments', data),
  
  update: (id: string, data: Partial<Appointment>) => 
    axios.put<ApiResponse<Appointment>>(`/appointments/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/appointments/${id}`),
  
  getByPatient: (patientId: string) => 
    axios.get<ApiResponse<Appointment[]>>(`/appointments/patient/${patientId}`),
  
  getByDoctor: (doctorId: string) => 
    axios.get<ApiResponse<Appointment[]>>(`/appointments/doctor/${doctorId}`),
  
  updateStatus: (id: string, status: Appointment['status']) => 
    axios.patch<ApiResponse<Appointment>>(`/appointments/${id}/status`, { status }),
  
  getTodayAppointments: () => 
    axios.get<ApiResponse<Appointment[]>>('/appointments/today'),
};

// Medical Test Services
export const medicalTestAPI = {
  getAll: (params?: { page?: number; limit?: number; category?: string }) => 
    axios.get<PaginatedResponse<MedicalTest>>('/medical-tests', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<MedicalTest>>(`/medical-tests/${id}`),
  
  create: (data: Omit<MedicalTest, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<MedicalTest>>('/medical-tests', data),
  
  update: (id: string, data: Partial<MedicalTest>) => 
    axios.put<ApiResponse<MedicalTest>>(`/medical-tests/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/medical-tests/${id}`),
  
  getByCategory: (category: string) => 
    axios.get<ApiResponse<MedicalTest[]>>(`/medical-tests/category/${category}`),
};

// Test Report Services
export const testReportAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string; patientId?: string }) => 
    axios.get<PaginatedResponse<TestReport>>('/test-reports', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<TestReport>>(`/test-reports/${id}`),
  
  create: (data: Omit<TestReport, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<TestReport>>('/test-reports', data),
  
  update: (id: string, data: Partial<TestReport>) => 
    axios.put<ApiResponse<TestReport>>(`/test-reports/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/test-reports/${id}`),
  
  getByPatient: (patientId: string) => 
    axios.get<ApiResponse<TestReport[]>>(`/test-reports/patient/${patientId}`),
  
  updateStatus: (id: string, status: TestReport['status']) => 
    axios.patch<ApiResponse<TestReport>>(`/test-reports/${id}/status`, { status }),
  
  uploadReportFile: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post<ApiResponse<{ reportFile: string }>>(`/test-reports/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  downloadReport: (id: string) => 
    axios.get(`/test-reports/${id}/download`, { responseType: 'blob' }),
};

// Department Services
export const departmentAPI = {
  getAll: () => 
    axios.get<ApiResponse<Department[]>>('/departments'),
  
  getById: (id: string) => 
    axios.get<ApiResponse<Department>>(`/departments/${id}`),
  
  create: (data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<Department>>('/departments', data),
  
  update: (id: string, data: Partial<Department>) => 
    axios.put<ApiResponse<Department>>(`/departments/${id}`, data),
  
  delete: (id: string) => 
    axios.delete<ApiResponse<{ message: string }>>(`/departments/${id}`),
};

// Notification Services
export const notificationAPI = {
  getAll: (params?: { page?: number; limit?: number; isRead?: boolean }) => 
    axios.get<PaginatedResponse<Notification>>('/notifications', { params }),
  
  markAsRead: (id: string) => 
    axios.patch<ApiResponse<Notification>>(`/notifications/${id}/read`),
  
  markAllAsRead: () => 
    axios.patch<ApiResponse<{ message: string }>>('/notifications/mark-all-read'),
  
  getUnreadCount: () => 
    axios.get<ApiResponse<{ count: number }>>('/notifications/unread-count'),
};

// Payment Services
export const paymentAPI = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => 
    axios.get<PaginatedResponse<Payment>>('/payments', { params }),
  
  getById: (id: string) => 
    axios.get<ApiResponse<Payment>>(`/payments/${id}`),
  
  create: (data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => 
    axios.post<ApiResponse<Payment>>('/payments', data),
  
  update: (id: string, data: Partial<Payment>) => 
    axios.put<ApiResponse<Payment>>(`/payments/${id}`, data),
  
  getByPatient: (patientId: string) => 
    axios.get<ApiResponse<Payment[]>>(`/payments/patient/${patientId}`),
  
  processPayment: (paymentId: string, paymentMethod: Payment['paymentMethod']) => 
    axios.post<ApiResponse<Payment>>(`/payments/${paymentId}/process`, { paymentMethod }),
};

// Dashboard Services
export const dashboardAPI = {
  getStats: () => 
    axios.get<ApiResponse<DashboardStats>>('/dashboard/stats'),
  
  getRecentAppointments: (limit: number = 10) => 
    axios.get<ApiResponse<Appointment[]>>('/dashboard/recent-appointments', { params: { limit } }),
  
  getRecentTestReports: (limit: number = 10) => 
    axios.get<ApiResponse<TestReport[]>>('/dashboard/recent-test-reports', { params: { limit } }),
  
  getRevenueChart: (period: 'week' | 'month' | 'year') => 
    axios.get<ApiResponse<{ date: string; revenue: number }[]>>('/dashboard/revenue-chart', { params: { period } }),
  
  getPatientGrowth: (period: 'week' | 'month' | 'year') => 
    axios.get<ApiResponse<{ date: string; patients: number }[]>>('/dashboard/patient-growth', { params: { period } }),
}; 