'use client';

import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  phone: string;
};

export default function ModernForgotPasswordView() {
  const { forgotPassword } = useAuthContext();
  const router = useRouter();
  const ResetPasswordSchema = Yup.object().shape({
    phone: Yup.string().required('Phone Number is Required').matches(/^\+8801[3-9]\d{8}$/,'Number must be a valid Bangladeshi Phone Number'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await forgotPassword?.(data.phone);

        const searchParams = new URLSearchParams({ phone: data.phone }).toString();

        const href = `${paths.authDemo.modern.newPassword}?${searchParams}`;
        router.push(href);
      } catch (error) {
        console.error(error);
      }
    },
    [forgotPassword, router]
  );

  const renderForm = (
    <Stack spacing={3} alignItems="center">
            <RHFTextField 
        name="phone" 
        label="Phone Number"
        placeholder="+8801XXXXXXXXX"
        type="tel" 
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        Send Request
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.authDemo.modern.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Forgot your password?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the Phone Number associated with your account and We will send you an OTP Code
          to reset your password.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
