import { useState } from 'react';
import styles from './SidebarSubmenu.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

type SidebarSubmenuProps = {
  headingTitle: string;
};

function SidebarSubmenu(props: SidebarSubmenuProps) {
  const { headingTitle } = props;
  const [isMenuExpanded, setMenuExpansion] = useState(true);

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
          <motion.ul
            className={styles.list}
            id={`submenu__${headingTitle}-list`}
            aria-expanded={isMenuExpanded}
            aria-label="Submenu for favorite subreddits"
            initial={{ y: -20, opacity: 0, transformOrigin: 'top' }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <li className={styles.listItem}>
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.icon__home}`}
                icon={faHouse}
                aria-hidden
              />
              <Link className={styles.link} href="/">
                Home
              </Link>
            </li>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.icon__popular}`}
                icon={faHouse}
                aria-hidden
              />
              <Link className={styles.link} href="/r/popular">
                Popular
              </Link>
            </li>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                className={`${styles.icon} ${styles.icon__all}`}
                icon={faHouse}
                aria-hidden
              />
              <Link className={styles.link} href="/r/all">
                All Posts
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
export default SidebarSubmenu;
