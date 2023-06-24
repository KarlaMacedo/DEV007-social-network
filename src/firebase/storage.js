import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';

// SUBIR IMAGENES A LA DATA
const storage = getStorage();
export const uploadImg = (name, file) => {
  const fileName = `${new Date()}-${name}`;
  const storageRef = ref(storage, fileName);
  return uploadBytes(storageRef, file);
};

// OBTENER URL DE IMAGEN EN LA DATA
export const getUrl = (name) => {
  const storageRef = ref(storage, name);
  return getDownloadURL(storageRef);
};
