import styles from './SubredditPage.module.scss';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { useState, type ReactElement, useEffect } from 'react';
import AsideContainer from '@/components/asides/AsideContainer';
import PostPreview from '@/components/posts/PostPreview';
import SubredditAside from '@/components/asides/SubredditAside';
import SubredditMenu from '@/components/subreddits/SubredditMenu';
import fetchAllSubreddits from '@/firebase/firestore/subreddits/fetchAllSubreddits';
import { Subreddit } from '@/types/types';
import fetchSubredditData from '@/firebase/firestore/subreddits/fetchSubredditData';
import Loading from '@/components/Loading';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useAuth } from '@/hooks/useAuth';
import leaveSubreddit from '@/firebase/firestore/subreddits/leaveSubreddit';
import joinSubreddit from '@/firebase/firestore/subreddits/joinSubreddit';

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

type SubredditPageProps = {
  subreddit: Subreddit;
};

function SubredditPage(props: SubredditPageProps) {
  const { subreddit } = props;
  const router = useRouter();
  const { user, subscriptions } = useAuth();
  const { addAlert } = useSnackbar();

  const [isMenuShown, setMenuVisibility] = useState(false);
  const [isUserSubscribed, setUserSubscription] = useState(false);

  useEffect(() => {
    if (!subscriptions) {
      setUserSubscription(false);
    }

    const val = !!subscriptions?.find(
      (curr) => curr.subreddit_id === subreddit.subreddit_id,
    );

    setUserSubscription(val);
  }, [subscriptions, subreddit.subreddit_id]);

  const pageTitle = `r/${subreddit.name} - Reddit Clone`;

  const toggleMenu = () => setMenuVisibility((prev) => !prev);

  const handleSubscriptionChange = async () => {
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
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {router.isFallback ? (
        <Loading message="Loading user data" />
      ) : (
        <div className="page__container">
          <main className="page__feed">
            <div className={styles.sub__header}>
              <h1 className="page__title">{subreddit.name}</h1>
              <p className={styles.sub__description}>{subreddit.description}</p>

              {user && (
                <div className={styles.btn__container}>
                  <button
                    type="button"
                    aria-label="Subscribe to this subreddit and join the community"
                    className={styles.btn__join}
                    onClick={handleSubscriptionChange}
                  >
                    {isUserSubscribed ? 'Leave' : 'Subscribe'}
                  </button>
                  <button
                    type="button"
                    aria-label="Show subreddit options"
                    aria-haspopup
                    aria-expanded={isMenuShown}
                    className={styles.btn__options}
                    onClick={toggleMenu}
                  >
                    <i
                      className={`material-symbols-outlined ${styles.btn__icon}`}
                      aria-hidden
                    >
                      more_horiz
                    </i>
                  </button>

                  {isMenuShown && <SubredditMenu />}
                </div>
              )}
            </div>
            <PostPreview id="4" />
            <PostPreview id="5" />
            <PostPreview id="6" />
            <PostPreview id="7" />
            <PostPreview id="8" />
          </main>

          <AsideContainer>
            <SubredditAside subreddit={subreddit} />
          </AsideContainer>
        </div>
      )}
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
