import { db, storage } from '@/firebase/config';
import { arrayRemove, doc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const deletePost = async (
  userId: string,
  postId: string,
  subredditName: string,
) => {
  try {
    const postRef = doc(db, 'posts', postId);

    await setDoc(postRef, {
      details: '[deleted]',
      original_poster: '[deleted]',
      original_poster_id: '',
    });

    const subRef = doc(db, 'subreddits', subredditName);
    await updateDoc(subRef, {
      posts: arrayRemove(postId),
    });

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
      console.error('ERROR:', error.message);
      throw new Error('Failed to delete post');
    }
  }
};

export default deletePost;
