import { createUser, updateName } from '../firebase/index.js';
import {
  currentUserInfo,
} from '../firebase/init';
import backgroundRegister from '../Images/1.png';
import hideImg from '../Images/12.png';
import showImg from '../Images/13.png';

export const Register = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = `url(${backgroundRegister})`;

  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  const registerDiv = document.createElement('div');
  registerDiv.setAttribute('class', 'registerContainer');
  registerDiv.innerHTML = `<div class="containerFormRegister" id= "containerFormRegister">
    <div class="divRegisterTitle">
      <h2 class="registerTitle">Crear cuenta</h2>
      <div class="line"></div>
    </div>
    <label class="labelRegister">Nombre:</label>
    <input type="text" class="inputRegister" id="inputNameRegister" placeholder="Usuario">
    <label class="labelRegister">Correo:</label>
    <input type="email" class="inputRegister" id="inputMailRegister" placeholder="Correo electrónico">
    <label class="labelRegister">Contraseña:</label>
    <div class="passwordDiv">
      <input type="password" class="inputRegister" id="inputPasswordRegister" placeholder="*******************">
        <img src="${hideImg}" class="hidePassword">
        <img src="${showImg}" class="showPassword">
    </div>
    <label class="labelErrors" id="labelErrors"></label>
    </div>
    <br>`;
  const buttonRegister = document.createElement('button');
  buttonRegister.setAttribute('class', 'buttonRegister');
  buttonRegister.setAttribute('id', 'buttonRegister');
  buttonRegister.textContent = 'Registrarse';
  const buttonHome = document.createElement('button');
  buttonHome.setAttribute('class', 'buttonBackHomeRegister');
  buttonHome.textContent = 'Regresar';

  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonHome);

  // FUNCIONALIDAD BOTON REGRESAR
  buttonHome.addEventListener('click', () => onNavigate('/'));

  // MOSTRAR CONTRASEÑA
  registerDiv.querySelector('#containerFormRegister').querySelector('.hidePassword').style.display = 'none';
  registerDiv.querySelector('#containerFormRegister').querySelector('.showPassword').addEventListener('click', () => {
    if (registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').type === 'password') {
      registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').type = 'text';
      registerDiv.querySelector('#containerFormRegister').querySelector('.showPassword').style.display = 'none';
      registerDiv.querySelector('#containerFormRegister').querySelector('.hidePassword').style.display = 'block';
    }
  });

  // OCULTAR CONTRASEÑA
  registerDiv.querySelector('#containerFormRegister').querySelector('.hidePassword').addEventListener('click', () => {
    if (registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').type === 'text') {
      registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').type = 'password';
      registerDiv.querySelector('#containerFormRegister').querySelector('.showPassword').style.display = 'block';
      registerDiv.querySelector('#containerFormRegister').querySelector('.hidePassword').style.display = 'none';
    }
  });

  // REGISTRO DE USUARIOS Y GUARDARLOS EN BASE DE DATOS STORE
  registerDiv.querySelector('#buttonRegister').addEventListener('click', async () => {
    try {
      const displayNames = registerDiv.querySelector('#containerFormRegister').querySelector('#inputNameRegister').value;
      const signUpEmail = registerDiv.querySelector('#containerFormRegister').querySelector('#inputMailRegister').value;
      const signUpPassword = registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').value;
      if (displayNames === '' || signUpEmail === '' || signUpPassword === '') {
        registerDiv.querySelector('#containerFormRegister').querySelector('#labelErrors').textContent = 'Debe rellenar todos los campos';
        return;
      }
      await createUser(signUpEmail, signUpPassword) // crea usuario en auth con su info
        .then(async () => {
          if (displayNames) {
            await updateName(displayNames); // guarda su info en auth firebase
          }
        })
        .then(() => { // guarda info en local storage
          localStorage.setItem('user', JSON.stringify({ uid: currentUserInfo().uid, email: signUpEmail, displayName: displayNames }));
          onNavigate('/login');
        });
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);

      // etiquetas descriptivas en caso de errores
      if (errorCode === 'auth/email-already-in-use') {
        registerDiv.querySelector('#containerFormRegister').querySelector('#labelErrors').textContent = 'Ese usuario ya existe';
      }
      if (errorCode === 'auth/weak-password') {
        registerDiv.querySelector('#containerFormRegister').querySelector('#labelErrors').textContent = 'Tu contraseña debe contener al menos 6 caracteres';
      }
      if (errorCode === 'auth/invalid-email') {
        registerDiv.querySelector('#containerFormRegister').querySelector('#labelErrors').textContent = 'Email Invalido';
      }
    }
  });

  return registerDiv;
};
