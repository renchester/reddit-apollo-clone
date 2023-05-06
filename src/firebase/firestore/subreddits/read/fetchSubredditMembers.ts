import { db } from '@/firebase/config';
import { Subreddit, SubredditMember } from '@/types/types';
import { collection, getDocs } from 'firebase/firestore';

const fetchSubredditMembers = async (subredditName: string) => {
  try {
    const memberRef = collection(db, `subreddits/${subredditName}/members`);
    const querySnapshot = await getDocs(memberRef);
    let members: SubredditMember[] = [];

    querySnapshot.forEach((doc) => {
      const memberData = doc.data() as SubredditMember;

      members = [...members, memberData];
    });
    return members;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch subreddit member data');
    }
  }
};
export default fetchSubredditMembers;
