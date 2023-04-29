import styles from './SubredditPage.module.scss';
import Head from 'next/head';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { useState, type ReactElement } from 'react';
import AsideContainer from '@/components/asides/AsideContainer';
import PostPreview from '@/components/posts/PostPreview';
import SubredditAside from '@/components/asides/SubredditAside';
import SubredditMenu from '@/components/menus/SubredditMenu';

function SubredditPage() {
  const [isMenuShown, setMenuVisibility] = useState(false);

  const toggleMenu = () => setMenuVisibility((prev) => !prev);

  return (
    <>
      <Head>
        <title>r/All - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <div className={styles.sub__header}>
            <h1 className="page__title">All</h1>
            <p className={styles.sub__description}>
              Welcome to r/All. This is where everything is found. Reddit&apos;s
              very own.
            </p>

            <div className={styles.btn__container}>
              <button
                type="button"
                aria-label="Subscribe to this subreddit and join the community"
                className={styles.btn__join}
              >
                Join
              </button>
              <button
                type="button"
                aria-label="Show subreddit options"
                aria-haspopup
                aria-expanded={isMenuShown}
                className={styles.btn__options}
                onClick={toggleMenu}
              >
                <i
                  className={`material-symbols-outlined ${styles.btn__icon}`}
                  aria-hidden
                >
                  more_horiz
                </i>
              </button>

              {isMenuShown && <SubredditMenu />}
            </div>
          </div>
          <PostPreview id="4" />
          <PostPreview id="5" />
          <PostPreview id="6" />
          <PostPreview id="7" />
          <PostPreview id="8" />
        </main>

        <AsideContainer>
          <SubredditAside />
        </AsideContainer>
      </div>
    </>
  );
}

SubredditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default SubredditPage;
