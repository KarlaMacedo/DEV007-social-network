// import { onNavigate } from '../main';
import { currentUserInfo } from '../firebase/index.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import nueve from '../Images/9.png';

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
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación dando click aquí">
  <br>
  <dialog class="divModal" id="divModal"></dialog>
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

  // FUNCIONALIDAD MODAL POSTS
  const windowsModal = loginDiv.querySelector('#divModal');
  windowsModal.style.display = 'none';

  loginDiv.querySelector('#inputLogin').addEventListener(
    'click',
    () => {
      windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPost" placeholder="Escribe aquí">
        <label class="labelModal">Coordenadas:</label>
        <input type="text" class="inputModal" placeholder="Escribe aquí">
        <div class="divImgModal"> 
          <label class="labelModal">Imagen:</label>
          <button class="buttonModalImg" id="buttonModalImg">Seleccionar archivo</button>
        </div>
        <button class="buttonModalPublish" id="buttonModalPublish">Publicar</button>`;
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal'); // variable que almacena el boton de cerrar la ventana modal
      btnClose.addEventListener('click', () => {
        windowsModal.close();
        windowsModal.style.display = 'none';
      });
    },
  );

  return loginDiv;
};
