import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import DashboardView from 'src/sections/dashboard/dashboard-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard | Amin Diagnostics & Medical Services',
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardView />
    </Suspense>
  );
}
