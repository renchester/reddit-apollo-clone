import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config';

const checkSubredditAvailability = async (subreddit: string) => {
  const subRef = collection(db, 'subreddits');
  const q = query(subRef, where('name', '==', subreddit));
  const querySnapshot = await getDocs(q);
  const subreddits: any = [];

  querySnapshot.forEach((doc) => {
    if (doc.data()) subreddits.push(doc.data());
  });

  return !(subreddits.length > 0);
};

export default checkSubredditAvailability;
