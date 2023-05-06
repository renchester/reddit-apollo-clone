import { db } from '@/firebase/config';
import { Subreddit } from '@/types/types';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import forceDeleteSubscription from './hardDeleteSubscription';

const deleteSubreddit = async (name: string) => {
  try {
    const subredditRef = doc(db, 'subreddits', name);
    const subSnap = await getDoc(subredditRef);

    if (subSnap.exists()) {
      const subData = subSnap.data() as Subreddit;
      const members = subData.members;

      await deleteDoc(subredditRef);

      for await (const userId of members) {
        await forceDeleteSubscription(userId, subData.subreddit_id);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default deleteSubreddit;
