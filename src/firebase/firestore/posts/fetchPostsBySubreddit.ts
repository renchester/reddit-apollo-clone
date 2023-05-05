import { db } from '@/firebase/config';
import { ImagePost, Post } from '@/types/types';
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { timestampToUTCDateString } from '../helpers/dateHelpers';

const fetchPostsBySubreddit = async (subredditName: string) => {
  try {
    const postQuery = query(
      collection(db, 'posts'),
      where('parent_subreddit', '==', subredditName),
    );
    const querySnapshot = await getDocs(postQuery);

    let posts: (Post | ImagePost)[] = [];

    querySnapshot.forEach((doc) => {
      const postData = doc.data() as Post | ImagePost;
      // Convert serverTimestamp
      const convertedPostData = Object.assign(postData, {
        date_created: timestampToUTCDateString(
          postData.date_created as Timestamp,
        ),
      });

      posts = [...posts, convertedPostData];
    });

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch posts');
    }
  }
};

export default fetchPostsBySubreddit;
