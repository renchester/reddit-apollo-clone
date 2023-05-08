import styles from './AccountPage.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { useAuth } from '@/hooks/useAuth';
import fetchPostsByUser from '@/firebase/firestore/posts/read/fetchPostsByUser';
import fetchCommentsByUser from '@/firebase/firestore/comments/read/fetchCommentsByUser';
import UserMain from '@/components/user/UserMain';
import { Comment, Post } from '@/types/types';
import { useSnackbar } from '@/hooks/useSnackbar';
import UserOverview from '@/components/user/UserOverview';

function AccountPage() {
  const { user } = useAuth();
  const { addAlert } = useSnackbar();

  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchUserCreations = async () => {
      try {
        const userPosts =
          (await fetchPostsByUser(user.user_id as string)) || [];
        const userComments =
          (await fetchCommentsByUser(user.user_id as string)) || [];

        setPosts(userPosts);
        setComments(userComments);
      } catch (error) {
        if (error instanceof Error) {
          addAlert({
            message: error.message,
            status: 'error',
          });
        }
      }
    };

    fetchUserCreations();
  }, [user, addAlert]);

  return (
    <>
      <Head>
        <title>Account - Reddit Clone</title>
      </Head>
      <div className="page__container">
        {user ? (
          <main className={styles.main}>
            <UserMain user={user} />
            <Link href={`/account/saved`} className={styles.interaction}>
              <div className={styles.interaction__left}>
                <i
                  className={`material-symbols-outlined ${styles.interaction__leftIcon}`}
                  aria-hidden
                >
                  bookmark
                </i>
                <span>Saved Posts</span>
              </div>
              <i
                className={`material-symbols-outlined ${styles.interaction__right}`}
                aria-hidden
              >
                arrow_forward_ios
              </i>
            </Link>

            <UserOverview posts={posts} comments={comments} />
          </main>
        ) : (
          <div className={styles.noAuth}>
            <p className="not-signed-in">
              You must be logged in to view this page
            </p>
            <Link
              href="/account/login"
              className={styles.noAuth__link}
              aria-label="Link to log in page"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Account">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default AccountPage;
