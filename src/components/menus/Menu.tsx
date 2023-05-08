import { ReactNode, useEffect, useRef } from 'react';
import styles from './Menu.module.scss';

type MenuProps = {
  children: ReactNode;
  hideMenu: (e?: any) => void;
};

function Menu(props: MenuProps) {
  const { children, hideMenu } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function globalClickListener(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as HTMLElement)) {
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

  return (
    <div className={`menu ${styles.menu}`} ref={menuRef}>
      <ul role="menu" className={styles.menu__list}>
        {children}
      </ul>
    </div>
  );
}
export default Menu;
