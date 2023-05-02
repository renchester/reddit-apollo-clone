const validatePassword = (password: string) => {
  if (password.length < 6)
    throw new Error('Password must meet minimum length of 6 characters');

  return true;
};

export default validatePassword;
