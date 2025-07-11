import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import BookAppointmentView from 'src/sections/appointments/book-appointment-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Book Appointment | Amin Diagnostics & Medical Services',
};

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BookAppointmentView />
    </Suspense>
  );
} 