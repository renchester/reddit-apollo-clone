import { db } from '@/firebase/config';
import { Subreddit, User } from '@/types/types';
import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

type ImagePostDetails = {
  title: string;
  image: string;
  details?: string;
  postId: string;
};

const submitImagePost = async (
  user: User,
  subreddit: Subreddit,
  postDetails: ImagePostDetails,
) => {
  try {
    const postId = postDetails.postId;
    const postRef = doc(db, 'posts', postId);

    // Add post to posts collection
    await setDoc(postRef, {
      post_id: postId,
      date_created: serverTimestamp(),
      original_poster_id: user.user_id,
      parent_subreddit: subreddit.name,
      parent_subreddit_id: subreddit.subreddit_id,
      title: postDetails.title,
      details: postDetails.details || '',
      upvoted_by: [],
      downvoted_by: [],
      comments: [],
      image: postDetails.image,
    });

    // Add post_id to subreddit collection
    const subRef = doc(db, 'subreddits', subreddit.name);
    await updateDoc(subRef, {
      posts: arrayUnion(postId),
    });

    // Add post_id to user creations
    const userRef = doc(db, 'users', user.user_id);
    await updateDoc(userRef, {
      posts: arrayUnion(postId),
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw new Error('Failed to create post');
    }
  }
};

export default submitImagePost;
