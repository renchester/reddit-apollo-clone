import styles from './UserMain.module.scss';
import { User } from '@/types/types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

type UserMainProps = {
  user: User;
};

function UserMain(props: UserMainProps) {
  const { user } = props;
  const dateCreated = formatDistanceToNowStrict(
    new Date(user.date_created as string),
  );

  return (
    <section className={styles.account}>
      <h1 className={styles.account__name}>{user.username}</h1>

      <div className={styles.meta}>
        <div className={styles.meta__dataWrapper}>
          <span className={styles.meta__data}>{user.comment_karma}</span>
          <span className={styles.meta__label}>Comment Karma</span>
        </div>
        <div className={styles.meta__dataWrapper}>
          <span className={styles.meta__data}>{user.post_karma}</span>
          <span className={styles.meta__label}>Post Karma</span>
        </div>
        <div className={styles.meta__dataWrapper}>
          <time
            dateTime={user.date_created.toString()}
            className={styles.meta__data}
          >
            {dateCreated || user.date_created.toString()}
          </time>
          <span className={styles.meta__label}>Account Age</span>
        </div>
      </div>
    </section>
  );
}
export default UserMain;
