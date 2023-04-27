import { type ReactElement } from 'react';
import Head from 'next/head';
import AsideContainer from '@/components/asides/AsideContainer';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AllSubredditsPageAside from '@/components/asides/AllSubredditsPageAside';
import SubredditPreview from '@/components/subreddits/SubredditPreview';

function AllSubredditsPage() {
  return (
    <>
      <Head>
        <title>Subreddits - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">Subreddits</h1>
          <SubredditPreview id="23" href="/r/all" />
          <SubredditPreview id="234" href="/r/all" />
          <SubredditPreview id="a3" href="/r/all" />
        </main>
        <AsideContainer>
          <AllSubredditsPageAside />
        </AsideContainer>
      </div>
    </>
  );
}

AllSubredditsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default AllSubredditsPage;
