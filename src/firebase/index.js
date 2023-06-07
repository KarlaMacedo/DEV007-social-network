/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  getFirestore, setDoc, doc, collection, addDoc, query, orderBy, onSnapshot, updateDoc, deleteDoc, Timestamp,
} from 'firebase/firestore';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { app } from './init.js';

export const auth = getAuth(app);
export const db = getFirestore(app);

// FUNCIÓN ENTRAR CON CORREO Y CONTRASEÑA
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// FUNCIÓN REGISTRO
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// FUNCIÓN GUARADR USUARIO
export const updateName = (displayName) => {
  updateProfile(auth.currentUser, { displayName });
};

// FUNCIÓN GUARADR DATOS USUARIO EN FIRESTORE
export const savedUser = (displayName, email, password, uid) => setDoc(doc(db, 'users', uid), {
  displayName,
  email,
  password,
  uid,
});

// FUNCIÓN MOSTRAR DATOS DE USUARIO
export const currentUserInfo = () => auth.currentUser;

// LOGIN CON GOOGLE
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);

// GUARDAR POST EN FIRESTORE
export const post = async (postText, userCords, userImage) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      text: postText,
      coords: userCords,
      image: userImage,
      userEmail: auth.currentUser.email,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      dateCreate: Timestamp.now(),
      likes: [],
      id: '',
    });
    console.log(docRef.id);
    const idPost = await updateDoc(docRef, {
      id: docRef.id,
    });
    console.log(idPost);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// OBTENER DATA DE POSTS FIRESTORE
const colRef = collection(db, 'posts');
console.log(colRef.id);
console.log(colRef);

// ORDENAR POST EN FORMA DESCENDENTE POR FECHA
export const readPosts = () => query(colRef, orderBy('dateCreate', 'desc'));

// ACTUALIZACIONES EN TIEMPO REAL DE POSTS "ESCUCHADOR"
export const addPost = (callback) => {
  onSnapshot(readPosts(colRef), (querySnapshot) => {
    const allPosts = []; // nuevo array a formar con los posts
    console.log(querySnapshot);
    querySnapshot.forEach((docPost) => { // recorre el objeto de objetos de posts
      allPosts.push({ ...docPost.data() }); // copia de cada objeto y se le da el id del post
      console.log(docPost.data());
      console.log(doc.id);
    });
    console.log(allPosts);
    callback(allPosts); // llamar al nuevo array formado
  });
};

// ELIMINAR POST
export const deleteDocData = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

// EDITAR POST
export const updatePost = (id, newPost) => updateDoc(doc(db, 'posts', id), newPost);
