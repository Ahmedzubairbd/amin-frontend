import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import HomeView from 'src/sections/home/view/home-view';
import HomeHero from 'src/sections/home/home-hero';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Amin Diagnostics & Medical Services - Home',
};

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeView />
      <HomeHero />
    </Suspense>
  );
}
