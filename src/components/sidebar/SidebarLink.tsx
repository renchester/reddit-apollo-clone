import getIcon from '@/utils/getIcon';
import styles from './SidebarLink.module.scss';
import Link from 'next/link';

type SidebarLinkProps = {
  href: string;
  iconName?: string;
  title: string;
  subtitle?: string;
  isFavorite: boolean;
  disableFavorite?: boolean;
};

function SidebarLink(props: SidebarLinkProps) {
  const { href, iconName, title, subtitle, isFavorite, disableFavorite } =
    props;

  return (
    <li className={styles.listItem}>
      <Link className={styles.link} href={href}>
        <span
          className={`material-symbols-outlined ${styles.icon}`}
          aria-hidden
        >
          {iconName || getIcon(title)}
        </span>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>{title}</h4>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </Link>
      {!disableFavorite && (
        <button
          type="button"
          className={styles.btnFav}
          aria-label={`Toggle favorite for ${title} subreddit`}
        >
          <span
            className={`material-symbols-outlined ${styles.favIcon} ${
              isFavorite && styles.favIcon__filled
            }`}
          >
            star
          </span>
        </button>
      )}
    </li>
  );
}
export default SidebarLink;
