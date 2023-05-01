import { auth } from '@/firebase/config';
import { type User, onAuthStateChanged } from 'firebase/auth';
import {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};
