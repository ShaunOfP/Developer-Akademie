let howManyPokemon = 6;
let allPokemon = [];
let allPokemonFixedFirst = [];
let pokemonData = [];
let allPokemonData = [];

async function initMain() {
    await loadAllPokemon();
    mainFixFirstLetter();
    renderPokemonInfo();
}


async function loadAllPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${howManyPokemon}`); // zu 1010 ändern
        const data = await response.json();
        allPokemon = pokemonNames = data.results.map((pokemon) => pokemon.name); //Filtert die ergebnisse aus der data Variablen nach den Namen und speichert diese in einem neuen Array (allPokemon)
        return;
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Namen:", error);
        return [];
    }
}


function mainFixFirstLetter() {
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

        if (pokeTypeLength == 1) {
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
                        <div class="pokemon-type-styling">${pokeType[0]}</div>
                        <div class="pokemon-type-styling">${pokeType[1]}</div>
                    </div>
                    <div><img src=${pokeImage}></div>
                </div>
            </div>
            `;
        }
    }
    pushDataToArray();
}


async function getPokemonInfo(getCurrentPokemonInfo) {
    await loadPokemonData(getCurrentPokemonInfo);

    let pokeTypeLength = pokemonData['types'].length;
    let pokeImage = pokemonData['sprites']['front_default'];
    let pokeType = [];

    if (pokeTypeLength == 1) {
        pokeType = pokemonData['types'][0]['type']['name'];
        return [pokeTypeLength, pokeType, pokeImage];
    } else {
        pokeType.push(pokemonData['types'][0]['type']['name'], pokemonData['types'][1]['type']['name']);
        return [pokeTypeLength, pokeType, pokeImage];
    }
}


async function loadPokemonData(currentPokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`;
    let response = await fetch(url);
    pokemonData = await response.json();
    return;
}


async function pushDataToArray() {
    for (let x = 0; x < allPokemon.length; x++) {
        let pokemonName = allPokemon[x];
        let pokemonID = pokemonData['id'];
        //pokeTypeLength einfügen
        //pokeImage einfügen
        //pokeType einfügen


        for (let s = 1; s < 11; s++) {
            let url = `https://pokeapi.co/api/v2/pokemon-color/${s}/`;
            let colorResponse = await (await fetch(url)).json();
            let colorLength = colorResponse['pokemon_species'].length;

            for (let d = 0; d < colorLength; d++) {
                if (colorResponse['pokemon_species'][d]['name'] == pokemonName) {
                    let dataFeed = {
                        'name': pokemonName,
                        'id': pokemonID,
                        'color': colorResponse['name']
                    };

                    allPokemonData.push(dataFeed);
                }
            }
        }

    }
}


async function clicked(id) {
    document.getElementById('pokemonContainer').classList.add('dp-none');
    document.getElementById('main-headline').classList.add('dp-none');
    document.getElementById('pokedexContainer').classList.remove('dp-none');

    await loadPokemon(id);
}