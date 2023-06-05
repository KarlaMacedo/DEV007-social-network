// import { onNavigate } from '../main';
import { createUser, savedUser, updateName } from '../firebase/index.js';
import uno from '../Images/1.png';
import doce from '../Images/12.png';
import trece from '../Images/13.png';

export const Register = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = `url(${uno})`;
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
        <img src="${doce}" class="hidePassword">
        <img src="${trece}" class="showPassword">
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
  buttonHome.addEventListener('click', () => onNavigate('/'));

  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonHome);

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
      const displayName = registerDiv.querySelector('#containerFormRegister').querySelector('#inputNameRegister').value;
      const signUpEmail = registerDiv.querySelector('#containerFormRegister').querySelector('#inputMailRegister').value;
      const signUpPassword = registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').value;
      console.log(displayName, signUpEmail, signUpPassword);
      if (displayName === '' || signUpEmail === '' || signUpPassword === '') {
        registerDiv.querySelector('#containerFormRegister').querySelector('#labelErrors').textContent = 'Debe rellenar todos los campos';
        return;
      }
      await createUser(signUpEmail, signUpPassword) // crea usuario en auth con su info
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          if (displayName) {
            console.log(displayName);
            await updateName(displayName); // guarda su info en auth firebase
            console.log(updateName(displayName));
          }
          console.log(savedUser(displayName, signUpEmail, signUpPassword, user.uid));
          // guarda info en data firestore
          return savedUser(displayName, signUpEmail, signUpPassword, user.uid);
        })
        .then(() => {
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
