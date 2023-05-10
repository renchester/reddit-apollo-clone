import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import MasterLayout from '@/layouts/MasterLayout';

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 500);
  }, [router]);

  return <div className="not-signed-in">Redirecting to home page...</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="Home">{page}</FeedPageLayout>
    </MasterLayout>
  );
};

export default HomePage;
