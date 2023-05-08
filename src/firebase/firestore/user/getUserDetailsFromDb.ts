import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { timestampToUTCDateString } from '../helpers/dateHelpers';

const getUserDetailsFromDb = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data() as User;
    const convertedUserData = Object.assign(userData, {
      date_created: timestampToUTCDateString(
        userData.date_created as Timestamp,
      ),
    });

    return convertedUserData;
  } else return null;
};

export default getUserDetailsFromDb;
