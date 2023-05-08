import { db } from '@/firebase/config';
import { User } from '@/types/types';
import { deleteDoc, doc } from 'firebase/firestore';

const removeBookmarkOnPost = async (user: User, postId: string) => {
  try {
    const bookmarkedPostsRef = doc(
      db,
      `users/${user.user_id}/saved_posts`,
      postId,
    );

    await deleteDoc(bookmarkedPostsRef);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to delete bookmark on post');
    }
  }
  return;
};
export default removeBookmarkOnPost;
