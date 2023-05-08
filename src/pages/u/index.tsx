import { ReactElement, useEffect } from 'react';
import MasterLayout from '@/layouts/MasterLayout';
import FeedPageLayout from '@/layouts/FeedPageLayout';
import { useRouter } from 'next/router';

function UserPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/account'), 1000);
  }, [router]);

  return <div className="not-signed-in">Redirecting to account page...</div>;
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MasterLayout>
      <FeedPageLayout label="User">{page}</FeedPageLayout>
    </MasterLayout>
  );
};
export default UserPage;
