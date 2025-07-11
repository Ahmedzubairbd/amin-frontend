import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: 'solar:users-group-rounded-bold',
      color: 'primary.main',
    },
    {
      title: 'Total Doctors',
      value: '45',
      icon: 'solar:user-id-bold',
      color: 'info.main',
    },
    {
      title: 'Today Appointments',
      value: '23',
      icon: 'solar:calendar-date-bold',
      color: 'warning.main',
    },
    {
      title: 'Pending Reports',
      value: '12',
      icon: 'solar:file-text-bold',
      color: 'error.main',
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid key={stat.title} item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stat.title}
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <Iconify icon={stat.icon} width={24} />
                </Box>
              </Stack>

              <Typography variant="h4">{stat.value}</Typography>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 