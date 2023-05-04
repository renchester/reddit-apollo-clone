import { db } from '@/firebase/config';
import { Subreddit } from '@/types/types';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { timestampToUTCDateString } from '../helpers/dateHelpers';

const fetchSubredditData = async (name: string) => {
  try {
    const subRef = doc(db, 'subreddits', name);
    const docSnap = await getDoc(subRef);

    if (docSnap.exists()) {
      const subData = docSnap.data() as Subreddit;
      const convertedSubData = Object.assign(subData, {
        date_created: timestampToUTCDateString(
          subData.date_created as Timestamp,
        ),
      });
      return convertedSubData;
    } else return null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch subreddit data');
    }
  }
};

export default fetchSubredditData;
