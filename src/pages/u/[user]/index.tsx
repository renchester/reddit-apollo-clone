import { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useAuth } from '@/hooks/useAuth';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import fetchCommentsByUser from '@/firebase/firestore/comments/read/fetchCommentsByUser';
import fetchPostsByUser from '@/firebase/firestore/posts/read/fetchPostsByUser';
import fetchAllUsers from '@/firebase/firestore/user/fetchAllUsers';
import fetchUserDetailsByUsername from '@/firebase/firestore/user/fetchUserDetailsByUsername';
import UserMain from '@/components/user/UserMain';
import UserOverview from '@/components/user/UserOverview';
import Loading from '@/components/Loading';
import { Post, User, Comment } from '@/types/types';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await fetchUserDetailsByUsername(params?.user as string);
  const posts = (await fetchPostsByUser(user?.user_id as string)) || [];
  const comments = (await fetchCommentsByUser(user?.user_id as string)) || [];

  return {
    props: {
      user,
      posts,
      comments,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allUsers = (await fetchAllUsers()) as User[];
  const paths = allUsers.map((user) => ({
    params: { user: user.username },
  }));

  return {
    paths,
    fallback: true,
  };
};

type UserPageProps = {
  user: User;
  posts: Post[];
  comments: Comment[];
};

function UserPage(props: UserPageProps) {
  const { user, posts, comments } = props;
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const pageTitle = `u/${user.username} - Reddit Clone`;

  useEffect(() => {
    if (!currentUser) return;

    // Redirect to account page
    if (user.user_id === currentUser.user_id) {
      router.push(`/account`);
    }
  }, [user, currentUser, router]);

  if (router.isFallback || !user || !posts || !comments) {
    return <Loading message="Loading user data" />;
  }

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <UserMain user={user} />
          <UserOverview posts={posts} comments={comments} />
        </main>
      </div>
    </div>
  );
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  let label = '';

  if (page.props.user) {
    label = page.props.user.username;
  }

  return (
    <MasterLayout>
      <FeedPageLayout label={label || 'User'}>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default UserPage;
