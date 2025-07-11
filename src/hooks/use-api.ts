import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { databaseService } from '../services/database-service';
import { smsService } from '../services/sms-service';
import { oauthService } from '../services/oauth-service';
import { fileUploadService } from '../services/file-upload-service';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

// =============================================================================
// USER MANAGEMENT HOOKS
// =============================================================================

export const useUsers = (params?: any) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => databaseService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => databaseService.getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (userData: any) => databaseService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      enqueueSnackbar('User created successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to create user', { variant: 'error' });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: any }) =>
      databaseService.updateUser(userId, userData),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      enqueueSnackbar('User updated successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to update user', { variant: 'error' });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (userId: string) => databaseService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to delete user', { variant: 'error' });
    },
  });
};

// =============================================================================
// DOCTOR MANAGEMENT HOOKS
// =============================================================================

export const useDoctors = (params?: any) => {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => databaseService.getDoctors(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDoctor = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => databaseService.getDoctorById(doctorId),
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (doctorData: any) => databaseService.createDoctor(doctorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      enqueueSnackbar('Doctor created successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to create doctor', { variant: 'error' });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ doctorId, doctorData }: { doctorId: string; doctorData: any }) =>
      databaseService.updateDoctor(doctorId, doctorData),
    onSuccess: (_, { doctorId }) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctor', doctorId] });
      enqueueSnackbar('Doctor updated successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to update doctor', { variant: 'error' });
    },
  });
};

// =============================================================================
// PATIENT MANAGEMENT HOOKS
// =============================================================================

export const usePatients = (params?: any) => {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => databaseService.getPatients(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePatient = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => databaseService.getPatientById(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (patientData: any) => databaseService.createPatient(patientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      enqueueSnackbar('Patient created successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to create patient', { variant: 'error' });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ patientId, patientData }: { patientId: string; patientData: any }) =>
      databaseService.updatePatient(patientId, patientData),
    onSuccess: (_, { patientId }) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
      enqueueSnackbar('Patient updated successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to update patient', { variant: 'error' });
    },
  });
};

// =============================================================================
// APPOINTMENT MANAGEMENT HOOKS
// =============================================================================

export const useAppointments = (params?: any) => {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => databaseService.getAppointments(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for appointments
  });
};

export const useAppointment = (appointmentId: string) => {
  return useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => databaseService.getAppointmentById(appointmentId),
    enabled: !!appointmentId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (appointmentData: any) => databaseService.createAppointment(appointmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      enqueueSnackbar('Appointment created successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to create appointment', { variant: 'error' });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ appointmentId, appointmentData }: { appointmentId: string; appointmentData: any }) =>
      databaseService.updateAppointment(appointmentId, appointmentData),
    onSuccess: (_, { appointmentId }) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['appointment', appointmentId] });
      enqueueSnackbar('Appointment updated successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to update appointment', { variant: 'error' });
    },
  });
};

// =============================================================================
// MEDICAL TESTS HOOKS
// =============================================================================

export const useMedicalTests = (params?: any) => {
  return useQuery({
    queryKey: ['medical-tests', params],
    queryFn: () => databaseService.getMedicalTests(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMedicalTest = (testId: string) => {
  return useQuery({
    queryKey: ['medical-test', testId],
    queryFn: () => databaseService.getMedicalTestById(testId),
    enabled: !!testId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateMedicalTest = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (testData: any) => databaseService.createMedicalTest(testData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-tests'] });
      enqueueSnackbar('Medical test created successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to create medical test', { variant: 'error' });
    },
  });
};

export const useUpdateMedicalTest = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ testId, testData }: { testId: string; testData: any }) =>
      databaseService.updateMedicalTest(testId, testData),
    onSuccess: (_, { testId }) => {
      queryClient.invalidateQueries({ queryKey: ['medical-tests'] });
      queryClient.invalidateQueries({ queryKey: ['medical-test', testId] });
      enqueueSnackbar('Medical test updated successfully', { variant: 'success' });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to update medical test', { variant: 'error' });
    },
  });
};

// =============================================================================
// SMS OTP HOOKS
// =============================================================================

export const useSendOTP = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (phoneNumber: string) => smsService.sendOTP(phoneNumber),
    onSuccess: (result) => {
      if (result.success) {
        enqueueSnackbar('OTP sent successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(result.error || 'Failed to send OTP', { variant: 'error' });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to send OTP', { variant: 'error' });
    },
  });
};

export const useVerifyOTP = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ phoneNumber, otp }: { phoneNumber: string; otp: string }) =>
      smsService.verifyOTP(phoneNumber, otp),
    onSuccess: (isValid) => {
      if (isValid) {
        enqueueSnackbar('OTP verified successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Invalid OTP', { variant: 'error' });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to verify OTP', { variant: 'error' });
    },
  });
};

// =============================================================================
// FILE UPLOAD HOOKS
// =============================================================================

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ file, type, metadata }: { file: File; type: string; metadata?: any }) =>
      fileUploadService.uploadFile(file, type as any, metadata),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['files'] });
        enqueueSnackbar('File uploaded successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(result.error || 'Failed to upload file', { variant: 'error' });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to upload file', { variant: 'error' });
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (fileId: string) => fileUploadService.deleteFile(fileId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['files'] });
        enqueueSnackbar('File deleted successfully', { variant: 'success' });
      } else {
        enqueueSnackbar(result.error || 'Failed to delete file', { variant: 'error' });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to delete file', { variant: 'error' });
    },
  });
};

// =============================================================================
// NOTIFICATION HOOKS
// =============================================================================

export const useNotifications = (userId: string, params?: any) => {
  return useQuery({
    queryKey: ['notifications', userId, params],
    queryFn: () => databaseService.getNotifications(userId, params),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute for notifications
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (notificationId: string) => databaseService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || 'Failed to mark notification as read', { variant: 'error' });
    },
  });
};

// =============================================================================
// DASHBOARD HOOKS
// =============================================================================

export const useDashboardStats = (userId: string, role: string) => {
  return useQuery({
    queryKey: ['dashboard-stats', userId, role],
    queryFn: () => databaseService.getDashboardStats(userId, role),
    enabled: !!userId && !!role,
    staleTime: 2 * 60 * 1000,
  });
};

export const useRecentActivity = (userId: string, limit: number = 10) => {
  return useQuery({
    queryKey: ['recent-activity', userId, limit],
    queryFn: () => databaseService.getRecentActivity(userId, limit),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
};

// =============================================================================
// SEARCH HOOKS
// =============================================================================

export const useSearchDoctors = (query: string, params?: any) => {
  return useQuery({
    queryKey: ['search-doctors', query, params],
    queryFn: () => databaseService.searchDoctors(query, params),
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchPatients = (query: string, params?: any) => {
  return useQuery({
    queryKey: ['search-patients', query, params],
    queryFn: () => databaseService.searchPatients(query, params),
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchAppointments = (query: string, params?: any) => {
  return useQuery({
    queryKey: ['search-appointments', query, params],
    queryFn: () => databaseService.searchAppointments(query, params),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
}; 