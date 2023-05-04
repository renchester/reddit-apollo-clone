import { useAuth } from '@/hooks/useAuth';
import SidebarLink from '../SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

function FavoritesSubmenu() {
  const { user, subscriptions } = useAuth();

  const favorites = subscriptions?.filter((sub) => sub.isFavorite) || [];

  return (
    <>
      {user ? (
        <SidebarSubmenu headingTitle="Favorites" initExpandedState={!!user}>
          {favorites?.length > 0 && (
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
          )}
        </SidebarSubmenu>
      ) : (
        <p className="not-signed-in">No favorited subreddits</p>
      )}
    </>
  );
}
export default FavoritesSubmenu;
