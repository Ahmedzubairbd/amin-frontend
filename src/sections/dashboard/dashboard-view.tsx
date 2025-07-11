'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/context/jwt/auth-provider';

import DashboardStats from './dashboard-stats';
import DashboardAppointments from './dashboard-appointments';
import DashboardRecentActivity from './dashboard-recent-activity';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const router = useRouter();
  const { user, authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/auth/login');
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ py: 5 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!authenticated || !user) {
    return null;
  }

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Admin Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <DashboardStats />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardRecentActivity />
            </Grid>
            <Grid item xs={12}>
              <DashboardAppointments />
            </Grid>
          </Grid>
        );

      case 'doctor':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Doctor Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <DashboardStats />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardRecentActivity />
            </Grid>
            <Grid item xs={12}>
              <DashboardAppointments />
            </Grid>
          </Grid>
        );

      case 'patient':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Patient Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <DashboardStats />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardRecentActivity />
            </Grid>
            <Grid item xs={12}>
              <DashboardAppointments />
            </Grid>
          </Grid>
        );

      default:
        return (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Welcome to Amin Diagnostics
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Your role is not configured. Please contact the administrator.
            </Typography>
          </Card>
        );
    }
  };

  return (
    <Container>
      <Box sx={{ py: 5 }}>
        {renderDashboardContent()}
      </Box>
    </Container>
  );
} 