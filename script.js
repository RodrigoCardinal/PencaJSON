let equipos = [];
let partidos = [];

//URL de la api y endpoints para hacer los get de datos
const API_BASE_URL = 'http://localhost:3000';
const ENDPOINTS = {
    equipos: `${API_BASE_URL}/equipos`,
    partidos: `${API_BASE_URL}/partidos`
};
//cargar el array de los equipos desde la base de datos
async function cargarEquipos (){
    try{
        console.log('Cargando equipos...');
        const response = await fetch(ENDPOINTS.equipos);
        equipos = await response.json();
        console.log('Equipos cargados:', equipos);
        return equipos;

   

    }
    catch (error) {
        console.error('Error al cargar equipos:', error);
        throw error;
    }
}
//Cargar el array de los partidos desde la base de datos
async function cargarPartidos (){
    try{
        console.log('Cargando Partidos...');
        partidos= await response.json();
        console.log("Partidos cargados:",partidos);
        return partidos;

    
    }
    catch (error){
        console.error('Error al cargar equipos',error);
        throw error;
    }
}

