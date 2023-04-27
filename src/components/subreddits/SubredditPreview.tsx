import styles from './SubredditPreview.module.scss';
import Link from 'next/link';

type SubredditPreviewProps = {
  id: string;
  href: string;
};

function SubredditPreview(props: SubredditPreviewProps) {
  const { id, href } = props;

  return (
    <article
      className={styles.container}
      aria-labelledby={`subreddit-${id}__heading`}
    >
      <Link href={href} className={styles.link}>
        <div className={styles.titleWrapper}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            public
          </span>
          <h3
            id={`subreddit-${id}__heading`}
            className={styles.title}
            aria-label="Subreddit name"
          >
            AskReddit
          </h3>
        </div>
        <p className={styles.description}>
          r/AskReddit is the place to ask and answer thought-provoking questions
        </p>
        <p className={styles.meta}>
          30,100,100 subscribers, a community for{' '}
          <time dateTime="">10 years</time>
        </p>
        <button type="button" className={styles.btnReport}>
          Report
        </button>
      </Link>
    </article>
  );
}
export default SubredditPreview;
