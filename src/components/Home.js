import backgroundHome from '../Images/fongoHome.png';
import hideImg from '../Images/12.png';
import showImg from '../Images/13.png';
import gmailImg from '../Images/18.png';
import fbImg from '../Images/17.png';

import {
  signIn, loginWithGoogle, loginWithFB,
} from '../firebase/index.js';
import {
  currentUserInfo,
} from '../firebase/init';

export const Home = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = `url(${backgroundHome})`;
  const homeDiv = document.createElement('div');
  homeDiv.id = 'homeDiv';
  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  const signInDiv = document.createElement('div');
  signInDiv.id = 'signInDiv';
  const signInDiv2 = document.createElement('div');
  signInDiv2.id = 'signInDiv2';
  signInDiv2.innerHTML = `<h2 id="homeTitle">Iniciar Sesión</h2>
  <div id="lineDiv" class="lineHome"></div>
  <p>Correo:</p>
  <input type="email" placeholder="Correo electrónico" id="inputEmail">
  <p>Contraseña:</p>
  <div class="passwordDiv">
    <input type="password" placeholder="************" id="inputPassword">
    <img src="${hideImg}" class="hidePassword">
    <img src="${showImg}" class="showPassword">
  </div>
  <label id="labelErrors" class="labelErrors"></label>`;
  const socialNetworksDiv = document.createElement('div');
  socialNetworksDiv.id = 'socialNetworksDiv';
  const gmail = document.createElement('img');
  gmail.src = `${gmailImg}`;
  gmail.setAttribute('class', 'gmail');
  const facebook = document.createElement('img');
  facebook.src = `${fbImg}`;
  facebook.setAttribute('class', 'fb');
  const buttonRegister = document.createElement('button');
  buttonRegister.id = 'buttonRegisterHome';
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';
  buttonRegister.textContent = 'Registrate';
  buttonLogin.textContent = 'Inicia Sesión';

  signInDiv.appendChild(signInDiv2);
  signInDiv.appendChild(buttonLogin);
  signInDiv.appendChild(buttonRegister);
  signInDiv.appendChild(socialNetworksDiv);
  socialNetworksDiv.appendChild(facebook);
  socialNetworksDiv.appendChild(gmail);
  homeDiv.appendChild(signInDiv);

  // FUNCIÓN BOTÓN DE REGISTRO
  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  // MOSTRAR CONTRASEÑA
  homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.hidePassword').style.display = 'none';
  homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.showPassword').addEventListener('click', () => {
    if (homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputPassword').type === 'password') {
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputPassword').type = 'text';
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.showPassword').style.display = 'none';
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.hidePassword').style.display = 'block';
    }
  });

  // OCULTAR CONTRASEÑA
  homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.hidePassword').addEventListener('click', () => {
    if (homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputPassword').type === 'text') {
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputPassword').type = 'password';
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.showPassword').style.display = 'block';
      homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('.hidePassword').style.display = 'none';
    }
  });

  // INICAR SESIÓN CON CORREO Y CONTRASEÑA
  buttonLogin.addEventListener('click', async () => {
    try {
      const loginEmail = homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputEmail').value;
      const loginPassword = homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#inputPassword').value;
      if (loginEmail === '' || loginPassword === '') {
        homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#labelErrors').textContent = 'Debe rellenar todos los campos';
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
        homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#labelErrors').textContent = 'Email Invalido';
      }
      if (errorCode === 'auth/wrong-password') {
        homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#labelErrors').textContent = 'Contraseña incorrecta';
      }
      if (errorCode === 'auth/user-not-found') {
        homeDiv.querySelector('#signInDiv').querySelector('#signInDiv2').querySelector('#labelErrors').textContent = 'Usuario no registrado';
      }
    }
  });

  // INICIAR SESIÓN CON GOOGLE
  homeDiv.querySelector('#signInDiv').querySelector('#socialNetworksDiv').querySelector('.gmail').addEventListener('click', async () => {
    try {
      await loginWithGoogle().then(() => {
        localStorage.setItem('user', JSON.stringify(currentUserInfo()));
        onNavigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  });

  // INICIAR SESIÓN CON FB
  homeDiv.querySelector('#signInDiv').querySelector('#socialNetworksDiv').querySelector('.fb').addEventListener('click', async () => {
    try {
      await loginWithFB().then(() => {
        localStorage.setItem('user', JSON.stringify(currentUserInfo()));
        onNavigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  });

  return homeDiv;
};
