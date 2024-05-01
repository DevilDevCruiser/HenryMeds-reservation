import React, { createContext, useState } from 'react';
import { useAuthenticationApi } from '../hooks/auth';
import { User } from '../types/user';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (userId: string, password: string, isProvider: boolean) => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(null),
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authenticate = useAuthenticationApi();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (userId: string, password: string, isProvider: boolean) => {
    const user = await authenticate(userId, password, isProvider);
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
    return user;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};