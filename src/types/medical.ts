// Medical Types for Amin Diagnostics & Medical Services

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'doctor' | 'patient';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialization: string;
  qualification: string;
  experience: number;
  bio: string;
  consultationFee: number;
  availableDays: string[];
  availableTime: string;
  status: 'active' | 'inactive' | 'on_leave';
  rating: number;
  totalPatients: number;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: string;
  allergies?: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'consultation' | 'follow_up' | 'emergency' | 'routine_checkup';
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalTest {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  preparation?: string;
  duration: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface TestReport {
  id: string;
  patientId: string;
  testId: string;
  doctorId?: string;
  patientName: string;
  testName: string;
  doctorName?: string;
  testDate: string;
  reportDate: string;
  results: TestResult[];
  conclusion?: string;
  recommendations?: string;
  status: 'pending' | 'completed' | 'cancelled';
  reportFile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headDoctorId?: string;
  headDoctorName?: string;
  totalDoctors: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'test_result' | 'payment' | 'system' | 'reminder';
  isRead: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  appointmentId?: string;
  testReportId?: string;
  patientId: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'online' | 'insurance';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalTests: number;
  todayAppointments: number;
  pendingReports: number;
  monthlyRevenue: number;
  patientGrowth: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 