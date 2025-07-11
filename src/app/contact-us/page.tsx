import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import ContactView from 'src/sections/contact/contact-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Contact Us | Amin Diagnostics & Medical Services',
};

export default function ContactPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ContactView />
    </Suspense>
  );
}
