// IMPORTAMOS LAS FUNCIONES QUE TIENEN LAS INTERFACES DE LA PÁGINA
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/login.js';

// VARIABLE QUE ALMACENA LA ETIQUETA DEL HTML QUE CONTENDRÁ
// EL CONTENIDO DE LA PÁGINA Y QUE SE MODIFICARÁ CONSTANTEMENTE
const rootDiv = document.getElementById('root');

// VARIABLE QUE ALMACENA EL OBJETO QUE CONTIENE LOS PATHNAME DE CADA VENTANA DE LA PÁGINA
const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
};

// FUNCIÓN PARA NAVEGAR ENTRE NUESTRAS SECCIONES, PERO QUE TAMBIÉN ALMACENE NUESTRA NAVEGACIÓN EN
// EL HISTORIAL PARA DESPUÉS USAR LOS BOTONES DE REGRESAR Y AVANZAR. TAMBIÉN CREA EL CONTENIDO DE
// ACUERDO A LA RUTA EN LA QUE NOS ENCONTRAMOS, BORRANDO EL ANTERIOR
export const onNavigate = (pathname) => {
  window.history.pushState(
    {}, // estado
    pathname, // título
    window.location.origin + pathname, // ruta que queremos asignar
  );
  // limpiar el div para ingresar el nuevo contenido
  while (rootDiv.firstChild) { // condicional de mientras exista un primer nodo en root
    rootDiv.removeChild(rootDiv.firstChild); // borra el primer nodo
  }
  // ingresa en div contenido ejecutado () según pathname
  rootDiv.appendChild(routes[pathname](onNavigate));
};

// COPIA DEL HISTORIAL DE NAVEGACIÓN PARA AHORA SI USAR LOS BOTONES DE AVANZAR Y REGRESAR, PERO VA
// BORRANDO EL CONTENIDO QUE ESTABA CREADO ANTERIORMENTE PARA QUE NO SE QUEDE PEGADO
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname](onNavigate));
};

// OBTENIENDO USUARIO DESDE LOCALSTORAGE SI EXISTE REGISTRO DEL USUARIO Y SI NO EXISTE, TE MANDA A
// LA RUTA SI EXISTE LA RUTA, PERO A LOGIN NO TE DEJA ACCEDER. Y SI ES UNA RUTA QUE NO EXISTE TE
// MANDA A HOME
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  rootDiv.appendChild(routes['/login'](onNavigate));
} else { // si no existe el usuario en storage..
  const pathname = window.location.pathname;
  if (routes[pathname] && pathname !== '/login') {
    // ejecuta () el llamado de la ruta donde está el usuario e ingresa el resultado al div del HTML
    rootDiv.appendChild(routes[pathname](onNavigate));
  } else { // si no existe la ruta en routes..
    rootDiv.appendChild(routes['/'](onNavigate));
  }
}
