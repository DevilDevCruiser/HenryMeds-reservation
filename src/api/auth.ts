import { User } from '../types/user';

const users: User[] = [
  { id: 1, username: 'Client Ryan', password: '123456', role: 'client' },
  { id: 2, username: 'Ryan Maison', password: '123456', role: 'provider' },
  { id: 3, username: 'Dick Cruise', password: '123456', role: 'provider' },
  { id: 4, username: 'Ryan Clone', password: '123456', role: 'client' },
];

export function authenticate(
  username: string,
  password: string,
  isProvider: boolean
): Promise<User | null> {
  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password &&
      (isProvider ? u.role === 'provider' : u.role === 'client')
  );
  return Promise.resolve(user ? user : null);
}

export function getUserById(id: number): User | null {
  const user = users.find((u) => u.id === id);
  return user ? user : null;
}

export function getUsersByRole(role: string): User[] {
  return users.filter((u) => u.role === role);
}
