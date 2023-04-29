import { useState } from 'react';
import styles from './PostPreview.module.scss';
import Link from 'next/link';
import PostMenu from './PostMenu';

type PostPreviewProps = {
  id: string;
};

function PostPreview(props: PostPreviewProps) {
  const { id } = props;

  const [isMenuShown, setMenuVisibility] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuVisibility((prev) => !prev);
  };

  return (
    <article
      className={styles.container}
      aria-labelledby={`post-${id}__heading`}
    >
      <Link href="/r/all/posts/abcdef" className={styles.subreddit__link}>
        <i
          className={`material-symbols-outlined ${styles.subreddit__icon}`}
          aria-hidden
        >
          public
        </i>
        <h3
          id={`post-${id}__heading`}
          className={styles.subreddit__title}
          aria-label="Subreddit name"
        >
          AskReddit
        </h3>
      </Link>
      <Link href="/r/all/posts/abcdef" className={styles.post__link}>
        <p className={styles.post__title}>
          What wild animal is currently thought not to be dangerous, but you
          need to stay the hell away from because they actually are?
        </p>
        <p className={styles.post__details}>
          Asking because I&apos;m going to Australia in the next coming months
          and I want to be as cautious as possible.
        </p>

        <div className={styles.meta__container}>
          <div className={styles.meta__left}>
            <span
              className={styles.meta__originalPoster}
              aria-label="Original poster"
            >
              by questioner_inquirer
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
                  3.6K
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
                  402
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
                  dateTime="2018-07-07"
                  className={styles.meta__data}
                >
                  11h
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
