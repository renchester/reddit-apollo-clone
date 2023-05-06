import { db } from '@/firebase/config';
import { Subreddit, User } from '@/types/types';
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const leaveSubreddit = async (user: User, subreddit: string) => {
  try {
    const subRef = doc(db, 'subreddits', subreddit);
    const docSnap = await getDoc(subRef);

    if (docSnap.exists()) {
      const subredditData = docSnap.data() as Subreddit;
      if (subredditData.creator_id === user.user_id) {
        throw new Error('The subreddit creator cannot abandon their ship!');
      }
    }

    // Remove user_id from subreddit members
    await updateDoc(subRef, {
      members: arrayRemove(user.user_id),
    });

    const subToDeleteRef = doc(
      db,
      `users/${user.user_id}/subscribed_subreddits/${subreddit}`,
    );

    // Delete subreddit data in user interactions subcollection
    await deleteDoc(subToDeleteRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(`ERROR: ${error.message}`);
    }
  }
};

export default leaveSubreddit;
