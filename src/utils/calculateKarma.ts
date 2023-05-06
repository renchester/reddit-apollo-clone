const calculateKarma = (
  upvotes: number,
  downvotes: number,
  actual: boolean = false,
) => {
  const actualKarma = upvotes - downvotes;
  if (actual) return actualKarma;

  return Math.max(actualKarma, 0);
};

export default calculateKarma;
