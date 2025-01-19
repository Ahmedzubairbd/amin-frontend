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
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCode, RHFTextField } from 'src/components/hook-form';
import { useSearchParams } from 'src/routes/hook';
import { useRouter } from 'src/routes/hook';
import { useAuthContext } from 'src/auth/hooks';
import { useCountdownSeconds } from 'src/hooks/use-countdown';
// assets


// ----------------------------------------------------------------------

type FormValuesProps = {
  code: string;
  phone: string;
};

export default function ModernVerifyView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const phone = searchParams.get('phone');

  const { confirmRegister, resendCodeRegister } = useAuthContext();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);
  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    phone: Yup.string().required('Phone Number is Required').matches(/^\+8801[3-9]\d{8}$/,'Number must be a valid Phone Number'),
  });

  const defaultValues = {
    code: '',
    phone: phone || '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await confirmRegister?.(data.phone, data.code);
        router.push(paths.authDemo.modern.login);
      } catch (error) {
        console.error(error);
      }
    },
    [confirmRegister, router]
  );
  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await resendCodeRegister?.(values.phone);
    } catch (error) {
      console.error(error);
    }
  }, [resendCodeRegister, startCountdown, values.phone]);

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
         name="phone" 
         label="Phone Number"
         placeholder="+8801XXXXXXXXX"
         type="tel" 
        InputLabelProps={{ shrink: true }}
      />

      <RHFCode name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          onClick={handleResendCode}
          sx={{
            cursor: 'pointer',
            ...(counting && {
              color: 'text.disabled',
              pointerEvents: 'none',
            }),
          }}
        >
          Resend code {counting && `(${countdown}s)`}
        </Link>
      </Typography>

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
     <Iconify icon="mdi:message-text" width={96} height={96} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Please check your phone</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We have sent a 6-digit confirmation code to your number, please enter the code in below
          box to verify your Number.
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
