/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQM1c-S_xesXYnQCp8NQXpWSk_yvfAZE0',
  authDomain: 'rockbook-a84e0.firebaseapp.com',
  projectId: 'rockbook-a84e0',
  storageBucket: 'rockbook-a84e0.appspot.com',
  messagingSenderId: '259755500176',
  appId: '1:259755500176:web:1eaa6528cfd8091f4fae15',
  measurementId: 'G-17VRS4G1DD',
};

export const app = initializeApp(firebaseConfig);
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

// FUNCIÓN GUARADR DATOS USUARIO
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
