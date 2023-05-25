// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main';

export const home = () => {
  document.body.style.backgroundImage = 'url(Images/fongoHome.png)';
  const homeDiv = document.createElement('div');
  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  const iniciarSesionDiv = document.createElement('div');
  iniciarSesionDiv.id = 'iniciarSesionDiv';
  const homeTitle = document.createElement('h2');
  homeTitle.textContent = 'Iniciar Sesiónn';
  homeTitle.id = 'homeTitle';
  const lineDiv = document.createElement('div');
  lineDiv.id = 'lineDiv';
  lineDiv.setAttribute('class', 'line');
  const pCorreo = document.createElement('p');
  pCorreo.textContent = 'Correo:';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo electrónico';
  const pPassword = document.createElement('p');
  pPassword.textContent = 'Contraseña:';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = '************';
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
  buttonRegister.id = 'buttonRegister';
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'buttonLogin';

  socialNetworksDiv.appendChild(facebook);
  socialNetworksDiv.appendChild(gmail);
  buttonRegister.textContent = 'Registrate';
  buttonLogin.textContent = 'Inicia Sesion';

  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  iniciarSesionDiv2.appendChild(homeTitle);
  iniciarSesionDiv2.appendChild(lineDiv);
  iniciarSesionDiv2.appendChild(pCorreo);
  iniciarSesionDiv2.appendChild(inputEmail);
  iniciarSesionDiv2.appendChild(pPassword);
  iniciarSesionDiv2.appendChild(inputPassword);

  iniciarSesionDiv.appendChild(iniciarSesionDiv2);
  iniciarSesionDiv.appendChild(buttonLogin);
  iniciarSesionDiv.appendChild(buttonRegister);
  ingresarConDiv.appendChild(ingresarConlabel);
  iniciarSesionDiv.appendChild(ingresarConDiv);
  iniciarSesionDiv.appendChild(socialNetworksDiv);

  homeDiv.appendChild(iniciarSesionDiv);

  return homeDiv;
};
