'use client';

import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
// next
import { useRouter } from 'next/navigation';
// @types
import { User } from 'src/types/medical';
// utils
import axios from 'src/utils/axios';
//
import { JWTContextType } from 'src/auth/types';
import { AuthContextType, ActionMap, AuthState } from './types';


// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: User | null;
  };
  [Types.LOGIN]: {
    user: User;
  };
  [Types.REGISTER]: {
    user: User;
  };
  [Types.LOGOUT]: undefined;
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const initialState: AuthState = {
  user: null,
  loading: true,
  authenticated: false,
  unauthenticated: true,
};

const reducer = (state: AuthState, action: Actions) => {
  if (action.type === Types.INITIAL) {
    return {
      user: action.payload.user,
      loading: false,
      authenticated: !!action.payload.user,
      unauthenticated: !action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
      authenticated: true,
      unauthenticated: false,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
      authenticated: true,
      unauthenticated: false,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
      authenticated: false,
      unauthenticated: true,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');

  return context;
};

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const response = await axios.get('/user/profile');

        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      return user;
    },
    []
  );

  // GOOGLE LOGIN
  const loginWithGoogle = useCallback(
    async (accessToken: string) => {
      const response = await axios.post('/auth/google', {
        accessToken,
      });

      const { token, user } = response.data;

      localStorage.setItem('accessToken', token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      return user;
    },
    []
  );

  // GITHUB LOGIN
  const loginWithGithub = useCallback(
    async (accessToken: string) => {
      const response = await axios.post('/auth/github', {
        accessToken,
      });

      const { token, user } = response.data;

      localStorage.setItem('accessToken', token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      return user;
    },
    []
  );

  // PHONE OTP LOGIN (for patients)
  const loginWithPhone = useCallback(
    async (phone: string, otp: string) => {
      const response = await axios.post('/auth/verify-otp', {
        phone,
        otp,
      });

      const { token, user } = response.data;

      localStorage.setItem('accessToken', token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });

      return user;
    },
    []
  );

  // SEND OTP
  const sendOTP = useCallback(async (phone: string) => {
    const response = await axios.post('/auth/send-otp', {
      phone,
    });

    return response.data;
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axios.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
      });

      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });

      return user;
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
    dispatch({
      type: Types.LOGOUT,
    });
    push('/auth/login');
  }, [push]);

  const checkAuthenticated = useCallback(() => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return !!accessToken;
  }, []);

  const contextValue = {
    ...state,
    method: 'jwt' as const,
    login,
    loginWithGoogle,
    loginWithGithub,
    loginWithPhone,
    sendOTP,
    register,
    logout,
    checkAuthenticated,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
