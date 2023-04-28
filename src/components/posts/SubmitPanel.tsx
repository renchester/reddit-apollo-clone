import { useState } from 'react';
import styles from './SubmitPanel.module.scss';

function SubmitPanel() {
  const MAX_IMG_SIZE = 2097152; //2MB
  const MAX_TITLE_LENGTH = 300;

  const [activePanel, setActivePanel] = useState(1);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  return (
    <div className={styles.tab}>
      <div role="tablist" className={styles.tab__list}>
        <button
          type="button"
          role="tab"
          aria-controls="text_panel"
          aria-selected={activePanel === 1}
          aria-label="Show text post submission panel"
          id="text_tab"
          className={styles.tab__tab}
          onClick={() => setActivePanel(1)}
        >
          <i
            className={`material-symbols-outlined ${styles.tab__tabIcon}`}
            aria-hidden
          >
            description
          </i>
          <span>Text</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-controls="image_panel"
          aria-selected={activePanel === 2}
          aria-label="Show image post submission panel"
          id="image_tab"
          className={styles.tab__tab}
          onClick={() => setActivePanel(2)}
        >
          <i
            className={`material-symbols-outlined ${styles.tab__tabIcon}`}
            aria-hidden
          >
            image
          </i>
          <span>Image</span>
        </button>
      </div>
      <div
        id="text_panel"
        role="tabpanel"
        aria-labelledby="text_tab"
        className={styles.tab__panel}
        {...{ hidden: activePanel === 2 }}
      >
        <form className={styles.tab__form}>
          <label htmlFor="text-post_title" className={styles.tab__label}>
            <span className={styles.tab__labelText}>
              Title <abbr title="required">*</abbr>:
            </span>
            <div className={styles.tab__titleWrapper}>
              <textarea
                id="text-post_title"
                name="title"
                minLength={1}
                maxLength={MAX_TITLE_LENGTH}
                placeholder="Post title"
                required
                className={styles.tab__textTitle}
                onChange={handleTitleChange}
                value={title}
              />
              <span className={styles.tab__titleChar}>
                {MAX_TITLE_LENGTH - title.length}/300
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

          <button type="submit" className={styles.tab__btnSubmit}>
            Submit Post
          </button>
        </form>
      </div>
      <div
        id="image_panel"
        role="tabpanel"
        aria-labelledby="image_tab"
        className={styles.tab__panel}
        {...{ hidden: activePanel === 1 }}
      >
        <form className={styles.tab__form}>
          <label htmlFor="image-post_title" className={styles.tab__label}>
            <span className={styles.tab__labelText}>
              Title <abbr title="required">*</abbr>:
            </span>
            <div className={styles.tab__titleWrapper}>
              <textarea
                id="image-post_title"
                name="title"
                minLength={1}
                maxLength={MAX_TITLE_LENGTH}
                placeholder="Post title"
                required
                className={styles.tab__textTitle}
                onChange={handleTitleChange}
                value={title}
              />
              <span className={styles.tab__titleChar}>
                {MAX_TITLE_LENGTH - title.length}/300
              </span>
            </div>
          </label>
          <label htmlFor="image-post_img" className={styles.tab__label}>
            <span className={styles.tab__labelText}>
              Image <abbr title="required">*</abbr>:
            </span>
            <input
              type="file"
              id="image-post_img"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              size={MAX_IMG_SIZE}
              required
              className={styles.tab__imgInput}
            />
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

          <button type="submit" className={styles.tab__btnSubmit}>
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}
export default SubmitPanel;
