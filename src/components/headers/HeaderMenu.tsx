import styles from './HeaderMenu.module.scss';
import Link from 'next/link';
import Switch from '../shared/Switch';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import signOutUser from '@/firebase/auth/signOutUser';

function HeaderMenu() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  return (
    <div className={styles.menu} id="header-menu">
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
              account_circle
            </i>
            <button
              type="button"
              className={styles.menu__label}
              onClick={handleSignOut}
            >
              Create Subreddit
            </button>
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
              <Link
                href="/account/login"
                className={styles.menu__label}
                onClick={() => console.log('signing in')}
              >
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
