import { db } from '@/firebase/config';
import { User } from '@/types/types';
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { timestampToUTCDateString } from '../helpers/dateHelpers';

const fetchUserDetailsByUsername = async (username: string) => {
  try {
    const userQuery = query(
      collection(db, 'users'),
      where('username', '==', username),
    );
    const querySnapshot = await getDocs(userQuery);

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

    return users[0];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch user data');
    }
  }
};

export default fetchUserDetailsByUsername;
