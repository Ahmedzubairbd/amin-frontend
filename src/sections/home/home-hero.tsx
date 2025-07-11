"use client";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/context/jwt/auth-provider';

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();

  const handleBookAppointment = () => {
    if (user) {
      router.push('/dashboard/appointments');
    } else {
      router.push('/auth/login');
    }
  };

  const handleFindDoctor = () => {
    router.push('/doctors');
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.default',
        pt: { xs: 15, md: 20 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={5}>
              <Stack spacing={3}>
                <Typography variant="h1" sx={{ color: 'text.primary' }}>
                  Your Health,
                  <br />
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    Our Priority
                  </Box>
                </Typography>

                <Typography sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                  Welcome to Amin Diagnostics & Medical Services. We provide comprehensive healthcare
                  solutions with state-of-the-art technology and experienced medical professionals.
                  Your health and well-being are our top priorities.
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleBookAppointment}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  Book Appointment
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={handleFindDoctor}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  Find Doctor
                </Button>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    500+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Happy Patients
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    50+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Expert Doctors
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    10+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Years Experience
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/home/hero-image.jpg"
              alt="Medical Services"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.customShadows.z24,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
