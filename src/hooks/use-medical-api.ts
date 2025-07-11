import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  authAPI,
  userAPI,
  doctorAPI,
  patientAPI,
  appointmentAPI,
  medicalTestAPI,
  testReportAPI,
  departmentAPI,
  notificationAPI,
  paymentAPI,
  dashboardAPI,
} from '../services/medical-api';
import { User, Doctor, Patient, Appointment, MedicalTest, TestReport, Department, Payment } from '../types/medical';

// Auth Hooks
export const useSendOTP = () => {
  return useMutation({
    mutationFn: authAPI.sendOTP,
  });
};

export const useVerifyOTP = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => authAPI.verifyOTP(phone, otp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

// User Hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userAPI.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Doctor Hooks
export const useDoctors = (params?: { page?: number; limit?: number; search?: string; specialization?: string }) => {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorAPI.getAll(params),
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ['doctors', id],
    queryFn: () => doctorAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: doctorAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Doctor> }) => doctorAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: doctorAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
};

export const useDoctorsBySpecialization = (specialization: string) => {
  return useQuery({
    queryKey: ['doctors', 'specialization', specialization],
    queryFn: () => doctorAPI.getBySpecialization(specialization),
    enabled: !!specialization,
  });
};

export const useAvailableSlots = (doctorId: string, date: string) => {
  return useQuery({
    queryKey: ['doctors', doctorId, 'slots', date],
    queryFn: () => doctorAPI.getAvailableSlots(doctorId, date),
    enabled: !!doctorId && !!date,
  });
};

// Patient Hooks
export const usePatients = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientAPI.getAll(params),
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Patient> }) => patientAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patients', id] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const usePatientMedicalHistory = (patientId: string) => {
  return useQuery({
    queryKey: ['patients', patientId, 'medical-history'],
    queryFn: () => patientAPI.getMedicalHistory(patientId),
    enabled: !!patientId,
  });
};

// Appointment Hooks
export const useAppointments = (params?: { page?: number; limit?: number; status?: string; date?: string }) => {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => appointmentAPI.getAll(params),
  });
};

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: ['appointments', id],
    queryFn: () => appointmentAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: appointmentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Appointment> }) => appointmentAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointments', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: appointmentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useAppointmentsByPatient = (patientId: string) => {
  return useQuery({
    queryKey: ['appointments', 'patient', patientId],
    queryFn: () => appointmentAPI.getByPatient(patientId),
    enabled: !!patientId,
  });
};

export const useAppointmentsByDoctor = (doctorId: string) => {
  return useQuery({
    queryKey: ['appointments', 'doctor', doctorId],
    queryFn: () => appointmentAPI.getByDoctor(doctorId),
    enabled: !!doctorId,
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Appointment['status'] }) => appointmentAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: appointmentAPI.getTodayAppointments,
  });
};

// Medical Test Hooks
export const useMedicalTests = (params?: { page?: number; limit?: number; category?: string }) => {
  return useQuery({
    queryKey: ['medical-tests', params],
    queryFn: () => medicalTestAPI.getAll(params),
  });
};

export const useMedicalTest = (id: string) => {
  return useQuery({
    queryKey: ['medical-tests', id],
    queryFn: () => medicalTestAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateMedicalTest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: medicalTestAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-tests'] });
    },
  });
};

export const useUpdateMedicalTest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MedicalTest> }) => medicalTestAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['medical-tests'] });
      queryClient.invalidateQueries({ queryKey: ['medical-tests', id] });
    },
  });
};

export const useDeleteMedicalTest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: medicalTestAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-tests'] });
    },
  });
};

export const useMedicalTestsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['medical-tests', 'category', category],
    queryFn: () => medicalTestAPI.getByCategory(category),
    enabled: !!category,
  });
};

// Test Report Hooks
export const useTestReports = (params?: { page?: number; limit?: number; status?: string; patientId?: string }) => {
  return useQuery({
    queryKey: ['test-reports', params],
    queryFn: () => testReportAPI.getAll(params),
  });
};

export const useTestReport = (id: string) => {
  return useQuery({
    queryKey: ['test-reports', id],
    queryFn: () => testReportAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateTestReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: testReportAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-reports'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdateTestReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TestReport> }) => testReportAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['test-reports'] });
      queryClient.invalidateQueries({ queryKey: ['test-reports', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeleteTestReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: testReportAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-reports'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useTestReportsByPatient = (patientId: string) => {
  return useQuery({
    queryKey: ['test-reports', 'patient', patientId],
    queryFn: () => testReportAPI.getByPatient(patientId),
    enabled: !!patientId,
  });
};

export const useUpdateTestReportStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TestReport['status'] }) => testReportAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-reports'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUploadTestReportFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => testReportAPI.uploadReportFile(id, file),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['test-reports', id] });
    },
  });
};

// Department Hooks
export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: departmentAPI.getAll,
  });
};

export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: ['departments', id],
    queryFn: () => departmentAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: departmentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Department> }) => departmentAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['departments', id] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: departmentAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

// Notification Hooks
export const useNotifications = (params?: { page?: number; limit?: number; isRead?: boolean }) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => notificationAPI.getAll(params),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: notificationAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: notificationAPI.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationAPI.getUnreadCount,
  });
};

// Payment Hooks
export const usePayments = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentAPI.getAll(params),
  });
};

export const usePayment = (id: string) => {
  return useQuery({
    queryKey: ['payments', id],
    queryFn: () => paymentAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: paymentAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Payment> }) => paymentAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payments', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const usePaymentsByPatient = (patientId: string) => {
  return useQuery({
    queryKey: ['payments', 'patient', patientId],
    queryFn: () => paymentAPI.getByPatient(patientId),
    enabled: !!patientId,
  });
};

export const useProcessPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentId, paymentMethod }: { paymentId: string; paymentMethod: Payment['paymentMethod'] }) => 
      paymentAPI.processPayment(paymentId, paymentMethod),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

// Dashboard Hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardAPI.getStats,
  });
};

export const useRecentAppointments = (limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-appointments', limit],
    queryFn: () => dashboardAPI.getRecentAppointments(limit),
  });
};

export const useRecentTestReports = (limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-test-reports', limit],
    queryFn: () => dashboardAPI.getRecentTestReports(limit),
  });
};

export const useRevenueChart = (period: 'week' | 'month' | 'year') => {
  return useQuery({
    queryKey: ['dashboard', 'revenue-chart', period],
    queryFn: () => dashboardAPI.getRevenueChart(period),
  });
};

export const usePatientGrowth = (period: 'week' | 'month' | 'year') => {
  return useQuery({
    queryKey: ['dashboard', 'patient-growth', period],
    queryFn: () => dashboardAPI.getPatientGrowth(period),
  });
}; 