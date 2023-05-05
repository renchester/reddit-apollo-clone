import styles from './SubmitPanel.module.scss';
import { useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Subreddit } from '@/types/types';
import submitTextPost from '@/firebase/firestore/posts/submitTextPost';

type CreateTextPostProps = {
  subreddit: Subreddit;
  titleLength: number;
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  details: string;
  handleDetailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetFields: () => void;
};

function CreateTextPost(props: CreateTextPostProps) {
  const {
    titleLength,
    title,
    handleTitleChange,
    details,
    handleDetailChange,
    subreddit,
    resetFields,
  } = props;
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const textFormRef = useRef<HTMLFormElement | null>(null);

  const handleSubmitTextPost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) throw new Error('You have to be logged in to create a post.');

      if (!title) throw new Error('All posts require a title');

      const result = await submitTextPost(user, subreddit, { title, details });

      if (result) {
        addAlert({
          message: `Successfully submitted post`,
          status: 'success',
        });

        resetFields();
        if (textFormRef.current) {
          textFormRef.current.reset();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        addAlert({
          message: error.message,
          status: 'error',
        });
      }
    }
  };

  return (
    <form
      className={styles.tab__form}
      onSubmit={handleSubmitTextPost}
      ref={textFormRef}
    >
      <label htmlFor="text-post_title" className={styles.tab__label}>
        <span className={styles.tab__labelText}>
          Title <abbr title="required">*</abbr>:
        </span>
        <div className={styles.tab__titleWrapper}>
          <textarea
            id="text-post_title"
            name="title"
            minLength={1}
            maxLength={titleLength}
            placeholder="Post title"
            required
            className={styles.tab__textTitle}
            onChange={handleTitleChange}
            value={title}
          />
          <span className={styles.tab__titleChar}>
            {titleLength - title.length}/300
          </span>
        </div>
      </label>

      <label htmlFor="text-post_details" className={styles.tab__label}>
        <span className={styles.tab__labelText}>Text (optional):</span>
        <textarea
          id="text-post_details"
          name="details"
          placeholder="Post details"
          className={styles.tab__textarea}
          onChange={handleDetailChange}
          value={details}
        />
      </label>

      <button
        type="submit"
        className={styles.tab__btnSubmit}
        disabled={title.length < 1}
      >
        Submit Post
      </button>
    </form>
  );
}
export default CreateTextPost;
