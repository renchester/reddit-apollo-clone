import { Subreddit } from '@/types/types';
import Menu from '../menus/Menu';
import MenuButton from '../menus/MenuButton';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/hooks/useSnackbar';
import toggleFavoriteSubreddit from '@/firebase/firestore/subreddits/update/toggleFavoriteSubreddit';

type SubredditMenuProps = {
  hideMenu: () => void;
  subreddit: Subreddit;
  isUserSubscribed: boolean;
  handleSubscriptionChange: () => void;
  isFavorited: boolean;
};

function SubredditMenu(props: SubredditMenuProps) {
  const {
    hideMenu,
    subreddit,
    isUserSubscribed,
    handleSubscriptionChange,
    isFavorited,
  } = props;
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const router = useRouter();

  const subscriptionText = isUserSubscribed ? 'Leave' : 'Subscribe';
  const favoriteText = isFavorited ? 'Unfavorite' : 'Favorite';

  const goToSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/r/${subreddit.name}/submit`);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      addAlert({
        message: 'Favoriting subreddits is only available for logged in users',
        status: 'error',
      });
    } else await toggleFavoriteSubreddit(user, subreddit.name);
  };

  return (
    <Menu hideMenu={hideMenu}>
      <MenuButton
        icon="history_edu"
        text="Submit Post"
        label="Submit a post to this subreddit"
        handler={goToSubmit}
      />
      <MenuButton
        icon="favorite"
        text={subscriptionText}
        label="Subscribe to this subreddit"
        handler={handleSubscriptionChange}
      />
      {isUserSubscribed && (
        <MenuButton
          icon="star"
          text={favoriteText}
          label="Make this subreddit a favorite"
          handler={handleToggleFavorite}
        />
      )}
    </Menu>
  );
}
export default SubredditMenu;
