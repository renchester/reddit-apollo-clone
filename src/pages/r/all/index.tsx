import Head from 'next/head';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { type ReactElement } from 'react';
import AsideContainer from '@/components/asides/AsideContainer';
import PostPreview from '@/components/posts/PostPreview';
import SubredditAside from '@/components/asides/SubredditAside';
import SubredditRules from '@/components/asides/SubredditRules';

function SubredditPage() {
  return (
    <>
      <Head>
        <title>r/All - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">All</h1>
          <PostPreview id="4" />
          <PostPreview id="5" />
          <PostPreview id="6" />
          <PostPreview id="7" />
          <PostPreview id="8" />
        </main>

        <AsideContainer>
          <SubredditAside />
          <SubredditRules />
        </AsideContainer>
      </div>
    </>
  );
}

SubredditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default SubredditPage;
