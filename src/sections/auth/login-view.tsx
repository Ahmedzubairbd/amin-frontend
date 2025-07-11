'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/context/jwt/auth-provider';

// ----------------------------------------------------------------------

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const phoneSchema = yup.object().shape({
  phone: yup.string().required('Phone number is required'),
  otp: yup.string().required('OTP is required'),
});

type LoginFormData = {
  email: string;
  password: string;
};

type PhoneFormData = {
  phone: string;
  otp: string;
};

export default function LoginView() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithGithub, loginWithPhone, sendOTP } = useAuthContext();
  
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const showPassword = useBoolean(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const phoneForm = useForm<PhoneFormData>({
    resolver: yupResolver(phoneSchema),
    defaultValues: {
      phone: '',
      otp: '',
    },
  });

  const handleEmailLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError('');
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (data: PhoneFormData) => {
    try {
      setLoading(true);
      setError('');
      await loginWithPhone(data.phone, data.otp);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    const phone = phoneForm.getValues('phone');
    if (!phone) {
      setError('Please enter your phone number first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await sendOTP(phone);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      // This would typically open a popup or redirect to Google OAuth
      // For now, we'll simulate it
      setError('Google login not implemented yet');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      setError('');
      // This would typically open a popup or redirect to GitHub OAuth
      // For now, we'll simulate it
      setError('GitHub login not implemented yet');
    } catch (err: any) {
      setError(err.message || 'GitHub login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
        }}
      >
        <Card sx={{ p: 5, width: 1 }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4" textAlign="center">
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign="center">
                Sign in to your account
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant={authMethod === 'email' ? 'contained' : 'outlined'}
                onClick={() => setAuthMethod('email')}
              >
                Email Login
              </Button>
              <Button
                fullWidth
                variant={authMethod === 'phone' ? 'contained' : 'outlined'}
                onClick={() => setAuthMethod('phone')}
              >
                Phone OTP
              </Button>
            </Stack>

            {authMethod === 'email' ? (
              <Box>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    {...loginForm.register('email')}
                    error={!!loginForm.formState.errors.email}
                    helperText={loginForm.formState.errors.email?.message}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...loginForm.register('password')}
                    error={!!loginForm.formState.errors.password}
                    helperText={loginForm.formState.errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={showPassword.onToggle} edge="end">
                            <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={loading}
                    onClick={loginForm.handleSubmit(handleEmailLogin)}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...phoneForm.register('phone')}
                    error={!!phoneForm.formState.errors.phone}
                    helperText={phoneForm.formState.errors.phone?.message}
                  />

                  {otpSent && (
                    <TextField
                      fullWidth
                      label="OTP"
                      {...phoneForm.register('otp')}
                      error={!!phoneForm.formState.errors.otp}
                      helperText={phoneForm.formState.errors.otp?.message}
                    />
                  )}

                  {!otpSent ? (
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleSendOTP}
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={loading}
                      onClick={phoneForm.handleSubmit(handlePhoneLogin)}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  )}
                </Stack>
              </Box>
            )}

            <Divider>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="logos:google-icon" />}
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                Continue with Google
              </Button>

              <Button
                fullWidth
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="logos:github-icon" />}
                onClick={handleGithubLogin}
                disabled={loading}
              >
                Continue with GitHub
              </Button>
            </Stack>

            <Stack direction="row" spacing={0.5} justifyContent="center">
              <Typography variant="body2">Don't have an account?</Typography>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', cursor: 'pointer' }}
                onClick={() => router.push('/auth/register')}
              >
                Sign up
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
} 