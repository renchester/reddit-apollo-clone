import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const leaveSubreddit = async (user: User, subreddit: string) => {
  try {
    const subRef = doc(db, 'subreddits', subreddit);

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
      throw new Error('Failed to leave subreddit');
    }
  }
};

export default leaveSubreddit;
