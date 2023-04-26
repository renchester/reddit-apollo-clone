import styles from './FeedPageLayout.module.scss';
import type { ReactNode } from 'react';
import Header from '@/components/Header';

type FeedPageLayoutProps = {
  children: ReactNode;
};

function FeedPageLayout(props: FeedPageLayoutProps) {
  const { children } = props;

  return (
    <div className={styles.layout__feed}>
      <Header />
      {children}
    </div>
  );
}

export default FeedPageLayout;
