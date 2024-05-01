import { useEffect, useState, useContext } from 'react';
import { User } from '../types/user';
import { authenticate, getUserById, getUsersByRole } from '../api/auth';
import { AuthContext } from '../contexts/auth';

export function useAuthenticationApi() {
  return authenticate;
}

export function useUserById(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUserById(id);
    setUser(user);
  }, [id]);

  return user;
}

export function useUsersByRole(role: string): User[] {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const users = getUsersByRole(role);
    setUsers(users);
  }, [role]);

  return users;
}

export function useAuthentication() {
  const authContext = useContext(AuthContext);
  return authContext;
}
