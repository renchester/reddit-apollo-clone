import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Subreddit, SubredditMember } from '@/types/types';
import fetchSubredditMembers from './fetchSubredditMembers';

const fetchAllSubreddits = async () => {
  try {
    const subRef = collection(db, 'subreddits');
    const querySnapshot = await getDocs(subRef);
    let subreddits: Subreddit[] = [];

    querySnapshot.forEach(async (doc) => {
      const subData = doc.data() as Subreddit;

      subreddits = [...subreddits, subData];
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
