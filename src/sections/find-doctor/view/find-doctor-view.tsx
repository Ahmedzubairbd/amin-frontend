'use client';

import { useState } from "react";
import DoctorsSection from "../doctors-section";
import FindDoctorHero from "../find-doctor-hero";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// ----------------------------------------------------------------------

export default function FindDoctorView() {
  const [searchQuery, setSearchQuery] = useState("");

  // Handler to update the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <FindDoctorHero onSearch={handleSearch} />
      <Container sx={{ my: 10 }}>

      <DoctorsSection searchQuery={searchQuery} />
    
      </Container>
    </>
  );
}
