import { db } from '@/firebase/config';
import { User, UserSubscription } from '@/types/types';
import {
  doc,
  collection,
  getDocs,
  query,
  onSnapshot,
} from 'firebase/firestore';

const fetchUserSubscriptions = async (user: User) => {
  try {
    const subscriptionsRef = collection(
      db,
      `users/${user.user_id}/subscribed_subreddits`,
    );
    const subscriptionsQuery = query(subscriptionsRef);

    const querySnapshot = await getDocs(subscriptionsQuery);
    let subscriptions: UserSubscription[] = [];

    querySnapshot.forEach((doc) => {
      const subscriptionData = doc.data() as UserSubscription;
      subscriptions = [...subscriptions, subscriptionData];
    });

    return subscriptions;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch subscription data');
    }
  }
};

export default fetchUserSubscriptions;
