let equipos = [];
let partidos = [];

//URL de la api y endpoints para hacer los get de datos
const API_BASE_URL = 'http://localhost:3000';
const ENDPOINTS = {
    equipos: `${API_BASE_URL}/equipos`,
    partidos: `${API_BASE_URL}/partidos`
};

function createMatchCard(match) {
    const equipo1 = equipos.find(equipo => equipo.id === match.equipoLocatario);
    const equipo2 = equipos.find(equipo => equipo.id === match.equipoVisitante);

    return `
        <div class="match-card" id="match${match.id}">
            <div class="team">
                <img src="${equipo1.flag}" alt="Bandera de ${equipo1.nombre}" class="flag">
                <span class="team-name">${equipo1.nombre}</span>
            </div>
            <div class="results">
                <div id="matchResults">
                    <input id="result1" type="number" min="0" max="20" class="inputResult">
                    <h2> - </h2>
                    <input id="result2" type="number" min="0" max="20" class="inputResult">
                </div>
                <button class="submitResult" data-matchID="${match.id}" onclick="guardarResultado()">Guardar</button>
            </div>
            <div class="team">
                <img src="${equipo2.flag}" alt="Bandera de ${equipo2.nombre}" class="flag">
                <span class="team-name">${equipo2.nombre}</span>
            </div>
        </div>
    `;
}

//Cargar los equipos desde la API
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

//Cargar los partidos desde la API
async function cargarPartidos (){
    try{
        console.log('Cargando Partidos...');
        const response = await fetch(ENDPOINTS.partidos + "?_sort=fecha&_order=asc");
        partidos= await response.json();
        console.log("Partidos cargados:",partidos);
        return partidos;
    }
    catch (error){
        console.error('Error al cargar equipos',error);
        throw error;
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.main-container');
    await cargarEquipos();
    await cargarPartidos();
    partidos.forEach(partido => {
        container.insertAdjacentHTML('beforeend', createMatchCard(partido));
    });
});


function guardarResultado(){
    const matchID = document.activeElement.getAttribute('data-matchID');
    const match = partidos.find(p => p.id === matchID);
    const result1 = document.querySelector(`#match${matchID} #result1`).value;
    const result2 = document.querySelector(`#match${matchID} #result2`).value;
    
    partidos.find(p => p.id === matchID).resultadoLocatario = parseInt(result1);
    partidos.find(p => p.id === matchID).resultadoVisitante = parseInt(result2);

    fetch(ENDPOINTS.partidos + `/${matchID}`),{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(match)
    } 
    console.log("Resultado guardado:", match);
}