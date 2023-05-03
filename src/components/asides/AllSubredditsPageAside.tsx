import styles from './Aside.module.scss';
import Link from 'next/link';

function AllSubredditsPageAside() {
  return (
    <aside className={styles.aside__main}>
      <h2 className={styles.aside__heading}>Subreddits</h2>
      <p className={styles.aside__description}>
        Find all the subreddits here. Click on any of these communities to join!
      </p>
      <Link href="/r/create-subreddit" className={styles.aside__btnCreate}>
        Create your own subreddit
      </Link>
    </aside>
  );
}
export default AllSubredditsPageAside;
