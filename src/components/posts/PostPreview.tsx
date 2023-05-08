import { useEffect, useState } from 'react';
import styles from './PostPreview.module.scss';
import Link from 'next/link';
import PostMenu from './PostMenu';
import { Post } from '@/types/types';
import getIcon from '@/utils/getIcon';
import { formatDistanceToNowStrict } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import ImageViewer from './ImageViewer';
import calculateKarma from '@/utils/calculateKarma';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import upvotePost from '@/firebase/firestore/posts/update/upvotePost';
import removeUpvoteOnPost from '@/firebase/firestore/posts/update/removeUpvoteOnPost';
import removeDownvoteOnPost from '@/firebase/firestore/posts/update/removeDownvoteOnPost';
import downvotePost from '@/firebase/firestore/posts/update/downvotePost';
import removeBookmarkOnPost from '@/firebase/firestore/posts/update/removeBookmarkOnPost';
import bookmarkPost from '@/firebase/firestore/posts/update/bookmarkPost';

type PostPreviewProps = {
  post: Post;
};

function PostPreview(props: PostPreviewProps) {
  const { post } = props;
  const { user, upvotedPosts, downvotedPosts } = useAuth();
  const { addAlert } = useSnackbar();

  const [isMenuShown, setMenuVisibility] = useState(false);
  const [isUpvoted, setUpvotedStatus] = useState(false);
  const [isDownvoted, setDownvotedStatus] = useState(false);
  const [isBookmarked, setBookmarkedStatus] = useState(false);
  const [postKarma, setPostKarma] = useState(
    calculateKarma(post.upvoted_by.length, post.downvoted_by.length, true),
  );

  const formattedDate = formatDistanceToNowStrict(
    new Date(post.date_created as string),
  );

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuVisibility((prev) => !prev);
  };

  const hideMenu = () => {
    setMenuVisibility(false);
  };

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

  const toggleBookmark = async (e: React.MouseEvent) => {
    try {
      if (!user) return;

      if (isBookmarked) {
        setBookmarkedStatus(true);
        await removeBookmarkOnPost(user, post.post_id);
      } else if (!isBookmarked) {
        setBookmarkedStatus(false);
        await bookmarkPost(user, post.post_id);
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
  }, [upvotedPosts, user, post.post_id]);

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
    <article
      className={styles.container}
      aria-labelledby={`post-${post.post_id}__heading`}
    >
      <Link
        href={`/r/${post.parent_subreddit}`}
        className={styles.subreddit__link}
      >
        <i className={styles.subreddit__icon} aria-hidden>
          {getIcon(post.parent_subreddit)}
        </i>
        <h3
          id={`post-${post.post_id}__heading`}
          className={styles.subreddit__title}
          aria-label="Subreddit name"
        >
          {post.parent_subreddit}
        </h3>
      </Link>
      <Link
        href={`/r/${post.parent_subreddit}/${post.slug}`}
        className={styles.post__link}
      >
        <p className={styles.post__title}>{post.title}</p>

        <AnimatePresence>
          {post.image && <ImageViewer imageSrc={post.image} />}
        </AnimatePresence>

        {post.details && <p className={styles.post__details}>{post.details}</p>}

        <div className={styles.meta__container}>
          <div className={styles.meta__left}>
            <span
              className={styles.meta__originalPoster}
              aria-label="Original poster"
            >
              by {post.original_poster}
            </span>
            <div className={styles.meta__details}>
              {/* UPVOTE */}

              <div className={styles.meta__dataWrapper}>
                <button
                  type="button"
                  aria-label="Upvote button"
                  onClick={toggleUpvote}
                  className={styles.btnUpvote}
                  data-upvoted={isUpvoted}
                >
                  <i
                    className={`material-symbols-outlined ${styles.meta__iconLeft}`}
                    aria-hidden
                  >
                    north
                  </i>
                </button>
                <span
                  aria-label="Post karma"
                  className={styles.meta__data}
                  data-upvoted={isUpvoted}
                >
                  {Math.max(postKarma, 0)}
                </span>
              </div>

              {/* COMMENTS */}

              <div className={styles.meta__dataWrapper}>
                <i
                  className={`material-symbols-outlined ${styles.meta__iconLeft}`}
                  aria-hidden
                >
                  mode_comment
                </i>
                <span aria-label="Comment count" className={styles.meta__data}>
                  {post.comment_count}
                </span>
              </div>

              {/* TIME */}

              <div className={styles.meta__dataWrapper}>
                <i
                  className={`material-symbols-outlined ${styles.meta__iconLeft}`}
                  aria-hidden
                >
                  schedule
                </i>
                <time
                  aria-label="Time posted"
                  dateTime={post.date_created.toString()}
                  className={styles.meta__data}
                >
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>

          <div className={styles.meta__right}>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Show options"
              aria-haspopup
              onClick={toggleMenu}
            >
              <i className={`material-symbols-outlined`} aria-hidden>
                more_horiz
              </i>
            </button>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Upvote button"
              onClick={toggleUpvote}
              data-upvoted={isUpvoted}
            >
              <i
                className={`material-symbols-outlined ${styles.meta__btnIcon}`}
                aria-hidden
              >
                north
              </i>
            </button>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Downvote button"
              onClick={toggleDownvote}
              data-downvoted={isDownvoted}
            >
              <i
                className={`material-symbols-outlined ${styles.meta__btnIcon}`}
                aria-hidden
              >
                south
              </i>
            </button>

            {isMenuShown && (
              <PostMenu
                hideMenu={hideMenu}
                isUpvoted={isUpvoted}
                isDownvoted={isDownvoted}
                isBookmarked={isBookmarked}
                toggleUpvote={toggleUpvote}
                toggleDownvote={toggleDownvote}
                toggleBookmark={toggleBookmark}
              />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
export default PostPreview;
