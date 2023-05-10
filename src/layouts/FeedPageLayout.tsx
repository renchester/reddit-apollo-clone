import styles from './FeedPageLayout.module.scss';
import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { usePreferredSort } from '@/hooks/usePreferredSort';
import Header from '@/components/headers/Header';

type FeedPageLayoutProps = {
  children: ReactNode;
  label?: string;
  isSortable?: boolean;
};

function FeedPageLayout(props: FeedPageLayoutProps) {
  const { children, label, isSortable } = props;
  const { preferredSort } = usePreferredSort();
  const feedRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [router.pathname, preferredSort]);

  return (
    <div className={styles.layout__feed} ref={feedRef}>
      <Header label={label} isSortable={isSortable} />
      {children}
    </div>
  );
}

export default FeedPageLayout;
