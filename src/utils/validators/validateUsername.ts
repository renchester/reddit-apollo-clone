const validateUsername = (username: string) => {
  if (username.length < 3)
    throw new Error('Username must meet minimum length of 3 characters.');
  if (username.length > 30)
    throw new Error('Username must be below maximum length of 30 characters.');

  const regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim);
  const isRegexMatch = regex.test(username);

  if (!isRegexMatch)
    throw new Error(
      'Username must only contain letters, numbers, periods, and underscores',
    );

  if (username && isRegexMatch) {
    return true;
  } else return false;
};

export default validateUsername;
