import { useNewComment } from '@/hooks/useNewComment';
import styles from './AddCommentModal.module.scss';

function AddCommentModal() {
  const { hideCommentModal } = useNewComment();

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
      <form action="" className={styles.modal__form}>
        <label htmlFor="comment_text" className={styles.modal__label}>
          Type out your comment
        </label>
        <textarea
          name="text"
          id="comment_text"
          className={styles.modal__textarea}
          placeholder="Enter your comment here"
          minLength={1}
          required
        />
        <button type="submit" className={styles.modal__btnSubmit}>
          Submit comment
        </button>
      </form>
    </div>
  );
}
export default AddCommentModal;
