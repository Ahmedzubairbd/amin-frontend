"use client";

import { useState, useEffect } from "react";
import { doctors } from "src/assets/data";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import Image from "src/components/image";
import Iconify from "src/components/iconify";
import { Container } from "@mui/material";

export default function DoctorsSection({ searchQuery }: { searchQuery: string }) {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Filter doctors based on search query
  useEffect(() => {
    setFilteredDoctors(
      doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.availability.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <Box sx={{ mt: 8 }}>
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid
            item
            xs={12}
            sm={6} // 2 cards per row on small screens
            md={4} // 3 cards per row on medium and larger screens
            key={doctor.name}
          >
            <MemberCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

type Doctor = {
  name: string;
  specialty: string;
  availability: string;
  image: string;
};

type MemberCardProps = {
  doctor: Doctor;
};

function MemberCard({ doctor }: MemberCardProps) {
  const { name, specialty, availability, image } = doctor;

  return (
    <Stack spacing={3}>
    <Card>
      <Stack alignItems="center" sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2.5, color: "text.secondary" }}>
          {specialty} - {availability}
        </Typography>
        <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 1 }}
      >
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              "&:hover": { bgcolor: alpha(social.color, 0.08) },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Card>
   </Stack>
  );
}

// Mock social data
const _socials = [
  { name: "Facebook", icon: "eva:facebook-fill", color: "#1877F2" },
  { name: "Twitter", icon: "eva:twitter-fill", color: "#1C9CEA" },
];
