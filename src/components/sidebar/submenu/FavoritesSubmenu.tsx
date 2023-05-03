import { useAuth } from '@/hooks/useAuth';
import SidebarLink from '../SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

function FavoritesSubmenu() {
  const { user } = useAuth();

  return (
    <SidebarSubmenu headingTitle="Favorites">
      {/* subscriptions.map(sub => sidebarLink) 
      
      Provide way to unfavorite an item
      */}
      {user ? (
        <>
          <SidebarLink
            href="/r/sub"
            title="Subreddit"
            iconName="taunt"
            isFavorite={true}
          />
          <SidebarLink
            href="/r/sub"
            title="Subreddit"
            iconName="taunt"
            isFavorite={true}
          />
          <SidebarLink
            href="/r/sub"
            title="Subreddit"
            iconName="taunt"
            isFavorite={true}
          />
        </>
      ) : (
        <p className="not-signed-in">No favorited subreddits</p>
      )}
    </SidebarSubmenu>
  );
}
export default FavoritesSubmenu;
