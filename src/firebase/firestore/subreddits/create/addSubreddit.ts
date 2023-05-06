import { User } from '@/types/types';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../../../config';
import joinSubreddit from '../update/joinSubreddit';

const addSubreddit = async (name: string, description: string, user: User) => {
  try {
    const subRef = doc(db, 'subreddits', name);
    const subredditId = `subreddit__${nanoid()}`;

    // Create subreddit document
    await setDoc(subRef, {
      subreddit_id: subredditId,
      date_created: serverTimestamp(),
      name: name,
      description: description || '',
      posts: [],
      members: [user.user_id], // Add subreddit creator to members
      creator_id: user.user_id,
    });

    // Add subreddit to user subcollection
    await joinSubreddit(user, name, subredditId);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw new Error('Failed to create new subreddit');
    }
  }
};

export default addSubreddit;
