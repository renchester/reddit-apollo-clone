import { useNewComment } from '@/hooks/useNewComment';
import styles from './CommentMenu.module.scss';

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
    <div className={styles.menu}>
      <ul role="menu" className={styles.menu__list}>
        <li className={styles.menu__listItem} role="menuitem">
          <button
            type="button"
            className={styles.menu__button}
            onClick={replyToComment}
            aria-haspopup
          >
            <i
              className={`material-symbols-outlined ${styles.menu__icon}`}
              aria-hidden
            >
              reply
            </i>
            <span>Reply</span>
          </button>
        </li>
        <li className={styles.menu__listItem} role="menuitem">
          <button type="button" className={styles.menu__button}>
            <i
              className={`material-symbols-outlined ${styles.menu__icon}`}
              aria-hidden
            >
              north
            </i>
            <span>Upvote</span>
          </button>
        </li>
        <li className={styles.menu__listItem} role="menuitem">
          <button type="button" className={styles.menu__button}>
            <i
              className={`material-symbols-outlined ${styles.menu__icon}`}
              aria-hidden
            >
              south
            </i>
            <span>Downvote</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
export default CommentMenu;
