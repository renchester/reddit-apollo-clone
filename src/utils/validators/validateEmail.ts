const validateEmail = (email: string) => {
  if (!email) throw new Error('No email supplied');

  let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if (regex.test(email)) {
    return true;
  } else
    throw new Error('Email does not match required format (name@domain.com)');
};

export default validateEmail;
