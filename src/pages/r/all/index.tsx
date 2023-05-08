import { ReactElement } from 'react';
import AsideContainer from '@/components/asides/AsideContainer';
import AsideTemplate from '@/components/asides/AsideTemplate';
import PostPreview from '@/components/posts/PostPreview';
import fetchAllPosts from '@/firebase/firestore/posts/read/fetchAllPosts';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import MasterLayout from '@/layouts/MasterLayout';
import { Post } from '@/types/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchAllPosts(50);

  return {
    props: { posts },
    revalidate: 60,
  };
};

type AllPageProps = {
  posts: Post[];
};

function AllPage(props: AllPageProps) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>r/All - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h1 className="page__title">All Posts</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostPreview key={`home-${post.post_id}`} post={post} />
            ))
          ) : (
            <p>No posts yet</p>
          )}
        </main>
        <AsideContainer>
          <AsideTemplate
            title="All"
            description="Everything, everywhere, all at once, at least on Reddit. Find the latest posts here."
          />
        </AsideContainer>
      </div>
    </>
  );
}

AllPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="All">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default AllPage;
