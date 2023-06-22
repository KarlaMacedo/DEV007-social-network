import {
  // eslint-disable-next-line max-len
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, currentUser,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import {
  signIn, createUser, updateName, loginWithGoogle, post,
} from '../src/firebase/index';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

beforeEach(() => {
  signInWithEmailAndPassword.mockClear();
  createUserWithEmailAndPassword.mockClear();
  updateProfile.mockClear();
  signInWithPopup.mockClear();
  GoogleAuthProvider.mockClear();
});

describe('signIn', () => {
  test('debería retornar la información del usuario una vez que se ha logeado', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ email: 'hola@gmail.com' });
    const response = await signIn('hola@gmail.com', '1234567');
    expect(response.email).toBe('hola@gmail.com');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('debería retornar error cuando no funcione la dependencia', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
    const response = await signIn();
    expect(response).toBeInstanceOf(Error);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  test('debería retornar la información del usuario una vez que haya sido creado', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: 'string' });
    const response = await createUser();
    expect(response.user).toBe('string');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('debería retornar error cuando no funcione', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
    const response = await createUser();
    expect(response).toBeInstanceOf(Error);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('updateName', () => {
  test('debería retornar el nombre del usuario guardado', async () => {
    updateProfile.mockReturnValueOnce({ auth: { currentUser: {} } }, { displayName: 'UserName' });
    const response = await updateName();
    expect(response.displayName).toBe('UserName');
    expect(updateProfile).toHaveBeenCalledTimes(1);
  });

  test('debería retornar error cuando no se haya guardado', async () => {
    updateProfile.mockReturnValueOnce(new Error('ups'));
    const response = await updateName();
    expect(response).toBeInstanceOf(Error);
    expect(updateProfile).toHaveBeenCalledTimes(1);
  });
});

describe('loginWithGoogle', () => {
  test('debería retornar la información del usuario una vez que se ha logeado con Google', async () => {
    signInWithPopup.mockReturnValueOnce({ user: 'stringGoogle' });
    const provider = GoogleAuthProvider.mockReturnValueOnce({});
    console.log(provider);
    const response = await loginWithGoogle();
    expect(response.displayName).toBe('stringGoogle');
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });

  test('debería retornar error cuando no se haya logeado con Google', async () => {
    signInWithPopup.mockReturnValueOnce(new Error('ups'));
    const response = await loginWithGoogle();
    expect(response).toBeInstanceOf(Error);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('post', () => {
  test('debería contener el texto del post dado', async () => {
    const currentId = currentUser.mockReturnValueOnce({ uid: 'abcd123' });
    const currentEmail = currentUser.mockReturnValueOnce({ email: 'exaple@gmail.com' });
    const currentName = currentUser.mockReturnValueOnce({ displayName: 'Sofia' });
    addDoc.mockReturnValueOnce({
      text: 'Hola a todos',
      coords: '123',
      image: 'fotoPiedra',
      userEmail: { currentEmail },
      userId: { currentId },
      userName: { currentName },
      likes: ['abcd1234', 'efgh567'],
      id: 'ijkl89',
      dateCreate: {},
    });
    const response = await post('Hola a todos', '123', 'fotoPiedra');
    expect(response.text).toBe('Hola a todos');
    expect(addDoc).toHaveBeenCalledTimes(1);
  });

  test('debería retornar error cuando no se haya agregado el post', async () => {
    addDoc.mockReturnValueOnce(new Error('ups'));
    const response = await post();
    expect(response).toBeInstanceOf(Error);
    expect(addDoc).toHaveBeenCalledTimes(1);
  });
});
