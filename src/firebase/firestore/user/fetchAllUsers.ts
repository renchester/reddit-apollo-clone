import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { timestampToUTCDateString } from '../helpers/dateHelpers';

const fetchAllUsers = async () => {
  try {
    const userRef = collection(db, 'users');
    const querySnapshot = await getDocs(userRef);
    let users: User[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as User;
      const convertedUserData = Object.assign(userData, {
        date_created: timestampToUTCDateString(
          userData.date_created as Timestamp,
        ),
      });

      users = [...users, convertedUserData];
    });

    return users;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      // throw new Error('Unable to fetch users');
      throw new Error(error.message);
    }
  }
};

export default fetchAllUsers;
