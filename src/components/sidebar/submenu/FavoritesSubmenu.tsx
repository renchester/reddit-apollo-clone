import SidebarLink from '../SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

function FavoritesSubmenu() {
  return (
    <SidebarSubmenu headingTitle="Favorites">
      {/* subscriptions.map(sub => sidebarLink) 
      
      Provide way to unfavorite an item
      */}
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
    </SidebarSubmenu>
  );
}
export default FavoritesSubmenu;
