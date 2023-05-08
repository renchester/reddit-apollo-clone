import AsideContainer from '@/components/asides/AsideContainer';
import AsideTemplate from '@/components/asides/AsideTemplate';
import PostPreview from '@/components/posts/PostPreview';
import fetchPopularPosts from '@/firebase/firestore/posts/read/fetchPopularPosts';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import MasterLayout from '@/layouts/MasterLayout';
import { Post } from '@/types/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPopularPosts(50);

  return {
    props: { posts },
    revalidate: 600,
  };
};

type PopularPageProps = {
  posts: Post[];
};

function PopularPage(props: PopularPageProps) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Popular - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">Popular</h1>

          {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview key={`popular-${post.post_id}`} post={post} />
            ))
          ) : (
            <p>No posts yet</p>
          )}
        </main>
        <AsideContainer>
          <AsideTemplate
            title="Popular"
            description="The most popular posts on Reddit right now. Come here so you won't get FOMO on the hottest topics."
          />
        </AsideContainer>
      </div>
    </>
  );
}

PopularPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Popular">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default PopularPage;
