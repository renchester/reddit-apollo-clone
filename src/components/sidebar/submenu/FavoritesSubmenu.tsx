import { useAuth } from '@/hooks/useAuth';
import SidebarLink from '../SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

function FavoritesSubmenu() {
  const { user, subscriptions } = useAuth();

  const favorites = subscriptions?.filter((sub) => sub.isFavorite) || [];

  return (
    <>
      {user && (
        <SidebarSubmenu headingTitle="Favorites" initExpandedState={!!user}>
          {favorites?.length > 0 &&
            favorites.map((favSub) => (
              <SidebarLink
                key={`fav-submenu--${favSub.subreddit_id}`}
                href={`/r/${favSub.subreddit}`}
                title={favSub.subreddit}
                isFavorite={favSub.isFavorite}
              />
            ))}
        </SidebarSubmenu>
      )}
    </>
  );
}
export default FavoritesSubmenu;
