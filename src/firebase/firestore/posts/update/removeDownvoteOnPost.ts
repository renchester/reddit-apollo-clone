import { db } from '@/firebase/config';
import { Post, User } from '@/types/types';
import {
  arrayRemove,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore';

const removeDownvoteOnPost = async (user: User, post: Post) => {
  try {
    const postRef = doc(db, 'posts', post.post_id);

    // Delete user id from downvoted_by array
    await updateDoc(postRef, {
      downvoted_by: arrayRemove(user.user_id),
      post_karma: increment(1),
    });

    const downvotedPostsRef = doc(
      db,
      `users/${user.user_id}/downvoted_posts`,
      post.post_id,
    );

    // Delete post from user interactions
    await deleteDoc(downvotedPostsRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to delete downvote on post');
    }
  }
};

export default removeDownvoteOnPost;
