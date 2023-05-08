import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const bookmarkPost = async (user: User, postId: string) => {
  try {
    const bookmarkedPostsRef = doc(
      db,
      `users/${user.user_id}/saved_posts`,
      postId,
    );

    await setDoc(bookmarkedPostsRef, {
      date_created: serverTimestamp(),
      post_id: postId,
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to bookmark post');
    }
  }
};
export default bookmarkPost;
