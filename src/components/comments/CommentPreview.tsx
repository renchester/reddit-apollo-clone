import Link from 'next/link';
import styles from './CommentPreview.module.scss';
import { Comment, Post } from '@/types/types';
import { useEffect, useState } from 'react';
import fetchPostData from '@/firebase/firestore/posts/read/fetchPostData';
import calculateKarma from '@/utils/calculateKarma';
import { formatDistanceToNowStrict } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import upvoteComment from '@/firebase/firestore/comments/update/upvoteComment';
import removeUpvoteOnComment from '@/firebase/firestore/comments/update/removeUpvoteOnComment';

type CommentPreviewProps = {
  comment: Comment;
};

function CommentPreview(props: CommentPreviewProps) {
  const { comment } = props;
  const { user, upvotedComments } = useAuth();
  const { addAlert } = useSnackbar();

  const [parentPost, setParentPost] = useState<Post | null>(null);
  const [commentKarma, setCommentKarma] = useState(
    calculateKarma(
      comment.upvoted_by.length,
      comment.downvoted_by.length,
      true,
    ),
  );
  const [isUpvoted, setUpvotedStatus] = useState(false);

  const formattedDate = formatDistanceToNowStrict(
    new Date(comment.date_created as string),
  );

  const toggleUpvote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!user) return;

      if (isUpvoted) {
        setUpvotedStatus(false);
        setCommentKarma((prev) => Math.max(prev - 1, 0));

        await removeUpvoteOnComment(user, comment);
      } else if (!isUpvoted) {
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

  useEffect(() => {
    const fetchParentPost = async () => {
      const postData = await fetchPostData(comment.parent_post_slug);

      if (postData) {
        setParentPost(postData);
      }
    };

    fetchParentPost();
  }, [comment]);

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

  return (
    <article
      className={styles.container}
      aria-label={`Comment to post ${
        parentPost?.title || comment.parent_post_slug
      }`}
    >
      <Link
        href={`/r/${parentPost?.parent_subreddit}/${parentPost?.slug}`}
        className={styles.link}
      >
        <div className={styles.main}>
          <span
            className={styles.main__originalPoster}
            aria-label="Original Poster"
          >
            {comment.original_poster}
          </span>
          <button
            type="button"
            className={styles.main__btnUpvote}
            aria-label="Upvote comment"
            onClick={toggleUpvote}
            data-upvoted={isUpvoted}
          >
            <i
              className={`material-symbols-outlined ${styles.main__btnIcon}`}
              aria-hidden
            >
              north
            </i>
            <span
              className={styles.main__upvoteCount}
              aria-label="Upvote count"
            >
              {Math.max(commentKarma, 0)}
            </span>
          </button>
          <time
            dateTime={comment.date_created as string}
            className={styles.main__date}
            aria-label="Date created"
          >
            {formattedDate}
          </time>
        </div>
        <div className={styles.content} aria-label="Comment contents">
          <p className={styles.content__paragraph}>{comment.content}</p>
        </div>
      </Link>

      <Link
        href={`/r/${parentPost?.parent_subreddit}`}
        className={styles.subreddit}
      >
        <h3
          className={styles.subreddit__post}
          aria-label="Subreddit post title"
        >
          {parentPost?.title}
        </h3>
        <span className={styles.subreddit__title} aria-label="Subreddit title">
          {`r/${parentPost?.parent_subreddit}`}
        </span>
      </Link>
    </article>
  );
}
export default CommentPreview;
