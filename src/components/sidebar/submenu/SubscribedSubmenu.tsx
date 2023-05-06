import { useAuth } from '@/hooks/useAuth';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarListItemAlpha from '../SidebarListItemAlpha';
import sortSubredditsByInitials from '@/utils/sortSubredditsByInitials';

function SubscribedSubmenu() {
  const { user, subscriptions } = useAuth();

  const sorted = sortSubredditsByInitials(subscriptions || []);

  return (
    <SidebarSubmenu headingTitle="Subscriptions">
      {user ? (
        <ul>
          {Object.keys(sorted).map((initial) => {
            return (
              <SidebarListItemAlpha
                key={`sidebar-sorted__${initial}`}
                letter={initial}
                subreddits={sorted[initial]}
              />
            );
          })}
        </ul>
      ) : (
        <p className="not-signed-in">No subscribed subreddits</p>
      )}
    </SidebarSubmenu>
  );
}
export default SubscribedSubmenu;
