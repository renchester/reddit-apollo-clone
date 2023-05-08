import { auth, db } from '@/firebase/config';
import getUserDetailsFromDb from '@/firebase/firestore/user/getUserDetailsFromDb';
import { onAuthStateChanged } from 'firebase/auth';
import {
  CommentInteraction,
  PostInteraction,
  UserSubscription,
} from '@/types/types';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '@/types/types';
import { collection, onSnapshot } from 'firebase/firestore';

type AuthContextType = {
  user: User | null;
  subscriptions: UserSubscription[] | null;
  upvotedPosts: PostInteraction[] | null;
  downvotedPosts: PostInteraction[] | null;
  bookmarkedPosts: PostInteraction[] | null;
  upvotedComments: CommentInteraction[] | null;
  downvotedComments: CommentInteraction[] | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[] | null>(
    null,
  );
  const [upvotedPosts, setUpvotedPosts] = useState<PostInteraction[] | null>(
    null,
  );
  const [downvotedPosts, setDownvotedPosts] = useState<
    PostInteraction[] | null
  >(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    PostInteraction[] | null
  >(null);

  const [upvotedComments, setUpvotedComments] = useState<
    CommentInteraction[] | null
  >(null);
  const [downvotedComments, setDownvotedComments] = useState<
    CommentInteraction[] | null
  >(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDetails = await getUserDetailsFromDb(firebaseUser.uid);

        if (userDetails) {
          // Set user to stored user details from Firestore
          setUser(userDetails);
        } else {
          console.error('ERROR: Unable to set user details');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setSubscriptions(null);
      return;
    }

    const subscriptionsRef = collection(
      db,
      `users/${user.user_id}/subscribed_subreddits`,
    );

    const unsubscribeSubscriptions = onSnapshot(subscriptionsRef, (snapshot) =>
      setSubscriptions(
        snapshot.docs.map((doc) => doc.data() as UserSubscription),
      ),
    );

    return () => unsubscribeSubscriptions();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setUpvotedPosts(null);
      return;
    }

    const upvotedPostsRef = collection(
      db,
      `users/${user?.user_id}/upvoted_posts`,
    );

    const unsubscribeUpvotedPosts = onSnapshot(upvotedPostsRef, (snapshot) =>
      setUpvotedPosts(
        snapshot.docs.map((doc) => doc.data() as PostInteraction),
      ),
    );

    return () => unsubscribeUpvotedPosts();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDownvotedPosts(null);
      return;
    }

    const downvotedPostsRef = collection(
      db,
      `users/${user?.user_id}/downvoted_posts`,
    );

    const unsubscribeDownvotedPosts = onSnapshot(
      downvotedPostsRef,
      (snapshot) =>
        setDownvotedPosts(
          snapshot.docs.map((doc) => doc.data() as PostInteraction),
        ),
    );

    return () => unsubscribeDownvotedPosts();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setBookmarkedPosts(null);
      return;
    }

    const bookmarkedPostsRef = collection(
      db,
      `users/${user?.user_id}/saved_posts`,
    );

    const unsubscribeBookmarkedPosts = onSnapshot(
      bookmarkedPostsRef,
      (snapshot) =>
        setBookmarkedPosts(
          snapshot.docs.map((doc) => doc.data() as PostInteraction),
        ),
    );

    return () => unsubscribeBookmarkedPosts();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setUpvotedComments(null);
      return;
    }

    const upvotedCommentsRef = collection(
      db,
      `users/${user?.user_id}/upvoted_comments`,
    );

    const unsubscribeUpvotedComments = onSnapshot(
      upvotedCommentsRef,
      (snapshot) =>
        setUpvotedComments(
          snapshot.docs.map((doc) => doc.data() as CommentInteraction),
        ),
    );

    return () => unsubscribeUpvotedComments();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDownvotedComments(null);
      return;
    }

    const downvotedCommentsRef = collection(
      db,
      `users/${user?.user_id}/downvoted_comments`,
    );

    const unsubscribeDownvotedComments = onSnapshot(
      downvotedCommentsRef,
      (snapshot) =>
        setDownvotedComments(
          snapshot.docs.map((doc) => doc.data() as CommentInteraction),
        ),
    );

    return () => unsubscribeDownvotedComments();
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      subscriptions,
      upvotedPosts,
      downvotedPosts,
      bookmarkedPosts,
      upvotedComments,
      downvotedComments,
    }),
    [
      user,
      subscriptions,
      upvotedPosts,
      downvotedPosts,
      bookmarkedPosts,
      upvotedComments,
      downvotedComments,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};
