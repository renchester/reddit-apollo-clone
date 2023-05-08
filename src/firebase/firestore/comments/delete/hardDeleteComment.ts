import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const hardDeleteComment = async (
  user: User,
  postId: string,
  commentId: string,
  parentCommentId?: string,
) => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);
    await deleteDoc(commentRef);

    if (parentCommentId) {
      const parentCommentRef = doc(
        db,
        `posts/${postId}/comments`,
        parentCommentId,
      );

      await updateDoc(parentCommentRef, {
        child_comments: arrayRemove(commentId),
      });
    }

    const userRef = doc(db, 'users', user.user_id);
    await updateDoc(userRef, {
      comments: arrayRemove({
        parent_post_id: postId,
        comment_id: commentId,
      }),
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw new Error('Failed to delete comment');
    }
  }
};

export default hardDeleteComment;
