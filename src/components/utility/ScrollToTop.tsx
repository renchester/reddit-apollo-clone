import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [router.pathname]);

  return null;
}
