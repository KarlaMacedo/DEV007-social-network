import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';

// SUBIR IMAGENES
const storage = getStorage();
export const uploadImg = (name, file) => {
  const fileName = `${new Date()}-${name}`;
  const storageRef = ref(storage, fileName);
  return uploadBytes(storageRef, file);
};

export const getUrl = (name) => {
  const storageRef = ref(storage, name);
  return getDownloadURL(storageRef);
};
// getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
//   console.log('File available at', downloadURL);
