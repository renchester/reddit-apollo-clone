import { useNewComment } from '@/hooks/useNewComment';
import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';
import { Comment, Post } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';

type CommentMenuProps = {
  parentComment: Comment;
  hideMenu: () => void;
  isUpvoted: boolean;
  isDownvoted: boolean;
  toggleUpvote: (e?: any) => void;
  toggleDownvote: (e?: any) => void;
  deleteComment: (e?: any) => void;
};

function CommentMenu(props: CommentMenuProps) {
  const {
    hideMenu,
    parentComment,
    toggleDownvote,
    toggleUpvote,
    isUpvoted,
    isDownvoted,
    deleteComment,
  } = props;

  const { user } = useAuth();
  const { showCommentModal, setParentComment } = useNewComment();

  const replyToComment = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) return;

    setParentComment(parentComment);
    hideMenu();
    showCommentModal();
  };

  return (
    <Menu hideMenu={hideMenu}>
      <MenuButton
        icon="reply"
        text="Reply"
        label="Reply to this comment"
        handler={replyToComment}
      />
      <MenuButton
        icon="north"
        text={isUpvoted ? 'Un-upvote' : 'Upvote'}
        label="Upvote comment"
        handler={toggleUpvote}
      />
      <MenuButton
        icon="south"
        text={isDownvoted ? 'Un-downvote' : 'Downvote'}
        label="Downvote comment"
        handler={toggleDownvote}
      />
      {user?.user_id === parentComment.original_poster_id && (
        <MenuButton
          icon="delete"
          text="Delete"
          label="Delete comment"
          handler={deleteComment}
        />
      )}
    </Menu>
  );
}
export default CommentMenu;
