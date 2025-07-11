'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function DoctorsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      experience: '15 years',
      education: 'MD, Harvard Medical School',
      image: '/assets/images/doctors/doctor-1.jpg',
      rating: 4.8,
      patients: 1200,
      availability: 'Mon-Fri',
      description: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    },
    {
      id: 2,
      name: 'Dr. Michael Brown',
      specialty: 'Neurology',
      experience: '12 years',
      education: 'MD, Johns Hopkins University',
      image: '/assets/images/doctors/doctor-2.jpg',
      rating: 4.9,
      patients: 980,
      availability: 'Mon-Sat',
      description: 'Neurologist with expertise in stroke treatment and neurological disorders.',
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      experience: '10 years',
      education: 'MD, Stanford University',
      image: '/assets/images/doctors/doctor-3.jpg',
      rating: 4.7,
      patients: 1500,
      availability: 'Mon-Fri',
      description: 'Pediatrician dedicated to providing comprehensive care for children.',
    },
    {
      id: 4,
      name: 'Dr. Robert Wilson',
      specialty: 'Orthopedics',
      experience: '18 years',
      education: 'MD, Mayo Clinic',
      image: '/assets/images/doctors/doctor-4.jpg',
      rating: 4.6,
      patients: 1100,
      availability: 'Mon-Sat',
      description: 'Orthopedic surgeon specializing in joint replacement and sports injuries.',
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      experience: '8 years',
      education: 'MD, Yale University',
      image: '/assets/images/doctors/doctor-5.jpg',
      rating: 4.8,
      patients: 800,
      availability: 'Mon-Fri',
      description: 'Dermatologist with expertise in skin cancer detection and treatment.',
    },
    {
      id: 6,
      name: 'Dr. James Martinez',
      specialty: 'Oncology',
      experience: '20 years',
      education: 'MD, MD Anderson Cancer Center',
      image: '/assets/images/doctors/doctor-6.jpg',
      rating: 4.9,
      patients: 750,
      availability: 'Mon-Fri',
      description: 'Oncologist specializing in cancer treatment and research.',
    },
  ];

  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Oncology'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <Container>
      <Box sx={{ py: 10 }}>
        <Stack spacing={4} textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Our Expert Doctors
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
            Meet our team of experienced and qualified medical professionals who are dedicated 
            to providing the best healthcare services to our patients.
          </Typography>
        </Stack>

        <Stack spacing={4} sx={{ mb: 6 }}>
          <TextField
            fullWidth
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-bold" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400, mx: 'auto' }}
          />

          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {specialties.map((specialty) => (
              <Chip
                key={specialty}
                label={specialty === 'all' ? 'All Specialties' : specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                color={selectedSpecialty === specialty ? 'primary' : 'default'}
                variant={selectedSpecialty === specialty ? 'filled' : 'outlined'}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          {filteredDoctors.map((doctor) => (
            <Grid key={doctor.id} item xs={12} sm={6} md={4}>
              <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={3} sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Doctor Image
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    <Typography variant="h6" gutterBottom>
                      {doctor.name}
                    </Typography>
                    
                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                      {doctor.specialty}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {doctor.description}
                    </Typography>

                    <Stack spacing={1}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Experience: {doctor.experience}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Education: {doctor.education}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Availability: {doctor.availability}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify icon="solar:star-bold" sx={{ color: 'warning.main', fontSize: 16 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {doctor.rating}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        ({doctor.patients} patients)
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Iconify icon="solar:calendar-date-bold" />}
                    sx={{ mt: 'auto' }}
                  >
                    Book Appointment
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredDoctors.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No doctors found matching your criteria
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('all');
              }}
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
} 