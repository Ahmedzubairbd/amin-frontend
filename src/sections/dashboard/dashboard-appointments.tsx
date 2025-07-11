import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function DashboardAppointments() {
  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Michael Brown',
      date: '2024-01-15',
      time: '11:30 AM',
      status: 'Pending',
    },
    {
      id: 3,
      patientName: 'Bob Wilson',
      doctorName: 'Dr. Emily Davis',
      date: '2024-01-15',
      time: '02:00 PM',
      status: 'Confirmed',
    },
  ];

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 3, pb: 1 }}
      >
        <Typography variant="h6">Recent Appointments</Typography>
        <Button size="small" endIcon={<Iconify icon="solar:arrow-right-bold" />}>
          View All
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 1 }}>
        {appointments.map((appointment) => (
          <Stack key={appointment.id} spacing={1}>
            <Typography variant="subtitle2">{appointment.patientName}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {appointment.doctorName} • {appointment.date} • {appointment.time}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: appointment.status === 'Confirmed' ? 'success.main' : 'warning.main',
                fontWeight: 600,
              }}
            >
              {appointment.status}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
} 