import { db } from '@/firebase/config';
import { Post, User } from '@/types/types';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const downvotePost = async (user: User, post: Post) => {
  try {
    const postRef = doc(db, 'posts', post.post_id);

    // Remove user_id from downvoted_by array
    await updateDoc(postRef, {
      upvoted_by: arrayRemove(user.user_id),
    });

    // Add user id to upvoted_by array
    await updateDoc(postRef, {
      downvoted_by: arrayUnion(user.user_id),
    });

    const upvotedPostsRef = doc(
      db,
      `users/${user.user_id}/upvoted_posts`,
      post.post_id,
    );

    // Remove post from upvoted posts
    await deleteDoc(upvotedPostsRef);

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
