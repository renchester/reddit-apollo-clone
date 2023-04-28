import { ReactNode, createContext, useContext, useState } from 'react';

type NewCommentProviderProps = {
  children: ReactNode;
};

const NewCommentContext = createContext<{
  isCommentModalShown: boolean;
  showCommentModal: () => void;
  hideCommentModal: () => void;
  toggleCommentModal: () => void;
} | null>(null);

export const NewCommentProvider = (props: NewCommentProviderProps) => {
  const { children } = props;

  const [isCommentModalShown, setCommentModalVisibility] = useState(false);

  const showCommentModal = () => setCommentModalVisibility(true);
  const hideCommentModal = () => setCommentModalVisibility(false);
  const toggleCommentModal = () => setCommentModalVisibility((prev) => !prev);

  return (
    <NewCommentContext.Provider
      value={{
        isCommentModalShown,
        showCommentModal,
        hideCommentModal,
        toggleCommentModal,
      }}
    >
      {children}
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
