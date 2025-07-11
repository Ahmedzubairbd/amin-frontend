import { Suspense } from 'react';

import { LoadingScreen } from 'src/components/loading-screen';

import LoginView from 'src/sections/auth/login-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login | Amin Diagnostics & Medical Services',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LoginView />
    </Suspense>
  );
} 