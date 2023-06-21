// import { onNavigate } from '../main';
import fongoHome from '../Images/fongoHome.png';
import doce from '../Images/12.png';
import trece from '../Images/13.png';
import ocho from '../Images/18.png';
import siete from '../Images/17.png';

import {
  signIn, loginWithGoogle, loginWithFB,
} from '../firebase/index.js';
import {
  currentUserInfo,
} from '../firebase/init';

export const Home = (onNavigate) => {
  // CREACIÓN DE INTERFAZ

  document.body.style.backgroundImage = `url(${fongoHome})`;

  const homeDiv = document.createElement('div');
  homeDiv.id = 'homeDiv';
  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  const iniciarSesionDiv = document.createElement('div');
  iniciarSesionDiv.id = 'iniciarSesionDiv';
  const iniciarSesionDiv2 = document.createElement('div');
  iniciarSesionDiv2.id = 'iniciarSesionDiv2';
  iniciarSesionDiv2.innerHTML = `<h2 id="homeTitle">Iniciar Sesión</h2>
  <div id="lineDiv" class="lineHome"></div>
  <p>Correo:</p>
  <input type="email" placeholder="Correo electrónico" id="inputEmail">
  <p>Contraseña:</p>
  <div class="passwordDiv">
    <input type="password" placeholder="************" id="inputPassword">
    <img src="${doce}" class="hidePassword">
    <img src="${trece}" class="showPassword">
  </div>
  <label id="labelErrors" class="labelErrors"></label>`;
  const socialNetworksDiv = document.createElement('div');
  socialNetworksDiv.id = 'socialNetworksDiv';
  const gmail = document.createElement('img');
  gmail.src = `${ocho}`;
  gmail.setAttribute('class', 'gmail');
  const facebook = document.createElement('img');
  facebook.src = `${siete}`;
  facebook.setAttribute('class', 'fb');
  const buttonRegister = document.createElement('button');
  buttonRegister.id = 'buttonRegisterHome';
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';

  socialNetworksDiv.appendChild(facebook);
  socialNetworksDiv.appendChild(gmail);
  buttonRegister.textContent = 'Registrate';
  buttonLogin.textContent = 'Inicia Sesión';

  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  iniciarSesionDiv.appendChild(iniciarSesionDiv2);
  iniciarSesionDiv.appendChild(buttonLogin);
  iniciarSesionDiv.appendChild(buttonRegister);
  iniciarSesionDiv.appendChild(socialNetworksDiv);

  homeDiv.appendChild(iniciarSesionDiv);

  // MOSTRAR CONTRASEÑA
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePassword').style.display = 'none';
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPassword').addEventListener('click', () => {
    if (homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type === 'password') {
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type = 'text';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPassword').style.display = 'none';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePassword').style.display = 'block';
    }
  });

  // OCULTAR CONTRASEÑA
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePassword').addEventListener('click', () => {
    if (homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type === 'text') {
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type = 'password';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPassword').style.display = 'block';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePassword').style.display = 'none';
    }
  });

  // INICAR SESIÓN CON CORREO Y CONTRASEÑA
  buttonLogin.addEventListener('click', async () => {
    try {
      const loginEmail = homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputEmail').value;
      const loginPassword = homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').value;
      if (loginEmail === '' || loginPassword === '') {
        homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#labelErrors').textContent = 'Debe rellenar todos los campos';
        return;
      }
      const firebaseResponse = await signIn(loginEmail, loginPassword);
      if (firebaseResponse.user) {
        localStorage.setItem('user', JSON.stringify(firebaseResponse.user));
        onNavigate('/login');
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/invalid-email') {
        homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#labelErrors').textContent = 'Email Invalido';
      }
      if (errorCode === 'auth/wrong-password') {
        homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#labelErrors').textContent = 'Contraseña incorrecta';
      }
      if (errorCode === 'auth/user-not-found') {
        homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#labelErrors').textContent = 'Usuario no registrado';
      }
    }
  });

  // INICIAR SESIÓN CON GOOGLE
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#socialNetworksDiv').querySelector('.gmail').addEventListener('click', async () => {
    try {
      await loginWithGoogle().then(() => {
        console.log(currentUserInfo());
        localStorage.setItem('user', JSON.stringify(currentUserInfo()));
        // eslint-disable-next-line max-len
        onNavigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  });

  // INICIAR SESIÓN CON FB
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#socialNetworksDiv').querySelector('.fb').addEventListener('click', async () => {
    try {
      await loginWithFB().then(() => {
        console.log(currentUserInfo());
        localStorage.setItem('user', JSON.stringify(currentUserInfo()));
        onNavigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  });

  return homeDiv;
};
