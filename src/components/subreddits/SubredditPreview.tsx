import { Subreddit } from '@/types/types';
import styles from './SubredditPreview.module.scss';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import leaveSubreddit from '@/firebase/firestore/subreddits/update/leaveSubreddit';
import joinSubreddit from '@/firebase/firestore/subreddits/update/joinSubreddit';
import { useSnackbar } from '@/hooks/useSnackbar';

type SubredditPreviewProps = {
  id: string;
  href: string;
  subreddit: Subreddit;
};

function SubredditPreview(props: SubredditPreviewProps) {
  const { id, href, subreddit } = props;
  const { user, subscriptions } = useAuth();
  const { addAlert } = useSnackbar();

  const [isUserSubscribed, setSubscription] = useState(false);

  const handleSubscriptionChange = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (!user) {
        addAlert({
          message: 'Subscriptions are only available for logged in users',
          status: 'error',
        });
      } else if (isUserSubscribed) {
        await leaveSubreddit(user, subreddit.name);
        addAlert({ message: `Left r/${subreddit.name}`, status: 'neutral' });
      } else if (!isUserSubscribed) {
        await joinSubreddit(user, subreddit.name, subreddit.subreddit_id);
        addAlert({ message: `Joined r/${subreddit.name}`, status: 'success' });
      }
    } catch (error) {
      if (error instanceof Error) {
        addAlert({ message: error.message, status: 'error' });
      }
    }
  };

  useEffect(() => {
    if (!user || !subscriptions) {
      setSubscription(false);
      return;
    }

    if (
      !!subscriptions.find((sub) => sub.subreddit_id === subreddit.subreddit_id)
    ) {
      setSubscription(true);
    }
  }, [user, subscriptions, subreddit]);

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
        {user && (
          <button
            type="button"
            className={styles.btnJoin}
            onClick={handleSubscriptionChange}
          >
            {isUserSubscribed ? 'Leave' : 'Join'}
          </button>
        )}
        <button
          type="button"
          className={styles.btnReport}
          onClick={(e) => e.preventDefault()}
        >
          Report
        </button>
      </Link>
    </article>
  );
}
export default SubredditPreview;
