import {
  auth, currentUserInfo,
} from '../firebase/init.js';
import {
  // eslint-disable-next-line max-len
  post, addPost, deleteDocData, updatePost,
  like, disLike, updateNameProfile,
} from '../firebase/index.js';
import {
  // eslint-disable-next-line max-len
  uploadImg, getUrl,
} from '../firebase/storage.js';
import { initMap } from '../firebase/maps.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import closeImg from '../Images/9.png';
import likeImage from '../Images/10.1.png';
import likeImage2 from '../Images/10.2.png';
import rock from '../Images/rock.png';
import geo from '../Images/geo.png';

export const Login = (onNavigate) => {
  // INFORMACIÓN DEL USUARIO LOGUEADO
  const currentUserInformation = currentUserInfo() ? currentUserInfo() : JSON.parse(localStorage.getItem('user'));
  console.log(currentUserInformation);
  const currentUserId = currentUserInfo() ? currentUserInfo().uid : JSON.parse(localStorage.getItem('user')).uid;
  console.log(currentUserId);
  const currentUserName = currentUserInfo() ? currentUserInfo().displayName : JSON.parse(localStorage.getItem('user')).displayName;
  console.log(currentUserName);
  if (currentUserName === null || currentUserName === undefined) {
    window.location.reload(); // si se tarda en cargar el nombre por la promesa, se recarga
  }
  const currentUserEmail = currentUserInfo() ? currentUserInfo().email : JSON.parse(localStorage.getItem('user')).email;
  console.log(currentUserId);

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
  const onlyMenu = document.createElement('div');
  onlyMenu.setAttribute('class', 'onlyMenu');
  const menuOptionsDiv = document.createElement('div');
  menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
  menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');

  loginDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(onlyMenu);
  onlyMenu.appendChild(buttonMenu);

  loginDiv.innerHTML += `
  <button class="inputLogin" id="inputLogin">Crear publicación</button>
  <dialog class="divModal" id="divModal"></dialog>
  <div class="postsContainer">Aquí irán las publicaciones</div>`;
  menuOptionsDiv.innerHTML = `
          <button class="close" id="close"><img src="${closeImg}" alt="buttonMenu"></button>
          <button class="optionMenu" id="acercaDe">Acerca de</button>
          <button class="optionMenu" id="perfil">Editar perfil</button>
          <a href="" class="optionMenu" id="signOut" style="text-decoration:none">Cerrar sesión</a>`;

  const windowsModal = loginDiv.querySelector('#divModal');
  windowsModal.style.display = 'none';

  // FUNCIONALIDAD MENU
  loginDiv.querySelector('#buttonMenu').addEventListener('click', () => { // abrir menu
    menuOptionsDiv.style.display = 'block';
    menuOptionsDiv.style.display = 'flex';
    loginDiv.querySelector('#menu').querySelector('.onlyMenu').insertAdjacentElement('beforeend', menuOptionsDiv);
    loginDiv.querySelector('#menu').querySelector('#close').addEventListener('click', () => { // cerrar menú
      menuOptionsDiv.style.display = 'none';
    });

    // CERRAR SESION
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#signOut').addEventListener('click', () => {
      localStorage.removeItem('user'); // si cierra sesión, la info del usuario se elimina del localstorage
      onNavigate('/');
    });

    // FUNCIONALIDAD MODAL ACERCA DE
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#acercaDe').addEventListener('click', () => {
      windowsModal.innerHTML = '';
      windowsModal.innerHTML = `
      <button class="closeModal" id="closeModal"><img src="${closeImg}" alt="buttonMenu"></button>
      <label class="labelModal">Acerca de Rockbook:</label>
      <p class="about">Esta es una red social en la que podrán ingresar usuarios con interés por la dinámica de las <b>piedras viajeras</b>. La piedra viajera es una piedra decorada, que pude contener un mensaje de aliento, esperanza o una reflexión. Éstas tienen el fin de dar un mensaje o mayor alegría al día de una persona.</p>
      <p class="about1">Existen dos formas de <b>contribuir a la dinámica</b>:</p>
      <p class="aboutOptions">  - Si encuentras una en tu camino, la idea es que captures una foto de ésta y el lugar donde la encontraste y la lleves a otro sitio turístico para que continúen su viaje por el mundo cumpliendo su propósito de enviar mensajes y alegría a más personas.</p>
      <p class="aboutOptions1"> - También puedes contribuir decorando piedras y mandándolas a viajar.</p>
      <p class="about"><b>Cualquiera que sea la forma, tu contribución es bienvenida! 🤗 </b></p>
      <img src='${rock}' class='imgAbout'></img>`;

      windowsModal.close();
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';

      // cerrar la ventana modal
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

      btnClose.onclick = function () {
        windowsModal.close();
        windowsModal.style.display = 'none';
        menuOptionsDiv.style.display = 'none';
      };
    });

    // FUNCIONALIDAD MODAL PARA EDITAR PERFIL
    loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#perfil').addEventListener('click', () => {
      windowsModal.innerHTML = '';
      windowsModal.innerHTML = `
      <button class="closeModal" id="closeModal"><img src="${closeImg}" alt="buttonMenu"></button>
      <label class="labelModal">Nombre:</label>
      <input type="text" class="inputModalProfile" placeholder="Escribe aquí">
      <label class="labelErrorsModal" id="labelErrorsModal"></label>
      <br>
      <button class="buttonModalProfile" id="buttonModalProfile">Actualizar perfil</button>`;

      const nameProfileEdit = windowsModal.querySelector('.inputModalProfile');
      nameProfileEdit.value = currentUserName;
      const btnEditProfile = loginDiv.querySelector('#divModal').querySelector('#buttonModalProfile');

      windowsModal.close();
      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';

      // Terminar de editar perfil
      btnEditProfile.onclick = async () => {
        menuOptionsDiv.style.display = 'none';
        if (nameProfileEdit.value === '') {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'Debe rellenar el campo para poder editar su nombre';
        } else {
          await updateNameProfile(nameProfileEdit.value);
          localStorage.removeItem('user'); // la info del usuario se elimina del localstorage
          localStorage.setItem('user', JSON.stringify({ uid: currentUserId, email: currentUserEmail, displayName: nameProfileEdit.value }));

          windowsModal.close();
          windowsModal.style.display = 'none';
          window.location.reload();
        }
      };

      // cerrar la ventana modal
      const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

      btnClose.onclick = function () {
        windowsModal.close();
        windowsModal.style.display = 'none';
        menuOptionsDiv.style.display = 'none';
      };
    });
  });

  // FUNCIONALIDAD ETIQUETA DE BIENVENIDA AL USUARIO
  loginDiv.querySelector('#menu').querySelector('#labelLogin').textContent = `Bienvenid@ ${currentUserName}!`;
  loginDiv.querySelector('#menu').querySelector('#labelLogin').id = currentUserName;

  // FUNCIONALIDAD MODAL CREAR POSTS
  loginDiv.querySelector('#inputLogin').addEventListener(
    'click',
    () => {
      windowsModal.innerHTML = '';
      windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${closeImg}" alt="buttonMenu"></button>
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPost" placeholder="Escribe aquí">
        <label class="labelModal">Ingresar coordenadas:</label>
        <div class="coords">
        <input type="text" class="latitud" placeholder="Ingresa latitud">
        <input type="text" class="longitud" placeholder="Ingresa longitud">
        <button class="inputModal"><img src="${geo}" class="buttonCoords" title="Obtener coordenadas de tu ubicación actual" alt="buttonMenu"></button>
        </div>
        <div class="divImgModal"> 
        <label class="labelButtonModalImg">Subir Imagen
        <input type="file" class="buttonModalImg" id="buttonModalImg" accept=".jpg, .jpeg, .png"></input>
        </label>
        <br>
        <img class="urlLocalImg">
        </div>
        <label class="labelErrorsModal" id="labelErrorsModal"></label>
        <br>
        <button class="buttonModalPublish" id="buttonModalPublish">Publicar</button>`;

      windowsModal.showModal();
      windowsModal.style.display = 'block';
      windowsModal.style.display = 'flex';

      const btnPublish = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublish');
      const selecImg = windowsModal.querySelector('.divImgModal').querySelector('#buttonModalImg');
      const urlLocalImg = windowsModal.querySelector('.divImgModal').querySelector('.urlLocalImg');

      // IMÁGENES
      selecImg.addEventListener('change', () => {
        const urlSelecImg = selecImg.files[0];
        const urlLocal = URL.createObjectURL(urlSelecImg);
        urlLocalImg.src = urlLocal;
      });

      // AGREGAR COORDENADAS
      const buttonCoords = windowsModal.querySelector('.inputModal');
      buttonCoords.addEventListener('click', () => {
        const lat = windowsModal.querySelector('.latitud');
        const lng = windowsModal.querySelector('.longitud');

        if (navigator.geolocation) {
          // Pedimos los datos de geolocalizacion al navegador
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                lat: `${position.coords.latitude}`,
                lng: `${position.coords.longitude}`,
              };
              lat.value = coords.lat;
              lng.value = coords.lng;
            },
            // Si no los entrega manda una alerta de error
            () => {
              window.alert('Aún no has dado permiso para acceder a tu ubicación');
            },
          );
        }
      });

      // Terminar de publicar posts
      btnPublish.onclick = async () => {
        const inputModalPost = windowsModal.querySelector('.inputModalPost').value;
        const coordenadas = {
          lat: parseFloat(windowsModal.querySelector('.latitud').value),
          lng: parseFloat(windowsModal.querySelector('.longitud').value),
        };
        const selecImgFile = selecImg.files[0];
        const name = selecImgFile ? selecImgFile.name : 0;
        const size = selecImgFile ? selecImgFile.size : 0;
        if (inputModalPost === '' && !selecImgFile) {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'Debe agregar al menos un Post o una Imagen';
        } else if (selecImgFile && size > 100000) {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'La imagen supera el limite de 100kb';
        } else if (selecImgFile && size < 100000) {
          uploadImg(name, selecImgFile)
            .then((snapshot) => {
              const fullPath = snapshot.metadata.fullPath;
              getUrl(fullPath).then((url) => post(inputModalPost, coordenadas, url));
            });
          windowsModal.close();
          windowsModal.style.display = 'none';
        } else if (!selecImgFile) {
          const urlImg = '';
          post(inputModalPost, coordenadas, urlImg);

          windowsModal.close();
          windowsModal.style.display = 'none';
        }
      };

      // cerrar la ventana modal
      const btnCloses = loginDiv.querySelector('.divModal').querySelector('.closeModal');

      btnCloses.addEventListener('click', () => {
        windowsModal.close();
        windowsModal.style.display = 'none';
      });
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

      const content3Posts = document.createElement('div');
      content3Posts.setAttribute('class', 'div3Posts');
      postElement.appendChild(content3Posts);

      const content1Posts = document.createElement('div');
      content1Posts.setAttribute('class', 'div1Posts');
      postElement.appendChild(content1Posts);

      const content2Posts = document.createElement('div');
      content2Posts.setAttribute('class', 'div2Posts');
      postElement.appendChild(content2Posts);

      const contentImgs = document.createElement('div');
      contentImgs.setAttribute('class', 'contentImgs');
      content2Posts.appendChild(contentImgs);

      const userNameElement = document.createElement('label');
      userNameElement.setAttribute('class', 'namePosts');
      userNameElement.textContent = doc.userName;
      content3Posts.appendChild(userNameElement);

      const dateElement = document.createElement('label');
      dateElement.setAttribute('class', 'datePosts');
      // convierte la fecha de firebase a un string de js para traducirla
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      dateElement.textContent = `${doc.dateCreate.toDate().toLocaleDateString('es-CH', options)} - ${doc.dateCreate.toDate().toLocaleTimeString()} `;
      content1Posts.appendChild(dateElement);

      if (doc.text !== '') {
        const textElement = document.createElement('p');
        textElement.setAttribute('class', 'textPosts');
        textElement.textContent = doc.text;
        content1Posts.appendChild(textElement);
      }

      if (doc.image !== '') {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('class', 'imgPosts');
        imgElement.src = doc.image;
        contentImgs.appendChild(imgElement);
      }

      if (doc.coords.lat && doc.coords.lng) {
        const coordsElement = document.createElement('div');
        coordsElement.setAttribute('id', `${doc.id}`);
        coordsElement.setAttribute('class', 'map');

        contentImgs.appendChild(coordsElement);
        initMap(doc.coords, doc.id);
      }

      const divButtonLike = document.createElement('div');
      divButtonLike.setAttribute('class', 'divButtLike');
      content2Posts.appendChild(divButtonLike);

      const divButtons = document.createElement('div');
      divButtons.setAttribute('class', 'divButt');
      divButtons.style.display = 'none';
      content3Posts.appendChild(divButtons);

      // CREACION DE BOTON LIKE
      const divLikes = document.createElement('div');
      divLikes.setAttribute('class', 'divLikes');
      const buttonLikes = document.createElement('button');
      buttonLikes.setAttribute('class', 'buttonLikes');
      buttonLikes.id = 'buttonLikes';
      const imgButtonLikes = document.createElement('img');
      imgButtonLikes.setAttribute('class', 'imgButtonLikes');

      // si ya tiene like aparece rosa, si no blanco
      const likeImg = doc.likes.includes(auth.currentUser.uid) ? likeImage : likeImage2;
      imgButtonLikes.src = `${likeImg}`;
      const likesElement = document.createElement('label');
      likesElement.setAttribute('class', 'likesElement');

      // da el largo del array de likes para hacer la contabilidad de likes
      likesElement.textContent = doc.likes.length;
      divButtonLike.appendChild(divLikes);
      divLikes.appendChild(buttonLikes);
      buttonLikes.appendChild(imgButtonLikes);
      divLikes.appendChild(likesElement);

      // verifica que el usuario que está logeado sea el dueño del post
      if (doc.userId === auth.currentUser.uid) {
        // ACTUALIZAR NOMRE
        userNameElement.textContent = currentUserName;
        updatePost(doc.id, {
          userName: currentUserName,
        });

        // si es el dueño crea el menu de botones de post
        const optionsPosts = document.createElement('label');
        optionsPosts.setAttribute('class', 'optionsPosts');
        optionsPosts.innerText = '...';
        content3Posts.appendChild(optionsPosts);

        // cerrar menu de posts
        const closeMenuPosts = document.createElement('button');
        closeMenuPosts.setAttribute('class', 'closeMenuPosts');
        closeMenuPosts.value = doc.id;
        closeMenuPosts.id = doc.id;

        closeMenuPosts.innerHTML = `<img src="${closeImg}" alt="buttonMenu">`;

        // si es el dueño crea el boton de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'deletePost');
        deleteButton.textContent = 'Eliminar';
        deleteButton.value = doc.id;
        deleteButton.id = doc.id;

        // si es el dueño crea el boton de editar
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'editPost');
        editButton.textContent = 'Editar';
        editButton.value = doc.id;
        editButton.id = doc.id;

        // FUNCIONALIDAD DEL MENU DE POSTS
        optionsPosts.onclick = function () {
          optionsPosts.style.display = 'none';
          divButtons.style.display = 'block';
          divButtons.style.display = 'flex';
          divButtons.appendChild(closeMenuPosts);

          closeMenuPosts.onclick = function () { // cerrar menú
            divButtons.style.display = 'none';
            optionsPosts.style.display = 'block';
          };

          // FUNCIONALIDAD BOTON BORRAR
          deleteButton.onclick = function () {
            divButtons.style.display = 'none';
            const confirmDelete = window.confirm('¿Segur@ quieres eliminar el post?');
            if (confirmDelete) { // si el usuario confirma la eliminación del post
              deleteDocData(doc.id);
            }
          };

          divButtons.appendChild(deleteButton);

          // FUNCIONALIDAD BOTON EDITAR
          editButton.onclick = function () {
            divButtons.style.display = 'none';
            optionsPosts.style.display = 'block';
            windowsModal.innerHTML = '';
            windowsModal.innerHTML = `
              <button class="closeModal" id="closeModal"><img src="${closeImg}" alt="buttonMenu"></button>
              <label class="labelModal">Texto:</label>
              <input type="text" class="inputModalPostEdit" placeholder="Escribe aquí">
              <label class="labelModal">Cambiar Coordenadas:</label>
              <div class="coordsEdit">
              <input type="text" class="latitudEdit" placeholder="Ingresa latitud">
              <input type="text" class="longitudEdit" placeholder="Ingresa longitud">
              <button class="inputModalEdit"><img src="${geo}" class="buttonCoords" title="Obtener coordenadas de tu ubicación actual" alt="buttonMenu"></button>
              </div>
              <div class="divImgModal"> 
              <label class="labelModalImgEdit">Subir Imagen
              <input type="file" class="buttonModalImg" id="buttonModalImgEdit" accept=".jpg, .jpeg, .png"></input>
              </label>
              <br>
              <img class="imgEditUrl">
              </div>
              <label class="labelErrorsModal" id="labelErrorsModal"></label>
              <br>
              <button class="buttonModalEdit" id="buttonModalEdit">Listo!</button>`;

            const postTextEdit = windowsModal.querySelector('.inputModalPostEdit');
            // eslint-disable-next-line max-len
            const imgEditUrl = windowsModal.querySelector('.divImgModal').querySelector('.imgEditUrl');
            const buttonImgEdit = windowsModal.querySelector('.divImgModal').querySelector('.buttonModalImg');

            const latitudEdit = windowsModal.querySelector('.coordsEdit').querySelector('.latitudEdit');
            const longitudEdit = windowsModal.querySelector('.coordsEdit').querySelector('.longitudEdit');

            //  le da el valor del contenido del post a cada espacio
            postTextEdit.value = doc.text;
            latitudEdit.value = doc.coords.lat || '';
            longitudEdit.value = doc.coords.lng || '';
            imgEditUrl.src = doc.image;
            postTextEdit.id = doc.text;

            // abre modal
            windowsModal.showModal();
            windowsModal.style.display = 'block';
            windowsModal.style.display = 'flex';

            // Imagenes
            buttonImgEdit.addEventListener('change', () => {
              const urlButtonImgEdit = buttonImgEdit.files[0];
              const urlImgLocal = URL.createObjectURL(urlButtonImgEdit);
              imgEditUrl.src = urlImgLocal;
            });

            // Coordenadas
            const buttonCoordsEdit = windowsModal.querySelector('.inputModalEdit');
            buttonCoordsEdit.addEventListener('click', () => {
              const latEdit = windowsModal.querySelector('.latitudEdit');
              const lngEdit = windowsModal.querySelector('.longitudEdit');

              if (navigator.geolocation) {
                // Pedimos los datos de geolocalizacion al navegador
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const coords = {
                      lat: `${position.coords.latitude}`,
                      lng: `${position.coords.longitude}`,
                    };
                    latEdit.value = coords.lat;
                    lngEdit.value = coords.lng;
                  },
                  // Si no los entrega manda una alerta de error
                  () => {
                    window.alert('Aún no has dado permiso para acceder a tu ubicación');
                  },
                );
              }
            });

            // TERMINAR DE EDITAR POSTS
            const btnEditDone = loginDiv.querySelector('#divModal').querySelector('#buttonModalEdit');

            btnEditDone.onclick = async () => {
              optionsPosts.style.display = 'block';
              const buttonImg = windowsModal.querySelector('.divImgModal').querySelector('.buttonModalImg');
              const buttonImgFile = buttonImg.files[0];
              const nameButton = buttonImgFile ? buttonImgFile.name : 0;
              const coordenadasEdit = {
                lat: parseFloat(windowsModal.querySelector('.coordsEdit').querySelector('.latitudEdit').value),
                lng: parseFloat(windowsModal.querySelector('.coordsEdit').querySelector('.longitudEdit').value),
              };

              if (postTextEdit.value === '' && coordenadasEdit.value === '') {
                windowsModal.querySelector('.labelErrorsModal').textContent = 'Debe rellenar al menos un campo para poder editar la publicación';
              } else {
                if (buttonImgFile) {
                  uploadImg(nameButton, buttonImgFile)
                    .then((snapshot) => {
                      const fullPath = snapshot.metadata.fullPath;
                      getUrl(fullPath).then((url) => updatePost(doc.id, {
                        text: postTextEdit.value, coords: coordenadasEdit, image: url,
                      }));
                    });
                } else {
                  updatePost(doc.id, {
                    text: postTextEdit.value, coords: coordenadasEdit,
                  });
                }
                windowsModal.close();
                windowsModal.style.display = 'none';
              }
            };

            // cerrar la ventana modal
            const btnClose = loginDiv.querySelector('#divModal').querySelector('#closeModal');

            btnClose.onclick = function () {
              optionsPosts.style.display = 'block';
              windowsModal.close();
              windowsModal.style.display = 'none';
            };
          };

          divButtons.appendChild(editButton);
        };
      }

      // FUNCIONALIDAD DEL BOTÓN LIKE
      buttonLikes.onclick = async () => {
        // si ya tiene like, se borra el like de la data al dar click
        if (doc.likes.includes(auth.currentUser.uid)) {
          await disLike(doc.id, auth.currentUser.uid);
        } else { // si no tiene like, se agrega el like a la data
          await like(doc.id, auth.currentUser.uid);
        }
      };
    });
  });

  return loginDiv;
};
