/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import {
  doc, collection, addDoc, query, orderBy, onSnapshot, updateDoc, deleteDoc, Timestamp, arrayRemove, arrayUnion,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider,
} from 'firebase/auth';
import { auth, db } from './init.js';

// FUNCIÓN ENTRAR CON CORREO Y CONTRASEÑA
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

// FUNCIÓN REGISTRO
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

// FUNCIÓN GUARADR USUARIO
export const updateName = (displayName, _) => {
  updateProfile(auth ? auth.currentUser : _, { displayName });
};

// LOGIN CON GOOGLE
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);

// GUARDAR POST EN FIRESTORE
export const post = async (postText, userCords, userImage, _) => {
  const userAuth = auth ? auth.currentUser : _;
  const userAuthEmail = auth ? userAuth.email : _;
  const userAuthId = auth ? userAuth.uid : _;
  const userAuthName = auth ? userAuth.displayName : _;
  const docRef = await addDoc(collection(db, 'posts'), {
    text: postText,
    coords: userCords,
    image: userImage,
    userEmail: userAuthEmail,
    userId: userAuthId,
    userName: userAuthName,
    dateCreate: Timestamp.now(),
    likes: [],
    id: '',
  });

  const refId = docRef ? docRef.id : _;
  const idPost = await updateDoc(docRef, {
    id: refId,
  });
  console.log(idPost);
};

// OBTENER DATA DE POSTS FIRESTORE
const colRef = collection(db, 'posts');

// ORDENAR POST EN FORMA DESCENDENTE POR FECHA
export const orderPosts = () => query(colRef, orderBy('dateCreate', 'desc'));

// ACTUALIZACIONES EN TIEMPO REAL DE POSTS "ESCUCHADOR"
export const addPost = (callback) => {
  onSnapshot(orderPosts(colRef), (querySnapshot) => {
    const allPosts = []; // nuevo array a formar con los posts
    querySnapshot.docs.forEach((docPost) => { // recorre el objeto de objetos de posts
      allPosts.push({ ...docPost.data() }); // copia de cada objeto y se le da el id del post
    });
    callback(allPosts); // llamar al nuevo array formado
  });
};

// ELIMINAR POST
export const deleteDocData = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

// EDITAR POST
export const updatePost = (id, newPost) => updateDoc(doc(db, 'posts', id), newPost);

// DAR LIKE
export const like = async (id, uid) => updateDoc(doc(db, 'posts', id), { likes: arrayUnion(uid) });

// QUITAR LIKE
export const disLike = async (id, uid) => updateDoc(doc(db, 'posts', id), { likes: arrayRemove(uid) });

// INICIAR SESION CON FB
const providerFB = new FacebookAuthProvider();
export const loginWithFB = () => signInWithPopup(auth, providerFB);

// FUNCIÓN ACTUALIZAR NOMBRE PERFIL
export const updateNameProfile = (newName, _) => {
  updateProfile(auth ? auth.currentUser : _, { displayName: newName });
};
