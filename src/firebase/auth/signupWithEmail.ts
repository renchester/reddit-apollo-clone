import { FirebaseError } from 'firebase/app';
import { auth } from '../config';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
} from 'firebase/auth';
import checkUsernameAvailability from './checkUsernameAvailability';
import addUserToDb from '../firestore/addUserToDb';
import checkEmailAvailability from './checkEmailAvailability';
import signOutUser from './signOutUser';

const createAccountWithEmail = async (
  email: string,
  username: string,
  password: string,
) => {
  let result: UserCredential | null = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
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
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
    const isEmailAvailable = await checkEmailAvailability(email);

    if (!isEmailAvailable || !isNewUser) {
      signOutUser();
      throw new Error('Email already in use. Try logging in instead');
    }

    const isUsernameAvailable = await checkUsernameAvailability(username);

    if (!isUsernameAvailable)
      throw new Error('Username already taken. Try using another one.');

    const newUser = {
      date_created: user.metadata.creationTime || new Date().toUTCString(),
      username: username,
      email: email,
      user_id: user.uid,
      provider: 'email',
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

export default createAccountWithEmail;
