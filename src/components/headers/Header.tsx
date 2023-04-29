import { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';
import { useNavbar } from '@/hooks/useNavbar';
import HeaderMenu from './HeaderMenu';

function Header() {
  const { showNavbar, toggleNavbar, isNavbarShown } = useNavbar();
  const [isMenuShown, setMenuVisibility] = useState(false);

  const toggleMenu = () => setMenuVisibility((prev) => !prev);

  const swipeHandlers = useSwipeable({
    preventScrollOnSwipe: true,
    onSwipedRight: showNavbar,
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
        <div className={styles.feed__labelWrapper}>
          <h2 className={styles.feed__label} aria-label="Name of current feed">
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
        <div className={styles.btn__container}>
          <button
            className={styles.btn__sort}
            type="button"
            aria-haspopup
            aria-expanded="false"
            aria-label="Show menu for changing sort method"
          >
            <FontAwesomeIcon
              className={`${styles.btn__icon} ${styles.btn__sortIcon}`}
              icon={faFire}
              aria-hidden
            />
          </button>
          <Link
            href="/account"
            className={styles.btn__account}
            aria-label="Go to account page"
          >
            <span
              className={`${styles.btn__icon} ${styles.btn__accountIcon} material-symbols-outlined`}
              aria-hidden
            >
              account_circle
            </span>
          </Link>
          <button
            className={styles.btn__account}
            type="button"
            aria-haspopup
            aria-expanded="false"
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
        </div>
        {isMenuShown && <HeaderMenu />}
      </div>
    </header>
  );
}
export default Header;
