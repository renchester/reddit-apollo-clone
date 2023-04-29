import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

function SubredditMenu() {
  return (
    <Menu>
      <MenuButton icon="history_edu" text="Submit Post" />
      <MenuButton icon="history_edu" text="Submit Post" />
      <MenuButton icon="favorite" text="Subscribe" />
      <MenuButton icon="star" text="Favorite" />
    </Menu>
  );
}
export default SubredditMenu;
