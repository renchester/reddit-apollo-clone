import styles from './Aside.module.scss';

function AllSubredditsPageAside() {
  return (
    <aside className={styles.aside__main}>
      <h2 className={styles.aside__heading}>Subreddits</h2>
      <p className={styles.aside__description}>
        Find all the subreddits here. Click on any of these communities to join!
      </p>
      <button type="button" className={styles.aside__btnCreate}>
        Create your own subreddit
      </button>
    </aside>
  );
}
export default AllSubredditsPageAside;
