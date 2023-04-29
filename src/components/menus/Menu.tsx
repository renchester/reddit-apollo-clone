import { ReactNode } from 'react';
import styles from './Menu.module.scss';

type MenuProps = {
  children: ReactNode;
};

function Menu(props: MenuProps) {
  const { children } = props;

  return (
    <div className={styles.menu}>
      <ul role="menu" className={styles.menu__list}>
        {children}
      </ul>
    </div>
  );
}
export default Menu;
