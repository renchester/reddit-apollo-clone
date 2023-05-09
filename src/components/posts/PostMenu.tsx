import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

type PostMenuProps = {
  hideMenu: () => void;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isBookmarked: boolean;
  toggleUpvote: (e?: any) => void;
  toggleDownvote: (e?: any) => void;
  toggleBookmark: (e?: any) => void;
};

function PostMenu(props: PostMenuProps) {
  const {
    hideMenu,
    isUpvoted,
    isDownvoted,
    isBookmarked,
    toggleUpvote,
    toggleDownvote,
    toggleBookmark,
  } = props;

  return (
    <Menu hideMenu={hideMenu}>
      <MenuButton
        icon="north"
        text={isUpvoted ? 'Un-upvote' : 'Upvote'}
        label={isUpvoted ? 'Remove upvote on post' : 'Upvote post'}
        handler={toggleUpvote}
      />
      <MenuButton
        icon="south"
        text={isDownvoted ? 'Un-downvote' : 'Downvote'}
        label={isDownvoted ? 'Remove downvote on post' : 'Downvote post'}
        handler={toggleDownvote}
      />
      <MenuButton
        icon="bookmark"
        text={isBookmarked ? 'Unsave' : 'Save'}
        label={isBookmarked ? 'Remove bookmark on post' : 'Bookmark post'}
        handler={toggleBookmark}
      />
    </Menu>
  );
}
export default PostMenu;
