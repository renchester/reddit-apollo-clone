import { db } from '@/firebase/config';
import { Comment, User } from '@/types/types';
import {
  arrayRemove,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore';

const removeUpvoteOnComment = async (user: User, comment: Comment) => {
  try {
    const commentRef = doc(
      db,
      `posts/${comment.parent_post_id}/comments`,
      comment.comment_id,
    );

    // Delete user id from upvoted_by array
    await updateDoc(commentRef, {
      upvoted_by: arrayRemove(user.user_id),
      comment_karma: increment(-1),
    });

    // Delete comment from user interactions
    const upvotedCommentsRef = doc(
      db,
      `users/${user.user_id}/upvoted_comments`,
      comment.comment_id,
    );
    await deleteDoc(upvotedCommentsRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to delete upvote on comment');
    }
  }
};

export default removeUpvoteOnComment;
