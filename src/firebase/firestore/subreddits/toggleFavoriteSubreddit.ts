import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const toggleFavoriteSubreddit = async (user: User, subreddit: string) => {
  try {
    const subRef = doc(
      db,
      `users/${user.user_id}/subscribed_subreddits`,
      subreddit,
    );
    const docSnap = await getDoc(subRef);

    if (docSnap.exists()) {
      await updateDoc(subRef, { isFavorite: !docSnap.data().isFavorite });

      return true;
    } else return null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to join subreddit');
    }
  }
};

export default toggleFavoriteSubreddit;
