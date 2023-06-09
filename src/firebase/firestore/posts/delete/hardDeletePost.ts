import { db, storage } from '@/firebase/config';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const hardDeletePost = async (
  userId: string,
  postId: string,
  subredditName: string,
) => {
  try {
    // Delete post from db
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);

    // Delete post record from subreddit
    const subRef = doc(db, 'subreddits', subredditName);
    await updateDoc(subRef, {
      posts: arrayRemove(postId),
    });

    // Delete post record from its creator
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      posts: arrayRemove(postId),
    });

    // Delete image in Firebase storage
    const storageRef = ref(storage, `images/IMG_${postId}`);
    await deleteObject(storageRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default hardDeletePost;
