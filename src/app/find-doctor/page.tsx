'use client';
// sections
import { DoctorSearch } from "src/app/components/doctors/doctor-search";
import { DoctorList } from "src/app/components/doctors/doctor-list";
import { useState } from "react";
import { Doctor } from "src/types/doctor";
import { doctors } from "src/assets/data/doctors";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Find A Doctor',
// };

export default function FindDoctor() {
  const settings = useSettingsContext();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Find Your Doctor </Typography>

        <Box
        sx={{
          m: 5,
          width:1,
          height:1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          p: 4,
          display:'grid',
        }}
      >
        <DoctorSearch onSearch={setFilteredDoctors} />
        <DoctorList doctors={filteredDoctors} />
      </Box>
 
    </Container>
  );
}
