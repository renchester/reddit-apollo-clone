export type Interactables = 'comment' | 'post' | 'subreddit';

export interface InteractedType {
  date_interacted: Date | string;
  id: string;
  type: Interactables;
}

export interface User {
  date_created: Date | string;
  username: string;
  email: string;
  user_id: string;
  posts?: Post[];
  post_karma: number;
  comments?: Comment[];
  comment_karma: number;
  upvoted_posts?: InteractedType[];
  downvoted_posts?: InteractedType[];
  upvoted_comments?: InteractedType[];
  downvoted_comments?: InteractedType[];
  saved_posts?: InteractedType[];
  saved_comments?: InteractedType[];
  subscribed_subreddits?: Subreddit[];
  favorite_subreddits?: Subreddit[];
}

export interface Comment {
  comment_id: string;
  date_created: Date | string;
  original_poster: string;
  original_poster_id: string;
  parent_post_id: string;
  comment_level: number;
  content: string;
  upvoted_by?: User[];
  downvoted_by?: User[];
  parent_comment?: Comment;
  child_comments?: Comment[];
}

export interface Subreddit {
  subreddit_id: string;
  date_created: Date | string;
  name: string;
  posts: Post[];
  members?: User[];
}

export interface Post {
  post_id: string;
  date_created: Date | string;
  original_poster: string;
  original_poster_id: string;
  parent_subreddit: string;
  parent_subreddit_id: string;
  type: 'image' | 'text';
  title: string;
  details?: string;
  upvoted_by?: User[];
  downvoted_by?: User[];
  comments?: Comment[];
}
