import { auth } from '../config';
import { signOut } from 'firebase/auth';

const signOutUser = () => {
  signOut(auth);
};

export default signOutUser;
