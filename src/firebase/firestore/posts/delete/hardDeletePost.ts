import { db, storage } from '@/firebase/config';
import { ImagePost, Post } from '@/types/types';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const hardDeletePost = async (post: Post) => {
  try {
    // Delete post from db
    const postRef = doc(db, 'posts', post.post_id);
    await deleteDoc(postRef);

    // Delete post record from subreddit
    const subRef = doc(db, 'subreddits', post.parent_subreddit);
    await updateDoc(subRef, {
      posts: arrayRemove(post.post_id),
    });

    // Delete post record from its creator
    const userRef = doc(db, 'users', post.original_poster_id);
    await updateDoc(userRef, {
      posts: arrayRemove(post.post_id),
    });

    if (post.image) {
      const storageRef = ref(storage, `images/${post.post_id}`);

      await deleteObject(storageRef);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default hardDeletePost;
