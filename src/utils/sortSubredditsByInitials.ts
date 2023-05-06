import { UserSubscription } from '@/types/types';

const sortSubredditsByInitials = (subreddits: UserSubscription[]) => {
  const sortedArray = subreddits.sort((a, b) =>
    a.subreddit.toLowerCase() > b.subreddit.toLowerCase() ? 1 : -1,
  );
  const sortedSubs: { [key: string]: UserSubscription[] } = {};

  for (let i = 0; i < sortedArray.length; i++) {
    const initials = sortedArray[i].subreddit[0].toLowerCase();

    if (!sortedSubs.hasOwnProperty(initials)) {
      sortedSubs[initials] = [sortedArray[i]] as UserSubscription[];
    } else {
      sortedSubs[initials].push(sortedArray[i]);
    }
  }

  return sortedSubs;
};

export default sortSubredditsByInitials;
