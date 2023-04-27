import styles from './Aside.module.scss';

function SubredditAside() {
  return (
    <aside className={styles.aside__main}>
      <h2 className={styles.aside__heading}>r/All</h2>
      <p className={styles.aside__description}>
        Welcome to r/All. This is where everything is found. Reddit&apos;s very
        own.
      </p>

      <p className={styles.created}>
        <span className={`material-symbols-outlined ${styles.created__icon}`}>
          cake
        </span>
        <span className={styles.created__description}>
          Created <time>January 28, 2010</time>
        </span>
      </p>

      <div className={styles.members}>
        <div
          className={styles.members__meta}
          aria-label="Total members for this subreddit"
        >
          <span className={styles.members__data}>41,000</span>{' '}
          <span className={styles.members__description}>members</span>
        </div>
        <div className={styles.members__meta} aria-label="Subreddit rank">
          <span className={styles.members__data}>#1</span>
          <span className={styles.members__description}> on this site</span>
        </div>
      </div>

      <button type="button" className={styles.aside__btnCreate}>
        Create Post
      </button>
    </aside>
  );
}
export default SubredditAside;
