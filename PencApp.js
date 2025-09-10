const matches = [
    {
        team1: { name: 'Francia', flag: 'https://flagcdn.com/fr.svg' },
        team2: { name: 'Australia', flag: 'https://flagcdn.com/au.svg' },
        result: '2 - 0'
    },
    {
        team1: { name: 'Alemania', flag: 'https://flagcdn.com/de.svg' },
        team2: { name: 'Corea del Sur', flag: 'https://flagcdn.com/kr.svg' },
        result: '1 - 1'
    },
    {
        team1: { name: 'Uruguay', flag: 'https://flagcdn.com/uy.svg' },
        team2: { name: 'Russia', flag: 'https://flagcdn.com/rs.svg' },
        result: '1 - 1'
    },
    {
        team1: { name: 'Brasil', flag: 'https://flagcdn.com/br.svg' },
        team2: { name: 'Serbia', flag: 'https://flagcdn.com/rs.svg' },
        result: '2 - 0'
    },
    {
        team1: { name: 'Argentina', flag: 'https://flagcdn.com/ar.svg' },
        team2: { name: 'Italia', flag: 'https://flagcdn.com/it.svg' },
        result: '3 - 1'
    },
    {
        team1: { name: 'Portugal', flag: 'https://flagcdn.com/pt.svg' },
        team2: { name: 'Ghana', flag: 'https://flagcdn.com/gh.svg' },
        result: '2 - 1'
    },
     {
        team1: { name: 'Uruguay', flag: 'https://flagcdn.com/uy.svg' },
        team2: { name: 'Argentina', flag: 'https://flagcdn.com/ar.svg' },
        result: '3 - 0'
    }
];

function createMatchCard(match) {
    return `
        <div class="match-card" id="match${match.id}">
            <div class="team">
                <img src="${match.team1.flag}" alt="${match.team1.name}" class="flag">
                <span class="team-name">${match.team1.name}</span>
            </div>
            <div class="results">
                <div id="matchResults">
                    <input id="result1" type="number" min="0" max="20" class="inputResult">
                    <h2> - </h2>
                    <input id="result2" type="number" min="0" max="20" class="inputResult">
                </div>
                <button class="submitResult" onclick="guardarResultado()">Guardar</button>
            </div>
            <div class="team">
                <img src="${match.team2.flag}" alt="${match.team2.name}" class="flag">
                <span class="team-name">${match.team2.name}</span>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.main-container');
    //matches = await fetchMatches();
    matches.forEach(match => {
        container.insertAdjacentHTML('beforeend', createMatchCard(match));
    });
});

async function fetchMatches() {
    fetch('https://localhost:3000/partidos', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching matches:', error);
    });
}    