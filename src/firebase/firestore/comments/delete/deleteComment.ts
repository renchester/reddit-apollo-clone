import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';

const deleteComment = async (user: User, postId: string, commentId: string) => {
  try {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);

    await updateDoc(commentRef, {
      content: '[deleted]',
      original_poster: '[deleted]',
      original_poster_id: '',
    });

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

export default deleteComment;
