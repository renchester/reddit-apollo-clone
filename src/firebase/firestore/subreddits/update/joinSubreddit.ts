import { db } from '@/firebase/config';
import { User } from '@/types/types';
import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const joinSubreddit = async (
  user: User,
  subreddit: string,
  subreddit_id: string,
) => {
  try {
    const subRef = doc(db, 'subreddits', subreddit);

    // Add user_id to subreddit members
    await updateDoc(subRef, {
      members: arrayUnion(user.user_id),
    });

    const subscriptionsRef = collection(
      db,
      `users/${user.user_id}/subscribed_subreddits`,
    );

    // Add subreddit data to user interactions subcollection
    await setDoc(doc(subscriptionsRef, subreddit), {
      date_subscribed: serverTimestamp(),
      subreddit: subreddit,
      subreddit_id: subreddit_id,
      isFavorite: false,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to join subreddit');
    }
  }
};

export default joinSubreddit;
