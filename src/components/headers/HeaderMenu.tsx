import styles from './HeaderMenu.module.scss';
import Switch from '../buttons/Switch';
import { useTheme } from '@/hooks/useTheme';

function HeaderMenu() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={styles.menu} id="header-menu">
      <ul role="menu" className={styles.menu__list}>
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
            isOn={isDark}
            handler={toggleTheme}
          />
        </li>
        <li></li>
      </ul>
    </div>
  );
}
export default HeaderMenu;
