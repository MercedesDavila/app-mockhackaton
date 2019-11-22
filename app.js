let root = document.getElementById("map");
//Crear funcion y promesa que obtenga la geolocalizacion del usuario por medio de Api Geolocation y
//  la muestre en un mapa dinamico de Google Maps por medio de Api MapsJAvascript

navigator.geolocation.getCurrentPosition(getMap, noGet);

function noGet() {
  alert("Porfavor habilita el permiso para compartir ubicación");
}

function getMap(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let latLng = new google.maps.LatLng(latitude, longitude);
  let objConfig = {
    zoom: 19,
    center: latLng
  };
  let map = new google.maps.Map(root, objConfig);
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: "Estás Aquí"
    // animation: google.maps.Animation.BOUNCE
  });
}
const urlApi =
  //   "https://crossorigin.me/https://api-gas-stations-mex.herokuapp.com/gasstations";
  "https://cors-anywhere.herokuapp.com/https://api-gas-stations-mex.herokuapp.com/gasstations?offset=0&limit=200";
  

const fetchApi = async urlApi => {
  try {
    const response = await fetch(urlApi);
    const data = await response.json();
    //return data;
    data.map(element => {
      console.log(element.location);
    });
  } catch (error) {
    return error;
  }
};

fetchApi(urlApi);

// const getLocations = ()=>{
//     fetch('./gaso.json')
//     .then(response => response.json())
//     .then(locations => {
//         console.log(locations)
// })


// locations.forEach(location => {
//     let locationData = {
//          position:{lat:location.location[1],lng:location.location[0]},
//          name:location.nombre_sede                
//     }
//     locationsInfo.push(locationData)
// })

// if(navigator.geolocation){
//    navigator.geolocation.getCurrentPosition((data)=>{
//        let currentPosition = {
//             lat: data.coords.latitude,
//             lng: data.coords.longitude
//        }
//        initMap(currentPosition)
//      })
// }

// let locationsInfo = []

// const getLocations = ()=>{
//     fetch('./gaso.json')
//     .then(response => response.json())
//     .then(locations => {
//         console.log(locations)

//         locations.forEach(location => {
//             let locationData = {
//                 position:{lat:location.punto.coordinates[1],lng:location.punto.coordinates[0]},
//                 name:location.nombre_sede                
//             }
//             locationsInfo.push(locationData)
//         })
//         if(navigator.geolocation){
//             navigator.geolocation.getCurrentPosition((data)=>{
//                 let currentPosition = {
//                     lat: data.coords.latitude,
//                     lng: data.coords.longitude
//                 }
//                 initMap(currentPosition)
//             })
//         }
//     })
// }

// const initMap = (obj) =>{
//     map = new google.maps.Map(document.getElementById('map'),{
//         zoom:13,
//         center:obj
//     })

//     let marker = new google.maps.Marker({
//         position:obj,
//         title:'Tu ubicacion'
//     })
//     marker.setMap(map)

//     let markers = locationsInfo.map( (place) =>{
//         return new google.maps.Marker({
//             position: place.position,
//             map:map,
//             title:place.name
//         })
//     })
// }}

// window.addEventListener('load',getLocations)