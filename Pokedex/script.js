let currentPokemon;

async function init() {
    await loadPokemon();
}


//wird bisher nicht genutzt
async function getPokedexId() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await response.json();
        const pokemonNames = data.results.map((pokemon) => pokemon.name); //Filtert die ergebnisse aus der data Variablen nach den Namen und speichert diese in einem neuen Array (pokemonNames)
        return pokemonNames;
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Namen:", error);
        return [];
    }
}


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon); //später entfernen
    renderPokemonHeaderInfo();
}


function renderPokemonHeaderInfo() {
    let pokemonName = fixFirstLetter(currentPokemon['name']);
    let pokemonTypeLength = currentPokemon['types'];

    document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonId').innerHTML = currentPokemon['id'];
    
    for(let i = 0; i < pokemonTypeLength.length; i++){
        let pokeType = fixFirstLetter(currentPokemon['types'][i]['type']['name']);
        const typeDiv = document.createElement("div");
        typeDiv.innerHTML = pokeType;
        document.getElementById('pokemonType').appendChild(typeDiv).classList.add("pokemon-type-styling");
    }
}


function fixFirstLetter(unfixedString){
     let firstLetterUppderCase = unfixedString.charAt(0).toUpperCase();
     let completeString = firstLetterUppderCase + unfixedString.slice(1);
     return completeString;
}