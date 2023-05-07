import styles from './CommentFeed.module.scss';
import Comment from './Comment';
import { useNewComment } from '@/hooks/useNewComment';

function CommentFeed() {
  const { comments } = useNewComment();

  const topLevelComments = comments.filter(
    (comment) => comment.comment_level === 1,
  );

  return (
    <>
      <div className={styles.comment__feed}>
        {topLevelComments.map((comment) => (
          <Comment
            key={`comment-post__${comment.comment_id}`}
            comment={comment}
          />
        ))}
      </div>
    </>
  );
}
export default CommentFeed;
