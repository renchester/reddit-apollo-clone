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
import removeUpvoteOnComment from './removeUpvoteOnComment';

const downvoteComment = async (user: User, comment: Comment) => {
  try {
    await removeUpvoteOnComment(user, comment);

    const commentRef = doc(
      db,
      `posts/${comment.parent_post_id}/comments`,
      comment.comment_id,
    );

    // Add user id to downvoted_by array
    await updateDoc(commentRef, {
      downvoted_by: arrayUnion(user.user_id),
      comment_karma: increment(-1),
    });

    // Add comment to user downvoted comments
    const downvotedCommentsRef = doc(
      db,
      `users/${user.user_id}/downvoted_comments`,
      comment.comment_id,
    );
    await setDoc(downvotedCommentsRef, {
      date_created: serverTimestamp(),
      comment_id: comment.comment_id,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to downvote comment');
    }
  }
};

export default downvoteComment;
