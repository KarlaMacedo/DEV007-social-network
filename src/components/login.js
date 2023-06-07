// import { onNavigate } from '../main';
import {
  currentUserInfo, post, addPost, deleteDocData, auth,
} from '../firebase/index.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import nueve from '../Images/9.png';
import diez from '../Images/10.png';

export const Login = (onNavigate) => {
  // CREACIÓN DE INTERFAZ
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#ffffff';
  const header = document.getElementById('header');
  header.style.backgroundImage = `url(${headerImg})`;
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
  <img src="${menuImg}" alt="buttonMenu">`;
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
  <input type="text" class="inputLogin" id="inputLogin" placeholder="Escribe tu publicación dando click aquí">
  <br>
  <dialog class="divModal" id="divModal"></dialog>
  <br>
  <div class="postsContainer">Aquí irán las publicaciones</div>
  <br>`;

  // FUNCIONALIDAD ETIQUETA DE BIENVENIDA AL USUARIO
  console.log(currentUserInfo());
  // si hay información del usuario por parte de la app obtiene de ahí el nombre del usuario, si no
  // la obtiene de la data de localstorage usando .parse para convertir la data a un objeto js
  const userName = currentUserInfo() ? currentUserInfo().displayName : JSON.parse(localStorage.getItem('user')).displayName;
  loginDiv.querySelector('#menu').querySelector('#labelLogin').textContent = `Bienvenid@ ${userName}!`;

  // FUNCIONALIDAD MENU
  menuOptionsDiv.innerHTML = `
        <button class="close" id="close"><img src="${nueve}" alt="buttonMenu"></button>
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
          <input type="file" class="buttonModalImg" id="buttonModalImg" accept=".jpg, .jpeg, .png" multiple></input>
        </div>
        <button class="buttonModalPublish" id="buttonModalPublish">Publicar</button>`;
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';

      // cerrar la ventana modal
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

      btnClose.addEventListener('click', () => {
        windowsModal.close();
        windowsModal.style.display = 'none';
      });

      // publicar posts
      const btnPublish = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublish');

      btnPublish.addEventListener('click', async () => {
        const imputModalPost = windowsModal.querySelector('.inputModalPost').value;
        const coordenadas = windowsModal.querySelector('.inputModal').value;
        const selecImg = windowsModal.querySelector('.divImgModal').querySelector('#buttonModalImg').value;
        console.log(imputModalPost);
        console.log(coordenadas);
        console.log(selecImg);
        await post(imputModalPost, coordenadas, selecImg);
        windowsModal.close();
        windowsModal.style.display = 'none';
      });
    },
  );

  // MOSTRAR POSTS EN TIEMPO REAL
  const postsContainer = loginDiv.querySelector('.postsContainer');

  addPost((publ) => {
    postsContainer.innerHTML = '';
    publ.forEach((element) => {
      // por cada post va a crear todo lo de abajo...
      const postElement = document.createElement('div');
      postElement.setAttribute('class', 'divPosts');
      postsContainer.appendChild(postElement);

      const userNameElement = document.createElement('label');
      userNameElement.setAttribute('class', 'namePosts');
      userNameElement.textContent = element.userName;
      postElement.appendChild(userNameElement);

      const dateElement = document.createElement('label');
      dateElement.setAttribute('class', 'datePosts');
      dateElement.textContent = element.dateCreate;
      postElement.appendChild(dateElement);

      const textElement = document.createElement('p');
      textElement.setAttribute('class', 'textPosts');
      textElement.textContent = element.text;
      postElement.appendChild(textElement);

      const imgElement = document.createElement('img');
      imgElement.setAttribute('class', 'imgPosts');
      imgElement.src = element.image;
      postElement.appendChild(imgElement);

      const coordsElement = document.createElement('label');
      coordsElement.setAttribute('class', 'coordsPosts');
      coordsElement.textContent = element.coords;
      postElement.appendChild(coordsElement);

      const divLikes = document.createElement('div');
      divLikes.setAttribute('class', 'divLikes');
      const buttonLikes = document.createElement('button');
      buttonLikes.setAttribute('class', 'buttonLikes');
      buttonLikes.id = 'buttonLikes';
      const imgButtonLikes = document.createElement('img');
      imgButtonLikes.setAttribute('class', 'imgButtonLikes');
      imgButtonLikes.src = `${diez}`;
      const likesElement = document.createElement('label');
      likesElement.setAttribute('class', 'likesElement');
      likesElement.textContent = element.likes.length;
      postElement.appendChild(divLikes);
      divLikes.appendChild(buttonLikes);
      buttonLikes.appendChild(imgButtonLikes);
      divLikes.appendChild(likesElement);

      // verifica que el usuario que está logeado sea el dueño del post
      if (element.userId === auth.currentUser.uid) {
        // si es el dueño crea el boton de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'deletePost');
        deleteButton.textContent = 'Eliminar';
        deleteButton.value = element.id;
        console.log(element.id);
        postElement.appendChild(deleteButton);
        const deleteBtn = loginDiv.querySelector('.postsContainer').querySelector('.divPosts').querySelector('.deletePost');
        deleteBtn.addEventListener('click', async () => {
          try {
            const byePost = await deleteDocData(element.id);
            console.log(byePost);
          } catch (e) {
            console.error('Error delete post: ', e);
          }
        });
      }
    });
  });

  return loginDiv;
};
