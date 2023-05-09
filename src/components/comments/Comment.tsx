import styles from './Comment.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import CommentMenu from './CommentMenu';
import { Comment } from '@/types/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNewComment } from '@/hooks/useNewComment';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import calculateKarma from '@/utils/calculateKarma';
import removeUpvoteOnComment from '@/firebase/firestore/comments/update/removeUpvoteOnComment';
import upvoteComment from '@/firebase/firestore/comments/update/upvoteComment';
import downvoteComment from '@/firebase/firestore/comments/update/downvoteComment';
import removeDownvoteOnComment from '@/firebase/firestore/comments/update/removeDownvoteOnComment';
import deleteComment from '@/firebase/firestore/comments/delete/deleteComment';
import useTimeDistance from '@/hooks/useTimeDistance';

type CommentProps = {
  comment: Comment;
  children?: ReactNode;
};

function Comment(props: CommentProps) {
  const { comment } = props;
  const { user, upvotedComments, downvotedComments } = useAuth();
  const { addAlert } = useSnackbar();
  const { comments } = useNewComment();

  const [isMenuShown, setMenuVisibility] = useState(false);
  const [isExpanded, setExpandedState] = useState(true);
  const [isUpvoted, setUpvotedStatus] = useState(false);
  const [isDownvoted, setDownvotedStatus] = useState(false);
  const [commentKarma, setCommentKarma] = useState(
    calculateKarma(
      comment.upvoted_by.length,
      comment.downvoted_by.length,
      true,
    ),
  );

  // Get comment data/content of "this" comment's children
  const childComments = comments.filter((curr) =>
    comment.child_comments.includes(curr.comment_id),
  );

  const formattedDate = useTimeDistance({
    endDate: new Date(comment.date_created as string),
  });

  const levelStyles = {
    marginLeft: comment.comment_level > 1 ? '1rem' : '0rem',
  };

  const hideMenu = () => {
    setMenuVisibility(false);
  };

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisibility((prev) => !prev);
  };

  const collapseComment = () => setExpandedState(false);

  const toggleComment = () => {
    setExpandedState((prev) => !prev);
    setMenuVisibility(false);
  };

  const toggleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (!user) return;

      if (isUpvoted) {
        setUpvotedStatus(false);
        setCommentKarma((prev) => Math.max(prev - 1, 0));

        await removeUpvoteOnComment(user, comment);
      } else if (!isUpvoted) {
        setDownvotedStatus(false);
        setUpvotedStatus(true);
        setCommentKarma((prev) => {
          return prev < 0 ? 0 : prev + 1;
        });

        await upvoteComment(user, comment);
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

  const toggleDownvote = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (!user) return;

      if (isDownvoted) {
        setDownvotedStatus(false);
        setCommentKarma((prev) => Math.max(prev - 1, 0));

        await removeDownvoteOnComment(user, comment);
      } else if (!isDownvoted) {
        setUpvotedStatus(false);
        setDownvotedStatus(true);
        setCommentKarma((prev) => Math.max(prev - 1, 0));

        await downvoteComment(user, comment);
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

  const handleDeleteComment = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (!user || user.user_id !== comment.original_poster_id)
        throw new Error('You do not have permission to delete this post');

      const result = await deleteComment(
        user,
        comment.parent_post_id,
        comment.comment_id,
      );

      if (result) {
        addAlert({ message: 'Deleted comment', status: 'neutral' });
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

  // Upvote Handler
  useEffect(() => {
    if (!user || !upvotedComments) {
      setUpvotedStatus(false);
      return;
    }

    const isUserUpvoted = !!upvotedComments.find(
      (currComment) => currComment.comment_id === comment.comment_id,
    );

    setUpvotedStatus(isUserUpvoted);
  }, [user, upvotedComments, comment]);

  // Downvote Handler
  useEffect(() => {
    if (!user || !downvotedComments) {
      setDownvotedStatus(false);
      return;
    }

    const isUserDownvoted = !!downvotedComments.find(
      (currComment) => currComment.comment_id === comment.comment_id,
    );

    setDownvotedStatus(isUserDownvoted);
  }, [user, downvotedComments, comment]);

  return (
    <div className={styles.comment} style={levelStyles}>
      <div className={styles.comment__self} data-level={comment.comment_level}>
        <div
          className={`${styles.main} ${!isExpanded && styles.main__withBorder}`}
          onClick={toggleComment}
        >
          <div className={styles.main__left}>
            <span className={styles.main__originalPoster}>
              {comment.original_poster}
            </span>
            <button
              type="button"
              aria-label="Upvote comment"
              onClick={toggleUpvote}
              className={styles.main__btnUpvote}
              data-upvoted={isUpvoted}
              data-downvoted={isDownvoted}
            >
              <i
                className={`material-symbols-outlined ${styles.main__iconUpvote}`}
                aria-hidden
              >
                {isDownvoted ? 'south' : 'north'}
              </i>
              <span>{Math.max(commentKarma, 0)}</span>
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
                <time
                  className={styles.main__time}
                  dateTime={comment.date_created as string}
                >
                  {formattedDate}
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

            {isMenuShown && (
              <CommentMenu
                parentComment={comment}
                isUpvoted={isUpvoted}
                isDownvoted={isDownvoted}
                hideMenu={hideMenu}
                toggleUpvote={toggleUpvote}
                toggleDownvote={toggleDownvote}
                deleteComment={handleDeleteComment}
              />
            )}
          </div>
        </div>
        {isExpanded && (
          <p className={styles.content} onClick={collapseComment}>
            {comment.content}
          </p>
        )}
      </div>

      {isExpanded &&
        childComments.map((cm) => (
          <Comment key={`comment-post__${comment.comment_id}`} comment={cm} />
        ))}
    </div>
  );
}
export default Comment;
