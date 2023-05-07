import { Post } from '@/types/types';
import styles from './PostMain.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import getIcon from '@/utils/getIcon';
import calculatePostRating from '@/utils/calculatePostRating';
import calculateKarma from '@/utils/calculateKarma';
import { formatDistanceToNowStrict } from 'date-fns';
import ImageViewer from './ImageViewer';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import upvotePost from '@/firebase/firestore/posts/update/upvotePost';
import removeUpvoteOnPost from '@/firebase/firestore/posts/update/removeUpvoteOnPost';
import downvotePost from '@/firebase/firestore/posts/update/downvotePost';
import removeDownvoteOnPost from '@/firebase/firestore/posts/update/removeDownvoteOnPost';
import { useNewComment } from '@/hooks/useNewComment';

type PostMainProps = {
  post: Post;
};

function PostMain(props: PostMainProps) {
  const { post } = props;
  const { user, upvotedPosts, downvotedPosts } = useAuth();
  const { addAlert } = useSnackbar();
  const { showCommentModal } = useNewComment();
  const router = useRouter();

  const [isUpvoted, setUpvotedStatus] = useState(false);
  const [isDownvoted, setDownvotedStatus] = useState(false);
  const [postKarma, setPostKarma] = useState(
    calculateKarma(post.upvoted_by.length, post.downvoted_by.length, true),
  );

  const postRating = calculatePostRating(
    post.upvoted_by.length,
    post.downvoted_by.length,
  );
  const formattedDate = formatDistanceToNowStrict(
    new Date(post.date_created as string),
  );

  const toggleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (!user) return;

      if (isUpvoted) {
        setUpvotedStatus(false);
        setPostKarma((prev) => Math.max(prev - 1, 0));
        await removeUpvoteOnPost(user, post);
      } else if (!isUpvoted) {
        setDownvotedStatus(false);
        setUpvotedStatus(true);
        setPostKarma((prev) => {
          return prev < 0 ? 0 : prev + 1;
        });
        await upvotePost(user, post);
      }
    } catch (error) {
      if (error instanceof Error) {
        addAlert({
          message: error.message,
          status: 'error',
        });
      }
    }
  };

  const toggleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (!user) return;

      if (isDownvoted) {
        setDownvotedStatus(false);
        setPostKarma((prev) => {
          return prev <= 0 ? 0 : prev + 1;
        });
        await removeDownvoteOnPost(user, post);
      } else if (!isDownvoted) {
        setUpvotedStatus(false);
        setDownvotedStatus(true);
        setPostKarma((prev) => Math.max(prev - 1, 0));
        await downvotePost(user, post);
      }
    } catch (error) {
      if (error instanceof Error) {
        addAlert({
          message: error.message,
          status: 'error',
        });
      }
    }
  };

  const handleReplyToPost = () => {
    if (!user) return;
    showCommentModal();
  };

  // Upvote Handler
  useEffect(() => {
    if (!user || !upvotedPosts) {
      setUpvotedStatus(false);
      return;
    }

    const isUserUpvoted = !!upvotedPosts.find(
      (currPost) => currPost.post_id === post.post_id,
    );
    setUpvotedStatus(isUserUpvoted);
  }, [upvotedPosts, user, post]);

  // Downvote Handler
  useEffect(() => {
    if (!user || !downvotedPosts) {
      setDownvotedStatus(false);
      return;
    }

    const isUserDownvoted = !!downvotedPosts.find(
      (currPost) => currPost.post_id === post.post_id,
    );
    setDownvotedStatus(isUserDownvoted);
  }, [downvotedPosts, user, post.post_id]);

  return (
    <section aria-label="Post details" className={styles.post}>
      <button
        type="button"
        className={styles.post__btnBack}
        aria-label="Go back to previous page"
        onClick={() => router.back()}
      >
        <i
          className={`material-symbols-outlined ${styles.post__btnIcon}`}
          aria-hidden
        >
          arrow_back_ios
        </i>
        <span>Go back</span>
      </button>
      <article
        aria-labelledby={`post-${post.post_id}__title`}
        className={styles.post__article}
      >
        <h2 id={`post-${post.post_id}__title`} className={styles.post__title}>
          {post.title}
        </h2>

        {post.image && <ImageViewer imageSrc={post.image} />}

        <p className={styles.post__details}>{post.details}</p>
      </article>

      <div className={styles.meta}>
        <Link
          href={`/r/${post.parent_subreddit}`}
          className={styles.meta__subredditLink}
        >
          <i className={styles.meta__subredditIcon}>
            {getIcon(post.parent_subreddit)}
          </i>
          <span className={styles.meta__subreddit} aria-label="Subreddit name">
            {post.parent_subreddit}
          </span>
        </Link>
        <Link
          href={`/u/${post.original_poster}`}
          className={styles.meta__originalPoster}
        >
          by {post.original_poster}
        </Link>
      </div>

      <div className={styles.meta}>
        <button
          type="button"
          aria-label="Upvote post"
          className={styles.meta__data}
          onClick={toggleUpvote}
          data-upvoted={isUpvoted}
        >
          <i
            className={`material-symbols-outlined ${styles.meta__icon} `}
            aria-hidden
          >
            north
          </i>
          <span aria-label="Post karma">{Math.max(postKarma, 0)}</span>
        </button>

        <div className={styles.meta__data}>
          <i className={`material-symbols-outlined ${styles.meta__icon}`}>
            {postRating > 50 ? 'sentiment_satisfied' : 'sentiment_dissatisfied'}
          </i>
          <span>{postRating}%</span>
        </div>

        <div className={styles.meta__data}>
          <i className={`material-symbols-outlined ${styles.meta__icon}`}>
            schedule
          </i>
          <time dateTime={post.date_created as string}>{formattedDate}</time>
        </div>
      </div>

      <div className={styles.control}>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Upvote button"
          onClick={toggleUpvote}
          data-upvoted={isUpvoted}
        >
          <i
            className={`material-symbols-outlined ${styles.control__icon}`}
            aria-hidden
          >
            north
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Downvote button"
          onClick={toggleDownvote}
          data-downvoted={isDownvoted}
        >
          <i
            className={`material-symbols-outlined ${styles.control__icon}`}
            aria-hidden
          >
            south
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Save/bookmark post button"
        >
          <i
            className={`material-symbols-outlined ${styles.control__icon}`}
            aria-hidden
          >
            bookmark
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Reply to post"
          onClick={handleReplyToPost}
        >
          <i
            className={`material-symbols-outlined ${styles.control__icon}`}
            aria-hidden
          >
            reply
          </i>
        </button>
        <button
          type="button"
          className={styles.control__btn}
          aria-label="Share post button"
        >
          <i
            className={`material-symbols-outlined ${styles.control__icon}`}
            aria-hidden
          >
            ios_share
          </i>
        </button>
      </div>
    </section>
  );
}
export default PostMain;
