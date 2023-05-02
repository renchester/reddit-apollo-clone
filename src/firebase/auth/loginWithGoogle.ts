import { auth } from '../config';
import {
  GoogleAuthProvider,
  UserCredential,
  getAdditionalUserInfo,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import getUserDetailsFromDb from '../firestore/getUserDetailsFromDb';
import setNewUsername from '../firestore/setNewUsername';
import getRandomUsername from '@/utils/getRandomUsername';
import checkUsernameAvailability from './checkUsernameAvailability';
import addUserToDb from '../firestore/addUserToDb';

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  let result: UserCredential | null = null;

  try {
    result = await signInWithPopup(auth, provider);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`ERROR ${errorCode}: ${errorMessage}`);

      throw new Error(`Failed with error code: ${errorCode}`);
    }
  }

  try {
    if (!result) return;

    const user = result.user;
    const currentUserId = user.uid;

    // Check if user is signing in for the first time
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

    if (!isNewUser) {
      // Check if user has username in db
      const userInDb = await getUserDetailsFromDb(currentUserId);

      if (!userInDb)
        throw new Error(
          'This account has been terminated. Contact support for details.',
        );

      if (!userInDb?.username) {
        // If user does not have username, set new one
        const newUsername = getRandomUsername();
        const isNewUsernameAvailable = await checkUsernameAvailability(
          newUsername,
        );

        if (isNewUsernameAvailable) {
          await setNewUsername(currentUserId, newUsername);
        } else throw new Error('Trouble getting username');
      }

      return user;
    } else if (isNewUser) {
      // Create new username for account

      const newUsername = getRandomUsername();
      const isUsernameAvailable = await checkUsernameAvailability(newUsername);

      if (!isUsernameAvailable) throw new Error('Username already taken');

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
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw Error(error.message);
    }
  }
};

export default loginWithGoogle;
