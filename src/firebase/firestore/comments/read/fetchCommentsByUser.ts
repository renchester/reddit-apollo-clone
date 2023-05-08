import { db } from '@/firebase/config';
import { User, UserCommentRef, Comment } from '@/types/types';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { timestampToUTCDateString } from '../../helpers/dateHelpers';

const fetchCommentsByUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    let commentRefArray: UserCommentRef[] = [];
    let commentsArray: Comment[] = [];

    if (docSnap.exists()) {
      const userData = docSnap.data() as User;
      commentRefArray = userData.comments as UserCommentRef[];
    }

    for await (const comment of commentRefArray) {
      const commentRef = doc(
        db,
        `posts/${comment.parent_post_id}/comments`,
        comment.comment_id,
      );
      const commentSnap = await getDoc(commentRef);

      if (commentSnap.exists()) {
        const commentData = commentSnap.data() as Comment;
        const convertedCommentData = Object.assign(commentData, {
          date_created: timestampToUTCDateString(
            commentData.date_created as Timestamp,
          ),
        });
        commentsArray = [...commentsArray, convertedCommentData];
      }
    }

    return commentsArray;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Unable to fetch user comments');
    }
  }
};
export default fetchCommentsByUser;
