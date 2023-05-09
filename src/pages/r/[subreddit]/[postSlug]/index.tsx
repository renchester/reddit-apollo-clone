import styles from './PostPage.module.scss';
import Head from 'next/head';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import AsideContainer from '@/components/asides/AsideContainer';
import SubredditAside from '@/components/asides/SubredditAside';
import { ReactElement, Suspense } from 'react';
import PostMain from '@/components/posts/PostMain';
import { NewCommentProvider } from '@/hooks/useNewComment';
import CommentFeed from '@/components/comments/CommentFeed';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetchPostsBySubreddit from '@/firebase/firestore/posts/read/fetchPostsBySubreddit';
import fetchAllSubreddits from '@/firebase/firestore/subreddits/read/fetchAllSubreddits';
import fetchSubredditData from '@/firebase/firestore/subreddits/read/fetchSubredditData';
import fetchPostData from '@/firebase/firestore/posts/read/fetchPostData';
import fetchPostComments from '@/firebase/firestore/comments/read/fetchPostComments';
import { Comment, Post, Subreddit } from '@/types/types';
import Loading from '@/components/Loading';
import ScrollToTop from '@/components/utility/ScrollToTop';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subreddit = await fetchSubredditData(params?.subreddit as string);
  const post = await fetchPostData(params?.postSlug as string);
  const comments = (await fetchPostComments(post?.post_id as string)) || [];

  return {
    props: {
      subreddit,
      post,
      comments,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSubreddits = (await fetchAllSubreddits()) as Subreddit[];

  let paths: { params: { subreddit: string; postSlug: string } }[] = [];

  for await (const sub of allSubreddits) {
    const posts = (await fetchPostsBySubreddit(sub.name)) as Post[];

    posts?.map((post) => {
      paths = [
        ...paths,
        {
          params: {
            subreddit: sub.name,
            postSlug: post.slug,
          },
        },
      ];
    });
  }

  return { paths, fallback: false };
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
      <ScrollToTop />
    </>
  );
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  const label = `${page.props.comments.length} comments`;

  return (
    <MasterLayout>
      <FeedPageLayout label={label}>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default PostPage;
