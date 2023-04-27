import styles from './SidebarNav.module.scss';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';

import { useNavbar } from '@/hooks/useNavbar';
import SidebarLink from './SidebarLink';
import FavoritesSubmenu from './submenu/FavoritesSubmenu';
import SubscribedSubmenu from './submenu/SubscribedSubmenu';

function SidebarNav() {
  const { hideNavbar } = useNavbar();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: hideNavbar,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <motion.div
      id="container"
      className={styles.container}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'tween', duration: 0.1 }}
      {...swipeHandlers}
    >
      <button
        type="button"
        className={styles.btnToggle}
        onClick={hideNavbar}
        aria-label="Hide nav bar"
      >
        <span
          className={`${styles.btnToggleIcon} material-symbols-outlined`}
          aria-hidden
        >
          dock_to_right
        </span>
      </button>

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <h1>Apollo</h1>
        </Link>
        <ul className={styles.list}>
          <SidebarLink
            title="Home"
            href="/"
            iconName="home"
            subtitle="Posts from subscriptions"
            isFavorite={false}
            disableFavorite={true}
          />
          <SidebarLink
            title="Popular"
            href="/r/popular"
            iconName="trending_up"
            subtitle="Most popular posts across Reddit"
            isFavorite={false}
            disableFavorite={true}
          />
          <SidebarLink
            title="All Posts"
            href="/r/all"
            iconName="public"
            subtitle="Posts across all subreddits"
            isFavorite={false}
            disableFavorite={true}
          />
        </ul>

        <FavoritesSubmenu />

        <SubscribedSubmenu />
      </nav>
    </motion.div>
  );
}
export default SidebarNav;
