import styles from './HeaderMenu.module.scss';
import { usePreferredSort } from '@/hooks/usePreferredSort';
import { useRef, useEffect } from 'react';

type SortMenuProps = {
  hideMenu: () => void;
};

function SortMenu(props: SortMenuProps) {
  const { hideMenu } = props;
  const { setPreferredSort } = usePreferredSort();
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const setToNew = () => {
    hideMenu();
    setPreferredSort('new');
  };

  const setToPopular = () => {
    hideMenu();
    setPreferredSort('popular');
  };

  useEffect(() => {
    function globalClickListener(e: MouseEvent) {
      if (!sortMenuRef.current?.contains(e.target as HTMLElement)) {
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
    <div
      className={styles.menu}
      id="sort-menu"
      ref={sortMenuRef}
      data-sort="true"
    >
      <ul role="menu" className={styles.menu__list}>
        <button
          className={styles.menu__listItem}
          aria-label="Sort by date created"
          onClick={setToNew}
        >
          <i
            className={`material-symbols-outlined ${styles.menu__icon}`}
            aria-hidden
          >
            schedule
          </i>
          <span className={styles.menu__text}>New</span>
        </button>
        <button
          className={styles.menu__listItem}
          aria-label="Sort by popularity"
          onClick={setToPopular}
        >
          <i
            className={`material-symbols-outlined ${styles.menu__icon}`}
            aria-hidden
          >
            local_fire_department
          </i>
          <span className={styles.menu__text}>Popular</span>
        </button>
      </ul>
    </div>
  );
}
export default SortMenu;
