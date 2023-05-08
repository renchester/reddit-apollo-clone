import { db } from '@/firebase/config';
import { Post, User } from '@/types/types';
import {
  arrayUnion,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';

type CommentDetails = {
  content: string;
  level: number;
};

const submitComment = async (
  user: User,
  commentDetails: CommentDetails,
  parentPost: Post,
  parentCommentId?: string,
) => {
  try {
    const newCommentId = `comment__${nanoid()}`;
    const commentRef = doc(
      db,
      `posts/${parentPost.post_id}/comments`,
      newCommentId,
    );

    // Set comment details
    await setDoc(commentRef, {
      comment_id: newCommentId,
      content: commentDetails.content,
      comment_level: commentDetails.level,
      date_created: serverTimestamp(),
      original_poster: user.username,
      original_poster_id: user.user_id,
      parent_post_id: parentPost.post_id,
      parent_post_slug: parentPost.slug,
      parent_comment_id: parentCommentId || '',
      upvoted_by: [],
      downvoted_by: [],
      child_comments: [],
    });

    if (parentCommentId) {
      const parentCommentRef = doc(
        db,
        `posts/${parentPost.post_id}/comments`,
        parentCommentId,
      );

      await updateDoc(parentCommentRef, {
        child_comments: arrayUnion(newCommentId),
      });
    }

    // Increment comment_count on post
    const postRef = doc(db, 'posts', parentPost.post_id);
    await updateDoc(postRef, {
      comment_count: increment(1),
    });

    // Add comment_id to user creations
    const userRef = doc(db, 'users', user.user_id);
    await updateDoc(userRef, {
      comments: arrayUnion({
        parent_post_id: parentPost.post_id,
        comment_id: newCommentId,
      }),
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error.message);
      throw new Error('Failed to create new comment');
    }
  }
};

export default submitComment;
