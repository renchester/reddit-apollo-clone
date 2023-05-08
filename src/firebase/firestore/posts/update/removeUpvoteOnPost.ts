import { db } from '@/firebase/config';
import { Post, User } from '@/types/types';
import {
  arrayRemove,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore';

const removeUpvoteOnPost = async (user: User, post: Post) => {
  try {
    const postRef = doc(db, 'posts', post.post_id);

    // Delete user id from upvoted_by array
    await updateDoc(postRef, {
      upvoted_by: arrayRemove(user.user_id),
      post_karma: increment(-1),
    });

    const upvotedPostsRef = doc(
      db,
      `users/${user.user_id}/upvoted_posts`,
      post.post_id,
    );

    // Delete post from user interactions
    await deleteDoc(upvotedPostsRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to delete upvote on post');
    }
  }
};

export default removeUpvoteOnPost;
