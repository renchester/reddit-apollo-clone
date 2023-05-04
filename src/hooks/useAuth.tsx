import { auth, db } from '@/firebase/config';
import getUserDetailsFromDb from '@/firebase/firestore/user/getUserDetailsFromDb';
import { onAuthStateChanged } from 'firebase/auth';
import type { UserSubscription } from '@/types/types';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '@/types/types';
import { collection, onSnapshot } from 'firebase/firestore';

type AuthContextType = {
  user: User | null;
  subscriptions: UserSubscription[] | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[] | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDetails = await getUserDetailsFromDb(firebaseUser.uid);

        if (userDetails) {
          // Set user to stored user details from Firestore
          setUser(userDetails);
        } else {
          console.error('ERROR: Unable to set user details');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setSubscriptions(null);
      return;
    }

    const subscriptionsRef = collection(
      db,
      `users/${user.user_id}/subscribed_subreddits`,
    );

    const unsubscribeSubscriptions = onSnapshot(subscriptionsRef, (snapshot) =>
      setSubscriptions(
        snapshot.docs.map((doc) => doc.data() as UserSubscription),
      ),
    );

    return () => unsubscribeSubscriptions();
  }, [user]);

  const value = useMemo(() => ({ user, subscriptions }), [user, subscriptions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};
