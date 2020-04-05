const btn = document.querySelector('button');
var map_style = 'mapbox/dark-v10';
var mymap = L.map('map').setView([38.9935252,-76.9453], 10);
function createMap(mode){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: mode,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia25nbzEzMzciLCJhIjoiY2s4bHV3Zzl1MGc2NDNybzJtanA0NGI1dSJ9.cII2Sb1RsPFPDgyeZnpzRA'
    }).addTo(mymap);
}

createMap(map_style)

var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var marker = L.marker([38.9935252,-76.9453],{
    icon: redIcon
}).bindPopup("<strong>Eppley Recreational Center</strong><br>4128 Valley Dr<br>College Park,<br> MD 20742").openPopup().addTo(mymap);

let locArray =[];

fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
.then(response => {return response.json();})
.then(data =>{
    for(let i=0;i<3;i++){
        findLoc(data);
    }
})
.then(() =>{
    locArray.forEach(makeMark)
})

    
function findLoc(locs){
    let genNumber = Math.floor(Math.random() * locs.length);
    let place =  locs[genNumber];
    if (locArray.includes(place)){
        findLoc(locs)
    }
    else{
        if(place.hasOwnProperty("geocoded_column_1")){
            locArray.push(place);
        }
        else{
            findLoc(locs)
        }
        
    }

}

function makeMark(spot){
    L.marker([spot.geocoded_column_1.coordinates[1], spot.geocoded_column_1.coordinates[0]],{
        icon: redIcon
    }).bindPopup("<strong>"+spot.name+"</strong><br>"+spot.address_line_1+"<br>"+spot.city+",<br>"+spot.state+" "+spot.zip).addTo(mymap)
}

btn.onclick = function(){
    const modes = btn.getAttribute("class")
    if (modes === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Mode";
        map_style = 'mapbox/light-v10';
        createMap(map_style)
      } 
    else if (modes ==="light") {
        btn.setAttribute("class", "street");
        btn.textContent = "Mode";
        map_style = 'mapbox/streets-v11';
        createMap(map_style)
      }
    else if (modes ==="street") {
        btn.setAttribute("class", "satellite");
        btn.textContent = "Mode";
        map_style = 'mapbox/satellite-streets-v11';
        createMap(map_style)
      }
    else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Mode";
        map_style = 'mapbox/dark-v10';
        createMap(map_style)
      }
}