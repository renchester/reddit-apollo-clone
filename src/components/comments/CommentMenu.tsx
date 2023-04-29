import { useNewComment } from '@/hooks/useNewComment';
import styles from './Menu.module.scss';
import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';

type CommentMenuProps = {
  hideMenu: () => void;
};

function CommentMenu(props: CommentMenuProps) {
  const { hideMenu } = props;
  const { isCommentModalShown, showCommentModal } = useNewComment();

  const replyToComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    hideMenu();
    showCommentModal();
  };

  return (
    <Menu>
      <MenuButton
        icon="reply"
        text="Reply"
        label="Reply to this comment"
        handler={replyToComment}
      />
      <MenuButton icon="north" text="Upvote" label="Upvote comment" />
      <MenuButton icon="south" text="Downvote" label="Downvote comment" />
    </Menu>
  );
}
export default CommentMenu;
