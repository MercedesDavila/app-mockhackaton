const urlApi =
  "https://cors-anywhere.herokuapp.com/https://api-gas-stations-mex.herokuapp.com/gasstations";
const fetchApi = async urlApi => {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
fetchApi(urlApi);

let root = document.getElementById("map");
//Crear funcion y promesa que obtenga la geolocalizacion del usuario por medio de Api Geolocation y
//  la muestre en un mapa dinamico de Google Maps por medio de Api MapsJAvascript

navigator.geolocation.getCurrentPosition(getMap, noGet);

function noGet() {
    alert('Porfavor habilita el permiso para compartir ubicación')
}

function getMap(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let latLng = new google.maps.LatLng(latitude, longitude);
    let objConfig = {
        zoom: 19,
        center: latLng
    }
    let map = new google.maps.Map(root, objConfig);
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Estás Aquí',
        animation: google.maps.Animation.BOUNCE
    });

};

function initialize() {
        // Setup map and options
        var map = new google.maps.Map(document.getElementById("map"), {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // Get the Json file data
        $.getJSON("gaso.json", function(data) {
          // Loop through the data
          $.each(data, function(key, data) {
            var myLatlng = new google.maps.LatLng(data.x, data.y); // set position
            // Add marker to map
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
            });
            // Set info window content
            var infoContent = '<strong>' + data.name + '</strong>';
                infoContent+= '<p>' + data.address + '</p>';
            // Add info window
            marker.info = new google.maps.InfoWindow({
              content: infoContent
            });
            // Add listener for info window
            google.maps.event.addListener(marker, 'click', function() {
              marker.info.open(map, marker);
            });
            // Add marker location to loc var
            var loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            // extend bounds with loc
            bounds.extend(loc);
          });
        });
        var bounds  = new google.maps.LatLngBounds();
        map.fitBounds(bounds); // auto zoom
        map.panToBounds(bounds); // auto center
      }