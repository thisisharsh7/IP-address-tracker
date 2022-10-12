const errorMsg = document.querySelector('.errorMsg');
const input = document.getElementById("iut");
const btn = document.querySelector("button");
function pointerLocate() {
  markPointer(37.38605, -122.08385);
}
function msg(){
  alert("invalid input");
}
async function getData(api_url) {
  const response = await fetch(api_url);
  const data = await response.json();
  if(!data?.location?.lat){
    errorMsg.innerText = "Invalid input"
    errorMsg.classList.add("active");
    setTimeout(()=>{console.clear(); errorMsg.classList.remove("active");},1800);
    btn.classList.add("active");
  }
  markPointer(data.location.lat, data.location.lng);
  document.getElementById("setIp").innerText = data?.ip;
  document.getElementById("setIsp").innerText = data?.isp;
  document.getElementById("setLocate").innerText = `${
    data?.location?.country + ", " + data?.location?.region
  }`;
  document.getElementById("setTime").innerText =
    "UTC " + data?.location?.timezone;
}

function getInput(e) {
  const api_url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_dtKgKyYjUi9ctCKZS83B5yZupcmoC&domain=${input.value}&api=${input.value}`;
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
  e.preventDefault();
  if (input.value == "") {
    btn.classList.add("active");
    errorMsg.innerText = "No input";
    errorMsg.classList.add("active");
    setTimeout(()=>{errorMsg.classList.remove("active");},1800);
  } else {
    getData(api_url);
    input.value = "";
    btn.classList.remove("active");
  }
 
}
function markPointer(lati, longi) {
  var map = L.map("map").setView([lati, longi], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  locationIcon = L.icon({
    iconUrl: "./images/icon-location.svg",

    iconSize: [30, 45], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  L.marker([lati, longi], { icon: locationIcon }).addTo(map);
}