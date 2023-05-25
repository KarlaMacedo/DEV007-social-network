// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main';

export const register = () => {
  document.body.style.backgroundImage = 'url(Images/fondoRegister.png)';
  const header = document.getElementById('header');
  header.style.backgroundImage = 'none';
  // const menu = document.getElementById('menu');
  // menu.style.display = 'none';
  const homeDiv = document.createElement('div');
  homeDiv.setAttribute('class', 'registerContainer');
  homeDiv.innerHTML = `<div class="containerFormRegister">
    <div class="divRegisterTitle">
      <h2 class="registerTitle">Crear cuenta</h2>
      <div class="line"></div>
    </div>
    <label class="labelRegister">Nombre:</label>
    <input type="text" class="inputRegister" id="inputNameRegister" placeholder="Usuario">
    <label class="labelRegister">Correo:</label>
    <input type="text" class="inputRegister" id="inputMailRegister" placeholder="Correo electrónico">
    <label class="labelRegister">Contraseña:</label>
    <input type="text" class="inputRegister" id="inputPasswordRegister" placeholder="*******************">
    </div>
    <br>`;
  const buttonRegister = document.createElement('button');
  buttonRegister.setAttribute('class', 'buttonRegister');
  buttonRegister.textContent = 'Registrarse';
  const buttonHome = document.createElement('button');
  buttonHome.setAttribute('class', 'buttonBackHomeRegister');
  buttonHome.textContent = 'Regresar';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.appendChild(buttonRegister);
  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
