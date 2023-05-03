import { User } from '@/types/types';
import { collection, doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../config';

const addSubreddit = async (name: string, user: User) => {
  try {
    const subRef = doc(db, 'subreddits', name);

    await setDoc(subRef, {
      subreddit_id: nanoid(),
      date_created: new Date().toUTCString(),
      name: name,
      creator: user.user_id,
      creator_username: user.username,
    });

    const membersRef = doc(
      collection(db, `subreddits/${name}/members`),
      user.user_id,
    );

    await setDoc(membersRef, {
      user_id: user.user_id,
      date_joined: new Date().toUTCString(),
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw new Error('Failed to create new subreddit');
    }
  }
};

export default addSubreddit;
