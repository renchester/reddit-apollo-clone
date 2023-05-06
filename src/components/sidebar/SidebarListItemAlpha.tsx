import styles from './SidebarListItemAlpha.module.scss';
import SidebarLink from './SidebarLink';
import { UserSubscription } from '@/types/types';

type SidebarListItemAlphaProps = {
  letter: string;
  subreddits: UserSubscription[];
};

function SidebarListItemAlpha(props: SidebarListItemAlphaProps) {
  const { letter, subreddits } = props;

  return (
    <li className={styles.listItem}>
      <h5 className={styles.heading}>{letter.toUpperCase()}</h5>
      <ul>
        {subreddits.map((sub) => (
          <SidebarLink
            key={`sidebar-link--list-item-${sub.subreddit_id}`}
            href={`/r/${sub.subreddit}`}
            title={sub.subreddit}
            isFavorite={sub.isFavorite}
          />
        ))}
      </ul>
    </li>
  );
}
export default SidebarListItemAlpha;
