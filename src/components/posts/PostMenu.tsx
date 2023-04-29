import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

function PostMenu() {
  return (
    <Menu>
      <MenuButton icon="north" text="Upvote" label="Upvote post" />
      <MenuButton icon="south" text="Downvote" label="Downvote post" />
      <MenuButton icon="bookmark" text="Save" label="Bookmark/save post" />
    </Menu>
  );
}
export default PostMenu;
