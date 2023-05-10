import { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useAuth } from '@/hooks/useAuth';
import { usePreferredSort } from '@/hooks/usePreferredSort';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import AsideTemplate from '@/components/asides/AsideTemplate';
import PostPreview from '@/components/posts/PostPreview';
import fetchAllPosts from '@/firebase/firestore/posts/read/fetchAllPosts';
import { Post } from '@/types/types';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchAllPosts(50);

  return {
    props: { posts },
    revalidate: 60,
  };
};

type HomePageProps = {
  posts: Post[];
};

function HomePage(props: HomePageProps) {
  const { posts } = props;
  const { user, subscriptions } = useAuth();
  const { preferredSort } = usePreferredSort();
  const [homePosts, setHomePosts] = useState<Post[]>(posts);

  useEffect(() => {
    const postsCopy = [...posts];

    // For non-logged in users, set to all posts
    if (!user || !subscriptions) {
      let sortedPosts: Post[];

      if (preferredSort === 'new') {
        sortedPosts = postsCopy.sort((a, b) =>
          new Date(a.date_created as string) >
          new Date(b.date_created as string)
            ? -1
            : 1,
        );
      } else {
        sortedPosts = postsCopy.sort((a, b) =>
          a.post_karma > b.post_karma ? -1 : 1,
        );
      }

      setHomePosts(sortedPosts);
    } else {
      // For logged-in users, set to subscribed subs
      const subscriptionNames = subscriptions.map((sub) => sub.subreddit);

      const userSubscribedPosts = posts.filter((post) =>
        subscriptionNames.includes(post.parent_subreddit),
      );

      let sortedPosts: Post[];

      if (preferredSort === 'new') {
        sortedPosts = userSubscribedPosts.sort((a, b) =>
          new Date(a.date_created as string) >
          new Date(b.date_created as string)
            ? -1
            : 1,
        );
      } else {
        sortedPosts = userSubscribedPosts.sort((a, b) =>
          a.post_karma > b.post_karma ? -1 : 1,
        );
      }

      setHomePosts(sortedPosts);
    }
  }, [user, posts, subscriptions, preferredSort]);

  return (
    <>
      <Head>
        <title>Home - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">Home</h1>
          {homePosts.length > 0 ? (
            homePosts.map((post) => (
              <PostPreview key={`home-${post.post_id}`} post={post} />
            ))
          ) : (
            <p>{user ? 'You have no subscriptions yet' : 'No posts yet'}</p>
          )}
        </main>
        <AsideContainer>
          <AsideTemplate
            title="Home"
            description="Your personal Reddit frontpage. Come here to check in with your favorite communities."
          />
        </AsideContainer>
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Home" isSortable>
        {page}
      </FeedPageLayout>
    </MasterLayout>
  );
};

export default HomePage;
