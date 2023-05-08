import { Comment, Post } from '@/types/types';
import styles from './UserOverview.module.scss';
import CommentPreview from '../comments/CommentPreview';
import PostPreview from '../posts/PostPreview';

type UserOverviewProps = {
  comments: Comment[];
  posts: Post[];
};

function UserOverview(props: UserOverviewProps) {
  const { comments, posts } = props;
  const sortedUnion = [...comments, ...posts].sort((a, b) =>
    a.date_created > b.date_created ? -1 : 1,
  );

  return (
    <section className={styles.overview}>
      <h2 className={styles.overview__title}>Overview</h2>
      <div className={styles.overview__feed}>
        {sortedUnion.map((item) => {
          if ('comment_id' in item) {
            return (
              <CommentPreview
                key={`cm-preview__${item.comment_id}`}
                comment={item}
              />
            );
          } else {
            return (
              <PostPreview key={`post-preview__${item.post_id}`} post={item} />
            );
          }
        })}
      </div>
    </section>
  );
}
export default UserOverview;
