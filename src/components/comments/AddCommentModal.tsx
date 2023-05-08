import styles from './AddCommentModal.module.scss';
import { useNewComment } from '@/hooks/useNewComment';
import { Comment, Post } from '@/types/types';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useAuth } from '@/hooks/useAuth';
import submitComment from '@/firebase/firestore/comments/create/submitComment';

type AddCommentModalProps = {
  parentPost: Post;
  parentComment?: Comment | null;
};

function AddCommentModal(props: AddCommentModalProps) {
  const { parentComment, parentPost } = props;
  const { user } = useAuth();
  const { hideCommentModal, setParentComment } = useNewComment();
  const { addAlert } = useSnackbar();

  const [comment, setComment] = useState('');
  const commentLevel = parentComment ? parentComment.comment_level + 1 : 1;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) throw new Error('Only logged in users may submit a comment');

      if (!parentPost) throw new Error('Comment must have a parent post');

      const result = await submitComment(
        user,
        { content: comment, level: commentLevel },
        parentPost,
        parentComment?.comment_id,
      );

      if (result) {
        hideCommentModal();
        addAlert({ message: 'Comment added', status: 'success' });
      }
    } catch (error) {
      if (error instanceof Error) {
        addAlert({
          message: error.message,
          status: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (parentComment) {
      setParentComment(parentComment);
    }

    return () => setParentComment(null);
  }, [parentComment, setParentComment]);

  useEffect(() => {
    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') hideCommentModal();
    }

    window.addEventListener('keydown', escKeyListener);

    return () => window.removeEventListener('keydown', escKeyListener);
  }, [hideCommentModal]);

  return (
    <div className={styles.modal}>
      <button type="button" aria-label="Close modal" onClick={hideCommentModal}>
        <i
          className={`material-symbols-outlined ${styles.modal__btnClose}`}
          aria-hidden
        >
          close
        </i>
      </button>
      <h2 className={styles.modal__heading}>New Comment</h2>
      <form className={styles.modal__form}>
        <label htmlFor="comment_text" className={styles.modal__label}>
          Type out your comment
        </label>
        <textarea
          name="text"
          id="comment_text"
          className={styles.modal__textarea}
          placeholder="Enter your comment here"
          minLength={1}
          onChange={handleCommentChange}
          value={comment}
        />

        <div className={styles.reply}>
          <span className={styles.reply__to}>
            <i
              className={`material-symbols-outlined ${styles.reply__icon}`}
              aria-hidden
            >
              subdirectory_arrow_right
            </i>
            Replying to {parentComment ? 'comment' : 'post'}:
          </span>
          {parentComment ? (
            <div className={styles.reply__content}>{parentComment.content}</div>
          ) : (
            <div className={styles.reply__content}>
              &quot;{parentPost?.title}&quot;{' '}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={styles.modal__btnSubmit}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Submit comment
        </button>
      </form>
    </div>
  );
}
export default AddCommentModal;
