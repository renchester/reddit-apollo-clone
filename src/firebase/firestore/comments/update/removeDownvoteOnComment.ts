import { db } from '@/firebase/config';
import { Comment, User } from '@/types/types';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const removeDownvoteOnComment = async (user: User, comment: Comment) => {
  try {
    const commentRef = doc(
      db,
      `posts/${comment.parent_post_id}/comments`,
      comment.comment_id,
    );

    // Delete user id from downvoted_by array
    await updateDoc(commentRef, {
      downvoted_by: arrayRemove(user.user_id),
    });

    // Delete comment from user interactions
    const downvotedCommentsRef = doc(
      db,
      `users/${user.user_id}/downvoted_comments`,
      comment.comment_id,
    );
    await deleteDoc(downvotedCommentsRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to delete downvote on comment');
    }
  }
};

export default removeDownvoteOnComment;
