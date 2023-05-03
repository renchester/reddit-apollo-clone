import styles from './AccountPage.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import PostPreview from '@/components/posts/PostPreview';
import CommentPreview from '@/components/comments/CommentPreview';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNowStrict } from 'date-fns';

function AccountPage() {
  const { user } = useAuth();

  let dateCreated = '';

  if (user) {
    dateCreated = formatDistanceToNowStrict(new Date(user.date_created));
  }

  return (
    <>
      <Head>
        <title>Account - Reddit Clone</title>
      </Head>
      <div className="page__container">
        {user ? (
          <main className={styles.main}>
            <section className={styles.account}>
              <h1 className={styles.account__name}>{user.username}</h1>

              <div className={styles.meta}>
                <div className={styles.meta__dataWrapper}>
                  <span className={styles.meta__data}>
                    {user.comment_karma}
                  </span>
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
            <section className={styles.overview}>
              <h2 className={styles.overview__title}>Overview</h2>
              <div className={styles.overview__feed}>
                <PostPreview id="2345" />
                <CommentPreview id="23456" />
              </div>
            </section>
          </main>
        ) : (
          <Link href="/account/login">Log in</Link>
        )}
      </div>
    </>
  );
}

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default AccountPage;
