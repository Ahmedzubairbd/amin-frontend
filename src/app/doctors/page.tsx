import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import DoctorsView from 'src/sections/doctors/doctors-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Our Doctors | Amin Diagnostics & Medical Services',
};

export default function DoctorsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DoctorsView />
    </Suspense>
  );
} 