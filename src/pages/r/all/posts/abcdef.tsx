import styles from './PostPage.module.scss';

import Head from 'next/head';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';
import { ReactElement } from 'react';
import PostMain from '@/components/posts/PostMain';
import { NewCommentProvider } from '@/hooks/useNewComment';
import CommentFeed from '@/components/comments/CommentFeed';

function PostPage() {
  return (
    <>
      <Head>
        <title>Post title - Reddit Clone</title>
      </Head>

      <div className="page__container">
        <main className="">
          <PostMain id="123" />
          <NewCommentProvider>
            <CommentFeed />
          </NewCommentProvider>
        </main>

        <AsideContainer>
          <SubredditAside />
        </AsideContainer>
      </div>
    </>
  );
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default PostPage;
