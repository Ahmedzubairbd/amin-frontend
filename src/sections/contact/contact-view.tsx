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
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactForm = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true);
      // Here you would typically send the form data to your backend
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      contactForm.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      title: 'Address',
      content: '123 Medical Center Drive, Healthcare City, HC 12345',
      icon: 'solar:map-point-bold',
    },
    {
      title: 'Phone',
      content: '+1 (555) 123-4567',
      icon: 'solar:phone-bold',
    },
    {
      title: 'Email',
      content: 'info@amindiagnostics.com',
      icon: 'solar:letter-bold',
    },
    {
      title: 'Working Hours',
      content: 'Monday - Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 6:00 PM',
      icon: 'solar:clock-circle-bold',
    },
  ];

  return (
    <Container>
      <Box sx={{ py: 10 }}>
        <Stack spacing={4} textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h2" gutterBottom>
            Contact Us
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
            Get in touch with us for any questions, appointments, or concerns. 
            Our team is here to help you with all your healthcare needs.
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Send us a Message
              </Typography>
              
              <Box component="form" onSubmit={contactForm.handleSubmit(handleSubmit)}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        {...contactForm.register('name')}
                        error={!!contactForm.formState.errors.name}
                        helperText={contactForm.formState.errors.name?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        {...contactForm.register('email')}
                        error={!!contactForm.formState.errors.email}
                        helperText={contactForm.formState.errors.email?.message}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Phone"
                    {...contactForm.register('phone')}
                    error={!!contactForm.formState.errors.phone}
                    helperText={contactForm.formState.errors.phone?.message}
                  />

                  <TextField
                    fullWidth
                    label="Subject"
                    {...contactForm.register('subject')}
                    error={!!contactForm.formState.errors.subject}
                    helperText={contactForm.formState.errors.subject?.message}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    {...contactForm.register('message')}
                    error={!!contactForm.formState.errors.message}
                    helperText={contactForm.formState.errors.message?.message}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<Iconify icon="solar:send-bold" />}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>

                  {success && (
                    <Typography variant="body2" sx={{ color: 'success.main', textAlign: 'center' }}>
                      Thank you! Your message has been sent successfully.
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              {contactInfo.map((info) => (
                <Card key={info.title} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.main',
                        color: 'white',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={info.icon} width={24} />
                    </Box>
                    
                    <Stack spacing={1}>
                      <Typography variant="h6">{info.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                        {info.content}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Find Us
          </Typography>
          
          <Box
            sx={{
              width: '100%',
              height: 400,
              bgcolor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Map will be integrated here
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 