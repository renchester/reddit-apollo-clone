import PostPreview from '@/components/posts/PostPreview';
import styles from '../AccountPage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import MasterLayout from '@/layouts/MasterLayout';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { Post } from '@/types/types';
import fetchPostDataById from '@/firebase/firestore/posts/read/fetchPostDataById';
import { useSnackbar } from '@/hooks/useSnackbar';

function SavedPostsPage() {
  const { user, bookmarkedPosts } = useAuth();
  const { addAlert } = useSnackbar();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user || !bookmarkedPosts) {
      setPosts([]);
      return;
    }

    const sortedBookmarks = bookmarkedPosts.sort((a, b) => {
      if (
        new Date(a.date_created as string) > new Date(b.date_created as string)
      ) {
        return -1;
      } else return 1;
    });

    const fetchPosts = async () => {
      try {
        for await (const savedPost of sortedBookmarks) {
          const result = await fetchPostDataById(savedPost.post_id);

          if (result) {
            setPosts((prev) => [...prev, result]);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          addAlert({
            message: error.message,
            status: 'error',
          });
        }
      }
    };

    fetchPosts();
  }, [user, bookmarkedPosts, addAlert]);

  return (
    <>
      <Head>
        <title>Saved Posts - Reddit Clone</title>
      </Head>
      <div className="page__container">
        {user ? (
          <main className={styles.main}>
            <Link
              href="/account"
              aria-label="Link to account page"
              className={styles.link}
            >
              <i
                className={`material-symbols-outlined ${styles.link__icon}`}
                aria-hidden
              >
                arrow_back_ios
              </i>
              <span>Account Page</span>
            </Link>
            <h2 className={styles.title}>Saved Posts</h2>
            {posts.map((post) => (
              <PostPreview key={`saved-post__${post.post_id}`} post={post} />
            ))}
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

SavedPostsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Saved">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default SavedPostsPage;
