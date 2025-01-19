'use client';

// @mui

import Container from '@mui/material/Container';
// _mock
import { _mapContact } from 'src/_mock';
//
import { DoctorsSection } from '../doctors-section';
import { SearchSection } from '../search-section';
// import ContactHero from '../contact-hero';
// import ContactForm from '../contact-form';

// ----------------------------------------------------------------------

export default function FindDoctorView() {
  return (
    <>
    <Container />
      <SearchSection />
          <DoctorsSection />

          
      
    </>
  );
}
