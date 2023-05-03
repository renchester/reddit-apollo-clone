const validateSubreddit = (subreddit: string) => {
  if (subreddit.length < 3)
    throw new Error('Subreddit name must meet minimum length of 3 characters.');
  if (subreddit.length > 21)
    throw new Error(
      'Subreddit name must be below maximum length of 21 characters.',
    );

  const regex = new RegExp(/^[a-zA-Z0-9_]{3,21}$/);
  const isRegexMatch = regex.test(subreddit);

  if (!isRegexMatch)
    throw new Error(
      'Subreddit name must only contain letters, numbers, and underscores',
    );

  if (subreddit && isRegexMatch) {
    return true;
  } else return false;
};

export default validateSubreddit;
