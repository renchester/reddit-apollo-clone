import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result ? true : null;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`ERROR ${errorCode}: ${errorMessage}`);

      throw new Error(`Failed with error code: ${error.code}`);
    }
  }
};

export default loginWithEmail;
