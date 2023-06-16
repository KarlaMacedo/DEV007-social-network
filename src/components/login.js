// import { onNavigate } from '../main';
import {
  // eslint-disable-next-line max-len
  currentUserInfo, post, addPost, deleteDocData, auth, updatePost,
  like, disLike, updateProfileEdit, uploadImg, getUrl, addUsers,
} from '../firebase/index.js';
import headerImg from '../Images/headers.jpg';
import menuImg from '../Images/menu.png';
import nueve from '../Images/9.png';
import diez from '../Images/10.1.png';
import diez2 from '../Images/10.2.png';
import rock from '../Images/rock.png';

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
  const onlyMenu = document.createElement('div');
  onlyMenu.setAttribute('class', 'onlyMenu');

  loginDiv.appendChild(menu);
  menu.appendChild(labelLogin);
  menu.appendChild(onlyMenu);
  onlyMenu.appendChild(buttonMenu);

  loginDiv.innerHTML += `
  <button class="inputLogin" id="inputLogin">Crear publicación</button>
  <dialog class="divModal" id="divModal"></dialog>
  <div class="postsContainer">Aquí irán las publicaciones</div>`;

  const windowsModal = loginDiv.querySelector('#divModal');
  windowsModal.style.display = 'none';

  // ID DEL USUARIO ACTUAL
  const currentUserId = currentUserInfo() ? currentUserInfo().uid : JSON.parse(localStorage.getItem('user')).uid;
  console.log(currentUserId);

  // MOSTRAR INFO USUARIOS EN TIEMPO REAL ("ESCUCHADOR")
  addUsers((querySnapshot) => {
    windowsModal.close();
    console.log(querySnapshot);
    // filtra la info del usuario actual
    const info = querySnapshot.filter((user) => user.uid === currentUserId);
    console.log(info[0]);

    // FUNCIONALIDAD MENU
    const menuOptionsDiv = document.createElement('div');
    menuOptionsDiv.setAttribute('class', 'menuOptionsDiv');
    menuOptionsDiv.setAttribute('id', 'menuOptionsDiv');

    menuOptionsDiv.innerHTML = `
          <button class="close" id="close"><img src="${nueve}" alt="buttonMenu"></button>
          <button class="optionMenu" id="acercaDe">Acerca de</button>
          <button class="optionMenu" id="perfil">Editar perfil</button>
          <a href="" class="optionMenu" id="cerrarSesion" style="text-decoration:none">Cerrar sesión</a>`;

    loginDiv.querySelector('#buttonMenu').addEventListener('click', () => { // abrir menu
      menuOptionsDiv.style.display = 'block';
      menuOptionsDiv.style.display = 'flex';
      loginDiv.querySelector('#menu').querySelector('.onlyMenu').insertAdjacentElement('beforeend', menuOptionsDiv);
      loginDiv.querySelector('#menu').querySelector('#close').addEventListener('click', () => { // cerrar menú
        menuOptionsDiv.style.display = 'none';
      });

      // CERRAR SESION
      loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#cerrarSesion').addEventListener('click', () => {
        localStorage.removeItem('user'); // si cierra sesión, la info del usuario se elimina del localstorage
        onNavigate('/');
      });

      // FUNCIONALIDAD MODAL ACERCA DE
      loginDiv.querySelector('#menu').querySelector('#menuOptionsDiv').querySelector('#acercaDe').addEventListener('click', () => {
        windowsModal.innerHTML = '';
        windowsModal.innerHTML = `
      <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
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
      <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
      <label class="labelModal">Nombre:</label>
      <input type="text" class="inputModalProfile" placeholder="Escribe aquí">
      <label class="labelErrorsModal" id="labelErrorsModal"></label>
      <br>
      <button class="buttonModalProfile" id="buttonModalProfile">Actualizar perfil</button>`;

        const nameProfileEdit = windowsModal.querySelector('.inputModalProfile');
        nameProfileEdit.value = info[0].displayName;
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
          // eslint-disable-next-line max-len
            await updateProfileEdit(info[0].uid, { displayName: nameProfileEdit.value });

            // ----ACTUALIZAR DATA DE POST TAMBIEN
            addPost((querySnapshots) => {
              querySnapshots.forEach((doc) => {
                if (doc.userId === info[0].uid) {
                  const edit = async () => {
                    await updatePost(doc, { userName: nameProfileEdit.value });
                  };
                  edit();
                }
              });
            });

            windowsModal.close();
            windowsModal.style.display = 'none';

            console.log(loginDiv.querySelector('#menu').querySelector('#labelLogin'));
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
    loginDiv.querySelector('#menu').querySelector('#labelLogin').textContent = `Bienvenid@ ${info[0].displayName}!`;
    loginDiv.querySelector('#menu').querySelector('#labelLogin').id = info[0].displayName;
  });

  // FUNCIONALIDAD MODAL CREAR POSTS
  loginDiv.querySelector('#inputLogin').addEventListener(
    'click',
    () => {
      windowsModal.innerHTML = '';
      windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPost" placeholder="Escribe aquí">
        <label class="labelModal">Link de maps obtenido de "incorporar un mapa":</label>
        <input type="text" class="inputModal" placeholder="Escribe aquí">

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

      // Terminar de publicar posts
      const btnPublish = loginDiv.querySelector('#divModal').querySelector('#buttonModalPublish');
      const selecImg = windowsModal.querySelector('.divImgModal').querySelector('#buttonModalImg');
      const urlLocalImg = windowsModal.querySelector('.divImgModal').querySelector('.urlLocalImg');

      // mostrar el nombre de la imagen que se va a subir al lado del boton subir imagen
      selecImg.addEventListener('change', () => {
        const urlSelecImg = selecImg.files[0];
        const urlLocal = URL.createObjectURL(urlSelecImg);
        urlLocalImg.src = urlLocal;
      });

      btnPublish.onclick = async () => {
        const inputModalPost = windowsModal.querySelector('.inputModalPost').value;
        const coordenadas = windowsModal.querySelector('.inputModal').value;
        const selecImgFile = selecImg.files[0];
        const name = selecImgFile ? selecImgFile.name : 0;
        const size = selecImgFile ? selecImgFile.size : 0;
        if (inputModalPost === '' && coordenadas === '' && !selecImgFile) {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'Debe rellenar al menos un campo para poder publicar';
        } else if (selecImgFile && size > 100000) {
          windowsModal.querySelector('#labelErrorsModal').textContent = 'La imagen supera el limite de 100kb';
        } else if (selecImgFile && size < 100000) {
          console.log(size);
          uploadImg(name, selecImgFile)
            .then((snapshot) => {
              const fullPath = snapshot.metadata.fullPath;
              getUrl(fullPath).then((url) => post(inputModalPost, coordenadas, url));
            });
          windowsModal.close();
          windowsModal.style.display = 'none';
          console.log(inputModalPost, coordenadas, selecImg);
        } else if (!selecImgFile) {
          const urlImg = '';
          console.log(selecImgFile);
          post(inputModalPost, coordenadas, urlImg);

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
      // convierte la fecha de firebase a un string de js
      dateElement.textContent = `${doc.dateCreate.toDate().toDateString()} ${doc.dateCreate.toDate().toLocaleTimeString()}`;
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

      if (doc.coords !== '') {
        const coordsElement = document.createElement('iframe');
        coordsElement.setAttribute('class', 'coordsPosts');
        coordsElement.src = doc.coords;
        coordsElement.referrerPolicy = 'no-referrer-when-downgrade';
        coordsElement.allowFullscreen = '';
        coordsElement.loading = 'lazy';
        contentImgs.appendChild(coordsElement);
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
      const likeImg = doc.likes.includes(auth.currentUser.uid) ? diez : diez2;
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
        // si es el dueño crea el menu de botones de post
        const optionsPosts = document.createElement('label');
        optionsPosts.setAttribute('class', 'optionsPosts');
        optionsPosts.innerText = '...';
        content3Posts.appendChild(optionsPosts);

        // si es el dueño crea el boton de eliminar
        const closeMenuPosts = document.createElement('button');
        closeMenuPosts.setAttribute('class', 'closeMenuPosts');
        closeMenuPosts.value = doc.id;
        closeMenuPosts.id = doc.id;

        closeMenuPosts.innerHTML = `<img src="${nueve}" alt="buttonMenu">`;

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
        console.log(doc.id);
        console.log(doc.text);

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
            console.log(doc.id);
            const confirmDelete = window.confirm('¿Segur@ quieres eliminar el post?');
            if (confirmDelete) { // si el usuario confirma la eliminación del post
              deleteDocData(doc.id);
            }
          };

          divButtons.appendChild(deleteButton);

          // FUNCIONALIDAD BOTON EDITAR DE LA VENTANA MODAL
          editButton.onclick = function () {
            divButtons.style.display = 'none';
            optionsPosts.style.display = 'block';
            // abre modal si quiere editar y le da el valor de cada espacio
            windowsModal.innerHTML = '';
            windowsModal.innerHTML = `
        <button class="closeModal" id="closeModal"><img src="${nueve}" alt="buttonMenu"></button>
        <label class="labelModal">Texto:</label>
        <input type="text" class="inputModalPostEdit" placeholder="Escribe aquí">
        <label class="labelModal">Link de maps obtenido de "incorporar un mapa":</label>
        <input type="text" class="inputModalEdit" placeholder="Escribe aquí">
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
            const coordsEdit = windowsModal.querySelector('.inputModalEdit');
            // eslint-disable-next-line max-len
            const imgEditUrl = windowsModal.querySelector('.divImgModal').querySelector('.imgEditUrl');
            const buttonImgEdit = windowsModal.querySelector('.divImgModal').querySelector('.buttonModalImg');
            postTextEdit.value = doc.text;
            coordsEdit.value = doc.coords;
            imgEditUrl.src = doc.image;
            postTextEdit.id = doc.text;
            coordsEdit.id = doc.coords;
            windowsModal.showModal();
            windowsModal.style.display = 'block';
            windowsModal.style.display = 'flex';

            buttonImgEdit.addEventListener('change', () => {
              const urlButtonImgEdit = buttonImgEdit.files[0];
              const urlImgLocal = URL.createObjectURL(urlButtonImgEdit);
              imgEditUrl.src = urlImgLocal;
            });

            // TERMINAR DE EDITAR POSTS
            const btnEditDone = loginDiv.querySelector('#divModal').querySelector('#buttonModalEdit');

            btnEditDone.onclick = async () => {
              optionsPosts.style.display = 'block';
              const buttonImg = windowsModal.querySelector('.divImgModal').querySelector('.buttonModalImg');
              const buttonImgFile = buttonImg.files[0];
              const nameButton = buttonImgFile ? buttonImgFile.name : 0;
              console.log(nameButton);
              if (postTextEdit.value === '' && coordsEdit.value === '') {
                windowsModal.querySelector('.labelErrorsModal').textContent = 'Debe rellenar al menos un campo para poder editar la publicación';
              } else {
              // eslint-disable-next-line max-len
                if (buttonImgFile) {
                  uploadImg(nameButton, buttonImgFile)
                    .then((snapshot) => {
                      const fullPath = snapshot.metadata.fullPath;
                      getUrl(fullPath).then((url) => updatePost(doc.id, {
                        text: postTextEdit.value, coords: coordsEdit.value, image: url,
                      }));
                    });
                } else {
                  updatePost(doc.id, {
                    text: postTextEdit.value, coords: coordsEdit.value,
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
