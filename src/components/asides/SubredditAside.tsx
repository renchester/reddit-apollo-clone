import { Subreddit } from '@/types/types';
import styles from './Aside.module.scss';
import SubredditRules from './SubredditRules';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

type SubredditAsideProps = {
  subreddit: Subreddit;
};

function SubredditAside(props: SubredditAsideProps) {
  const { subreddit } = props;
  const router = useRouter();

  const formattedDate = format(
    new Date(subreddit.date_created as string),
    'LLLL d, yyyy',
  );

  const goToCreatePost = () => {
    router.push(`/r/${subreddit.name}/submit`);
  };

  return (
    <>
      <aside className={styles.aside__main}>
        <h2 className={styles.aside__heading}>r/{subreddit.name}</h2>
        <p className={styles.aside__description}>{subreddit.description}</p>
        <div className={styles.created}>
          <span
            className={`material-symbols-outlined ${styles.created__icon}`}
            aria-hidden
          >
            cake
          </span>
          <span className={styles.created__description}>
            Created{' '}
            <time dateTime={subreddit.date_created.toString()}>
              {formattedDate}
            </time>
          </span>
        </div>
        <div className={styles.members}>
          <div
            className={styles.members__meta}
            aria-label="Total members for this subreddit"
          >
            <span className={styles.members__data}>
              {subreddit.members.length}
            </span>{' '}
            <span className={styles.members__description}>
              {subreddit.members.length === 1 ? 'member' : 'members'}
            </span>
          </div>
          <div className={styles.members__meta} aria-label="Subreddit rank">
            <span className={styles.members__data}>#1</span>
            <span className={styles.members__description}> on this site</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.aside__btnCreate}
          onClick={goToCreatePost}
        >
          Create Post
        </button>
      </aside>

      <SubredditRules name={subreddit.name} />
    </>
  );
}
export default SubredditAside;
