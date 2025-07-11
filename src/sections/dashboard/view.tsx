import { useDashboardStats, useRecentAppointments, useRecentTestReports } from '../../hooks/use-medical-api';

import DashboardView from './dashboard-view';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return <DashboardView />;
} 