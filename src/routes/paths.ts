// Amin Diagnostics & Medical Services Routes

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API || '';

export const PATH_AFTER_LOGIN = '/dashboard'; // as '/dashboard/app'

export const PATH_APP = {
  root: '/',
  dashboard: {
    root: '/dashboard',
    analytics: '/dashboard/analytics',
    patients: '/dashboard/patients',
    doctors: '/dashboard/doctors',
    appointments: '/dashboard/appointments',
    testReports: '/dashboard/test-reports',
    medicalTests: '/dashboard/medical-tests',
    departments: '/dashboard/departments',
    payments: '/dashboard/payments',
    notifications: '/dashboard/notifications',
    settings: '/dashboard/settings',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  public: {
    home: '/',
    about: '/about-us',
    services: '/services',
    doctors: '/doctors',
    contact: '/contact-us',
    faqs: '/faqs',
    bookAppointment: '/book-appointment',
    findDoctor: '/find-doctor',
  },
  patient: {
    profile: '/patient/profile',
    appointments: '/patient/appointments',
    testReports: '/patient/test-reports',
    medicalHistory: '/patient/medical-history',
    payments: '/patient/payments',
  },
  doctor: {
    profile: '/doctor/profile',
    appointments: '/doctor/appointments',
    patients: '/doctor/patients',
    schedule: '/doctor/schedule',
  },
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    doctors: '/admin/doctors',
    patients: '/admin/patients',
    appointments: '/admin/appointments',
    testReports: '/admin/test-reports',
    medicalTests: '/admin/medical-tests',
    departments: '/admin/departments',
    payments: '/admin/payments',
    settings: '/admin/settings',
  },
} as const;

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';

export const PATH_GITHUB = 'https://github.com/your-org/amin-diagnostics';

export const paths = {
  // Public
  about: PATH_APP.public.about,
  contact: PATH_APP.public.contact,
  faqs: PATH_APP.public.faqs,
  services: PATH_APP.public.services,
  finddoctor: PATH_APP.public.findDoctor,
  bookAppointment: PATH_APP.public.bookAppointment,
  // Dashboard
  dashboard: PATH_APP.dashboard,
  // Auth
  auth: {
    ...PATH_APP.auth,
    jwt: {
      login: PATH_APP.auth.login,
      register: PATH_APP.auth.register,
    },
  },
  // Legacy/other
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://amindiagnostics.net/doc',
};
