const calculatePostRating = (upvotes: number, downvotes: number) => {
  const karma = upvotes - downvotes;
  const totalInteractions = upvotes + downvotes;

  if (totalInteractions === 0) return 0;

  return (karma / totalInteractions) * 100;
};

export default calculatePostRating;
