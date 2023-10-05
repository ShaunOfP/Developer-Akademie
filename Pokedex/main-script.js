let allPokemon = [];
let allPokemonFixedFirst = [];
let pokemonData = [];

async function initMain() {
    await loadPokemon();
    fixFirstLetter();
    renderPokemonInfo();
}


async function loadPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6"); // zu 1010 ändern
        const data = await response.json();
        allPokemon = pokemonNames = data.results.map((pokemon) => pokemon.name); //Filtert die ergebnisse aus der data Variablen nach den Namen und speichert diese in einem neuen Array (allPokemon)
        return;
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Namen:", error);
        return [];
    }
}





function fixFirstLetter() {
    for (let k = 0; k < allPokemon.length; k++) {
        let pokemonName = allPokemon[k];

        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        allPokemonFixedFirst.push(pokemonName);
    }
}


async function renderPokemonInfo() {
    let pokeContainer = document.getElementById('pokemonContainer');

    pokeContainer.innerHTML = "";


    for (let j = 0; j < allPokemon.length; j++) {
        let currentPokemon = allPokemon[j];
        let pokeInfo = await getPokemonInfo(currentPokemon);
        let pokeTypeLength = pokeInfo[0];
        let pokeType = pokeInfo[1];
        let pokeImage = pokeInfo[2];

        if (pokeTypeLength.length == 1) {
        pokeContainer.innerHTML += `
            <div class="poke-Info-Card" onclick="clicked(${j})">
                <div class="pokemon-card-header">
                    ${allPokemonFixedFirst[j]}
                </div>
                <div class="dp-flex">
                    <div class="pokemon-type-styling">${pokeType}</div>
                    <div><img src=${pokeImage}></div>
                </div>
            </div>
            `;
        } else {
            pokeContainer.innerHTML += `
            <div class="poke-Info-Card" onclick="clicked(${j})">
                <div class="pokemon-card-header">
                    ${allPokemonFixedFirst[j]}
                </div>
                <div class="dp-flex">
                    <div>
                        <div class="pokemon-type-styling">${pokeType}</div>
                        <div class="pokemon-type-styling">${pokeType}</div>
                    </div>
                    <div><img src=${pokeImage}></div>
                </div>
            </div>
            `;
        }
    }
}


async function getPokemonInfo(currentPokemon) {
    await loadPokemonData(currentPokemon);

    let pokeTypeLength = pokemonData['types'];
    let pokeImage = pokemonData['sprites']['front_default'];
    let pokeType = [];

    for (let a = 0; a < pokeTypeLength.length; a++) {
        pokeType = pokemonData['types'][a]['type']['name'];
    }

    return [pokeTypeLength, pokeType, pokeImage];
}


async function loadPokemonData(currentPokemon){
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`;
    let response = await fetch(url);
    pokemonData = await response.json();
    return;
}


function clicked(zahl){
    alert("Es wurde das " + zahl + " Bild angeklickt!");
}