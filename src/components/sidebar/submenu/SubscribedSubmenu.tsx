import { useAuth } from '@/hooks/useAuth';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarListItemAlpha from '../SidebarListItemAlpha';
import SidebarLink from '../SidebarLink';

function SubscribedSubmenu() {
  const { user, subscriptions } = useAuth();

  return (
    <SidebarSubmenu headingTitle="Subscriptions">
      {user ? (
        <ul>
          {/* <SidebarListItemAlpha letter="A" />
          <SidebarListItemAlpha letter="B" /> */}
          {subscriptions &&
            subscriptions.length > 0 &&
            subscriptions.map((sub) => (
              <SidebarLink
                href={`r/${sub.subreddit}`}
                title={sub.subreddit}
                isFavorite={sub.isFavorite}
                key={`side-link--${sub.subreddit}`}
              />
            ))}
        </ul>
      ) : (
        <p className="not-signed-in">No subscribed subreddits</p>
      )}
    </SidebarSubmenu>
  );
}
export default SubscribedSubmenu;
