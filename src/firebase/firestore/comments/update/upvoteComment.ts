import { db } from '@/firebase/config';
import { Comment, User } from '@/types/types';
import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import removeDownvoteOnComment from './removeDownvoteOnComment';

const upvoteComment = async (user: User, comment: Comment) => {
  try {
    await removeDownvoteOnComment(user, comment);

    const commentRef = doc(
      db,
      `posts/${comment.parent_post_id}/comments`,
      comment.comment_id,
    );

    // Add user id to upvoted_by array
    await updateDoc(commentRef, {
      upvoted_by: arrayUnion(user.user_id),
      comment_karma: increment(1),
    });

    // Add upvoted_post to user interactions subcollection
    const upvotedCommentsRef = doc(
      db,
      `users/${user.user_id}/upvoted_comments`,
      comment.comment_id,
    );
    await setDoc(upvotedCommentsRef, {
      date_created: serverTimestamp(),
      comment_id: comment.comment_id,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to upvote comment');
    }
  }
};

export default upvoteComment;
