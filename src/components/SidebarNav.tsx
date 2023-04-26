import styles from './SidebarNav.module.scss';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { useNavbar } from '@/hooks/useNavbar';
import SidebarSubmenu from './SidebarSubmenu';

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
          <li className={styles.listItem}>
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.icon__home}`}
              icon={faHouse}
              aria-hidden
            />
            <Link className={styles.link} href="/">
              Home
            </Link>
          </li>
          <li className={`${styles.listItem} ${styles.listItemActive}`}>
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.icon__popular}`}
              icon={faHouse}
              aria-hidden
            />
            <Link className={styles.link} href="/r/popular">
              Popular
            </Link>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon
              className={`${styles.icon} ${styles.icon__all}`}
              icon={faHouse}
              aria-hidden
            />
            <Link className={styles.link} href="/r/all">
              All Posts
            </Link>
          </li>
        </ul>

        <SidebarSubmenu headingTitle="Favorites" />

        <SidebarSubmenu headingTitle="Subscriptions" />
      </nav>
    </motion.div>
  );
}
export default SidebarNav;
