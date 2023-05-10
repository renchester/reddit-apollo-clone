import styles from './AboutPage.module.scss';
import { ReactElement } from 'react';
import Head from 'next/head';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import MasterLayout from '@/layouts/MasterLayout';
import Footer from '@/components/Footer';

function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Reddit Clone</title>
      </Head>
      <div className="page__container">
        <main className="page__feed">
          <h2 className="page__title">About this site </h2>
          <a
            href="https://github.com/renchester/reddit-apollo-clone"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.link}
          >
            Check the Github repository of this app
          </a>
          <p className={styles.info}>
            This Reddit clone is built using React + NextJS for the front-end,
            Firebase for the back-end, and Sass for styling.
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="About">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default AboutPage;
