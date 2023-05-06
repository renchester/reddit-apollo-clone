import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { UserSubscription } from '@/types/types';

const hardDeleteSubscription = async (userId: string, subredditId: string) => {
  try {
    const subscriptionRef = collection(
      db,
      `users/${userId}/subscribed_subreddits`,
    );
    const snapshot = await getDocs(subscriptionRef);
    let subscriptionToDelete = '';

    snapshot.forEach((doc) => {
      const subscription = doc.data() as UserSubscription;

      if (subscription.subreddit_id === subredditId) {
        subscriptionToDelete = subscription.subreddit;
      }
    });

    if (subscriptionToDelete) {
      await deleteDoc(
        doc(
          db,
          `users/${userId}/subscribed_subreddits/${subscriptionToDelete}`,
        ),
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default hardDeleteSubscription;
