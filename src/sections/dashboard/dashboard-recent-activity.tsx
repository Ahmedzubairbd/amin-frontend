import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function DashboardRecentActivity() {
  const activities = [
    {
      id: 1,
      action: 'New appointment booked',
      user: 'John Doe',
      time: '2 hours ago',
      type: 'appointment',
    },
    {
      id: 2,
      action: 'Test report completed',
      user: 'Dr. Sarah Johnson',
      time: '4 hours ago',
      type: 'report',
    },
    {
      id: 3,
      action: 'Payment received',
      user: 'Jane Smith',
      time: '6 hours ago',
      type: 'payment',
    },
    {
      id: 4,
      action: 'New patient registered',
      user: 'Bob Wilson',
      time: '1 day ago',
      type: 'patient',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'solar:calendar-date-bold';
      case 'report':
        return 'solar:file-text-bold';
      case 'payment':
        return 'solar:dollar-minimalistic-bold';
      case 'patient':
        return 'solar:user-id-bold';
      default:
        return 'solar:bell-bold';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'primary.main';
      case 'report':
        return 'success.main';
      case 'payment':
        return 'warning.main';
      case 'patient':
        return 'info.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 3, pb: 1 }}
      >
        <Typography variant="h6">Recent Activity</Typography>
        <Button size="small" endIcon={<Iconify icon="solar:arrow-right-bold" />}>
          View All
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ p: 3, pt: 1 }}>
        {activities.map((activity) => (
          <Stack key={activity.id} direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: `${getActivityColor(activity.type)}20`,
                color: getActivityColor(activity.type),
              }}
            >
              <Iconify icon={getActivityIcon(activity.type)} width={16} />
            </Box>
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="body2">{activity.action}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {activity.user} • {activity.time}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
} 