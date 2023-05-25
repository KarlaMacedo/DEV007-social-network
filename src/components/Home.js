// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main';

export const home = () => {
  document.body.style.backgroundImage = 'url(Images/fongoHome.png)';
  const homeDiv = document.createElement('div');

  const iniciarSesionDiv = document.createElement('div');
  iniciarSesionDiv.id = 'iniciarSesionDiv';
  const p = document.createElement('p');
  p.textContent = 'Iniciar Sesion';
  p.id = 'parrafo';
  const pCorreo = document.createElement('p');
  pCorreo.textContent = 'Correo';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'xxxxxxxx@xxxx.com';
  const pPassword = document.createElement('p');
  pPassword.textContent = 'Contraseña';
  const inputPassword = document.createElement('input');
  inputPassword.type = 'password';
  inputPassword.placeholder = '************';
  const iniciarSesionDiv2 = document.createElement('div');
  iniciarSesionDiv2.id = 'iniciarSesionDiv2';

  const label = document.createElement('label');
  label.textContent = 'ingresar con';
  const socialNetworksDiv = document.createElement('div');
  socialNetworksDiv.id = 'socialNetworksDiv';
  const gmail = document.createElement('img');
  gmail.src = 'Images/8.png';
  const facebook = document.createElement('img');
  facebook.src = 'Images/7.png';
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

  iniciarSesionDiv2.appendChild(p);
  iniciarSesionDiv2.appendChild(pCorreo);
  iniciarSesionDiv2.appendChild(inputEmail);
  iniciarSesionDiv2.appendChild(pPassword);
  iniciarSesionDiv2.appendChild(inputPassword);

  iniciarSesionDiv.appendChild(iniciarSesionDiv2);
  iniciarSesionDiv.appendChild(buttonLogin);
  iniciarSesionDiv.appendChild(buttonRegister);
  iniciarSesionDiv.appendChild(label);
  iniciarSesionDiv.appendChild(socialNetworksDiv);

  homeDiv.appendChild(iniciarSesionDiv);

  return homeDiv;
};
