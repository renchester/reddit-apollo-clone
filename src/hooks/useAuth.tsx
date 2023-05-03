import { auth } from '@/firebase/config';
import getUserDetailsFromDb from '@/firebase/firestore/getUserDetailsFromDb';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from '@/types/types';
import {
  type ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type AuthContextType = {
  user: User | null;
  userDispatch: React.Dispatch<Action>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type Action =
  | { type: 'set_user_details'; userDetails: User }
  | { type: 'auth_off' }
  | { type: 'upvote_comment'; payload: string }
  | { type: 'downvote_comment'; payload: string };

const AuthContext = createContext<AuthContextType | null>(null);

const userReducer = (state: User | null, action: Action) => {
  switch (action.type) {
    case 'set_user_details': {
      if (action.userDetails === null) {
        return state;
      } else if (state === null) {
        return { ...action.userDetails };
      } else return Object.assign(state, action.userDetails);
    }

    case 'auth_off': {
      return null;
    }

    case 'upvote_comment': {
      return state;
    }

    case 'downvote_comment': {
      return state;
    }

    default: {
      console.error(`Error: Unhandled action type`);
      return state;
    }
  }
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, userDispatch] = useReducer(userReducer, null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await getUserDetailsFromDb(user.uid);

        if (userDetails) {
          // Set user to stored user details from Firestore
          userDispatch({ type: 'set_user_details', userDetails });

          // Set user interactions
        } else throw new Error('Unable to set user details');
      } else {
        userDispatch({ type: 'auth_off' });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};
