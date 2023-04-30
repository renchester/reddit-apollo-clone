import styles from './AccountPage.module.scss';
import Head from 'next/head';
import { ReactElement } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import PostPreview from '@/components/posts/PostPreview';
import CommentPreview from '@/components/comments/CommentPreview';

function AccountPage() {
  return (
    <>
      <Head>
        <title>Account - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className={styles.main}>
          <section className={styles.account}>
            <h1 className={styles.account__name}>redditor_123</h1>

            <div className={styles.meta}>
              <div className={styles.meta__dataWrapper}>
                <span className={styles.meta__data}>1.2k</span>
                <span className={styles.meta__label}>Comment Karma</span>
              </div>
              <div className={styles.meta__dataWrapper}>
                <span className={styles.meta__data}>17.2k</span>
                <span className={styles.meta__label}>Post Karma</span>
              </div>
              <div className={styles.meta__dataWrapper}>
                <span className={styles.meta__data}>2y 2mo</span>
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
