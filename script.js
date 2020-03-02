var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206],13);
//map.locate({setView: true, maxZoom: 17});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

$( document ).ready(function() {

    

});
//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];

function onMapLoad() {

    $.getJSON('http://localhost/~pablonet/mapa/api/apiRestaurants.php', function(data){
         data_markers = data;
        console.log(data_markers);
        markerPrint(data_markers);
        getFilters(data_markers);
    
    })

	console.log("Mapa cargado");
    /*
	FASE 3.1
		1) Relleno el data_markers con una petición a la api
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/

} 

function markerPrint(data_markers){
    for (i=0; i < data_markers.length; i++){
        let name = data_markers[i].name;
        let address = data_markers[i].address;
        let latitud = data_markers[i].lat;
        let longitud = data_markers[i].lng;
        var marker = L.marker([latitud,longitud]).bindPopup(name + address).addTo(map);
        // console.log(marker);
        }
}

function getFilters(data_markers){
    foodFilter= [];
    for (i=0; i < data_markers.length; i++){
        var kind_food = document.getElementById("kind_food_selector");
        kind_food.insertAdjacentHTML("beforeend", "<option value=" + data_markers[i].kind_food +">"+ data_markers[i].kind_food + "</option>");
     }
} 

// "<option value=" + data_markers[i].name +">"+ data_markers[i].name + "</option>"



$('#kind_food_selector').on('change', function() {
    getFilters();
//   console.log(this.value);
  render_to_map(data_markers, this.value);
});



function render_to_map(data_markers,filter){
	
	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/	
			
}




 // fetch('http://localhost/~pablonet/mapa/api/apiRestaurants.php')
    // .then((respuesta)=>{
    //     return respuesta.json();
    //  }).then((respuesta)=>{
    //     data_markers = respuesta;
    //     console.log(data_markers);
    //     markerPrint(data_markers);
    //     getFilters(data_markers);
    //     console.log(kind_food);
    //  })