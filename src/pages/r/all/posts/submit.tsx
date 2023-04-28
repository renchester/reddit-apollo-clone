import styles from './Submit.module.scss';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { type ReactElement } from 'react';
import Head from 'next/head';

import SubmitPanel from '@/components/posts/SubmitPanel';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';

function SubmitPostPage() {
  return (
    <>
      <Head>
        <title>Submit a post - r/All - Reddit Clone</title>
      </Head>

      <div className="page__container">
        <main className={styles.main}>
          <h1 className="page__title">Create a post</h1>
          <SubmitPanel />
        </main>
        <AsideContainer>
          <SubredditAside />
        </AsideContainer>
      </div>
    </>
  );
}

SubmitPostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default SubmitPostPage;
