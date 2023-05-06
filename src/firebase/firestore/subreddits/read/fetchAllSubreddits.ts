import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Subreddit } from '@/types/types';
import { timestampToUTCDateString } from '../../helpers/dateHelpers';

const fetchAllSubreddits = async () => {
  try {
    const subRef = collection(db, 'subreddits');
    const querySnapshot = await getDocs(subRef);
    let subreddits: Subreddit[] = [];

    querySnapshot.forEach(async (doc) => {
      const subData = doc.data() as Subreddit;
      // Convert serverTimestamp to UTC Date String
      const convertedSubData = Object.assign(subData, {
        date_created: timestampToUTCDateString(
          subData.date_created as Timestamp,
        ),
      });

      subreddits = [...subreddits, convertedSubData];
    });

    return subreddits;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch subreddit data');
    }
  }
};

export default fetchAllSubreddits;
