import Head from 'next/head';

import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { ReactElement, useEffect, useState } from 'react';
import AsideContainer from '@/components/asides/AsideContainer';
import AsideTemplate from '@/components/asides/AsideTemplate';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types/types';
import { GetStaticProps } from 'next';
import fetchAllPosts from '@/firebase/firestore/posts/read/fetchAllPosts';
import PostPreview from '@/components/posts/PostPreview';

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
  const [homePosts, setHomePosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (!user || !subscriptions) {
      setHomePosts(posts);
      return;
    }
    const subscriptionNames = subscriptions.map((sub) => sub.subreddit);

    const userSubscribedPosts = posts.filter((post) =>
      subscriptionNames.includes(post.parent_subreddit),
    );

    setHomePosts(userSubscribedPosts);
  }, [user, posts, subscriptions]);

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
            <p>No posts yet</p>
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
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default HomePage;
