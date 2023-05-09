import styles from './SubmitPostPage.module.scss';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { type ReactElement } from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

import SubmitPanel from '@/components/posts/SubmitPanel';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';

import fetchSubredditData from '@/firebase/firestore/subreddits/read/fetchSubredditData';
import fetchAllSubreddits from '@/firebase/firestore/subreddits/read/fetchAllSubreddits';
import { Subreddit } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subreddit = await fetchSubredditData(params?.subreddit as string);

  return {
    props: {
      subreddit,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSubreddits = (await fetchAllSubreddits()) as Subreddit[];

  const paths = allSubreddits?.map((sub) => ({
    params: { subreddit: sub.name },
  }));

  return {
    paths,
    fallback: false,
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
