'use client';

import { createContext } from 'react';
//
import { JWTContextType } from 'src/auth/types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as JWTContextType);
