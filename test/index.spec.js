import {
  // eslint-disable-next-line max-len
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, currentUser, FacebookAuthProvider,
} from 'firebase/auth';
import {
  addDoc, updateDoc, onSnapshot, deleteDoc, query,
} from 'firebase/firestore';
import {
  // eslint-disable-next-line max-len
  signIn, createUser, updateName, loginWithGoogle, post, addPost, deleteDocData, updatePost, like, disLike, loginWithFB, updateNameProfile, orderPosts,
} from '../src/firebase/index';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

beforeEach(() => {
  signInWithEmailAndPassword.mockClear();
  createUserWithEmailAndPassword.mockClear();
  updateProfile.mockClear();
  signInWithPopup.mockClear();
  GoogleAuthProvider.mockClear();
  updateDoc.mockClear();
});

describe('signIn', () => {
  test('debería retornar la información del usuario una vez que se ha logeado', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ email: 'hola@gmail.com' });
    const response = await signIn('hola@gmail.com', '1234567');
    expect(response.email).toBe('hola@gmail.com');
  });

  test('debería llamar a la función signInWithEmailAndPassword cuando es ejecutada', async () => {
    await signIn('hola@gmail.com', '1234567');
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  test('debería retornar error cuando no funcione la dependencia', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
    const response = await signIn('hola@gmail.com', '1234567');
    expect(response).toBeInstanceOf(Error);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  test('debería retornar la información del usuario una vez que haya sido creado', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: 'string' });
    const response = await createUser('hola@gmail.com', '1234567');
    expect(response.user).toBe('string');
  });

  test('debería llamar a la función createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await createUser('hola@gmail.com', '1234567');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  test('debería retornar error cuando no funcione', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce(new Error('ups'));
    const response = await createUser('hola@gmail.com', '1234567');
    expect(response).toBeInstanceOf(Error);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('updateName', () => {
  test('debería retornar el nombre del usuario guardado', async () => {
    updateProfile.mockReturnValueOnce({ user: { displayName: 'Prueba' } });
    const response = await updateName('Prueba');
    expect(response.user.displayName).toBe('Prueba');
  });

  test('debería llamar a la función updateProfile cuando es ejecutada', async () => {
    await updateName('Prueba');
    expect(updateProfile).toHaveBeenCalled();
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
    expect(response.user).toBe('stringGoogle');
  });

  test('debería llamar a la función signInWithPopup cuando es ejecutada', async () => {
    await loginWithGoogle();
    expect(signInWithPopup).toHaveBeenCalled();
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
    updateDoc.mockReturnValueOnce({ text: 'Hola a todos' });
    const response = await post('Hola a todos', '123', 'fotoPiedra');
    expect(response.text).toBe('Hola a todos');
  });

  test('debería llamar a la función addDoc cuando es ejecutada', async () => {
    await post('Hola a todos', '123', 'fotoPiedra');
    expect(addDoc).toHaveBeenCalled();
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await post('Hola a todos', '123', 'fotoPiedra');
    expect(updateDoc).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya agregado el post', async () => {
    addDoc.mockReturnValueOnce(new Error('ups'));
    const response = await post();
    expect(response).toBeInstanceOf(Error);
    expect(addDoc).toHaveBeenCalledTimes(1);
  });
});

describe('addPost', () => {
  test('debería contener todos los posts', async () => {
    onSnapshot.mockReturnValueOnce({
      posts: 'all posts',
    });
    const response = await addPost('callback');
    expect(typeof response).toBe('object');
  });

  test('debería llamar a la función onSnapshot cuando es ejecutada', async () => {
    await addPost('callback');
    expect(onSnapshot).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se obtengan los posts', async () => {
    onSnapshot.mockReturnValueOnce(new Error('ups'));
    const response = await addPost('callback');
    expect(response).toBeInstanceOf(Error);
    expect(onSnapshot).toHaveBeenCalledTimes(1);
  });
});

describe('deleteDocData', () => {
  test('debería borrar post', async () => {
    deleteDoc.mockReturnValueOnce({ post: '' });
    const response = await deleteDocData('1234');
    expect(response.post).toEqual('');
  });

  test('debería llamar a la función deleteDoc cuando es ejecutada', async () => {
    await deleteDocData('1234');
    expect(deleteDoc).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se eliminen los posts', async () => {
    deleteDoc.mockReturnValueOnce(new Error('ups'));
    const response = await deleteDocData('1234');
    expect(response).toBeInstanceOf(Error);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

describe('updatePost', () => {
  test('debería editar post', async () => {
    updateDoc.mockReturnValueOnce({ text: 'newText' });
    const response = await updatePost('12345', 'newText');
    expect(response.text).toBe('newText');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await updatePost('12345', 'newText');
    expect(updateDoc).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se editen los posts', async () => {
    updateDoc.mockReturnValueOnce(new Error('ups'));
    const response = await updatePost('12345', 'newText');
    expect(response).toBeInstanceOf(Error);
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});

describe('like', () => {
  test('debería dar like a post', async () => {
    updateDoc.mockReturnValueOnce({ likes: 'newLike' });
    const response = await like('12345', 'newLike');
    expect(response.likes).toBe('newLike');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await like('12345', 'newLike');
    expect(updateDoc).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya dado like a los posts', async () => {
    updateDoc.mockReturnValueOnce(new Error('ups'));
    const response = await like('12345', 'callback');
    expect(response).toBeInstanceOf(Error);
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});

describe('disLike', () => {
  test('debería quitar like a post', async () => {
    updateDoc.mockReturnValueOnce({ likes: '' });
    const response = await disLike('12345', 'deleteLike');
    expect(response.likes).toBe('');
  });

  test('debería llamar a la función updateDoc cuando es ejecutada', async () => {
    await disLike('12345', 'deleteLike');
    expect(updateDoc).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya borrado el like a los posts', async () => {
    updateDoc.mockReturnValueOnce(new Error('ups'));
    const response = await disLike('12345', 'deleteLike');
    expect(response).toBeInstanceOf(Error);
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});

describe('loginWithFB', () => {
  test('debería retornar la información del usuario una vez que se ha logeado con Facebook', async () => {
    signInWithPopup.mockReturnValueOnce({ user: 'stringFacebook' });
    const provider = FacebookAuthProvider.mockReturnValueOnce({});
    console.log(provider);
    const response = await loginWithFB();
    expect(response.user).toBe('stringFacebook');
  });

  test('debería llamar a la función signInWithPopup cuando es ejecutada', async () => {
    await loginWithFB();
    expect(signInWithPopup).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya logeado con Google', async () => {
    signInWithPopup.mockReturnValueOnce(new Error('ups'));
    const response = await loginWithFB();
    expect(response).toBeInstanceOf(Error);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('updateNameProfile', () => {
  test('debería retornar el nombre del usuario actualizado', async () => {
    updateProfile.mockReturnValueOnce({ user: { displayName: 'Prueba' } });
    const response = await updateNameProfile('Prueba');
    expect(response.user.displayName).toBe('Prueba');
  });

  test('debería llamar a la función updateProfile cuando es ejecutada', async () => {
    await updateNameProfile('Prueba');
    expect(updateProfile).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya actualizado', async () => {
    updateProfile.mockReturnValueOnce(new Error('ups'));
    const response = await updateNameProfile('Prueba');
    expect(response).toBeInstanceOf(Error);
    expect(updateProfile).toHaveBeenCalledTimes(1);
  });
});

describe('orderPosts', () => {
  test('debería retornar los post ordenados', async () => {
    query.mockReturnValueOnce({ posts: { date1: '1', date2: '2' } });
    const response = await orderPosts();
    expect(response.date1).toBe('1');
    expect(response.date2).toBe('2');
  });

  test('debería llamar a la función query cuando es ejecutada', async () => {
    await orderPosts();
    expect(query).toHaveBeenCalled();
  });

  test('debería retornar error cuando no se haya actualizado', async () => {
    query.mockReturnValueOnce(new Error('ups'));
    const response = await orderPosts();
    expect(response).toBeInstanceOf(Error);
    expect(query).toHaveBeenCalledTimes(1);
  });
});
