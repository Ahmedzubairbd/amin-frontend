import { User } from 'src/types/medical';

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
};

export type AuthContextType = AuthState & {
  method: 'jwt';
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: (accessToken: string) => Promise<User>;
  loginWithGithub: (accessToken: string) => Promise<User>;
  loginWithPhone: (phone: string, otp: string) => Promise<User>;
  sendOTP: (phone: string) => Promise<any>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<User>;
  logout: () => void;
  checkAuthenticated: () => boolean;
}; 