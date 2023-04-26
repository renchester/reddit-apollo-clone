import { useState } from 'react';
import styles from './Header.module.scss';
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';
import { useNavbar } from '@/hooks/useNavbar';

function Header() {
  const { showNavbar, toggleNavbar, isNavbarShown } = useNavbar();

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
              Subreddits
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
          <button
            className={styles.btn__account}
            type="button"
            aria-haspopup
            aria-expanded="false"
            aria-label="Show account sidebar"
          >
            <span
              className={`${styles.btn__icon} ${styles.btn__accountIcon} material-symbols-outlined`}
              aria-hidden
            >
              account_circle
            </span>
          </button>
          <button
            className={styles.btn__account}
            type="button"
            aria-haspopup
            aria-expanded="false"
            aria-label="Show account sidebar"
          >
            <span
              className={`${styles.btn__icon} ${styles.btn__moreIcon} material-symbols-outlined`}
              aria-hidden
            >
              more_horiz
            </span>
          </button>
        </div>
      </div>
      {/* 
      <AnimatePresence>
        {isNavBarShown && (
          <Overlay hideChildren={hideNavBar}>
            <SidebarNav hideNavbar={hideNavBar} />
          </Overlay>
        )}
      </AnimatePresence> */}
    </header>
  );
}
export default Header;
