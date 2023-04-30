import styles from './Comment.module.scss';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import CommentMenu from './CommentMenu';

type CommentProps = {
  level: number;
  children?: ReactNode;
};

function Comment(props: CommentProps) {
  const { level, children } = props;

  const levelStyles = {
    marginLeft: level > 1 ? '1rem' : '0rem',
  };

  const [isMenuShown, setMenuVisibility] = useState(false);

  const hideMenu = () => {
    setMenuVisibility(false);
  };

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisibility((prev) => !prev);
  };

  const [isExpanded, setExpandedState] = useState(true);

  const collapseComment = () => setExpandedState(false);

  const toggleComment = () => {
    setExpandedState((prev) => !prev);
    setMenuVisibility(false);
  };

  const upvoteComment = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.comment} style={levelStyles}>
      <div className={styles.comment__self}>
        <div
          className={`${styles.main} ${!isExpanded && styles.main__withBorder}`}
          onClick={toggleComment}
        >
          <div className={styles.main__left}>
            <span className={styles.main__originalPoster}>redditor123</span>
            <button
              type="button"
              aria-label="Upvote comment"
              onClick={upvoteComment}
              className={styles.main__btnUpvote}
            >
              <i
                className={`material-symbols-outlined ${styles.main__iconUpvote}`}
                aria-hidden
              >
                north
              </i>
              <span>124</span>
            </button>
          </div>
          <div className={styles.main__right}>
            {isExpanded ? (
              <>
                <button
                  type="button"
                  aria-label="Show comment options"
                  onClick={toggleOptions}
                  className={styles.main__btnMenu}
                >
                  <i
                    className={`material-symbols-outlined ${styles.main__iconMore}`}
                    aria-hidden
                  >
                    more_horiz
                  </i>
                </button>
                <time className={styles.main__time} dateTime="">
                  1d
                </time>
              </>
            ) : (
              <button type="button">
                <i
                  className={`material-symbols-outlined ${styles.main__iconExpand}`}
                  aria-hidden
                >
                  expand_more
                </i>
              </button>
            )}

            {isMenuShown && <CommentMenu hideMenu={hideMenu} />}
          </div>
        </div>
        {isExpanded && (
          <p className={styles.content} onClick={collapseComment}>
            At least for the Original Reddit you can go to your Preferences and
            uncheck &quot;Show trending subreddits on the home feed&quot; so it
            won&apos;t show it any more. There might be a way to make
            &quot;home&quot; your default area when logging in but I don&apos;t
            remember if that&apos;s already default or not.
          </p>
        )}
      </div>

      {isExpanded && children}
    </div>
  );
}
export default Comment;
