import sliceIdFromEnd from './sliceIdFromEnd';
import slugify from 'slugify';

const slugifyPost = (title: string, postId: string) => {
  const slicedId = sliceIdFromEnd(postId, 5);
  const slug = slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'en',
    trim: true,
  });

  return `${slug}-${slicedId}`;
};

export default slugifyPost;
