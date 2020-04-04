var mymap = L.map('map').setView([38.98425, -76.94273], 1);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoia25nbzEzMzciLCJhIjoiY2s4bHV3Zzl1MGc2NDNybzJtanA0NGI1dSJ9.cII2Sb1RsPFPDgyeZnpzRA'
        }).addTo(mymap);
        var marker = L.marker([51.5,-0.09]).addTo(map)