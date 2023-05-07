import { Post } from '@/types/types';
import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

type PostMenuProps = {
  post: Post;
  isUpvoted: boolean;
  isDownvoted: boolean;
  toggleUpvote: (e?: any) => void;
  toggleDownvote: (e?: any) => void;
};

function PostMenu(props: PostMenuProps) {
  const { post, isUpvoted, isDownvoted, toggleUpvote, toggleDownvote } = props;

  return (
    <Menu>
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
      <MenuButton icon="bookmark" text="Save" label="Bookmark/save post" />
    </Menu>
  );
}
export default PostMenu;
