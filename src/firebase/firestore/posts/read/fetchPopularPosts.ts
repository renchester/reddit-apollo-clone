import { db } from '@/firebase/config';
import { Post } from '@/types/types';
import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { timestampToUTCDateString } from '../../helpers/dateHelpers';

const fetchPopularPosts = async (limitNum?: number) => {
  try {
    const postRef = collection(db, 'posts');
    let querySnapshot: QuerySnapshot<DocumentData>;

    if (limitNum && limitNum > 0) {
      querySnapshot = await getDocs(
        query(postRef, orderBy('post_karma', 'desc'), limit(limitNum)),
      );
    } else {
      querySnapshot = await getDocs(
        query(postRef, orderBy('post_karma', 'desc')),
      );
    }

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
export default fetchPopularPosts;
