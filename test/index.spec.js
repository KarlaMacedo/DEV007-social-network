import {
  // eslint-disable-next-line max-len
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import {
  signIn, createUser, updateName, loginWithGoogle,
} from '../src/firebase/index';

jest.mock('firebase/auth');

beforeEach(() => {
  signInWithEmailAndPassword.mockClear();
  createUserWithEmailAndPassword.mockClear();
  updateProfile.mockClear();
  signInWithPopup.mockClear();
  GoogleAuthProvider.mockClear();
});

test('debería retornar la información del usuario una vez que se ha logeado', async () => {
  signInWithEmailAndPassword.mockReturnValueOnce({ user: 'string' });
  const userLogin = await signIn();
  expect(userLogin.user).toBe('string');
  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

test('debería retornar error cuando no funcione la dependencia', async () => {
  signInWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
  const userLogin = await signIn();
  expect(userLogin).toBeInstanceOf(Error);
  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

test('debería retornar la información del usuario una vez que haya sido creado', async () => {
  createUserWithEmailAndPassword.mockReturnValueOnce({ user: 'string' });
  const userCreate = await createUser();
  expect(userCreate.user).toBe('string');
  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

test('debería retornar error cuando no funcione', async () => {
  createUserWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
  const userCreate = await createUser();
  expect(userCreate).toBeInstanceOf(Error);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});

test('debería retornar el nombre del usuario guardado', async () => {
  updateProfile.mockReturnValue({ displayName: 'UserName' });
  const currentUser = 'string';
  console.log(currentUser);
  const userSaved = await updateName();
  expect(userSaved.displayName).toBe('UserName');
  expect(updateProfile).toHaveBeenCalledTimes(1);
});

test('debería retornar error cuando no se haya guardado', async () => {
  updateProfile.mockReturnValue(new Error('ups'));
  const userSaved = await updateName();
  expect(userSaved).toBeInstanceOf(Error);
  expect(updateProfile).toHaveBeenCalledTimes(1);
});

test('debería retornar la información del usuario una vez que se ha logeado con Google', async () => {
  signInWithPopup.mockReturnValue({ user: 'stringGoogle' });
  const provider = GoogleAuthProvider.mockReturnValue({});
  console.log(provider);
  const signInGoogle = await loginWithGoogle();
  expect(signInGoogle.displayName).toBe('stringGoogle');
  expect(signInWithPopup).toHaveBeenCalledTimes(1);
});

test('debería retornar error cuando no se haya logeado con Google', async () => {
  signInWithPopup.mockReturnValue(new Error('ups'));
  const signInGoogle = await loginWithGoogle();
  expect(signInGoogle).toBeInstanceOf(Error);
  expect(signInWithPopup).toHaveBeenCalledTimes(1);
});
