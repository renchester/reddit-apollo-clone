import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../config';

const checkEmailAvailability = async (email: string) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const emails: any = [];

  querySnapshot.forEach((doc) => {
    if (doc.data()) emails.push(doc.data());
  });

  // If matches are greater than 0, return false
  return !(emails.length > 0);
};

export default checkEmailAvailability;
