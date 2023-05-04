import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { User } from '@/types/types';

const getUserDetailsFromDb = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data() as User;
    return userData;
  } else return null;
};

export default getUserDetailsFromDb;
