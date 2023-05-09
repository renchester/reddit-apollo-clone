import { Timestamp } from 'firebase/firestore';

export type Alert = {
  message: string;
  submessage?: string;
  action?: string;
  status: 'success' | 'error' | 'neutral';
};

export interface UserCommentRef {
  parent_post_id: string;
  comment_id: string;
}

export interface User {
  date_created: string | Timestamp;
  username: string;
  email: string;
  user_id: string;
  post_karma: number;
  comment_karma: number;
  posts?: string[]; // array of post_ids
  comments?: UserCommentRef[]; // array of comment_ids
}

export interface Interactions {
  upvoted_posts?: PostInteraction[];
  downvoted_posts?: PostInteraction[];
  saved_posts?: PostInteraction[];
  upvoted_comments?: CommentInteraction[];
  downvoted_comments?: CommentInteraction[];
  subscribed_subreddits?: UserSubscription[];
}

export interface PostInteraction {
  date_created: string | Timestamp;
  post_id: string;
}

export interface CommentInteraction {
  date_created: string | Timestamp;
  comment_id: string;
}

export interface UserSubscription {
  date_subscribed: string | Timestamp;
  subreddit: string;
  subreddit_id: string;
  isFavorite: boolean;
}

export interface Comment {
  comment_id: string;
  comment_karma: number;
  content: string;
  comment_level: number;
  date_created: string | Timestamp;
  original_poster: string;
  original_poster_id: string;
  parent_post_id: string;
  parent_post_slug: string;
  parent_comment_id: string; // comment id
  child_comments: string[]; // array of comment ids
  upvoted_by: string[]; // user id
  downvoted_by: string[]; // user id
}

export interface Subreddit {
  subreddit_id: string;
  date_created: string | Timestamp;
  name: string;
  description?: string;
  creator_id: string;
  posts?: string[]; // array of post ids
  members: string[]; // array of user ids
}

export interface Post {
  post_id: string;
  post_karma: number;
  slug: string;
  date_created: string | Timestamp;
  original_poster: string;
  original_poster_id: string;
  parent_subreddit: string;
  parent_subreddit_id: string;
  title: string;
  details?: string;
  upvoted_by: string[];
  downvoted_by: string[];
  comment_count: number;
  image?: string;
}

export interface ImagePost extends Post {
  image: string;
}
