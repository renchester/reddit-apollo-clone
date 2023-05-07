import { db } from '@/firebase/config';
import { Comment } from '@/types/types';
import { Timestamp, collection, getDocs, query } from 'firebase/firestore';
import { timestampToUTCDateString } from '../../helpers/dateHelpers';

const fetchPostComments = async (postId: string) => {
  try {
    const commentQuery = query(collection(db, `posts/${postId}/comments`));
    const querySnapshot = await getDocs(commentQuery);

    let comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const commentData = doc.data() as Comment;
      // Convert serverTimestamp
      const convertedPostData = Object.assign(commentData, {
        date_created: timestampToUTCDateString(
          commentData.date_created as Timestamp,
        ),
      });

      comments = [...comments, convertedPostData];
    });

    return comments;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch comments');
    }
  }
};

export default fetchPostComments;
