import { useState } from 'react';
import styles from './SubmitPanel.module.scss';
import { Subreddit } from '@/types/types';
import CreateTextPost from './CreateTextPost';
import CreateImagePost from './CreateImagePost';

type SubmitPanelProps = {
  subreddit: Subreddit;
};

function SubmitPanel(props: SubmitPanelProps) {
  const { subreddit } = props;

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

  const resetFields = () => {
    setTitle('');
    setDetails('');
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
        <CreateTextPost
          subreddit={subreddit}
          titleLength={MAX_TITLE_LENGTH}
          title={title}
          handleTitleChange={handleTitleChange}
          details={details}
          handleDetailChange={handleDetailChange}
          resetFields={resetFields}
        />
      </div>
      <div
        id="image_panel"
        role="tabpanel"
        aria-labelledby="image_tab"
        className={styles.tab__panel}
        {...{ hidden: activePanel === 1 }}
      >
        <CreateImagePost
          subreddit={subreddit}
          titleLength={MAX_TITLE_LENGTH}
          title={title}
          handleTitleChange={handleTitleChange}
          details={details}
          handleDetailChange={handleDetailChange}
          resetFields={resetFields}
        />
      </div>
    </div>
  );
}
export default SubmitPanel;
