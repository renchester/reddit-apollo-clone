import styles from './FeedPageLayout.module.scss';
import type { ReactNode } from 'react';
import Header from '@/components/headers/Header';
import Footer from '@/components/Footer';

type FeedPageLayoutProps = {
  children: ReactNode;
  label?: string;
  isSortable?: boolean;
};

function FeedPageLayout(props: FeedPageLayoutProps) {
  const { children, label, isSortable } = props;

  return (
    <div className={styles.layout__feed}>
      <Header label={label} isSortable={isSortable} />
      {children}
    </div>
  );
}

export default FeedPageLayout;
