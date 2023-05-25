// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main';

export const login = () => {
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#ffffff';
  const header = document.getElementById('header');
  header.style.backgroundImage = 'url("Images/header.jpg")';
  const homeDiv = document.createElement('div');
  homeDiv.setAttribute('class', 'loginDiv');
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
  <img src="Images/menu.png" alt="buttonMenu"></button>`;

  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  homeDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(buttonMenu);

  const menuOptionsDiv = document.createElement('div');
  menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
  menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');

  homeDiv.innerHTML += `
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación aquí">
  <br>
  <button class="buttonPublicar">Publicar</button>
  <br>
  <div class="containerPublications">Aquí irán las publicaciones</div>
  <br>`;

  homeDiv.appendChild(buttonHome);

  buttonMenu.addEventListener('mouseover', () => {
    menuOptionsDiv.innerHTML = `
    <a href="" class="optionMenu" id="acercaDe" style="text-decoration:none">Acerca de</a>
    <a href="" class="optionMenu" id="perfil" style="text-decoration:none">Perfil</a>
    <a href="" class="optionMenu" id="cerrarSesion" style="text-decoration:none">Cerrar sesión</a>`;
    console.log(menuOptionsDiv);
  });
  menu.insertAdjacentElement('beforeend', menuOptionsDiv);
  buttonHome.addEventListener('click', () => onNavigate('/'));
  return homeDiv;
};
