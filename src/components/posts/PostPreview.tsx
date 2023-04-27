import styles from './PostPreview.module.scss';
import Link from 'next/link';

type PostPreviewProps = {
  id: string;
};

function PostPreview(props: PostPreviewProps) {
  const { id } = props;

  return (
    <article
      className={styles.container}
      aria-labelledby={`post-${id}__heading`}
    >
      <Link href="/r/sub" className={styles.subreddit__link}>
        <span className={`material-symbols-outlined ${styles.subreddit__icon}`}>
          public
        </span>
        <h3
          id={`post-${id}__heading`}
          className={styles.subreddit__title}
          aria-label="Subreddit name"
        >
          AskReddit
        </h3>
      </Link>
      <Link href="/post" className={styles.post__link}>
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
                  <span
                    className={`material-symbols-outlined ${styles.btnUpvote} ${styles.meta__iconLeft}`}
                  >
                    north
                  </span>
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
                <span
                  className={`material-symbols-outlined ${styles.meta__iconLeft}`}
                >
                  mode_comment
                </span>
                <span aria-label="Comment count" className={styles.meta__data}>
                  402
                </span>
              </div>

              {/* TIME */}

              <div className={styles.meta__dataWrapper}>
                <span
                  className={`material-symbols-outlined ${styles.meta__iconLeft}`}
                >
                  schedule
                </span>
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
              onClick={(e) => e.preventDefault()}
            >
              <span className={`material-symbols-outlined`}>more_horiz</span>
            </button>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Upvote button"
              onClick={(e) => e.preventDefault()}
            >
              <span className={`material-symbols-outlined`}>north</span>
            </button>
            <button
              className={styles.meta__btnRight}
              type="button"
              aria-label="Downvote button"
              onClick={(e) => e.preventDefault()}
            >
              <span className={`material-symbols-outlined`}>south</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
export default PostPreview;
