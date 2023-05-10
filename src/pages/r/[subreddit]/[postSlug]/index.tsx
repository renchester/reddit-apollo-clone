import styles from './PostPage.module.scss';
import { ReactElement, Suspense } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { NewCommentProvider } from '@/hooks/useNewComment';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';
import PostMain from '@/components/posts/PostMain';
import CommentFeed from '@/components/comments/CommentFeed';
import Loading from '@/components/Loading';

import fetchSubredditData from '@/firebase/firestore/subreddits/read/fetchSubredditData';
import fetchPostData from '@/firebase/firestore/posts/read/fetchPostData';
import fetchPostComments from '@/firebase/firestore/comments/read/fetchPostComments';
import { Comment, Post, Subreddit } from '@/types/types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const subreddit = await fetchSubredditData(params?.subreddit as string);
  const post = await fetchPostData(params?.postSlug as string);
  const comments = await fetchPostComments(post?.post_id as string);

  return {
    props: {
      subreddit,
      post,
      comments,
    },
  };
};

type PostPageProps = {
  subreddit: Subreddit;
  post: Post;
  comments: Comment[];
};

function PostPage(props: PostPageProps) {
  const { subreddit, post, comments } = props;

  const pageTitle = `${post.title} - Reddit Clone`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="page__container">
        <main className={styles.main}>
          <NewCommentProvider parentPost={post} comments={comments}>
            <PostMain post={post} />
            {comments.length > 0 ? (
              <Suspense fallback={<Loading message="Loading comments" />}>
                <CommentFeed />
              </Suspense>
            ) : (
              <div className={styles.empty}>
                <span className={styles.empty__h1}>No comments yet</span>
                <span className={styles.empty__h2}>
                  It&apos;s quiet out here... Too quiet...
                </span>
              </div>
            )}
          </NewCommentProvider>
        </main>

        <AsideContainer>
          <SubredditAside subreddit={subreddit} />
        </AsideContainer>
      </div>
    </>
  );
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  let label = '';

  if (page.props.comments) {
    label = `${page.props.comments.length} comments`;
  } else label = 'Post';

  return (
    <MasterLayout>
      <FeedPageLayout label={label}>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default PostPage;
