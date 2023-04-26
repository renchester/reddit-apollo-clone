import { useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isNavBarShown, setNavBarVisibility] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.nav__container}>
          <button
            type="button"
            className={styles.nav__btnToggle}
            aria-label="Show navigation sidebar"
            aria-expanded="false"
          >
            <span
              className={`${styles.nav__btnToggleIcon} material-symbols-outlined`}
              aria-hidden
            >
              arrow_back_ios
            </span>
          </button>
          <h2 className={styles.nav__label}>Subreddits</h2>
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
    </header>
  );
}
export default Header;
