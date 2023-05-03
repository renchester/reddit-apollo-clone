import { useAuth } from '@/hooks/useAuth';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarListItemAlpha from '../SidebarListItemAlpha';

function SubscribedSubmenu() {
  const { user } = useAuth();
  return (
    <SidebarSubmenu headingTitle="Subscriptions">
      {/* subscriptions.map(sub => sidebarLink) */}

      {user ? (
        <ul>
          <SidebarListItemAlpha letter="A" />
          <SidebarListItemAlpha letter="B" />
        </ul>
      ) : (
        <p className="not-signed-in">No subscribed subreddits</p>
      )}
    </SidebarSubmenu>
  );
}
export default SubscribedSubmenu;
