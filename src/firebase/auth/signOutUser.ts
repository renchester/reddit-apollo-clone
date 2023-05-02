import { auth } from '../config';
import { signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`ERROR ${errorCode}: ${errorMessage}`);
    }
  }
};

export default signOutUser;
