// import { onNavigate } from '../main';
import {
  currentUserInfo, post, addPost, deleteDocData, auth, updatePost, like, disLike,
} from '../firebase/index.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import nueve from '../Images/9.png';
import diez from '../Images/10.1.png';
import diez2 from '../Images/10.2.png';

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
  <button class="inputLogin" id="inputLogin">Crear publicación</button>
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
          <label class="labelButtonModalImg">Subir Imagen
          <input type="file" class="buttonModalImg" id="buttonModalImg" accept=".jpg, .jpeg, .png" multiple></input>
          </label>
        </div>
        <label class="labelErrorsModal" id="labelErrorsModal"></label>
        <br>
        <button class="buttonModalPublish" id="buttonModalPublish">Publicar</button>`;
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';

      // publicar posts
      const btnPublish = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublish');

      btnPublish.onclick = async () => {
        const inputModalPost = windowsModal.querySelector('.inputModalPost').value;
        const coordenadas = windowsModal.querySelector('.inputModal').value;
        const selecImg = windowsModal.querySelector('.divImgModal').querySelector('#buttonModalImg').value;
        console.log(inputModalPost);
        console.log(coordenadas);
        console.log(selecImg);
        if (inputModalPost === '' && coordenadas === '' && selecImg === '') {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'Debe rellenar al menos un campo para poder publicar';
        } else {
          post(inputModalPost, coordenadas, selecImg);
          windowsModal.close();
          windowsModal.style.display = 'none';
          console.log(inputModalPost, coordenadas, selecImg);
          // loginDiv.querySelector('.containerPublications').appendChild();
        }
      };

      // cerrar la ventana modal
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

      btnClose.onclick = function () {
        windowsModal.close();
        windowsModal.style.display = 'none';
      };
    },
  );

  // MOSTRAR POSTS EN TIEMPO REAL
  const postsContainer = loginDiv.querySelector('.postsContainer');

  addPost((querySnapshot) => {
    postsContainer.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // por cada post va a crear todo lo de abajo dándole la info de la data...
      const postElement = document.createElement('div');
      postElement.setAttribute('class', 'divPosts');
      postsContainer.appendChild(postElement);

      const userNameElement = document.createElement('label');
      userNameElement.setAttribute('class', 'namePosts');
      userNameElement.textContent = doc.userName;
      postElement.appendChild(userNameElement);

      const dateElement = document.createElement('label');
      dateElement.setAttribute('class', 'datePosts');
      // convierte la fecha de firebase a un string de js
      dateElement.textContent = `${doc.dateCreate.toDate().toDateString()} ${doc.dateCreate.toDate().toLocaleTimeString()}`;
      postElement.appendChild(dateElement);

      const textElement = document.createElement('p');
      textElement.setAttribute('class', 'textPosts');
      textElement.textContent = doc.text;
      postElement.appendChild(textElement);

      const imgElement = document.createElement('img');
      imgElement.setAttribute('class', 'imgPosts');
      imgElement.src = doc.image;
      postElement.appendChild(imgElement);

      const coordsElement = document.createElement('label');
      coordsElement.setAttribute('class', 'coordsPosts');
      coordsElement.textContent = doc.coords;
      postElement.appendChild(coordsElement);
      
      const divButtons = document.createElement('div');
      divButtons.setAttribute = ('class', 'divButtons');
      postElement.appendChild(divButtons);

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
      likesElement.textContent = doc.likes.length;
      postElement.appendChild(divLikes);
      divLikes.appendChild(buttonLikes);
      buttonLikes.appendChild(imgButtonLikes);
      divLikes.appendChild(likesElement);

      // verifica que el usuario que está logeado sea el dueño del post
      if (doc.userId === auth.currentUser.uid) {
        // si es el dueño crea el boton de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'deletePost');
        deleteButton.textContent = 'Eliminar';
        deleteButton.value = doc.id;
        deleteButton.id = doc.id;

        deleteButton.onclick = function () {
          console.log(doc.id);
          const confirmDelete = window.confirm('¿Seguro quieres eliminar el post?');
          if (confirmDelete) { // si el usuario confirma la eliminación del post
            deleteDocData(doc.id);
          }
        };

        divButtons.appendChild(deleteButton);

        // si es el dueño crea el boton de editar
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'editPost');
        editButton.textContent = 'Editar';
        editButton.value = doc.id;
        editButton.id = doc.id;
        console.log(doc.id);
        console.log(doc.text);

        editButton.onclick = function () {
          // abre modal si quiere editar y le da el valor de cada espacio
          windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPostEdit" placeholder="Escribe aquí">
        <label class="labelModal">Coordenadas:</label>
        <input type="text" class="inputModalEdit" placeholder="Escribe aquí">
        <div class="divImgModal"> 
          <label class="labelModalImgEdit">Subir Imagen
          <input type="file" class="buttonModalImg" id="buttonModalImgEdit" accept=".jpg, .jpeg, .png" multiple></input>
          </label>
        </div>
        <label class="labelErrorsModal" id="labelErrorsModal"></label>
        <br>
        <button class="buttonModalEdit" id="buttonModalEdit">Listo!</button>`;
          const postTextEdit = windowsModal.querySelector('.inputModalPostEdit');
          const coordsEdit = windowsModal.querySelector('.inputModalEdit');
          // eslint-disable-next-line max-len
          // const imgEdit = windowsModal.querySelector('.divImgModal').querySelector('#buttonModalImgEdit');
          postTextEdit.value = doc.text;
          coordsEdit.value = doc.coords;
          // imgEdit.value = doc.image;
          postTextEdit.id = doc.text;
          coordsEdit.id = doc.coords;
          // imgEdit.id = doc.image;
          windowsModal.showModal();
          windowsModal.style.display = 'block';
          windowsModal.style.display = 'flex';

          // Terminar de editar posts
          const btnEditDone = loginDiv.querySelector('#divModal').querySelector('#buttonModalEdit');

          btnEditDone.onclick = async () => {
            const newText = document.getElementById(doc.text);
            const newCoords = document.getElementById(doc.coords);
            // const newImg = document.getElementById(doc.image);
            // eslint-disable-next-line max-len
            await updatePost(doc.id, { text: newText.value, coords: newCoords.value })
              .then(() => {
                windowsModal.close();
                windowsModal.style.display = 'none';
              });
          };

          // cerrar la ventana modal
          const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

          btnClose.onclick = function () {
            windowsModal.close();
            windowsModal.style.display = 'none';
          };
        };

        divButtons.appendChild(editButton);
      }

      // creación de boton like
      const divLikes = document.createElement('div');
      divLikes.setAttribute('class', 'divLikes');
      const buttonLikes = document.createElement('button');
      buttonLikes.setAttribute('class', 'buttonLikes');
      buttonLikes.id = 'buttonLikes';
      const imgButtonLikes = document.createElement('img');
      imgButtonLikes.setAttribute('class', 'imgButtonLikes');
      // si ya tiene like aparece rosa, si no blanco
      const likeImg = doc.likes.includes(auth.currentUser.uid) ? diez : diez2;
      imgButtonLikes.src = `${likeImg}`;
      const likesElement = document.createElement('label');
      likesElement.setAttribute('class', 'likesElement');
      // da el largo del array de likes para hacer la contabilidad de likes
      likesElement.textContent = doc.likes.length;
      postElement.appendChild(divLikes);
      divLikes.appendChild(buttonLikes);
      buttonLikes.appendChild(imgButtonLikes);
      divLikes.appendChild(likesElement);

      // funcionalidad boton like
      buttonLikes.onclick = async () => {
        // si ya tiene like, se borra el like de la data al dar click
        if (doc.likes.includes(auth.currentUser.uid)) {
          await disLike(doc.id, auth.currentUser.uid);
          console.log('dislike');
        } else { // si no tiene like, se agrega el like a la data
          await like(doc.id, auth.currentUser.uid);
          console.log('like');
        }
      };
    });
  });

  return loginDiv;
};
