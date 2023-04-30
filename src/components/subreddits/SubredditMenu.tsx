import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

function SubredditMenu() {
  return (
    <Menu>
      <MenuButton
        icon="history_edu"
        text="Submit Post"
        label="Submit a post to this subreddit"
      />
      <MenuButton
        icon="favorite"
        text="Subscribe"
        label="Subscribe to this subreddit"
      />
      <MenuButton
        icon="star"
        text="Favorite"
        label="Make this subreddit a favorite"
      />
    </Menu>
  );
}
export default SubredditMenu;
