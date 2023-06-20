// Agregar Mapa
export const initMap = (coordenadas, id) => {
  const coords = coordenadas;
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(document.getElementById(`${id}`), {
    zoom: 15,
    center: coords,
  });
    // eslint-disable-next-line no-undef, no-unused-vars
  const marker = new google.maps.Marker({
    position: coords,
    map,
  });
};
window.initMap = initMap;
