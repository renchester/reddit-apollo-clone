import { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { useNavbar } from '@/hooks/useNavbar';
import { useAuth } from '@/hooks/useAuth';

import HeaderMenu from './HeaderMenu';
import SortMenu from './SortMenu';
import { usePreferredSort } from '@/hooks/usePreferredSort';

type HeaderProps = {
  label?: string;
  isSortable?: boolean;
};

function Header(props: HeaderProps) {
  const { label, isSortable } = props;
  const { user } = useAuth();
  const { preferredSort } = usePreferredSort();

  const { showNavbar, toggleNavbar, isNavbarShown } = useNavbar();
  const [isMenuShown, setMenuVisibility] = useState(false);
  const [isSortMenuShown, setSortMenuVisibility] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisibility((prev) => !prev);
  };
  const hideMenu = () => setMenuVisibility(false);

  const toggleSortMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSortMenuVisibility((prev) => !prev);
  };
  const hideSortMenu = () => setSortMenuVisibility(false);

  const swipeHandlers = useSwipeable({
    onSwipedRight: showNavbar,
    trackMouse: true,
  });

  return (
    <header className={styles.header} {...swipeHandlers}>
      <div className={styles.header__wrapper}>
        <div className={styles.nav__container}>
          <button
            type="button"
            className={styles.nav__btnToggle}
            aria-label="Show navigation sidebar"
            aria-expanded={isNavbarShown}
            aria-controls="nav__container"
            onClick={toggleNavbar}
          >
            <span
              className={`${styles.nav__btnToggleIcon} material-symbols-outlined`}
              aria-hidden
            >
              arrow_back_ios
            </span>
            <h2
              className={`${styles.nav__label} ${
                isNavbarShown && styles.nav__labelWithSidebar
              }`}
            >
              Navigation
            </h2>
          </button>
        </div>
        {label ? (
          <div className={styles.feed__labelWrapper}>
            <h2 className={styles.feed__label}>{label}</h2>
          </div>
        ) : (
          <div className={styles.feed__labelWrapper}>
            <h2
              className={styles.feed__label}
              aria-label="Name of current feed"
            >
              Popular
            </h2>
            <button
              className={styles.feed__labelBtn}
              type="button"
              aria-haspopup
              aria-expanded="false"
              aria-label="Show other subreddits"
            >
              <span
                className={`${styles.feed__labelBtnIcon} material-symbols-outlined`}
                aria-hidden
              >
                expand_more
              </span>
            </button>
          </div>
        )}
        <div className={styles.btn__container}>
          {isSortable && (
            <button
              className={styles.btn__sort}
              type="button"
              aria-haspopup
              aria-expanded={isSortMenuShown}
              aria-label="Show menu for changing sort method"
              onClick={toggleSortMenu}
            >
              <span
                className={`${styles.btn__icon} ${styles.btn__accountIcon} material-symbols-outlined`}
                aria-hidden
              >
                {preferredSort === 'new' ? 'schedule' : 'local_fire_department'}
              </span>
            </button>
          )}
          <Link
            href="/account"
            className={styles.btn__account}
            aria-label="Go to account page"
          >
            {user && (
              <span
                className={`${styles.btn__icon} ${styles.btn__accountIcon} material-symbols-outlined`}
                aria-hidden
              >
                account_circle
              </span>
            )}
          </Link>
          <button
            className={styles.btn__account}
            type="button"
            aria-haspopup
            aria-expanded={isMenuShown}
            aria-label="Show account sidebar"
            onClick={toggleMenu}
          >
            <span
              className={`${styles.btn__icon} ${styles.btn__moreIcon} material-symbols-outlined`}
              aria-hidden
            >
              more_horiz
            </span>
          </button>
          {isSortMenuShown && <SortMenu hideMenu={hideSortMenu} />}
        </div>
        {isMenuShown && <HeaderMenu hideMenu={hideMenu} />}
      </div>
    </header>
  );
}
export default Header;
