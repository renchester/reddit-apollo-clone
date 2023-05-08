import { db } from '@/firebase/config';
import { Post, User } from '@/types/types';
import {
  arrayUnion,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import removeUpvoteOnPost from './removeUpvoteOnPost';

const downvotePost = async (user: User, post: Post) => {
  try {
    // Remove upvote
    await removeUpvoteOnPost(user, post);

    const postRef = doc(db, 'posts', post.post_id);

    // Add user id to upvoted_by array
    await updateDoc(postRef, {
      downvoted_by: arrayUnion(user.user_id),
      post_karma: increment(-1),
    });

    const downvotedPostsRef = collection(
      db,
      `users/${user.user_id}/downvoted_posts`,
    );

    // Add upvoted_post to user interactions subcollection
    await setDoc(doc(downvotedPostsRef, post.post_id), {
      date_created: serverTimestamp(),
      post_id: post.post_id,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to downvote post');
    }
  }
};

export default downvotePost;
