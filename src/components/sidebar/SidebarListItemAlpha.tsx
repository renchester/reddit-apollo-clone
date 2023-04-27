import styles from './SidebarListItemAlpha.module.scss';
import SidebarLink from './SidebarLink';

type SidebarListItemAlphaProps = {
  letter: string;
};

function SidebarListItemAlpha(props: SidebarListItemAlphaProps) {
  const { letter } = props;

  return (
    <li className={styles.listItem}>
      <h5 className={styles.heading}>{letter}</h5>
      <ul>
        <SidebarLink
          href="/r/sub"
          title="Subreddit"
          iconName="taunt"
          isFavorite={false}
        />
        <SidebarLink
          href="/r/sub"
          title="Subreddit"
          iconName="taunt"
          isFavorite={false}
        />
        <SidebarLink
          href="/r/sub"
          title="Subreddit"
          iconName="taunt"
          isFavorite={false}
        />
      </ul>
    </li>
  );
}
export default SidebarListItemAlpha;
