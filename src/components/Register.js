// import { onNavigate } from '../main';
import { createUser, savedUser, updateName } from '../firebase/index.js';

export const Register = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = 'url(Images/fondoRegister.png)';
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
    <input type="text" class="inputRegister" id="inputMailRegister" placeholder="Correo electrónico">
    <label class="labelRegister">Contraseña:</label>
    <input type="password" class="inputRegister" id="inputPasswordRegister" placeholder="*******************">
    <img src="Images/12.png" class="hidePassword">
    <img src="Images/13.png" class="showPassword">
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
  registerDiv.querySelector('#buttonRegister').addEventListener('click', () => {
    const displayName = registerDiv.querySelector('#containerFormRegister').querySelector('#inputNameRegister').value;
    const signUpEmail = registerDiv.querySelector('#containerFormRegister').querySelector('#inputMailRegister').value;
    const signUpPassword = registerDiv.querySelector('#containerFormRegister').querySelector('#inputPasswordRegister').value;
    console.log(displayName, signUpEmail, signUpPassword);
    createUser(signUpEmail, signUpPassword)
      .then((userData) => {
        const user = userData.user;
        if (displayName) {
          console.log(displayName);
          updateName(displayName);
          console.log(updateName(displayName));
        }
        console.log(savedUser(displayName, signUpEmail, signUpPassword, user.uid));
        return savedUser(displayName, signUpEmail, signUpPassword, user.uid);
      })
      .then(() => {
        onNavigate('/login');
      });
  });

  return registerDiv;
};
