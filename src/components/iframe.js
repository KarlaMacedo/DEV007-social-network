export default function hola() {
  let iteracionContador = 0;
  const iteracionMaxima = 10;
  // eslint-disable-next-line no-use-before-define
  const variableDeIntervalo = setInterval(modificarIframe, 500);
  function modificarIframe() {
    // eslint-disable-next-line max-len
    // Chequeo que el contador de iteraciones no supere el iterador máximo para evitar el consumo de recursos.
    if (iteracionContador === iteracionMaxima) {
      // Paro el intervalo.
      clearInterval(variableDeIntervalo);
      return;
    }

    // Busco el iframe en el DOM.
    const iframeAModificar = document.querySelector('iframe');
    // Verifico si el iframe ya está cargado.
    if (
      !iframeAModificar || typeof iframeAModificar === 'undefined'
    ) {
      // eslint-disable-next-line no-plusplus
      iteracionContador++;
      return;
    }

    // Detengo el intervalo para evitar el consumo de recursos del navegador.
    clearInterval(variableDeIntervalo);
    // Obtengo el contenido del elemento iframe.
    const doc = iframeAModificar.contentDocument;
    const nuevosEstilos = `<style>
    .alguna-clase {
        color: #ffffff;
    }
    /* Aplica todos los estilos que desees aquí. */
    .gm-style .default-card {
        padding: 0px;
    }


    </style>
    `;
    // La siguiente línea sobrescribe el contenido del iframe con los nuevos estilos.
    // eslint-disable-next-line operator-assignment
    doc.body.innerHTML = doc.body.innerHTML + nuevosEstilos;
  }
}
