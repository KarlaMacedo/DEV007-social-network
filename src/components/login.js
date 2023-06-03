// import { onNavigate } from '../main';
import { currentUserInfo } from '../firebase/index.js';

export const Login = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
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
  const buttonMenu = document.createElement('button');
  buttonMenu.setAttribute('class', 'buttonMenu');
  buttonMenu.setAttribute('id', 'buttonMenu');
  buttonMenu.innerHTML = `
  <img src="Images/menu.png" alt="buttonMenu">`;
  const menuOptionsDiv = document.createElement('div');
  menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
  menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');
  const onlyMenu = document.createElement('div');
  onlyMenu.setAttribute('class', 'onlyMenu');

  loginDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(onlyMenu);
  onlyMenu.appendChild(buttonMenu);

  loginDiv.innerHTML += `
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación aquí">
  <br>
  <button class="buttonPublicar">Publicar</button>
  <br>
  <div class="containerPublications">Aquí irán las publicaciones</div>
  <br>`;

  // FUNCIONALIDAD ETIQUETA DE BIENVENIDA AL USUARIO
  console.log(currentUserInfo());
  // si hay información del usuario por parte de la app obtiene de ahí el nombre del usuario, si no
  // la obtiene de la data de localstorage usando .parse para convertir la data a un objeto js
  const userName = currentUserInfo() ? currentUserInfo().displayName : JSON.parse(localStorage.getItem('user')).displayName;
  loginDiv.querySelector('#menu').querySelector('#labelLogin').textContent = `Bienvenid@ ${userName}!`;

  // FUNCIONALIDAD MENU
  menuOptionsDiv.innerHTML = `
        <button class="close" id="close"><img src="Images/9.png" alt="buttonMenu"></button>
        <a href="" class="optionMenu" id="acercaDe" style="text-decoration:none">Acerca de</a>
        <a href="" class="optionMenu" id="perfil" style="text-decoration:none">Perfil</a>
        <a href="" class="optionMenu" id="cerrarSesion" style="text-decoration:none">Cerrar sesión</a>`;

  loginDiv.querySelector('#buttonMenu').addEventListener('click', () => { // abrir menu
    menuOptionsDiv.style.display = 'block';
    menuOptionsDiv.style.display = 'flex';
    loginDiv.querySelector('#menu').querySelector('.onlyMenu').insertAdjacentElement('beforeend', menuOptionsDiv);
    loginDiv.querySelector('#menu').querySelector('#close').addEventListener('click', () => { // cerrar menú
      menuOptionsDiv.style.display = 'none';
    });
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#cerrarSesion').addEventListener('click', () => {
      localStorage.removeItem('user'); // si cierra sesión, la info del usuario se elimina del localstorage
      onNavigate('/');
    });
  });

  return loginDiv;
};
