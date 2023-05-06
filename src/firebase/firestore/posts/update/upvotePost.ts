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

const upvotePost = async (user: User, post: Post) => {
  try {
    const postRef = doc(db, 'posts', post.post_id);

    // Remove user_id from downvoted_by array
    await updateDoc(postRef, {
      downvoted_by: arrayRemove(user.user_id),
    });

    // Add user id to upvoted_by array
    await updateDoc(postRef, {
      upvoted_by: arrayUnion(user.user_id),
    });

    const downvotedPostsRef = doc(
      db,
      `users/${user.user_id}/downvoted_posts`,
      post.post_id,
    );

    // Remove post from downvoted posts
    await deleteDoc(downvotedPostsRef);

    const upvotedPostsRef = collection(
      db,
      `users/${user.user_id}/upvoted_posts`,
    );

    // Add upvoted_post to user interactions subcollection
    await setDoc(doc(upvotedPostsRef, post.post_id), {
      date_created: serverTimestamp(),
      post_id: post.post_id,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to upvote post');
    }
  }
};

export default upvotePost;
