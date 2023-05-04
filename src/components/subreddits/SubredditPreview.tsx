import { Subreddit } from '@/types/types';
import styles from './SubredditPreview.module.scss';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';

type SubredditPreviewProps = {
  id: string;
  href: string;
  subreddit: Subreddit;
};

function SubredditPreview(props: SubredditPreviewProps) {
  const { id, href, subreddit } = props;

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
            {subreddit.name}
          </h3>
        </div>
        <p className={styles.description}>{subreddit.description}</p>
        <p className={styles.meta}>
          {subreddit.members.length}{' '}
          {subreddit.members.length === 1 ? 'subscriber' : 'subscribers'}, a
          community for{' '}
          <time dateTime={subreddit.date_created.toString()}>
            {formatDistanceToNowStrict(
              new Date(subreddit.date_created as string),
            )}
          </time>
        </p>
        <button type="button" className={styles.btnReport}>
          Report
        </button>
      </Link>
    </article>
  );
}
export default SubredditPreview;
