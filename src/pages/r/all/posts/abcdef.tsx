import styles from './PostPage.module.scss';

import Head from 'next/head';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';
import { ReactElement } from 'react';
import PostMain from '@/components/posts/PostMain';
import Comment from '@/components/comments/Comment';

function PostPage() {
  return (
    <>
      <Head>
        <title>Post title - Reddit Clone</title>
      </Head>

      <div className="page__container">
        <main className="">
          <PostMain id="123" />
          <div className={styles.comment__feed}>
            <Comment level={1}>
              <Comment level={2}>
                <Comment level={3} />
              </Comment>
              <Comment level={2}>
                <Comment level={3}>
                  <Comment level={4}>
                    <Comment level={5}>
                      <Comment level={6}></Comment>
                    </Comment>
                  </Comment>
                </Comment>
              </Comment>
              <Comment level={2}></Comment>
            </Comment>
            <Comment level={1} />
          </div>
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
