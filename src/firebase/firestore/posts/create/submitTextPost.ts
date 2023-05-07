import { db } from '@/firebase/config';
import { Subreddit, User } from '@/types/types';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import slugifyPost from '../../helpers/slugifyPost';

type TextPostDetails = {
  title: string;
  details?: string;
};

const submitTextPost = async (
  user: User,
  subreddit: Subreddit,
  postDetails: TextPostDetails,
) => {
  try {
    const postId = `post__${nanoid()}`;
    const postRef = doc(db, 'posts', postId);
    const postSlug = slugifyPost(postDetails.title, postId);

    // Add post to posts collection
    await setDoc(postRef, {
      slug: postSlug,
      post_id: postId,
      date_created: serverTimestamp(),
      original_poster: user.username,
      original_poster_id: user.user_id,
      parent_subreddit: subreddit.name,
      parent_subreddit_id: subreddit.subreddit_id,
      title: postDetails.title,
      details: postDetails.details || '',
      upvoted_by: [],
      downvoted_by: [],
      comment_count: 0,
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

export default submitTextPost;
