'use client';

import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

// import HomeHero from '../home-hero';
import HomeAmin from '../home-amin';
// import HomeAdvertisement from '../home-advertisement';
import HomeCleanInterfaces from '../home-clean-interfaces';
import HomeHugePackElements from '../home-hugepack-elements';
import HomeForDesigner from '../home-for-designer';
import HomeDarkMode from '../home-dark-mode';

// ----------------------------------------------------------------------

export default function HomeView() {
  const theme = useTheme();

  const loading = useBoolean(true);

  return (
    <>
      {/* <HomeHero /> */}
      <HomeAmin />
     
      <HomeCleanInterfaces />
      <HomeHugePackElements />
      <HomeForDesigner />
      <HomeDarkMode />
    </>
  );
}
