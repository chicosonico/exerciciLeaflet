var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206],13);
//map.locate({setView: true, maxZoom: 17});
	
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

$( document ).ready(function() {

    

});
//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data_markers = [];
var markersArray =[];

function onMapLoad() {

    $.getJSON('http://localhost/~pablonet/mapa/api/apiRestaurants.php', function(data){
         data_markers = data;
        // console.log(data_markers);
        markerPrint(data_markers);
        getFoodList(data_markers);
    
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
        var marker = L.marker([latitud,longitud]).bindPopup(name + "<br>" + address).addTo(map);
        markersArray.push(marker);

        
        }
        //console.log(markersArray);
}
var foodFilter = []; // Empty array for get the kind food

function getFoodList(data_markers){
   
    for (i=0; i < data_markers.length; i++){ // restaurants loop
        var kind_food = data_markers[i].kind_food.split(", "); // split de array of kind of food
        for (y=0; y < kind_food.length; y++){ // kind of food lopp
            foodFilter.push(kind_food[y]); // populate the list with all of kind of food
        }
     }
    console.log(foodFilter);
     foodList = Array.from(new Set(foodFilter)); // delete no-unique kind of food
     foodList.sort();    
    console.log(foodList);

    for (j=0; j<foodList.length; j++ ){
        //console.log(foodList[j]); // populating html select with the food list
        var foodIndex = document.getElementById("kind_food_selector");
        foodIndex.insertAdjacentHTML("beforeend", "<option value=" + foodList[j] +">"+ foodList[j]+ "</option>");
    } 
    //console.log(foodIndex);
} 

// "<option value=" + data_markers[i].name +">"+ data_markers[i].name + "</option>"



$('#kind_food_selector').on('change', function() {
    // getFilters();

 for (h=0; h < markersArray.length; h++){
        map.removeLayer(markersArray[h]);
        
        // console.log(marker);
      } 
      

      if(this.value == "Todos"){
        markerPrint(data_markers);
      }else{
       
        render_to_map(data_markers, this.value);
      }
        
});



function render_to_map(data_markers,filter){
    for (k= 0; k < markersArray.length; k++){
        if(data_markers[k].kind_food.includes(filter)){
            console.log(data_markers[k].kind_food);
            let name = data_markers[k].name;
            let address = data_markers[k].address;
           let latitud = data_markers[k].lat;
           let longitud = data_markers[k].lng;
           var marker = L.marker([latitud,longitud]).bindPopup(name + address).addTo(map);
           markersArray.push(marker);
           }
        }


	
	/*
	FASE 3.2
		1) Limpio todos los marcadores
		2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa
	*/	
			
}



// map.on('click', function () {
//     for (h=0; h < markersArray.length; h++){
//         map.removeLayer(markersArray[h]);
        
//         // console.log(marker);
//         }
//   });






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