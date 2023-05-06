import getIcon from '@/utils/getIcon';
import styles from './SidebarLink.module.scss';
import Link from 'next/link';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useAuth } from '@/hooks/useAuth';
import toggleFavoriteSubreddit from '@/firebase/firestore/subreddits/update/toggleFavoriteSubreddit';

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
  const { user } = useAuth();
  const { addAlert } = useSnackbar();

  const handleToggleFavorite = async () => {
    if (!user) {
      addAlert({
        message: 'Favoriting subreddits is only available for logged in users',
        status: 'error',
      });
    } else await toggleFavoriteSubreddit(user, title);
  };

  return (
    <li className={styles.listItem}>
      <Link className={styles.link} href={href}>
        <div className={`${styles.icon}`} aria-hidden>
          <span
            className={`${iconName && 'material-symbols-outlined'}`}
            aria-hidden
          >
            {iconName || getIcon(title)}
          </span>
        </div>
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
          onClick={handleToggleFavorite}
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
