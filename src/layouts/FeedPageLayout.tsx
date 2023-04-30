import styles from './FeedPageLayout.module.scss';
import type { ReactNode } from 'react';
import Header from '@/components/headers/Header';
import Footer from '@/components/Footer';

type FeedPageLayoutProps = {
  children: ReactNode;
  label?: string;
};

function FeedPageLayout(props: FeedPageLayoutProps) {
  const { children, label } = props;

  return (
    <div className={styles.layout__feed}>
      <Header label={label} />
      {children}
      <Footer />
    </div>
  );
}

export default FeedPageLayout;
