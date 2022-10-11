const api_url = 'https://geo.ipify.org/api/v2/country?apiKey=at_dtKgKyYjUi9ctCKZS83B5yZupcmoC&ipAddress=192.212.174.101';

async function getData(){
    const response = await fetch(api_url);
    const data = await response.json();
    document.getElementById("setIp").innerText = data?.ip;
    document.getElementById("setIsp").innerText = data?.isp;
    document.getElementById("setLocate").innerText = `${data?.location?.country + ", " + data?.location?.region}`;
    document.getElementById("setTime").innerText = "UTC " + data?.location?.timezone;
}


function getInput(e){
    const input = document.getElementById("iut");
    console.log(input.value);
    e.preventDefault();
    if(input.value==""){
        alert("Input can't be blank");
    }else{
        getData();
        input.value = "";
    }

}
var map = L.map('map').setView([51.505, -0.09], 13);