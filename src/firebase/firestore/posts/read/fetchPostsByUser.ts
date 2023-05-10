import { db } from '@/firebase/config';
import { Post } from '@/types/types';
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { timestampToUTCDateString } from '../../helpers/dateHelpers';

const fetchPostsByUser = async (userId: string) => {
  try {
    const postQuery = query(
      collection(db, 'posts'),
      where('original_poster_id', '==', userId),
    );
    const querySnapshot = await getDocs(postQuery);

    let posts: Post[] = [];

    querySnapshot.forEach((doc) => {
      const postData = doc.data() as Post;

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

export default fetchPostsByUser;
