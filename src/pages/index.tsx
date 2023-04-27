import styles from './HomePage.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import type { ReactElement } from 'react';
import PostPreview from '@/components/posts/PostPreview';
import AsideContainer from '@/components/asides/AsideContainer';
import HomeAside from '@/components/asides/HomeAside';

function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.feed}>
        <h1 className="page__title">Popular</h1>
        <PostPreview id="1" />
        <PostPreview id="2" />
        <PostPreview id="3" />
      </main>

      <AsideContainer>
        <HomeAside />
      </AsideContainer>
    </div>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout>{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default HomePage;
