import styles from './Submenu.module.scss';
import { type ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type SidebarSubmenuProps = {
  headingTitle: string;
  children: ReactNode;
  initExpandedState?: boolean;
};

function SidebarSubmenu(props: SidebarSubmenuProps) {
  const { headingTitle, children, initExpandedState } = props;
  const [isMenuExpanded, setMenuExpansion] = useState(
    initExpandedState === undefined ? true : initExpandedState,
  );

  const toggleMenuExpansion = () => setMenuExpansion((prev) => !prev);

  return (
    <section
      className={styles.container}
      aria-labelledby={`heading__${headingTitle}`}
    >
      <button
        type="button"
        className={styles.headingWrapper}
        aria-label={`${
          isMenuExpanded ? 'Collapse' : 'Expand'
        } submenu for ${headingTitle}`}
        onClick={toggleMenuExpansion}
      >
        <h2 id={`heading__${headingTitle}`} className={styles.heading}>
          {headingTitle}
        </h2>
        <span className={`material-symbols-outlined ${styles.icon__heading}`}>
          {isMenuExpanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      <AnimatePresence>
        {isMenuExpanded && (
          <motion.ol
            className={styles.list}
            id={`submenu__${headingTitle}-list`}
            aria-expanded={isMenuExpanded}
            aria-label="Submenu for favorite subreddits"
            initial={{ y: -20, opacity: 0, transformOrigin: 'top' }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            {children}
          </motion.ol>
        )}
      </AnimatePresence>
    </section>
  );
}

export default SidebarSubmenu;
