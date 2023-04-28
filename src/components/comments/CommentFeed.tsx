import styles from './CommentFeed.module.scss';
import Comment from './Comment';
import Overlay from '../Overlay';
import AddCommentModal from './AddCommentModal';
import { useNewComment } from '@/hooks/useNewComment';

function CommentFeed() {
  const { isCommentModalShown, hideCommentModal } = useNewComment();

  return (
    <>
      <div className={styles.comment__feed}>
        <Comment level={1}>
          <Comment level={2}>
            <Comment level={3} />
          </Comment>
          <Comment level={2}>
            <Comment level={3}>
              <Comment level={4}>
                <Comment level={5}>
                  <Comment level={6}></Comment>
                </Comment>
              </Comment>
            </Comment>
          </Comment>
          <Comment level={2}></Comment>
        </Comment>
        <Comment level={1} />
      </div>
      {isCommentModalShown && (
        <Overlay hideChildren={hideCommentModal}>
          <AddCommentModal />
        </Overlay>
      )}
    </>
  );
}
export default CommentFeed;
