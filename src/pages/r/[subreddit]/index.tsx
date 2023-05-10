import styles from './SubredditPage.module.scss';
import { useState, type ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import { usePreferredSort } from '@/hooks/usePreferredSort';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import PostPreview from '@/components/posts/PostPreview';
import SubredditAside from '@/components/asides/SubredditAside';
import SubredditMenu from '@/components/subreddits/SubredditMenu';
import Loading from '@/components/Loading';
import fetchAllSubreddits from '@/firebase/firestore/subreddits/read/fetchAllSubreddits';
import fetchSubredditData from '@/firebase/firestore/subreddits/read/fetchSubredditData';
import leaveSubreddit from '@/firebase/firestore/subreddits/update/leaveSubreddit';
import joinSubreddit from '@/firebase/firestore/subreddits/update/joinSubreddit';
import fetchPostsBySubreddit from '@/firebase/firestore/posts/read/fetchPostsBySubreddit';
import { ImagePost, Post, Subreddit } from '@/types/types';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subreddit = await fetchSubredditData(params?.subreddit as string);
  const posts = await fetchPostsBySubreddit(subreddit?.name as string);

  return {
    props: {
      subreddit,
      posts,
    },
    revalidate: 120,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSubreddits = (await fetchAllSubreddits()) as Subreddit[];

  const paths = allSubreddits?.map((sub) => ({
    params: { subreddit: sub.name },
  }));

  return {
    paths,
    fallback: true,
  };
};

type SubredditPageProps = {
  subreddit: Subreddit;
  posts: (Post | ImagePost)[];
};

function SubredditPage(props: SubredditPageProps) {
  const { subreddit, posts: _posts } = props;
  const router = useRouter();
  const { user, subscriptions } = useAuth();
  const { addAlert } = useSnackbar();
  const { preferredSort } = usePreferredSort();

  const [isMenuShown, setMenuVisibility] = useState(false);
  const [isUserSubscribed, setUserSubscription] = useState(false);
  const [isFavorited, setFavoritedStatus] = useState(false);

  const [posts, setPosts] = useState(_posts);

  useEffect(() => {
    const postsCopy = [..._posts];

    if (preferredSort === 'new') {
      const sortedPostsByDate = postsCopy.sort((a, b) =>
        new Date(a.date_created as string) > new Date(b.date_created as string)
          ? -1
          : 1,
      );

      setPosts(sortedPostsByDate);
    } else if (preferredSort === 'popular') {
      const sortedPostsByUpvotes = postsCopy.sort((a, b) =>
        a.post_karma > b.post_karma ? -1 : 1,
      );

      setPosts(sortedPostsByUpvotes);
    }
  }, [preferredSort, _posts]);

  useEffect(() => {
    if (!subscriptions) {
      setUserSubscription(false);
    }

    const target = subscriptions?.find(
      (curr) => curr.subreddit_id === subreddit.subreddit_id,
    );

    setUserSubscription(!!target);
    setFavoritedStatus(target?.isFavorite || false);
  }, [subscriptions, subreddit.subreddit_id]);

  const pageTitle = `r/${subreddit.name} - Reddit Clone`;

  const hideMenu = () => setMenuVisibility(false);
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisibility((prev) => !prev);
  };

  const handleSubscriptionChange = async () => {
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

  if (router.isFallback || !subreddit || !_posts) {
    return <Loading message="Loading subreddit" />;
  }

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

                  {isMenuShown && (
                    <SubredditMenu
                      hideMenu={hideMenu}
                      subreddit={subreddit}
                      isUserSubscribed={isUserSubscribed}
                      handleSubscriptionChange={handleSubscriptionChange}
                      isFavorited={isFavorited}
                    />
                  )}
                </div>
              )}
            </div>

            {posts.length > 0 ? (
              posts.map((post) => (
                <PostPreview key={`sub-page--${post.post_id}`} post={post} />
              ))
            ) : (
              <p>No posts yet</p>
            )}
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
  let label = '';

  if (page.props.subreddit) {
    label = page.props.subreddit.name;
  }
  return (
    <MasterLayout>
      <FeedPageLayout label={label || 'Community'} isSortable>
        {page}
      </FeedPageLayout>
    </MasterLayout>
  );
};

export default SubredditPage;
