import axios from 'axios';

// ----------------------------------------------------------------------

interface DatabaseConfig {
  baseUrl: string;
  apiKey: string;
}

interface QueryResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class DatabaseService {
  private config: DatabaseConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
      apiKey: process.env.API_SECRET_KEY || '',
    };
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      data?: any;
      params?: any;
      headers?: Record<string, string>;
    } = {}
  ): Promise<QueryResult<T>> {
    try {
      const { method = 'GET', data, params, headers = {} } = options;

      const response = await axios({
        method,
        url: `${this.config.baseUrl}${endpoint}`,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          ...headers,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(`Database request failed for ${endpoint}:`, error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  // =============================================================================
  // USER MANAGEMENT
  // =============================================================================

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<QueryResult> {
    return this.makeRequest(`/users/${userId}`);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<QueryResult> {
    return this.makeRequest('/users/email', { params: { email } });
  }

  /**
   * Create new user
   */
  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'doctor' | 'patient';
    phone?: string;
  }): Promise<QueryResult> {
    return this.makeRequest('/users', {
      method: 'POST',
      data: userData,
    });
  }

  /**
   * Update user
   */
  async updateUser(userId: string, userData: Partial<any>): Promise<QueryResult> {
    return this.makeRequest(`/users/${userId}`, {
      method: 'PUT',
      data: userData,
    });
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<QueryResult> {
    return this.makeRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get users with pagination
   */
  async getUsers(params: PaginationParams & { role?: string } = {}): Promise<QueryResult> {
    return this.makeRequest('/users', { params });
  }

  // =============================================================================
  // DOCTOR MANAGEMENT
  // =============================================================================

  /**
   * Get doctor by ID
   */
  async getDoctorById(doctorId: string): Promise<QueryResult> {
    return this.makeRequest(`/doctors/${doctorId}`);
  }

  /**
   * Create new doctor
   */
  async createDoctor(doctorData: {
    userId: string;
    specialty: string;
    experience: number;
    education: string;
    licenseNumber: string;
    availability: string;
  }): Promise<QueryResult> {
    return this.makeRequest('/doctors', {
      method: 'POST',
      data: doctorData,
    });
  }

  /**
   * Update doctor
   */
  async updateDoctor(doctorId: string, doctorData: Partial<any>): Promise<QueryResult> {
    return this.makeRequest(`/doctors/${doctorId}`, {
      method: 'PUT',
      data: doctorData,
    });
  }

  /**
   * Get doctors with pagination
   */
  async getDoctors(params: PaginationParams & { specialty?: string } = {}): Promise<QueryResult> {
    return this.makeRequest('/doctors', { params });
  }

  // =============================================================================
  // PATIENT MANAGEMENT
  // =============================================================================

  /**
   * Get patient by ID
   */
  async getPatientById(patientId: string): Promise<QueryResult> {
    return this.makeRequest(`/patients/${patientId}`);
  }

  /**
   * Create new patient
   */
  async createPatient(patientData: {
    userId: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodGroup?: string;
    emergencyContact?: string;
    medicalHistory?: string;
  }): Promise<QueryResult> {
    return this.makeRequest('/patients', {
      method: 'POST',
      data: patientData,
    });
  }

  /**
   * Update patient
   */
  async updatePatient(patientId: string, patientData: Partial<any>): Promise<QueryResult> {
    return this.makeRequest(`/patients/${patientId}`, {
      method: 'PUT',
      data: patientData,
    });
  }

  /**
   * Get patients with pagination
   */
  async getPatients(params: PaginationParams = {}): Promise<QueryResult> {
    return this.makeRequest('/patients', { params });
  }

  // =============================================================================
  // APPOINTMENT MANAGEMENT
  // =============================================================================

  /**
   * Get appointment by ID
   */
  async getAppointmentById(appointmentId: string): Promise<QueryResult> {
    return this.makeRequest(`/appointments/${appointmentId}`);
  }

  /**
   * Create new appointment
   */
  async createAppointment(appointmentData: {
    patientId: string;
    doctorId: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }): Promise<QueryResult> {
    return this.makeRequest('/appointments', {
      method: 'POST',
      data: appointmentData,
    });
  }

  /**
   * Update appointment
   */
  async updateAppointment(appointmentId: string, appointmentData: Partial<any>): Promise<QueryResult> {
    return this.makeRequest(`/appointments/${appointmentId}`, {
      method: 'PUT',
      data: appointmentData,
    });
  }

  /**
   * Get appointments with pagination
   */
  async getAppointments(params: PaginationParams & {
    patientId?: string;
    doctorId?: string;
    status?: string;
    date?: string;
  } = {}): Promise<QueryResult> {
    return this.makeRequest('/appointments', { params });
  }

  // =============================================================================
  // MEDICAL TESTS & REPORTS
  // =============================================================================

  /**
   * Get medical test by ID
   */
  async getMedicalTestById(testId: string): Promise<QueryResult> {
    return this.makeRequest(`/medical-tests/${testId}`);
  }

  /**
   * Create new medical test
   */
  async createMedicalTest(testData: {
    patientId: string;
    doctorId: string;
    testName: string;
    testType: string;
    testDate: string;
    status: 'pending' | 'in-progress' | 'completed';
    results?: string;
  }): Promise<QueryResult> {
    return this.makeRequest('/medical-tests', {
      method: 'POST',
      data: testData,
    });
  }

  /**
   * Update medical test
   */
  async updateMedicalTest(testId: string, testData: Partial<any>): Promise<QueryResult> {
    return this.makeRequest(`/medical-tests/${testId}`, {
      method: 'PUT',
      data: testData,
    });
  }

  /**
   * Get medical tests with pagination
   */
  async getMedicalTests(params: PaginationParams & {
    patientId?: string;
    doctorId?: string;
    status?: string;
  } = {}): Promise<QueryResult> {
    return this.makeRequest('/medical-tests', { params });
  }

  // =============================================================================
  // FILE UPLOAD
  // =============================================================================

  /**
   * Upload file
   */
  async uploadFile(file: File, type: 'medical-report' | 'patient-document' | 'profile-image'): Promise<QueryResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.makeRequest('/upload', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Get file by ID
   */
  async getFileById(fileId: string): Promise<QueryResult> {
    return this.makeRequest(`/files/${fileId}`);
  }

  /**
   * Delete file
   */
  async deleteFile(fileId: string): Promise<QueryResult> {
    return this.makeRequest(`/files/${fileId}`, {
      method: 'DELETE',
    });
  }

  // =============================================================================
  // NOTIFICATIONS
  // =============================================================================

  /**
   * Get notifications for user
   */
  async getNotifications(userId: string, params: PaginationParams = {}): Promise<QueryResult> {
    return this.makeRequest(`/notifications/${userId}`, { params });
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: string): Promise<QueryResult> {
    return this.makeRequest(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  /**
   * Create notification
   */
  async createNotification(notificationData: {
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    relatedId?: string;
    relatedType?: string;
  }): Promise<QueryResult> {
    return this.makeRequest('/notifications', {
      method: 'POST',
      data: notificationData,
    });
  }

  // =============================================================================
  // DASHBOARD STATISTICS
  // =============================================================================

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(userId: string, role: string): Promise<QueryResult> {
    return this.makeRequest(`/dashboard/stats/${userId}`, {
      params: { role },
    });
  }

  /**
   * Get recent activity
   */
  async getRecentActivity(userId: string, limit: number = 10): Promise<QueryResult> {
    return this.makeRequest(`/dashboard/activity/${userId}`, {
      params: { limit },
    });
  }

  // =============================================================================
  // SEARCH & FILTER
  // =============================================================================

  /**
   * Search doctors
   */
  async searchDoctors(query: string, params: PaginationParams = {}): Promise<QueryResult> {
    return this.makeRequest('/search/doctors', {
      params: { q: query, ...params },
    });
  }

  /**
   * Search patients
   */
  async searchPatients(query: string, params: PaginationParams = {}): Promise<QueryResult> {
    return this.makeRequest('/search/patients', {
      params: { q: query, ...params },
    });
  }

  /**
   * Search appointments
   */
  async searchAppointments(query: string, params: PaginationParams = {}): Promise<QueryResult> {
    return this.makeRequest('/search/appointments', {
      params: { q: query, ...params },
    });
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService; 