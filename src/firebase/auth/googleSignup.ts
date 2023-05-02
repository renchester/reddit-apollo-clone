import { auth } from '../config';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  type User,
  UserCredential,
} from 'firebase/auth';
import addUserToDb from './addUserToDb';
import checkUsernameAvailability from './checkUsernameAvailability';
import signOutUser from './signOutUser';
import getRandomUsername from '@/utils/getRandomUsername';

const createAccountWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  let result: UserCredential | null = null;

  try {
    result = await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`ERROR ${errorCode}: ${errorMessage}`);

      throw new Error(`ERROR ${errorCode}: ${errorMessage}`);
    }
  }

  try {
    if (!result) return;
    // Check if user is signing in for the first time
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

    if (!isNewUser) {
      signOutUser();

      throw new Error(
        'This email address is already in use. Try logging in instead',
      );
    }

    // Signed-in user info
    const user: User = result.user;

    // Generate random username & check if available
    const newUsername = getRandomUsername();
    const isUsernameAvailable = await checkUsernameAvailability(newUsername);

    if (!isUsernameAvailable)
      throw new Error('Username already taken. Try using another one.');

    if (!user.email)
      throw new Error(
        'This Google account is not linked to an email. Try another method',
      );

    const newUser = {
      date_created: user.metadata.creationTime || new Date(),
      username: newUsername,
      email: user.email,
      user_id: user.uid,
      provider: 'google',
    };

    const isAdded = await addUserToDb(newUser);
    return isAdded;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw Error(error.message);
    }
  }
};

export default createAccountWithGoogle;
