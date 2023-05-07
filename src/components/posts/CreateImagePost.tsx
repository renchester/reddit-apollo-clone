import styles from './SubmitPanel.module.scss';
import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Subreddit } from '@/types/types';
import Loading from '../Loading';
import submitImagePost from '@/firebase/firestore/posts/create/submitImagePost';
import uploadImage from '@/firebase/storage/uploadImage';
import { nanoid } from 'nanoid';

type CreateImagePostProps = {
  subreddit: Subreddit;
  titleLength: number;
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  details: string;
  handleDetailChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetFields: () => void;
};

function CreateImagePost(props: CreateImagePostProps) {
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

  const MAX_IMG_SIZE = 2097152; //2MB
  const [image, setImage] = useState<File | null>(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const imageFormRef = useRef<HTMLFormElement | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageToUpload = e.target.files[0];

      if (imageToUpload.size > MAX_IMG_SIZE) {
        addAlert({
          message: 'Uploads above 2MB will not be accepted',
          status: 'error',
        });
      } else {
        setImage(imageToUpload);
      }
    } else setImage(null);
  };

  const handleSubmitImagePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) throw new Error('You have to be logged in to create a post.');

      if (!title) throw new Error('All posts require a title');

      if (!image) throw new Error('Image posts require an image');

      const newPostId = `post__${nanoid()}`;
      const downloadUrl = await uploadImage(
        image,
        `images/IMG_${newPostId}`,
        setImgUploadProgress,
      );

      if (downloadUrl) {
        setImgUploadProgress(0);
        const result = await submitImagePost(user, subreddit, {
          title,
          details,
          image: downloadUrl,
          postId: newPostId,
        });

        if (result) {
          addAlert({
            message: `Successfully added a post in r/${subreddit.name}`,
            status: 'success',
          });

          // Resetters
          setImage(null);
          resetFields();

          if (imgInputRef.current) {
            imgInputRef.current.value = '';
          }
        } else {
          throw new Error('Unable to submit your post');
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
      onSubmit={handleSubmitImagePost}
      ref={imageFormRef}
    >
      <label htmlFor="image-post_title" className={styles.tab__label}>
        <span className={styles.tab__labelText}>
          Title <abbr title="required">*</abbr>:
        </span>
        <div className={styles.tab__titleWrapper}>
          <textarea
            id="image-post_title"
            name="title"
            minLength={1}
            maxLength={titleLength}
            placeholder="Post title"
            required
            className={styles.tab__textTitle}
            onChange={handleTitleChange}
            value={title}
          />
          <span
            className={styles.tab__titleChar}
            aria-label="Number of characters remaining for post title"
          >
            {titleLength - title.length}/300
          </span>
        </div>
      </label>
      <label htmlFor="image-post_img" className={styles.tab__label}>
        <span className={styles.tab__labelText}>
          Image <abbr title="required">*</abbr>:
        </span>
        <input
          ref={imgInputRef}
          type="file"
          id="image-post_img"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          required
          className={styles.tab__imgInput}
          onChange={handleImageChange}
        />
        {image && <span>{image.name}</span>}
        <small className={styles.tab__warning}>
          Note: Images must have a maximum size of 2MB
        </small>
      </label>
      <label htmlFor="image-post_details" className={styles.tab__label}>
        <span className={styles.tab__labelText}>Text (optional):</span>
        <textarea
          id="image-post_details"
          name="details"
          placeholder="Post details"
          className={styles.tab__textarea}
          onChange={handleDetailChange}
          value={details}
        />
      </label>

      {imgUploadProgress > 0 && (
        <div className={styles.progress}>
          <Loading message={`Uploading image...`} />
          <div className={styles.progress__barWrapper}>
            <progress
              id="img-upload__progress"
              value={imgUploadProgress}
              max={100}
              className={styles.progress__bar}
            />
            <label
              htmlFor="img-upload__progress"
              className={styles.progress__label}
            >
              {imgUploadProgress}% complete
            </label>
          </div>
        </div>
      )}

      <button
        type="submit"
        className={styles.tab__btnSubmit}
        disabled={!!(title.length < 1 && !image)}
      >
        Submit Post
      </button>
    </form>
  );
}
export default CreateImagePost;
