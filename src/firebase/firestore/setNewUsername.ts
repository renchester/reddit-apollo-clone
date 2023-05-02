import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config';

const setNewUsername = async (userId: string, username: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      await setDoc(userRef, {
        username: username,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default setNewUsername;
