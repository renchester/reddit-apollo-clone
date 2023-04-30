import Link from 'next/link';
import styles from './CommentPreview.module.scss';

type CommentPreviewProps = {
  id: string;
};

function CommentPreview(props: CommentPreviewProps) {
  const { id } = props;

  return (
    <article
      className={styles.container}
      aria-label={`Comment to post /////// enter post title /////`}
    >
      <Link href="r/all/posts/abcdef" className={styles.link}>
        <div className={styles.main}>
          <span
            className={styles.main__originalPoster}
            aria-label="Original Poster"
          >
            redditor_123
          </span>
          <button
            type="button"
            className={styles.main__btnUpvote}
            aria-label="Upvote comment"
          >
            <i
              className={`material-symbols-outlined ${styles.main__btnIcon}`}
              aria-hidden
            >
              north
            </i>
            <span
              className={styles.main__upvoteCount}
              aria-label="Upvote count"
            >
              23
            </span>
          </button>
          <time
            dateTime=""
            className={styles.main__date}
            aria-label="Date created"
          >
            23d
          </time>
        </div>
        <div className={styles.content} aria-label="Comment contents">
          <p className={styles.content__paragraph}>
            ICYMI: this is actually about my girlfriend. She is definitely real.
          </p>
          <p className={styles.content__paragraph}>
            She absolutely does not live in Canada.
          </p>
        </div>
      </Link>

      <Link href="/r/all" className={styles.subreddit}>
        <h3
          className={styles.subreddit__post}
          aria-label="Subreddit post title"
        >
          What is your best pick-up line
        </h3>
        <span className={styles.subreddit__title} aria-label="Subreddit title">
          r/NoStupidQuestions
        </span>
      </Link>
    </article>
  );
}
export default CommentPreview;
