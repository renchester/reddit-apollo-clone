import { ReactNode, createContext, useContext, useState } from 'react';
import Overlay from '@/components/Overlay';
import AddCommentModal from '@/components/comments/AddCommentModal';
import { Comment, Post } from '@/types/types';

type NewCommentProviderProps = {
  children: ReactNode;
  parentPost: Post;
  comments: Comment[];
};

const NewCommentContext = createContext<{
  parentPost: Post | undefined;
  comments: Comment[];
  isCommentModalShown: boolean;
  showCommentModal: (parentComment?: Comment) => void;
  hideCommentModal: () => void;
  setParentComment: React.Dispatch<React.SetStateAction<Comment | null>>;
} | null>(null);

export const NewCommentProvider = (props: NewCommentProviderProps) => {
  const { parentPost, children, comments } = props;

  const [isCommentModalShown, setCommentModalVisibility] = useState(false);
  const [parentComment, setParentComment] = useState<Comment | null>(null);

  const showCommentModal = (parentComment?: Comment) => {
    if (parentComment) {
      setParentComment(parentComment);
    }
    setCommentModalVisibility(true);
  };

  const hideCommentModal = () => setCommentModalVisibility(false);

  return (
    <NewCommentContext.Provider
      value={{
        isCommentModalShown,
        showCommentModal,
        hideCommentModal,
        setParentComment,
        parentPost,
        comments,
      }}
    >
      {children}
      {isCommentModalShown && (
        <Overlay hideChildren={hideCommentModal}>
          <AddCommentModal
            parentPost={parentPost}
            parentComment={parentComment}
          />
        </Overlay>
      )}
    </NewCommentContext.Provider>
  );
};

export const useNewComment = () => {
  const context = useContext(NewCommentContext);

  if (context === null || context === undefined) {
    throw new Error('useNewComment must be used within the NewCommentProvider');
  }

  return context;
};
