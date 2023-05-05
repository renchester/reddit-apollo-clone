import { useEffect, useState } from 'react';
import styles from './PostPreview.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import PostMenu from './PostMenu';
import { Post } from '@/types/types';
import getIcon from '@/utils/getIcon';
import { formatDistanceToNowStrict } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import ImageViewer from './ImageViewer';

type PostPreviewProps = {
  post: Post & { image?: string };
};

function PostPreview(props: PostPreviewProps) {
  const { post } = props;

  const [isMenuShown, setMenuVisibility] = useState(false);

  const postKarma = post.upvoted_by.length - post.downvoted_by.length;
  const formattedDate = formatDistanceToNowStrict(
    new Date(post.date_created as string),
  );

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuVisibility((prev) => !prev);
  };

  return (
    <article
      className={styles.container}
      aria-labelledby={`post-${post.post_id}__heading`}
    >
      <Link href="/r/all/posts/abcdef" className={styles.subreddit__link}>
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
      <Link href="/r/all/posts/abcdef" className={styles.post__link}>
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
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('upvoting');
                  }}
                >
                  <i
                    className={`material-symbols-outlined ${styles.btnUpvote} ${styles.meta__iconLeft}`}
                    aria-hidden
                  >
                    north
                  </i>
                </button>
                <span
                  aria-label="Net vote count for post "
                  className={styles.meta__data}
                >
                  {Math.min(0, postKarma)}
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
                  {post.comments.length}
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
              onClick={(e) => e.preventDefault()}
            >
              <i className={`material-symbols-outlined`} aria-hidden>
                north
              </i>
            </button>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Downvote button"
              onClick={(e) => e.preventDefault()}
            >
              <i className={`material-symbols-outlined`} aria-hidden>
                south
              </i>
            </button>

            {isMenuShown && <PostMenu />}
          </div>
        </div>
      </Link>
    </article>
  );
}
export default PostPreview;
