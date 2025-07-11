import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import AboutView from 'src/sections/about/view/about-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'About Us | Amin Diagnostics & Medical Services',
};

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AboutView />
    </Suspense>
  );
}
