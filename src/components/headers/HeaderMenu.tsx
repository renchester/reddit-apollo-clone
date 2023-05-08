import styles from './HeaderMenu.module.scss';
import Link from 'next/link';
import Switch from '../shared/Switch';
import { useTheme } from '@/hooks/useTheme';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useAuth } from '@/hooks/useAuth';
import signOutUser from '@/firebase/auth/signOutUser';
import { useEffect, useRef } from 'react';

type HeaderMenuProps = {
  hideMenu: () => void;
};

function HeaderMenu(props: HeaderMenuProps) {
  const { hideMenu } = props;
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const headerMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function globalClickListener(e: MouseEvent) {
      if (!headerMenuRef.current?.contains(e.target as HTMLElement)) {
        hideMenu();
      }
    }

    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') hideMenu();
    }

    window.addEventListener('click', globalClickListener);
    window.addEventListener('keydown', escKeyListener);

    return () => {
      window.removeEventListener('click', globalClickListener);
      window.removeEventListener('keydown', escKeyListener);
    };
  }, [hideMenu]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      addAlert({ message: 'Successfully signed out', status: 'success' });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        addAlert({ message: 'Error signing out', status: 'error' });
      }
    }
  };

  return (
    <div className={styles.menu} id="header-menu" ref={headerMenuRef}>
      <ul role="menu" className={styles.menu__list}>
        {/* ACCOUNT PAGE */}
        {user && (
          <li className={styles.menu__listItem}>
            <i
              className={`material-symbols-outlined ${styles.menu__icon}`}
              aria-hidden
            >
              account_circle
            </i>
            <Link href="/account" className={styles.menu__label}>
              {user.username}
            </Link>
          </li>
        )}

        {/* CREATE SUBREDDIT*/}
        {user && (
          <li className={styles.menu__listItem}>
            <i
              className={`material-symbols-outlined ${styles.menu__icon}`}
              aria-hidden
            >
              Edit
            </i>
            <Link href="/r/create-subreddit" className={styles.menu__label}>
              Create subreddit
            </Link>
          </li>
        )}

        {/* TOGGLE DARK MODE */}

        <li className={styles.menu__listItem}>
          <i
            className={`material-symbols-outlined ${styles.menu__icon}`}
            aria-hidden
          >
            dark_mode
          </i>
          <label
            htmlFor="header-menu__theme-switcher"
            className={styles.menu__label}
          >
            Dark Mode
          </label>
          <Switch
            id="header-menu__theme-switcher"
            ariaLabel="Switch to Light/Dark Mode"
            isOn={isDark || false}
            handler={toggleTheme}
          />
        </li>

        {/* LOGOUT / SIGN IN */}

        <li className={styles.menu__listItem}>
          {user ? (
            <>
              <i
                className={`material-symbols-outlined ${styles.menu__icon}`}
                aria-hidden
              >
                logout
              </i>
              <button
                type="button"
                className={styles.menu__label}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <i
                className={`material-symbols-outlined ${styles.menu__icon}`}
                aria-hidden
              >
                login
              </i>
              <Link href="/account/login" className={styles.menu__label}>
                Log in
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
export default HeaderMenu;
