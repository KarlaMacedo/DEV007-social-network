// import { onNavigate } from '../main';

import { signIn, loginWithGoogle } from '../firebase/index.js';

export const Home = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = 'url(Images/fongoHome.png)';
  const homeDiv = document.createElement('div');
  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  const iniciarSesionDiv = document.createElement('div');
  iniciarSesionDiv.id = 'iniciarSesionDiv';
  const homeTitle = document.createElement('h2');
  homeTitle.textContent = 'Iniciar Sesión';
  homeTitle.id = 'homeTitle';
  const lineDiv = document.createElement('div');
  lineDiv.id = 'lineDiv';
  lineDiv.setAttribute('class', 'line');
  const pCorreo = document.createElement('p');
  pCorreo.textContent = 'Correo:';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.id = 'inputEmail';
  const pPassword = document.createElement('p');
  pPassword.textContent = 'Contraseña:';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = '************';
  inputPassword.id = 'inputPassword';
  const hidePassword = document.createElement('img');
  hidePassword.src = 'Images/12.png';
  hidePassword.setAttribute('class', 'hidePasswords');
  const showPassword = document.createElement('img');
  showPassword.src = 'Images/13.png';
  showPassword.setAttribute('class', 'showPasswords');
  const iniciarSesionDiv2 = document.createElement('div');
  iniciarSesionDiv2.id = 'iniciarSesionDiv2';
  const ingresarConDiv = document.createElement('div');
  ingresarConDiv.id = 'ingresarConDiv';
  const ingresarConlabel = document.createElement('h2');
  ingresarConlabel.setAttribute('class', 'ingresarConlabel');
  ingresarConlabel.textContent = 'Ingresar con';
  const socialNetworksDiv = document.createElement('div');
  socialNetworksDiv.id = 'socialNetworksDiv';
  const gmail = document.createElement('img');
  gmail.src = 'Images/8.png';
  gmail.setAttribute('class', 'gmail');
  const facebook = document.createElement('img');
  facebook.src = 'Images/7.png';
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

  iniciarSesionDiv2.appendChild(homeTitle);
  iniciarSesionDiv2.appendChild(lineDiv);
  iniciarSesionDiv2.appendChild(pCorreo);
  iniciarSesionDiv2.appendChild(inputEmail);
  iniciarSesionDiv2.appendChild(pPassword);
  iniciarSesionDiv2.appendChild(inputPassword);
  iniciarSesionDiv2.appendChild(hidePassword);
  iniciarSesionDiv2.appendChild(showPassword);

  iniciarSesionDiv.appendChild(iniciarSesionDiv2);
  iniciarSesionDiv.appendChild(buttonLogin);
  iniciarSesionDiv.appendChild(buttonRegister);
  ingresarConDiv.appendChild(ingresarConlabel);
  iniciarSesionDiv.appendChild(ingresarConDiv);
  iniciarSesionDiv.appendChild(socialNetworksDiv);

  homeDiv.appendChild(iniciarSesionDiv);

  // MOSTRAR CONTRASEÑA
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePasswords').style.display = 'none';
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPasswords').addEventListener('click', () => {
    if (homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type === 'password') {
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type = 'text';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPasswords').style.display = 'none';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePasswords').style.display = 'block';
    }
  });

  // OCULTAR CONTRASEÑA
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePasswords').addEventListener('click', () => {
    if (homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type === 'text') {
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('#inputPassword').type = 'password';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.showPasswords').style.display = 'block';
      homeDiv.querySelector('#iniciarSesionDiv').querySelector('#iniciarSesionDiv2').querySelector('.hidePasswords').style.display = 'none';
    }
  });

  // INICAR SESIÓN CON CORREO Y CONTRASEÑA
  const loginEmailPassword = async () => {
    const loginEmail = inputEmail.value;
    const loginPassword = inputPassword.value;
    const userInfoLogin = await signIn(loginEmail, loginPassword);
    console.log(userInfoLogin.user);
  };
  buttonLogin.addEventListener('click', () => {
    loginEmailPassword();
    onNavigate('/login');
  });

  // INICIAR SESIÓN CON GOOGLE
  homeDiv.querySelector('#iniciarSesionDiv').querySelector('#socialNetworksDiv').querySelector('.gmail').addEventListener('click', async () => {
    try {
      await loginWithGoogle().then(() => {
        onNavigate('/login');
      });
    } catch (error) {
      console.error(error);
    }
  });

  return homeDiv;
};
