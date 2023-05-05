import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config';

const uploadImage = async (
  image: File,
  imagePath: string,
  setProgress?: React.Dispatch<React.SetStateAction<number>>,
) => {
  try {
    if (!image) throw new Error('Unable to upload empty file');

    const imgRef = ref(storage, imagePath);
    const uploadTask = uploadBytesResumable(imgRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (setProgress !== undefined) {
          setProgress(progress);
        }
      },
      (storageError) => {
        switch (storageError.code) {
          case 'storage/unauthorized': {
            throw new Error('You do not have permission to access the object');
          }
          case 'storage/canceled': {
            throw new Error('Upload canceled');
          }
          case 'storage/unknown': {
            throw new Error('Unknown error occurred');
          }
          default: {
            throw new Error('Unable to upload image');
          }
        }
      },
    );

    // await completion of the upload task
    await uploadTask;

    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadUrl;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};

export default uploadImage;
