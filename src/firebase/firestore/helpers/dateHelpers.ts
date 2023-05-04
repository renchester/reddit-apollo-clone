import { Timestamp } from 'firebase/firestore';

export const timestampToUTCDateString = (timestamp: Timestamp) => {
  return timestamp.toDate().toUTCString();
};
