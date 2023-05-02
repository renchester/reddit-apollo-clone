import styles from './HeaderMenu.module.scss';
import Link from 'next/link';
import Switch from '../buttons/Switch';
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
        {user && (
          <li className={styles.menu__listItem}>
            <Link href="/account" className={styles.menu__label}>
              {user.username}
            </Link>
          </li>
        )}

        <li className={styles.menu__listItem}>
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
        <li className={styles.menu__listItem}>
          {user ? (
            <button
              type="button"
              className={styles.menu__label}
              onClick={handleSignOut}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/account/login"
              className={styles.menu__label}
              onClick={() => console.log('signing in')}
            >
              Log in
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
export default HeaderMenu;
