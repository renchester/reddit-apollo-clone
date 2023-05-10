import styles from './SubmitPostPage.module.scss';
import { type ReactElement } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useAuth } from '@/hooks/useAuth';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import SubmitPanel from '@/components/posts/SubmitPanel';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';
import fetchSubredditData from '@/firebase/firestore/subreddits/read/fetchSubredditData';

import { Subreddit } from '@/types/types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const subreddit = await fetchSubredditData(params?.subreddit as string);

  return {
    props: {
      subreddit,
    },
  };
};

type SubmitPostPageProps = {
  subreddit: Subreddit;
};

function SubmitPostPage(props: SubmitPostPageProps) {
  const { subreddit } = props;
  const { user } = useAuth();
  const pageTitle = `Submit a post - r/${subreddit.name} - Reddit Clone`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="page__container">
        {user ? (
          <>
            <main className={styles.main}>
              <h1
                className={styles.title}
              >{`Create a post in r/${subreddit.name}`}</h1>
              <p className={styles.rules}>
                Make sure to follow site and subreddit rules. No NSFW and
                discriminatory posts.
              </p>
              <SubmitPanel subreddit={subreddit} />
            </main>
            <AsideContainer>
              <SubredditAside subreddit={subreddit} />
            </AsideContainer>
          </>
        ) : (
          <p>You must be logged in to submit a post</p>
        )}
      </div>
    </>
  );
}

SubmitPostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Create post">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default SubmitPostPage;
