import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../config';

const checkUsernameAvailability = async (username: string) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  const usernames: any = [];

  querySnapshot.forEach((doc) => {
    if (doc.data()) usernames.push(doc.data());
  });
  console.log(usernames);

  return !(usernames.length > 1);
};

export default checkUsernameAvailability;
