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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const appointmentSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  doctor: yup.string().required('Please select a doctor'),
  service: yup.string().required('Please select a service'),
  appointmentDate: yup.string().required('Appointment date is required'),
  appointmentTime: yup.string().required('Appointment time is required'),
  reason: yup.string().required('Please provide a reason for the appointment'),
});

type AppointmentFormData = {
  patientName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  doctor: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
};

export default function BookAppointmentView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const appointmentForm = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      patientName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      doctor: '',
      service: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
    },
  });

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Brown', specialty: 'Neurology' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Robert Wilson', specialty: 'Orthopedics' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatology' },
    { id: 6, name: 'Dr. James Martinez', specialty: 'Oncology' },
  ];

  const services = [
    'General Consultation',
    'Blood Tests',
    'X-Ray Imaging',
    'Ultrasound',
    'ECG/EKG',
    'MRI Scans',
    'CT Scans',
    'Laboratory Tests',
    'Health Checkup',
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  ];

  const handleSubmit = async (data: AppointmentFormData) => {
    try {
      setLoading(true);
      // Here you would typically send the appointment data to your backend
      console.log('Appointment form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      appointmentForm.reset();
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ py: 10 }}>
        <Stack spacing={4} textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Book an Appointment
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
            Schedule your appointment with our expert doctors. Fill out the form below and we'll 
            get back to you to confirm your appointment.
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Appointment Details
              </Typography>
              
              <Box component="form" onSubmit={appointmentForm.handleSubmit(handleSubmit)}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Patient Name"
                        {...appointmentForm.register('patientName')}
                        error={!!appointmentForm.formState.errors.patientName}
                        helperText={appointmentForm.formState.errors.patientName?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        {...appointmentForm.register('email')}
                        error={!!appointmentForm.formState.errors.email}
                        helperText={appointmentForm.formState.errors.email?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        {...appointmentForm.register('phone')}
                        error={!!appointmentForm.formState.errors.phone}
                        helperText={appointmentForm.formState.errors.phone?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        {...appointmentForm.register('dateOfBirth')}
                        error={!!appointmentForm.formState.errors.dateOfBirth}
                        helperText={appointmentForm.formState.errors.dateOfBirth?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!appointmentForm.formState.errors.doctor}>
                        <InputLabel>Select Doctor</InputLabel>
                        <Select
                          {...appointmentForm.register('doctor')}
                          label="Select Doctor"
                        >
                          {doctors.map((doctor) => (
                            <MenuItem key={doctor.id} value={doctor.name}>
                              {doctor.name} - {doctor.specialty}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!appointmentForm.formState.errors.service}>
                        <InputLabel>Select Service</InputLabel>
                        <Select
                          {...appointmentForm.register('service')}
                          label="Select Service"
                        >
                          {services.map((service) => (
                            <MenuItem key={service} value={service}>
                              {service}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Appointment Date"
                        type="date"
                        {...appointmentForm.register('appointmentDate')}
                        error={!!appointmentForm.formState.errors.appointmentDate}
                        helperText={appointmentForm.formState.errors.appointmentDate?.message}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!appointmentForm.formState.errors.appointmentTime}>
                        <InputLabel>Appointment Time</InputLabel>
                        <Select
                          {...appointmentForm.register('appointmentTime')}
                          label="Appointment Time"
                        >
                          {timeSlots.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Reason for Appointment"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                    {...appointmentForm.register('reason')}
                    error={!!appointmentForm.formState.errors.reason}
                    helperText={appointmentForm.formState.errors.reason?.message}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<Iconify icon="solar:calendar-date-bold" />}
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </Button>

                  {success && (
                    <Typography variant="body2" sx={{ color: 'success.main', textAlign: 'center' }}>
                      Thank you! Your appointment has been booked successfully. We'll contact you shortly to confirm.
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={4}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Appointment Information
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">
                      Duration: 30-60 minutes
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:calendar-date-bold" sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">
                      Available: Mon-Sat
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:clock-bold" sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">
                      Hours: 8:00 AM - 8:00 PM
                    </Typography>
                  </Stack>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  What to Bring
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">• Valid ID</Typography>
                  <Typography variant="body2">• Insurance card (if applicable)</Typography>
                  <Typography variant="body2">• Previous medical records</Typography>
                  <Typography variant="body2">• List of current medications</Typography>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Contact us for assistance with booking or any questions.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold" />}
                  fullWidth
                >
                  Call Us
                </Button>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 