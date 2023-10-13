let currentPokemon;


async function loadPokemon(id) {
    let idFix = id + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${idFix}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    renderPokemonHeaderInfo();
}


function renderPokemonHeaderInfo() {
    let pokemonName = fixFirstLetter(currentPokemon['name']);
    let pokemonTypeLength = currentPokemon['types'];

    let currentBackgroundColor = colorFinder();
    document.getElementById('pokedex').style.backgroundColor = currentBackgroundColor;

    document.getElementById('pokemonType').innerHTML = "";

    document.getElementById('pokemonInfoImage').src = currentPokemon['sprites']['front_default'];
    document.getElementById('pokemonName').innerHTML = pokemonName;
    document.getElementById('pokemonId').innerHTML = currentPokemon['id'];

    for (let i = 0; i < pokemonTypeLength.length; i++) {
        let pokeType = fixFirstLetter(currentPokemon['types'][i]['type']['name']);
        const typeDiv = document.createElement("div");
        typeDiv.innerHTML = pokeType;
        document.getElementById('pokemonType').appendChild(typeDiv).classList.add("pokemon-info-type-styling");
    }
    renderAboutInfo();
}


function colorFinder() {
    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemonData[i]['name'] == currentPokemon['name']) {
            return allPokemonData[i]['color'];
        }
    }
}


function fixFirstLetter(unfixedString) {
    let firstLetterUppderCase = unfixedString.charAt(0).toUpperCase();
    let completeString = firstLetterUppderCase + unfixedString.slice(1);
    return completeString;
}


function showPokedex() {
    document.getElementById('pokemonContainer').classList.remove('dp-none');
    document.getElementById('main-headline').classList.remove('dp-none');
    document.getElementById('pokedexContainer').classList.add('dp-none');
}


function renderAboutInfo() {
    let content = document.getElementById('about-current-pokemon');

    content.innerHTML = '';
    content.innerHTML = `
        <div class="render-info">
            <div class="render-info-titles">
                <div>Species</div>
                <div>Height</div>
                <div>Weight</div>
                <div>Abilities</div>
            </div>
            <div class="render-info-data">
                <div>n/a</div>
                <div>n/a</div>
                <div>${currentPokemon['weight'] + "00 grams"}</div>
                <div>${fixFirstLetter(currentPokemon['abilities'][0]['ability']['name']) + ", " + fixFirstLetter(currentPokemon['abilities'][1]['ability']['name'])}</div>
            </div>
        </div>
    `;
}


function renderBaseStatsInfo() {
    let content = document.getElementById('base-stats-current-pokemon');
}


function renderEvolutionInfo() {
    let content = document.getElementById('evolution-current-pokemon');
}


function renderMovesInfo() {
    let content = document.getElementById('moves-current-pokemon');
}