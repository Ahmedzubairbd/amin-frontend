import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import ServicesView from 'src/sections/services/view/services-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Services | Amin Diagnostics & Medical Services',
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ServicesView />
    </Suspense>
  );
} 