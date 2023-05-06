import { type ReactElement } from 'react';
import Head from 'next/head';
import AsideContainer from '@/components/asides/AsideContainer';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AllSubredditsPageAside from '@/components/asides/AllSubredditsPageAside';
import SubredditPreview from '@/components/subreddits/SubredditPreview';
import fetchAllSubreddits from '@/firebase/firestore/subreddits/read/fetchAllSubreddits';
import { Subreddit } from '@/types/types';

export async function getStaticProps() {
  let subreddits = (await fetchAllSubreddits()) || [];
  console.log(subreddits);

  return {
    props: {
      subreddits,
    },
    revalidate: 300,
  };
}

type AllSubredditsPageProps = {
  subreddits: Subreddit[];
};

function AllSubredditsPage(props: AllSubredditsPageProps) {
  const { subreddits } = props;

  return (
    <>
      <Head>
        <title>Subreddits - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">Subreddits</h1>

          {subreddits.length > 0 ? (
            subreddits.map((sub) => (
              <SubredditPreview
                key={sub.subreddit_id}
                id={sub.subreddit_id}
                subreddit={sub}
                href={`/r/${sub.name}`}
              />
            ))
          ) : (
            <p>There are no subreddits in this app yet.</p>
          )}
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
