// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main';

export const login = () => {
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#ffffff';
  const header = document.getElementById('header');
  header.style.backgroundImage = 'url("Images/header.jpg")';
  const loginDiv = document.createElement('div');
  loginDiv.setAttribute('class', 'loginDiv');
  const menu = document.createElement('div');
  menu.setAttribute('id', 'menu');
  menu.setAttribute('class', 'menu');
  const labelLogin = document.createElement('label');
  labelLogin.setAttribute('class', 'labelLogin');
  labelLogin.setAttribute('id', 'labelLogin');
  labelLogin.textContent = 'Bienvenido Usuario!';
  const buttonMenu = document.createElement('button');
  buttonMenu.setAttribute('class', 'buttonMenu');
  buttonMenu.setAttribute('id', 'buttonMenu');
  buttonMenu.innerHTML = `
  <img src="Images/menu.png" alt="buttonMenu">`;

  const menuOptionsDiv = document.createElement('div');
  menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
  menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');

  loginDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(buttonMenu);

  loginDiv.innerHTML += `
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación aquí">
  <br>
  <button class="buttonPublicar">Publicar</button>
  <br>
  <div class="containerPublications">Aquí irán las publicaciones</div>
  <br>`;

  menuOptionsDiv.innerHTML = `
        <button class="close" id="close"><img src="Images/9.png" alt="buttonMenu"></button>
        <a href="" class="optionMenu" id="acercaDe" style="text-decoration:none">Acerca de</a>
        <a href="" class="optionMenu" id="perfil" style="text-decoration:none">Perfil</a>
        <a href="" class="optionMenu" id="cerrarSesion" style="text-decoration:none">Cerrar sesión</a>`;

  loginDiv.querySelector('#buttonMenu').addEventListener('click', () => {
    menuOptionsDiv.style.display = 'block';
    menuOptionsDiv.style.display = 'flex';
    loginDiv.querySelector('#menu').insertAdjacentElement('beforeend', menuOptionsDiv);
    loginDiv.querySelector('#menu').querySelector('#close').addEventListener('click', () => {
      menuOptionsDiv.style.display = 'none';
    });
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#cerrarSesion').addEventListener('click', () => onNavigate('/'));
  });

  return loginDiv;
};
